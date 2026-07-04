# Trips — a private travel portal

A small, cinematic travel portal built to be *experienced*, not read. A landing
page lets you choose a journey; each journey is a full cinematic overview plus a
day-by-day guide, made through photography, typography, pacing, whitespace, and
sequencing — never marketing language.

**Two trips today:**

- **Newfoundland — *The Edge of North America.*** The original: a dramatic
  expedition that opens before dawn, crosses an ocean at night, lands at first
  light, and climbs to Cape Spear, where the sun reaches the continent first.
  Preserved exactly; only relocated to `/trips/newfoundland`.
- **Nova Scotia — *The Ocean Road.*** The warmer, easier one: ocean roads and
  historic inns, seafood and the Cabot Trail, dark skies over Cape Breton, and a
  ferry home across the Gulf of Maine. A relaxed 14-day 2026 road trip for
  Darren & Melissa, at `/trips/nova-scotia`.

```
/                       The menu — elegant trip cards
/trips/newfoundland     The Edge of North America (unchanged)
/trips/nova-scotia      The Ocean Road
```

Design references: Apple product pages, National Geographic, Condé Nast
Traveler, Aesop, A24, Kinfolk.

---

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS** — centralized palette & type scale (`tailwind.config.ts`)
- **Framer Motion** — scroll reveals, the route-map draw, the Cape Spear bloom
- **TypeScript**
- Type: **Playfair Display** (display serif) + **Work Sans** (body), via `next/font`

No Bootstrap, no templates, no slide generators. Every page is handcrafted.
Optimized for a 16″ MacBook Pro first; responsive down to mobile.

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

---

## Photography — how the placeholder system works

**No AI-generated scenery. Real photography only. One location is never
substituted for another.**

Until a real, licensed photo is placed, every frame renders an elegant tonal
placeholder that states — in-frame — exactly what belongs there: the exact
location, suggested search terms, the ideal aspect ratio, and composition notes.
The placeholders follow the darkness → first-light color arc, so the piece reads
as intentional even before a single photo is dropped in.

Every image is defined once per trip — Newfoundland in
[`content/photos.ts`](content/photos.ts), Nova Scotia in
[`content/nova-scotia/photos.ts`](content/nova-scotia/photos.ts). To place a
real photograph, simply drop a file at its `src` path inside
[`public/assets/photos/`](public/assets/photos/) (or
[`public/assets/photos/ns/`](public/assets/photos/ns/) for Nova Scotia) — the
frame detects it and fades the real image in automatically. No code changes
required. Expected filenames and search terms are listed in each folder's
README. On marquee frames (menu cards and heroes) the placeholder shows as a
clean tonal field; the working sourcing brief stays visible on the day-by-day
photo bands via the `showBrief` prop on `<EditorialImage>`.

**Licensing flags**
- **Fogo Island Inn** imagery requires a license or written permission — the
  placeholder is set to stay until it's cleared.
- Whale frames are honest (spout / fluke / back, not a full breach).
- Icebergs and puffins are intentionally not central (late-summer/early-fall build).

Recommended sources: Newfoundland & Labrador Tourism media assets, Wikimedia
Commons, Unsplash, Pexels, licensed stock, official hotel media with permission.

---

## Project structure

```
app/
  layout.tsx                     Root shell, fonts, metadata
  page.tsx                       The menu — trip cards, driven by lib/trips.ts
  trips/
    layout.tsx                   Shared trip chrome (the "All trips" back nav)
    newfoundland/page.tsx        Edge of North America (relocated, unchanged)
    nova-scotia/page.tsx         The Ocean Road (overview + 14-day guide)
components/
  RouteMap.tsx                   Newfoundland's bespoke route SVG
  DayMap.tsx                     Per-day mini-map (shared, registry-agnostic)
  sections/                      Newfoundland chapters (Hero, Ferry, CapeSpear, …)
  trip/                          Reusable, trip-agnostic building blocks:
    TripCard                       landing card (hero, tone, length, link)
    SceneChapter                   full-bleed overview chapter (takes a Photo)
    TripDayChapter                 luxury day spread (+ "Tonight's Sky")
    TripRouteMap                   route SVG for any trip's waypoints
    TripNav                        the quiet "All trips" back affordance
  ui/                            Shared primitives (all reused by both trips):
    EditorialImage                 photo / premium placeholder (+ showBrief)
    CoordinateBadge, ChapterLabel, SectionDivider, Reveal,
    ScrollProgress, Section
content/
  photos.ts, route.ts, itinerary.ts    Newfoundland content
  nova-scotia/
    photos.ts                    Nova Scotia photography registry
    route.ts                     Nova Scotia waypoints + map labels
    itinerary.ts                 The 14-day guide + overview data
lib/
  fonts.ts                       Centralized typography
  tones.ts                       The darkness → first-light gradient system
  trip-types.ts                  Shared TripDay / TripWaypoint / TripSummary
  trips.ts                       The trip registry (drives the menu)
public/assets/
  photos/                        Newfoundland photos (drop real images here)
  photos/ns/                     Nova Scotia photos (see its README)
styles/
  globals.css                    Base styles, grain, reduced-motion support
```

The `components/trip/*` set, `DayMap`, and every `components/ui/*` primitive are
reusable across trips; typography, the palette, and the tonal placeholder system
are centralized. The Newfoundland experience keeps its own original section
components untouched.

---

## Adding a future trip

The architecture is built so a new trip is additive — nothing existing has to
change. To add, say, `prince-edward-island`:

1. **Content** — create `content/prince-edward-island/`:
   - `photos.ts` — export a registry `satisfies Record<string, Photo>` (reuse the
     `Photo`/`Tone` types from `content/photos.ts`).
   - `route.ts` — export `TripWaypoint[]` and a labels map.
   - `itinerary.ts` — export `TripDay[]` (import `TripDay` from `lib/trip-types.ts`)
     plus any overview/glance data.
2. **Page** — add `app/trips/prince-edward-island/page.tsx`. Compose the overview
   from `SceneChapter`, the map from `TripRouteMap`, and the guide by mapping your
   days through `TripDayChapter`. Give it its own `export const metadata`.
3. **Register** — add one `TripSummary` object to `TRIPS` in `lib/trips.ts` (name,
   subtitle, description, length, tone, route, `hero` photo, `href`, `order`).

That's it — the card appears on the menu, the back-nav works for free, and the
day layout, maps, placeholders, and motion all come from the shared components.

---

## Deploy to Vercel

The finished product runs from a single Vercel URL. Two ways to deploy:

### Option A — Import the GitHub repo (recommended)

1. Push this branch to GitHub (see below).
2. Go to **[vercel.com/new](https://vercel.com/new)** and import the
   `edge-of-north-america` repository.
3. Vercel auto-detects Next.js. No environment variables, no config needed.
   Click **Deploy**.
4. Every push to the branch produces a fresh preview URL; merging to the
   production branch updates the production URL.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # first run links the project & creates a preview
vercel --prod   # promote to the production URL
```

### Push this branch to GitHub

```bash
git push -u origin claude/premium-interactive-presentation-demo0j
```

---

## Quality standard

If Apple hired National Geographic to convince someone to take this exact trip,
this is what they'd publish. If any page ever starts to feel like a brochure, a
template, or a tourism site — make it darker, quieter, and larger until it
doesn't.

## Act Two — The Journey, Day by Day

After the cinematic first act, a second act answers "when do we go?" with a
15-day expedition guide. Each day is its own editorial spread — a photo band, an
hour-by-hour timeline (wake, breakfast, drive, scenic stops with timings, lunch,
afternoon, dinner, evening), a practical sidebar (stay, drive, walking, EV
charging, wildlife, rainy-day backup) with a bespoke per-day map, and a
"Today's Memory" callout. Content lives in [`/content/itinerary.ts`](content/itinerary.ts);
the day layout is [`/components/sections/DayChapter.tsx`](components/sections/DayChapter.tsx)
and the per-day map is [`/components/DayMap.tsx`](components/DayMap.tsx).
Timings and distances are honest working estimates — verify before booking.
