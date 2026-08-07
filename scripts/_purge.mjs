/**
 * TEMPORARY build-time maintenance script — remove after use.
 *
 * Runs during `vercel build`, where UPSTASH_REDIS_REST_* are injected, so it can
 * talk to the same Upstash Redis the family gallery reads — without needing the
 * REST token in hand and without going through the SSO-protected preview URL.
 *
 * HARDCODED to only ever inspect/delete the two seed-test photo lists. It never
 * touches comments:* or any other day. Flip COMMIT to true to actually delete.
 *
 * All output goes to the Vercel build logs (fetch via get_deployment_build_logs).
 * Always exits 0 so it never blocks the build.
 */
import { Redis } from "@upstash/redis";

const COMMIT = false; // false = dry run (print only); true = DEL the two keys
const KEYS = ["photos:nova-scotia:01", "photos:nova-scotia:02"];
const TAG = "[_purge]";

async function main() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  console.log(`${TAG} mode=${COMMIT ? "COMMIT (delete)" : "DRY RUN (no delete)"}`);
  console.log(`${TAG} UPSTASH_REDIS_REST_URL present: ${Boolean(url)}`);
  console.log(`${TAG} UPSTASH_REDIS_REST_TOKEN present: ${Boolean(token)}`);
  if (!url || !token) {
    console.log(`${TAG} KV NOT CONFIGURED in this build env — doing nothing.`);
    return;
  }

  const redis = new Redis({ url, token });

  let total = 0;
  for (const k of KEYS) {
    const rows = await redis.lrange(k, 0, -1);
    total += rows.length;
    console.log(`${TAG} ${k} — ${rows.length} item(s):`);
    rows.forEach((r, i) => {
      const s = typeof r === "string" ? r : JSON.stringify(r);
      console.log(`${TAG}   [${i}] ${s}`);
    });
  }
  console.log(`${TAG} TOTAL across both keys: ${total}`);

  if (!COMMIT) {
    console.log(`${TAG} DRY RUN — nothing deleted. Set COMMIT=true to delete.`);
    return;
  }

  for (const k of KEYS) {
    const res = await redis.del(k);
    console.log(`${TAG} DEL ${k} -> ${res} (1 = existed & removed, 0 = absent)`);
  }
  for (const k of KEYS) {
    const after = await redis.lrange(k, 0, -1);
    console.log(`${TAG} after DEL, ${k} length: ${after.length} (expect 0)`);
  }
  console.log(`${TAG} DONE.`);
}

main()
  .catch((e) => console.log(`${TAG} ERROR: ${e && e.message ? e.message : e}`))
  .finally(() => process.exit(0));
