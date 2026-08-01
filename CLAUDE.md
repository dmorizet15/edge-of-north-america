# edge-of-north-america — agent notes

A cinematic Next.js (App Router) pitch site for two road trips: **Newfoundland**
and **Nova Scotia**. Static, no backend. Deployed on Vercel.

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
- `**bold**` → inline emphasis (may contain links; rendered recursively).

**Rule of thumb:** summary = website links; `detailedPlan` = GPS directions.
No-website places are plain text in the summary and get a `[[map|…]]` in the
detailed plan.

## Nova Scotia dining pass — Aug 2026 (current state)

A verified pass refreshed restaurant facts and removed six permanently-closed
businesses (Battered Fish, Restaurant Acadien/Co-op, Keltic's Purple Thistle,
Oh My Cod, and dropped Bar Kismet as the Monday backup; each now referenced only
as closed). Every previously-empty meal slot now names a verified restaurant.

**Intentionally left untouched (Rockland leg pending a later pass):**

- Day 11 (Aug 17): the **Rockland dinner and the Rockland stay** are unchanged;
  the Rockland hotel field still carries its old `[[dir]]` button and the Rockland
  dinner still uses `[[map]]` tokens. Yarmouth breakfast and Acadia content on
  Day 11 *were* updated.
- **All of Day 12 (Aug 18)** is unchanged. Note: **Brass Compass Cafe in Rockland
  has been permanently closed since Nov 2021** and is still listed as a Day 12
  breakfast option — fix it whenever the Rockland leg is revisited.

Hotels, drive times, sunset times, charging notes, and photos are booking-driven
and were not changed in the dining pass (one factual exception: Day 3's Moncton→
Fundy-gate distance, corrected from "~45 min" to "about an hour, 79 km via
Route 114"; and Day 3's `sky` note was rewritten to drop the unused Fundy dark sky).

## Build / verify

- `npx tsc --noEmit` and `npm run build` must both pass (Vercel type-checks).
- After itinerary edits, sanity-check: `[[…]]` tokens balanced, `detailedPlan`
  rows in ascending time order, and no unprocessed `[[map|`/`[[dir|` in the
  rendered HTML.
