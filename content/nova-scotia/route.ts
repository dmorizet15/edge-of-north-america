import type { TripWaypoint } from "@/lib/trip-types";

/**
 * NOVA SCOTIA — ROUTE + COORDINATES
 * ---------------------------------
 * Waypoints for the bespoke route map, projected from real lat/lon. The shape
 * is the whole shape: north up the Maine coast, a soft road crossing into
 * Canada, a relaxed loop around Nova Scotia to Cape Breton — and then, after
 * the Aug 16 CAT cancellation, west through New Brunswick to Québec and south
 * down the I-87 instead of home across the Gulf of Maine.
 *
 * Coordinates are approximate, chosen for the map's geography. Verify exact
 * figures before any booking use.
 */

export const NS_WAYPOINTS: TripWaypoint[] = [
  { id: "saltpoint", label: "Salt Point, NY", lat: 41.87, lon: -73.8, major: true },
  { id: "bangor", label: "Bangor, ME", lat: 44.8, lon: -68.77, major: true },
  { id: "standrews", label: "St. Andrews", lat: 45.07, lon: -67.05, major: true },
  { id: "hopewell", label: "Hopewell Rocks", lat: 45.82, lon: -64.58, major: true },
  { id: "wolfville", label: "Wolfville", lat: 45.09, lon: -64.36, major: true },
  { id: "halifax", label: "Halifax", lat: 44.65, lon: -63.57, major: true },
  { id: "lunenburg", label: "Lunenburg", lat: 44.38, lon: -64.31, major: true },
  { id: "baddeck", label: "Baddeck", lat: 46.1, lon: -60.75, major: true },
  { id: "cheticamp", label: "Chéticamp", lat: 46.63, lon: -61.01, major: true },
  { id: "ingonish", label: "Ingonish", lat: 46.68, lon: -60.39, major: true },
  { id: "whycocomagh", label: "Whycocomagh", lat: 45.98, lon: -61.13 },
  { id: "aulac", label: "Aulac, NB", lat: 45.86, lon: -64.29 },
  { id: "temiscouata", label: "Témiscouata", lat: 47.68, lon: -68.88, major: true },
  { id: "quebec", label: "Québec City", lat: 46.81, lon: -71.21, major: true },
  { id: "plattsburgh", label: "Plattsburgh, NY", lat: 44.7, lon: -73.45 },
  { id: "home", label: "Salt Point, NY", lat: 41.87, lon: -73.8, major: true },
];

/**
 * Per-label placement tweaks so nothing collides. dx/dy in viewBox units,
 * anchor controls text alignment relative to the dot.
 */
export const NS_LABELS: Record<
  string,
  { dx: number; dy: number; anchor: "start" | "end" | "middle" }
> = {
  saltpoint: { dx: 0, dy: 26, anchor: "middle" },
  bangor: { dx: -12, dy: -6, anchor: "end" },
  standrews: { dx: -12, dy: 4, anchor: "end" },
  hopewell: { dx: 0, dy: -14, anchor: "middle" },
  wolfville: { dx: -14, dy: 2, anchor: "end" },
  halifax: { dx: 4, dy: 26, anchor: "middle" },
  lunenburg: { dx: -6, dy: 26, anchor: "middle" },
  baddeck: { dx: 14, dy: 16, anchor: "start" },
  cheticamp: { dx: -14, dy: -2, anchor: "end" },
  ingonish: { dx: 14, dy: -4, anchor: "start" },
  whycocomagh: { dx: 14, dy: -4, anchor: "start" },
  aulac: { dx: 0, dy: -14, anchor: "middle" },
  temiscouata: { dx: 14, dy: -6, anchor: "start" },
  quebec: { dx: -14, dy: -4, anchor: "end" },
  plattsburgh: { dx: -14, dy: 6, anchor: "end" },
  home: { dx: 0, dy: 26, anchor: "middle" },
};

/** The single fact the whole return points toward — after the Aug 16 reroute. */
export const RETURN_LEG = {
  coord: "45.98° N · 61.13° W → 41.87° N · 73.80° W",
  label: "Whycocomagh → Québec City → Salt Point",
  fact: "The ferry was cancelled, so the way home turned west by road",
};
