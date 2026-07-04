import { PHOTOS } from "@/content/photos";
import { NS_PHOTOS } from "@/content/nova-scotia/photos";
import type { TripSummary } from "@/lib/trip-types";

/**
 * TRIP REGISTRY
 * -------------
 * The single source of truth for the landing page. Every trip in the portal is
 * one entry here — add a new object (and its `content/<trip>/` folder + page)
 * and it appears on the menu automatically. See README for the full recipe.
 */
export const TRIPS: TripSummary[] = [
  {
    slug: "newfoundland",
    name: "Newfoundland",
    subtitle: "The Edge of North America",
    description:
      "The dramatic one. Darkness, an ocean crossed at night, an island that still feels unfound — and the morning the sun reaches the continent first, at Cape Spear.",
    length: "15 days",
    tone: "Dramatic · wild · expedition",
    route: "Hudson Valley → ferry → across the island → Cape Spear",
    hero: PHOTOS.capeSpear,
    href: "/trips/newfoundland",
    order: 1,
  },
  {
    slug: "nova-scotia",
    name: "Nova Scotia",
    subtitle: "The Ocean Road",
    description:
      "The warmer, easier one. Ocean roads and historic inns, seafood and the Cabot Trail, dark skies over Cape Breton — and a ferry home across the Gulf of Maine.",
    length: "12 days · Aug 2026",
    tone: "Warm · easy · coastal",
    route: "Salt Point → Maine → Nova Scotia → home by ferry",
    hero: NS_PHOTOS.cover,
    href: "/trips/nova-scotia",
    order: 2,
  },
];

export function getTrip(slug: string): TripSummary | undefined {
  return TRIPS.find((t) => t.slug === slug);
}
