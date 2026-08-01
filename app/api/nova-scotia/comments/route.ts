import { NextResponse, type NextRequest } from "next/server";
import {
  addComment,
  commentsConfigured,
  getCommentsForDay,
  type CommentMeta,
} from "@/lib/comments";

/**
 * PUBLIC guestbook API for the Nova Scotia family view. No auth (allow-listed in
 * middleware): family members leave a note with just their name. GET returns one
 * day's thread; POST appends to it. Kept intentionally small — validate the day,
 * cap the lengths, strip control characters, store as plain text (React escapes
 * on render, so there is no HTML-injection surface on the page).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_DAYS = new Set(
  Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
);

const NAME_MAX = 40;
const BODY_MAX = 1000;

/**
 * Strip control characters, keeping tab (9), newline (10), and carriage
 * return (13). Done by char code so no control chars appear in this source.
 */
function clean(s: string): string {
  let out = "";
  for (const ch of s) {
    const c = ch.charCodeAt(0);
    const isControl = c < 32 && c !== 9 && c !== 10 && c !== 13;
    if (!isControl && c !== 127) out += ch;
  }
  return out;
}

function genId(): string {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const day = req.nextUrl.searchParams.get("day") ?? "";
  if (!VALID_DAYS.has(day)) {
    return NextResponse.json({ error: "Unknown day." }, { status: 400 });
  }
  const comments = await getCommentsForDay(day);
  return NextResponse.json({ comments });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!commentsConfigured()) {
    return NextResponse.json(
      { error: "Comments aren’t available right now." },
      { status: 503 }
    );
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const d = (data ?? {}) as Record<string, unknown>;
  const day = String(d.day ?? "");
  const name = clean(String(d.name ?? "")).replace(/\s+/g, " ").trim().slice(0, NAME_MAX);
  const body = clean(String(d.body ?? "")).trim().slice(0, BODY_MAX);

  if (!VALID_DAYS.has(day)) {
    return NextResponse.json({ error: "Unknown day." }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!body) {
    return NextResponse.json({ error: "Please write a note." }, { status: 400 });
  }

  const comment: CommentMeta = { id: genId(), day, name, body, ts: Date.now() };
  await addComment(comment);
  return NextResponse.json({ comment }, { status: 201 });
}
