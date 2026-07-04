import type { Photo } from "@/content/photos";

/**
 * SHARED TRIP TYPES
 * -----------------
 * The vocabulary every trip in the portal speaks. The original Newfoundland
 * experience predates this file and keeps its own local types; these are the
 * decoupled, registry-agnostic shapes that new trips (Nova Scotia and beyond)
 * build against, so the reusable `components/trip/*` layout works for all of
 * them without knowing which photo registry a trip draws from.
 */

/** A scenic stop within a day, in the order you'd drive it. */
export interface TripStop {
  name: string;
  /** Estimated time at the stop, e.g. "45 min", "1–2 hr". */
  time?: string;
  note: string;
  /** Ferry legs render as a dashed crossing, not a stop. */
  ferry?: boolean;
}

/** A projected point on a day's small route map. */
export interface TripMapPoint {
  label: string;
  lat: number;
  lon: number;
  /** Draw the leg reaching this point as a dashed ferry crossing. */
  ferry?: boolean;
}

/**
 * One day of a trip, rendered by <TripDayChapter/> as a luxury expedition
 * spread. Photography is passed as a resolved `Photo` object (not a registry
 * key) so any trip can supply its own imagery.
 */
export interface TripDay {
  n: string;
  region: string;
  leg: string;
  title: string;
  subtitle: string;
  /** Resolved photo object for the day's cinematic band. */
  photo?: Photo;
  /** Where the morning begins — a gentle sense of place. */
  morningLocation: string;
  breakfast: string;
  drive: string;
  stops: TripStop[];
  lunch: string;
  afternoon: string;
  hotel: string;
  dinner: string;
  evening: string;
  charging: string;
  walking: string;
  rainy: string;
  /**
   * "Tonight's Sky" — the recurring dark-sky / stargazing note. Present only
   * on days where it makes sense; always phrased as weather-dependent.
   */
  sky?: string;
  memory: string;
  map: TripMapPoint[];
}

/** A projected waypoint on a trip's full route map. */
export interface TripWaypoint {
  id: string;
  label: string;
  lat: number;
  lon: number;
  major?: boolean;
  ferry?: boolean;
}

/** Registry entry describing a trip on the landing page. */
export interface TripSummary {
  slug: string;
  /** Short name for the card title, e.g. "Nova Scotia". */
  name: string;
  /** The subtitle / route name, e.g. "The Ocean Road". */
  subtitle: string;
  /** One-line emotional description for the card. */
  description: string;
  /** Trip length, e.g. "14 days". */
  length: string;
  /** Emotional tone, e.g. "Warm · easy · coastal". */
  tone: string;
  /** Route summary, e.g. "Salt Point → Nova Scotia → home by sea". */
  route: string;
  /** Resolved hero photo for the card. */
  hero: Photo;
  /** Route to the trip experience. */
  href: string;
  /** Sort/booking order. */
  order: number;
}
