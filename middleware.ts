import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, verifyAuthCookie } from "@/lib/auth";

/**
 * Passcode gate for the PRIVATE Nova Scotia routes.
 *
 * Gated:   /trips/nova-scotia and everything under it, plus the Nova Scotia
 *          API routes (upload token, photo metadata write).
 * Public:  /trips/nova-scotia/family      (the family/archive link)
 *          /trips/nova-scotia/unlock       (the passcode entry page)
 *          /api/nova-scotia/unlock         (sets the cookie)
 *
 * Every other trip (Newfoundland) and the hub are untouched.
 */

const PUBLIC_PATHS = [
  "/trips/nova-scotia/family",
  "/trips/nova-scotia/unlock",
  "/api/nova-scotia/unlock",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the public exceptions (and anything nested under the family view).
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const ok = await verifyAuthCookie(
    req.cookies.get(AUTH_COOKIE)?.value,
    process.env.COOKIE_SECRET
  );
  if (ok) return NextResponse.next();

  // Not authenticated → send to the passcode page, remembering where they were.
  const url = req.nextUrl.clone();
  url.pathname = "/trips/nova-scotia/unlock";
  url.search = `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/trips/nova-scotia",
    "/trips/nova-scotia/:path*",
    "/api/nova-scotia/:path*",
  ],
};
