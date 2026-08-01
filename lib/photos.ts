import { Redis } from "@upstash/redis";
import { NS_TRIP } from "@/content/nova-scotia/trip-meta";

/**
 * Photo metadata store, backed by Upstash Redis (provisioned via the Vercel
 * Marketplace). One Redis list per trip day:
 *
 *     photos:nova-scotia:{day}   ->  list of PhotoMeta JSON, newest first
 *
 * The client is created lazily and only when the env vars are present, so a
 * local build (or a deploy before the store is provisioned) never crashes — the
 * family gallery simply renders empty until KV is configured.
 */

export interface PhotoMeta {
  id: string;
  day: string; // "01".."12"
  stop: string; // label of the stop within that day
  uploader: string; // "Darren" | "Melissa" | other
  caption: string;
  url: string; // Vercel Blob public URL
  ts: number; // upload time (epoch ms)
}

export function photosKey(day: string): string {
  return `photos:${NS_TRIP.slug}:${day}`;
}

let _redis: Redis | null | undefined;
function redis(): Redis | null {
  if (_redis !== undefined) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  _redis = url && token ? new Redis({ url, token }) : null;
  return _redis;
}

/** True when the KV store is configured (env vars present). */
export function photosConfigured(): boolean {
  return redis() !== null;
}

/** Prepend a photo's metadata to its day's list. Returns false if KV is absent. */
export async function addPhoto(meta: PhotoMeta): Promise<boolean> {
  const r = redis();
  if (!r) return false;
  await r.lpush(photosKey(meta.day), JSON.stringify(meta));
  return true;
}

function parse(item: unknown): PhotoMeta | null {
  try {
    // Upstash may return an already-parsed object or a JSON string.
    const o = typeof item === "string" ? JSON.parse(item) : (item as PhotoMeta);
    if (o && typeof o.url === "string" && typeof o.day === "string") return o as PhotoMeta;
  } catch {
    /* ignore malformed rows */
  }
  return null;
}

/** All photos for one day, newest first. */
export async function getPhotosForDay(day: string): Promise<PhotoMeta[]> {
  const r = redis();
  if (!r) return [];
  const rows = await r.lrange<unknown>(photosKey(day), 0, -1);
  return rows.map(parse).filter((p): p is PhotoMeta => p !== null);
}

/** Every day's photos, keyed by day number — for the family gallery. */
export async function getAllPhotosByDay(): Promise<Record<string, PhotoMeta[]>> {
  const r = redis();
  if (!r) return {};
  const days = Array.from({ length: NS_TRIP.days }, (_, i) => String(i + 1).padStart(2, "0"));
  const lists = await Promise.all(days.map((d) => getPhotosForDay(d)));
  const out: Record<string, PhotoMeta[]> = {};
  days.forEach((d, i) => {
    if (lists[i].length) out[d] = lists[i];
  });
  return out;
}
