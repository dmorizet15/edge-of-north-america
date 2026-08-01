# edge-of-north-america — agent notes

A cinematic Next.js (App Router) site for two road trips: **Newfoundland** and
**Nova Scotia**. Mostly static; the Nova Scotia trip adds a small private
layer (passcode gate + photo upload) and a public family view. Deployed on Vercel.

## Nova Scotia — private/public layer & env vars

Routes under `app/trips/nova-scotia/`:

- `/trips/nova-scotia` — the private planning view (full itinerary + Two Paths).
  **Gated** by `middleware.ts`.
- `/trips/nova-scotia/family` — **public** archive/follow-along view. Each day
  leads with the same cinematic full-bleed hero photo as the private day headers
  (`day.photo` via `EditorialImage`, title/subtitle overlaid), then a body panel
  with the stops, a per-day family-photo gallery read from KV (`DayGallery`, a
  slideshow lightbox — auto-advance/play-pause/fullscreen, iOS-safe), and a
  no-login guestbook (`DayComments`). A "you are here" comes from `trip-meta.ts`.
  Deliberately omits the hour-by-hour, bookings, and any upload controls.
- `/trips/nova-scotia/upload` — private, mobile-first photo upload (client →
  Vercel Blob, then metadata → KV). Gated.
- `/trips/nova-scotia/unlock` — the passcode page (public); posts to
  `/api/nova-scotia/unlock`, which checks `TRIP_PASSCODE` and sets a signed
  cookie (`lib/auth.ts`, HMAC via Web Crypto so it runs on the Edge).

`middleware.ts` gates `/trips/nova-scotia*` and `/api/nova-scotia*` **except**
`/family`, `/unlock`, `/api/nova-scotia/unlock`, and `/api/nova-scotia/comments`
(the public family guestbook). Newfoundland still builds at `/trips/newfoundland`
but is intentionally unlinked.

**Entry / navigation.** Nova Scotia is the only active trip, so the site root
(`app/page.tsx`) `redirect()`s straight to `/trips/nova-scotia` (the gated
private view; the family use their direct `/family` link) instead of showing the
old two-trip picker. The "All trips" chrome (`TripNav` in `app/trips/layout.tsx`)
and the family `BackButton` were removed so nothing surfaces Newfoundland; those
components and `lib/trips.ts` / `TripCard` remain in the tree, just unused, ready
to re-wire if a second trip goes live.

**Required Vercel env vars** (the app degrades gracefully without them — the
build passes, gate fails closed, gallery renders empty):

- `TRIP_PASSCODE` — the private-view passcode (set it in Vercel; never in code).
- `COOKIE_SECRET` — HMAC secret for the auth cookie (any long random string).
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis
  (Vercel Marketplace) for photo metadata and family guestbook comments. Key
  shapes: `photos:nova-scotia:{day}` and `comments:nova-scotia:{day}`.
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob store (auto-injected once the store is added).
- `SHOW_INTRO` — set to `true` to show the cinematic intro on the private page;
  unset/false hides it (read at build time, so toggling needs a redeploy).

## Branches & deploy (read this first)

- **Vercel production branch is `itinerary-v2.1`**, NOT the GitHub default branch
  (`claude/premium-interactive-presentation-demo0j`). The public site
  (`edge-of-north-america.vercel.app`) is served from `itinerary-v2.1`.
- Do trip-content work on `itinerary-v2.1`: branch off it, PR back into it.
- The GitHub default branch holds an older, divergent version of the Nova Scotia
  itinerary (Portland/Bar Harbor overnights). The two are intentionally separate;
  don't assume a change on one reaches the live site.

## Where things live

- `content/nova-scotia/itinerary.ts` — `NS_DAYS` (the 12-day day-by-day data),
  plus `NS_GLANCE` and `NS_ROUTE_NOTES` (overview bands).
- `content/newfoundland/*` — the other trip (do not touch when working on NS).
- `components/trip/TripDayChapter.tsx` — renders one `TripDay`: the "The day"
  summary timeline, the sidebar "Stay/Drive/…" details, and the collapsible
  "Detailed daily plan — hour by hour" (`detailedPlan`).
- `lib/richtext.tsx` — `renderText()` inline renderer (see link model below).
- `lib/trip-types.ts` — `TripDay`, `TripStop`, `TripPlanRow`, `TripMapPoint`.

## Link model (itinerary copy)

`renderText()` parses four inline tokens in any itinerary string:

- `[label](url)` → website link (↗). Used in the **summary** copy so each place
  links to its own site.
- `[[map|Words|Address]]` (or `[[map|Words]]`) → the words open **Google Maps
  directions** to Address. Used in the **detailed hour-by-hour plan** so each
  stop is one tap to GPS.
- `[[dir|Address]]` → a compact "Directions" pill, added *alongside* a place
  that already has a website link.
- `[[tel|207-555-0000]]` → a tap-to-call `tel:` link (for use on the road).
- `**bold**` → inline emphasis (may contain links; rendered recursively).

**Rule of thumb:** summary = website links; `detailedPlan` = GPS directions.
No-website places are plain text in the summary and get a `[[map|…]]` in the
detailed plan.

## Nova Scotia dining pass — Aug 2026 (current state)

A verified pass refreshed restaurant facts and removed six permanently-closed
businesses (Battered Fish, Restaurant Acadien/Co-op, Keltic's Purple Thistle,
Oh My Cod, and dropped Bar Kismet as the Monday backup; each now referenced only
as closed). Every previously-empty meal slot now names a verified restaurant.

## Two Paths — the final-night branch (Days 11–12)

The last night is an open decision made **Saturday, August 15** on the Mount
Washington summit forecast, between **Path A · The Coast** (Acadia + Rockland)
and **Path B · The Summit** (Mount Washington Auto Road + the Kancamagus, via
Gorham NH). This is built as its own feature, not as ordinary `NS_DAYS` days:

- `components/trip/TwoPaths.tsx` — a **client** component with three states
  (`undecided` / `coast` / `summit`), persisted to `localStorage['ns-final-path']`
  with a `?path=coast|summit` URL override that writes through. Reads happen in
  `useEffect` (SSR renders `undecided`) so hydration stays clean. Honours
  `prefers-reduced-motion`.
- `content/nova-scotia/two-paths.ts` — all Two Paths content (decision gate,
  comparison, both full itineraries, "Lock it in" checklists), token-authored.
- `app/trips/nova-scotia/page.tsx` renders **Days 1–10** via `TripDayChapter`,
  then `<TwoPaths/>` in place of Days 11–12. **`NS_DAYS` still holds all 12 days
  of data** (the old Day 11/12 objects are intact, just not rendered) — Path A is
  the corrected Rockland plan and supersedes them.
- Two Tuesday closures were baked into Path A: the **Farnsworth Art Museum** and
  **Home Kitchen Café** are both closed Tuesdays (Aug 18). Rockland dinner is now
  **13 Oak** (the old In Good Company / Cafe Miranda backups are closed Mondays).
- **Both paths have day maps.** Path A reuses the existing Rockland-framed
  `ns-day-11` / `ns-day-12` basemaps; Path B has its own baked New Hampshire
  basemaps, `ns-pathb-mon` (Bar Harbor → Bethel → Gorham) and `ns-pathb-tue`
  (Mt Washington → Conway → Lincoln → home). `scripts/bake-pathb-maps.py` bakes
  only those two (reusing `bake-ns-maps.py`'s renderer, `TERRAIN=0` for a clean
  dark field); run it as `SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3
  scripts/bake-pathb-maps.py`. Path B sunset lines are still omitted rather than
  showing the (wrong) Maine value.

The **dining pass** below applies to Days 1–10 (and the shared Day 11 morning).
Days 11–12 dining now lives in the Two Paths content.

Hotels, drive times, sunset times, charging notes, and photos are booking-driven
and were not changed in the dining pass (one factual exception: Day 3's Moncton→
Fundy-gate distance, corrected from "~45 min" to "about an hour, 79 km via
Route 114"; and Day 3's `sky` note was rewritten to drop the unused Fundy dark sky).

## Build / verify

- `npx tsc --noEmit` and `npm run build` must both pass (Vercel type-checks).
- After itinerary edits, sanity-check: `[[…]]` tokens balanced, `detailedPlan`
  rows in ascending time order, and no unprocessed `[[map|`/`[[dir|` in the
  rendered HTML.
