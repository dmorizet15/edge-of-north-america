import { Redis } from "@upstash/redis";
import { NS_TRIP } from "@/content/nova-scotia/trip-meta";

/**
 * Guestbook comments for the public family view, backed by Upstash Redis (the
 * same store the photo metadata uses). One Redis list per trip day, appended in
 * chronological order (oldest first) so a day reads like a conversation:
 *
 *     comments:nova-scotia:{day}  ->  list of CommentMeta JSON, oldest first
 *
 * No login: family members just type a name with each note. The client is
 * created lazily and only when the env vars are present, so a build without KV
 * never crashes — the thread simply renders empty and posting is disabled.
 */

export interface CommentMeta {
  id: string;
  day: string; // "01".."12"
  name: string; // who left it (free text, no account)
  body: string; // the note
  ts: number; // epoch ms
}

export function commentsKey(day: string): string {
  return `comments:${NS_TRIP.slug}:${day}`;
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
export function commentsConfigured(): boolean {
  return redis() !== null;
}

/** Append a comment to its day's thread. Returns false if KV is absent. */
export async function addComment(meta: CommentMeta): Promise<boolean> {
  const r = redis();
  if (!r) return false;
  await r.rpush(commentsKey(meta.day), JSON.stringify(meta));
  return true;
}

function parse(item: unknown): CommentMeta | null {
  try {
    // Upstash may return an already-parsed object or a JSON string.
    const o = typeof item === "string" ? JSON.parse(item) : (item as CommentMeta);
    if (o && typeof o.body === "string" && typeof o.name === "string") {
      return o as CommentMeta;
    }
  } catch {
    /* ignore malformed rows */
  }
  return null;
}

/** All comments for one day, oldest first. */
export async function getCommentsForDay(day: string): Promise<CommentMeta[]> {
  const r = redis();
  if (!r) return [];
  const rows = await r.lrange<unknown>(commentsKey(day), 0, -1);
  return rows.map(parse).filter((c): c is CommentMeta => c !== null);
}

/** Comment count per day, keyed by day number — for the family view badges. */
export async function getAllCommentCountsByDay(): Promise<Record<string, number>> {
  const r = redis();
  if (!r) return {};
  const days = Array.from({ length: NS_TRIP.days }, (_, i) => String(i + 1).padStart(2, "0"));
  const counts = await Promise.all(days.map((d) => r.llen(commentsKey(d)).catch(() => 0)));
  const out: Record<string, number> = {};
  days.forEach((d, i) => {
    if (counts[i] > 0) out[d] = counts[i];
  });
  return out;
}
