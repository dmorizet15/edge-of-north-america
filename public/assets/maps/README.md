# Route maps — how they work & attribution

Each day and each trip's overview has a **real map** baked as a dark raster,
with an animated route line drawn on top as you scroll (stops light up as the
line reaches them). See [`components/trip/ScrollRouteMap.tsx`](../../../components/trip/ScrollRouteMap.tsx).

- **Base rasters** (`nf/*.png`, `ns/*.png`) are stitched from **CARTO "dark
  nolabels"** basemap tiles (© OpenStreetMap contributors, © CARTO), fit to
  each day's points via Web Mercator. Every map shows the required
  **"© OpenStreetMap · CARTO"** attribution in-frame.
- **Projection manifest** ([`lib/mapmeta.json`](../../../lib/mapmeta.json))
  stores each map's center, zoom, and pixel size, so the SVG overlay projects
  the same lat/lon the raster was baked at — the line lands exactly on the map.
- The animated line, moving head, and stop pulses are driven by the scroll
  position (Framer Motion `useScroll`), and collapse to a fully-drawn static
  state under `prefers-reduced-motion`.

To regenerate (e.g., after changing a day's coordinates), re-run the map baker
that reads the itinerary/route files, stitches tiles, and rewrites
`lib/mapmeta.json`. Tile usage is light and one-time; please respect the
[CARTO](https://carto.com/attribution/) and
[OpenStreetMap](https://www.openstreetmap.org/copyright) attribution terms.

The original bespoke abstract SVG maps (`components/RouteMap.tsx`,
`components/DayMap.tsx`, `components/trip/TripRouteMap.tsx`) are retained,
unused, for reference.
