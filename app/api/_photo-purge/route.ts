import { NextResponse, type NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

/**
 * TEMPORARY one-off maintenance route — remove after use.
 *
 * Runs inside the Vercel runtime, where UPSTASH_REDIS_REST_* are populated, so
 * it can talk to the same Upstash Redis the family gallery reads. It is gated by
 * a random secret and HARDCODED to only ever inspect/delete the two seed-test
 * photo lists. It can touch nothing else (no comments:*, no other days).
 *
 *   GET /api/_photo-purge?key=SECRET            -> dry run: print both lists
 *   GET /api/_photo-purge?key=SECRET&commit=1   -> delete both keys, then re-read
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SECRET = "11d18d0c058a70ccc13b8790ebba5c7bfed29e1fb25752a0";
const KEYS = ["photos:nova-scotia:01", "photos:nova-scotia:02"] as const;

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("key") !== SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return NextResponse.json(
      { error: "KV not configured in this deployment (UPSTASH_REDIS_REST_* absent)" },
      { status: 503 }
    );
  }

  const redis = new Redis({ url, token });
  const commit = req.nextUrl.searchParams.get("commit") === "1";

  const before: Record<string, unknown[]> = {};
  for (const k of KEYS) before[k] = await redis.lrange<unknown>(k, 0, -1);
  const totalBefore = KEYS.reduce((n, k) => n + before[k].length, 0);

  const result: Record<string, unknown> = { keys: KEYS, before, totalBefore, committed: commit };

  if (commit) {
    const deleted: Record<string, number> = {};
    for (const k of KEYS) deleted[k] = await redis.del(k);
    const after: Record<string, number> = {};
    for (const k of KEYS) after[k] = (await redis.lrange<unknown>(k, 0, -1)).length;
    result.deleted = deleted; // 1 = key existed and was removed
    result.afterLengths = after; // expect 0 / 0
  }

  return NextResponse.json(result, { status: 200 });
}
