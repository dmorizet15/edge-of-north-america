import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, AUTH_TTL_MS, signAuthCookie } from "@/lib/auth";

/**
 * POST the passcode from the /unlock form. On a correct passcode (compared
 * against process.env.TRIP_PASSCODE — never invented, never stored), set the
 * signed auth cookie and redirect back to where the user was headed.
 *
 * Accepts a native form POST (no client JS required), so it works from a phone.
 */
export const runtime = "nodejs";

function safeNext(next: string | null): string {
  // Only allow same-site Nova Scotia paths as the post-login redirect target.
  if (next && next.startsWith("/trips/nova-scotia")) return next;
  return "/trips/nova-scotia";
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const passcode = String(form.get("passcode") ?? "");
  const next = safeNext(String(form.get("next") ?? ""));

  const expected = process.env.TRIP_PASSCODE;
  const secret = process.env.COOKIE_SECRET;

  // Fail closed if the server isn't configured, or the passcode is wrong.
  if (!expected || !secret || passcode !== expected) {
    const url = new URL("/trips/nova-scotia/unlock", req.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, { status: 303 });
  }

  const cookie = await signAuthCookie(secret);
  const res = NextResponse.redirect(new URL(next, req.url), { status: 303 });
  if (cookie) {
    res.cookies.set(AUTH_COOKIE, cookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(AUTH_TTL_MS / 1000),
    });
  }
  return res;
}
