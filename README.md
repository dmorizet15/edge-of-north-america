# Edge of North America

A cinematic, single-scroll pitch for a Newfoundland expedition — built to be
experienced, not read. The piece opens before dawn, crosses an ocean at night,
lands at first light, and climbs to Cape Spear, where the sun reaches North
America first. The argument is made through photography, typography, pacing,
whitespace, and sequencing — never through marketing language.

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

Every image is defined once in [`content/photos.ts`](content/photos.ts). To
place a real photograph, simply drop a file at its `src` path inside
[`public/assets/photos/`](public/assets/photos/) — the frame detects it and
fades the real image in automatically. No code changes required. The expected
filenames and locations are listed in
[`public/assets/photos/README.md`](public/assets/photos/README.md).

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
  layout.tsx            Root shell, fonts, metadata
  page.tsx              The full 24-section sequence, assembled
components/
  RouteMap.tsx          Bespoke National Geographic-style SVG (projected coords)
  sections/             One module per chapter (Hero, Ferry, CapeSpear, …)
  ui/                   Reusable primitives:
    EditorialImage        photo / premium placeholder
    CoordinateBadge       reusable geographic marker
    ChapterLabel          tracked chapter eyebrow
    SectionDivider        quiet whitespace beat
    Reveal                Framer Motion scroll reveal
    ScrollProgress        hairline progress line
    Section               band wrapper
content/
  photos.ts             Photography registry (single source of truth)
  route.ts              Waypoints + coordinates for the map & badges
lib/
  fonts.ts              Centralized typography
  tones.ts              The darkness → first-light gradient system
public/assets/
  photos/               Drop real photography here
  maps/                 Supporting map assets
styles/
  globals.css           Base styles, grain, reduced-motion support
```

Maps are their own reusable component. Coordinate badges, section dividers, and
chapter labels are reusable. Typography and the palette are centralized.

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
