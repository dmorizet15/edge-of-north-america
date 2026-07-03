/**
 * ROUTE + COORDINATES
 * -------------------
 * Waypoints for the bespoke SVG route map and the reusable coordinate badges.
 * Coordinates are approximate, chosen for the map's geography — verify exact
 * figures in Phase Two before any booking use.
 */

export interface Waypoint {
  id: string;
  label: string;
  /** Decimal degrees. */
  lat: number;
  lon: number;
  /** Formatted for the coordinate badge. */
  coord: string;
  /** Rendered as a labelled stop on the map. */
  major?: boolean;
  /** Ferry legs are drawn as dashed, not solid. */
  ferry?: boolean;
}

export const WAYPOINTS: Waypoint[] = [
  {
    id: "hudson",
    label: "Hudson Valley",
    lat: 41.7,
    lon: -73.92,
    coord: "41.70° N · 73.92° W",
    major: true,
  },
  {
    id: "newengland",
    label: "New England",
    lat: 44.0,
    lon: -70.5,
    coord: "44.00° N · 70.50° W",
  },
  {
    id: "northsydney",
    label: "North Sydney, NS",
    lat: 46.21,
    lon: -60.25,
    coord: "46.21° N · 60.25° W",
    major: true,
  },
  {
    id: "portauxbasques",
    label: "Port aux Basques",
    lat: 47.57,
    lon: -59.14,
    coord: "47.57° N · 59.14° W",
    major: true,
    ferry: true,
  },
  {
    id: "grosmorne",
    label: "Gros Morne",
    lat: 49.69,
    lon: -57.75,
    coord: "49.69° N · 57.75° W",
    major: true,
  },
  {
    id: "lanseauxmeadows",
    label: "L'Anse aux Meadows",
    lat: 51.6,
    lon: -55.53,
    coord: "51.60° N · 55.53° W",
    major: true,
  },
  {
    id: "twillingate",
    label: "Twillingate",
    lat: 49.67,
    lon: -54.77,
    coord: "49.67° N · 54.77° W",
    major: true,
  },
  {
    id: "fogo",
    label: "Fogo Island",
    lat: 49.67,
    lon: -54.18,
    coord: "49.67° N · 54.18° W",
    major: true,
    ferry: true,
  },
  {
    id: "bonavista",
    label: "Bonavista · Trinity",
    lat: 48.65,
    lon: -53.11,
    coord: "48.65° N · 53.11° W",
    major: true,
  },
  {
    id: "capestmarys",
    label: "Cape St. Mary's",
    lat: 46.82,
    lon: -54.18,
    coord: "46.82° N · 54.18° W",
    major: true,
  },
  {
    id: "ferryland",
    label: "Ferryland",
    lat: 47.03,
    lon: -52.87,
    coord: "47.03° N · 52.87° W",
  },
  {
    id: "stjohns",
    label: "St. John's",
    lat: 47.56,
    lon: -52.71,
    coord: "47.56° N · 52.71° W",
    major: true,
  },
  {
    id: "capespear",
    label: "Cape Spear",
    lat: 47.52,
    lon: -52.62,
    coord: "47.52° N · 52.62° W",
    major: true,
  },
  {
    id: "argentia",
    label: "Argentia",
    lat: 47.3,
    lon: -53.99,
    coord: "47.30° N · 53.99° W",
    major: true,
    ferry: true,
  },
];

/** The single easternmost fact the whole piece points toward. */
export const CAPE_SPEAR = {
  coord: "47.5236° N · 52.6194° W",
  label: "Cape Spear, Newfoundland",
  fact: "The easternmost point of North America",
};
