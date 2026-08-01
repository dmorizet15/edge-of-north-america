import { NextResponse, type NextRequest } from "next/server";
import { addPhoto, photosConfigured, type PhotoMeta } from "@/lib/photos";
import { NS_DAYS } from "@/content/nova-scotia/itinerary";

/**
 * Write one photo's metadata to the KV store. Called by the upload page after
 * the blob itself has landed. Behind the passcode gate (middleware covers
 * /api/nova-scotia/*). The family gallery reads this data server-side.
 */
export const runtime = "nodejs";

const VALID_DAYS = new Set(NS_DAYS.map((d) => d.n));

function clampStr(v: unknown, max: number): string {
  return typeof v === "string" ? v.slice(0, max).trim() : "";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!photosConfigured()) {
    return NextResponse.json({ error: "photo store not configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const day = clampStr(body.day, 2);
  const url = clampStr(body.url, 2048);
  if (!VALID_DAYS.has(day)) {
    return NextResponse.json({ error: "unknown day" }, { status: 400 });
  }
  if (!/^https:\/\/[^\s]+\.public\.blob\.vercel-storage\.com\//.test(url)) {
    return NextResponse.json({ error: "invalid blob url" }, { status: 400 });
  }

  const meta: PhotoMeta = {
    id: crypto.randomUUID(),
    day,
    stop: clampStr(body.stop, 120) || "The day",
    uploader: clampStr(body.uploader, 40) || "Someone",
    caption: clampStr(body.caption, 400),
    url,
    ts: Date.now(),
  };

  const ok = await addPhoto(meta);
  if (!ok) {
    return NextResponse.json({ error: "photo store not configured" }, { status: 503 });
  }
  return NextResponse.json({ ok: true, id: meta.id });
}
