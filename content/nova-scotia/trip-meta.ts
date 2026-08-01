/**
 * NOVA SCOTIA — machine-readable trip metadata.
 *
 * The day-by-day data (`NS_DAYS`) carries only human date strings
 * ("Friday · August 7, 2026"). This file adds the machine-readable anchors the
 * family view needs to compute "you are here" and to group photos by day.
 *
 * The trip runs Aug 7–18, 2026; day "01" is Aug 7, day "12" is Aug 18.
 */

export const NS_TRIP = {
  slug: "nova-scotia",
  title: "Nova Scotia — The Ocean Road",
  /** ISO dates, America/Halifax is the trip's home zone but date-only is fine. */
  start: "2026-08-07",
  end: "2026-08-18",
  days: 12,
} as const;

/** The ISO date for a given day number ("01".."12"). */
export function dateForDay(n: string): string {
  const idx = Number(n) - 1;
  const d = new Date(NS_TRIP.start + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + idx);
  return d.toISOString().slice(0, 10);
}

/** Whole days between two ISO date-only strings (b - a). */
function dayDiff(aISO: string, bISO: string): number {
  const a = Date.parse(aISO + "T00:00:00Z");
  const b = Date.parse(bISO + "T00:00:00Z");
  return Math.round((b - a) / 86_400_000);
}

export type TripPhase = "before" | "during" | "after";

export interface TripStatus {
  phase: TripPhase;
  /** 1-based current day index while during; 0 before; days+1 after. */
  currentDay: number;
  /** Days until the trip starts (>=0), or 0 once it has begun. */
  daysUntilStart: number;
  todayISO: string;
}

/**
 * Where the trip is relative to `todayISO` (pass an ISO date; the caller owns
 * "now" so this stays pure and testable). Clamps sensibly at both ends.
 */
export function tripStatus(todayISO: string): TripStatus {
  const fromStart = dayDiff(NS_TRIP.start, todayISO); // <0 before, 0 on day 1
  const fromEnd = dayDiff(NS_TRIP.end, todayISO); // >0 after
  if (fromStart < 0) {
    return { phase: "before", currentDay: 0, daysUntilStart: -fromStart, todayISO };
  }
  if (fromEnd > 0) {
    return { phase: "after", currentDay: NS_TRIP.days + 1, daysUntilStart: 0, todayISO };
  }
  return { phase: "during", currentDay: fromStart + 1, daysUntilStart: 0, todayISO };
}

/** A short, human "you are here" line. */
export function statusLine(s: TripStatus): string {
  if (s.phase === "before") {
    return s.daysUntilStart === 1
      ? "The trip begins tomorrow."
      : `The trip begins in ${s.daysUntilStart} days.`;
  }
  if (s.phase === "after") return "The trip is complete — the whole road, start to finish.";
  return `Day ${s.currentDay} of ${NS_TRIP.days} — on the road now.`;
}
