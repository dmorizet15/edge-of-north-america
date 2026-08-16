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

/** One line in a day's expandable, at-a-glance Detailed Daily Plan. */
export interface TripPlanRow {
  /** Clock time or window, e.g. "9:30 AM", "1:45–3:00". */
  time: string;
  /** What happens, e.g. "Depart Bangor", "Jordan Pond popovers". */
  label: string;
  /** Optional extra detail. */
  detail?: string;
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
  /** Human date for this day, e.g. "Friday · August 7, 2026". */
  date?: string;
  region: string;
  leg: string;
  title: string;
  subtitle: string;
  /** Resolved photo object for the day's cinematic band. */
  photo?: Photo;
  /**
   * The narrative "The day" fields. Optional because the Aug 16 reroute days
   * (10–12) are rendered by <RerouteDayCard/> from verified, timed source data
   * rather than the prose template — inventing a "breakfast" or "memory" line
   * for them would mean making facts up. Days 1–9 still supply all of them.
   */
  morningLocation?: string;
  breakfast?: string;
  drive: string;
  stops: TripStop[];
  lunch?: string;
  afternoon?: string;
  hotel?: string;
  dinner?: string;
  evening?: string;
  charging?: string;
  walking?: string;
  rainy?: string;
  /**
   * "Tonight's Sky" — the recurring dark-sky / stargazing note. Present only
   * on days where it makes sense; always phrased as weather-dependent.
   */
  sky?: string;
  /** Optional expandable hour-by-hour plan for use on the road. */
  detailedPlan?: TripPlanRow[];
  memory?: string;
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
  /** Trip length, e.g. "12 days". */
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
