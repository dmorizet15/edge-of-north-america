/**
 * Passcode-gate cookie signing — shared by the middleware (Edge runtime) and the
 * /unlock route handler. Uses Web Crypto HMAC-SHA256, which is available in both
 * the Edge and Node runtimes, so no Node-only crypto import.
 *
 * The cookie is `"<expiryEpochMs>.<hex hmac(expiry)>"`. Verification recomputes
 * the HMAC with COOKIE_SECRET and checks the expiry — so a valid cookie proves
 * knowledge of the secret and can't be forged or replayed past its expiry.
 *
 * The actual passcode is never stored in the cookie; it's compared once in the
 * /unlock route against process.env.TRIP_PASSCODE and then discarded.
 */

export const AUTH_COOKIE = "ns_trip_auth";
/** Cookie lifetime — long enough to cover the trip without re-entry. */
export const AUTH_TTL_MS = 60 * 24 * 60 * 60 * 1000; // 60 days

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toHex(sig);
}

/** Constant-time-ish string compare (avoids early-exit timing leak). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

/** Create a signed cookie value good for AUTH_TTL_MS. Returns null if no secret. */
export async function signAuthCookie(secret: string | undefined): Promise<string | null> {
  if (!secret) return null;
  const expiry = Date.now() + AUTH_TTL_MS;
  const sig = await hmac(String(expiry), secret);
  return `${expiry}.${sig}`;
}

/** True only if the cookie is well-formed, correctly signed, and unexpired. */
export async function verifyAuthCookie(
  value: string | undefined,
  secret: string | undefined
): Promise<boolean> {
  if (!value || !secret) return false;
  const dot = value.indexOf(".");
  if (dot <= 0) return false;
  const expiryStr = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = await hmac(expiryStr, secret);
  return safeEqual(sig, expected);
}
