import { put } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";

/**
 * TEMPORARY diagnostic. Does a server-side Vercel Blob write with the store's
 * own BLOB_READ_WRITE_TOKEN (no client token / callback dance), so we can tell
 * whether the Blob store itself is writable. Guarded by a shared key and added
 * to the middleware PUBLIC_PATHS only while we debug the upload loop. Remove
 * once the upload is fixed.
 */
export const runtime = "nodejs";

const KEY = "ns-diag-8823";

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (req.nextUrl.searchParams.get("k") !== KEY) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const env = {
    blobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    upstashUrl: Boolean(process.env.UPSTASH_REDIS_REST_URL),
    upstashToken: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
    passcode: Boolean(process.env.TRIP_PASSCODE),
    cookieSecret: Boolean(process.env.COOKIE_SECRET),
  };
  try {
    const r = await put(`nova-scotia/_selftest/${Date.now()}.txt`, "ok\n", {
      access: "public",
      addRandomSuffix: true,
      contentType: "text/plain",
    });
    return NextResponse.json({ ok: true, env, url: r.url });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      env,
      name: e instanceof Error ? e.name : typeof e,
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
