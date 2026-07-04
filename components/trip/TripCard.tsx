import Link from "next/link";
import type { TripSummary } from "@/lib/trip-types";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";

/**
 * A single trip on the landing page — a tall editorial card: full-bleed hero,
 * a cinematic gradient, the trip's name and route, its length and emotional
 * tone, and a quiet "Open trip" affordance. The whole card is the link.
 */
export default function TripCard({
  trip,
  index,
  delay = 0,
}: {
  trip: TripSummary;
  index: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={trip.href}
        aria-label={`Open ${trip.name}: ${trip.subtitle}`}
        className="group relative block h-full overflow-hidden rounded-sm border border-paper/10 bg-nearblack outline-none transition-colors duration-500 hover:border-paper/25 focus-visible:border-ice/60"
      >
        {/* Hero */}
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]">
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-cinematic group-hover:scale-[1.06]">
            <EditorialImage photo={trip.hero} fill showBrief={false} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nearblack via-nearblack/40 to-black/20" />

          {/* Top meta — index + length */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-[clamp(1.2rem,3vw,2rem)]">
            <span className="eyebrow tabular-nums text-paper/70">{index}</span>
            <span className="eyebrow text-paper/70">{trip.length}</span>
          </div>

          {/* Bottom — the trip itself */}
          <div className="absolute inset-x-0 bottom-0 p-[clamp(1.4rem,3.4vw,2.6rem)]">
            <span className="eyebrow text-amber">{trip.subtitle}</span>
            <h3 className="mt-3 font-serif text-[clamp(2rem,4.6vw,3.4rem)] font-normal leading-[0.98] tracking-title text-paper">
              {trip.name}
            </h3>
            <p className="mt-4 max-w-md font-sans text-[clamp(0.92rem,1.4vw,1.02rem)] font-light leading-relaxed text-paper/75">
              {trip.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="eyebrow text-paper/55" style={{ fontSize: "0.6rem" }}>
                {trip.tone}
              </span>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <span className="eyebrow text-paper transition-colors duration-300 group-hover:text-amber">
                Open trip
              </span>
              <span
                className="h-px w-8 bg-paper/40 transition-all duration-500 ease-cinematic group-hover:w-14 group-hover:bg-amber"
                aria-hidden
              />
              <span
                className="font-serif text-lg text-paper/70 transition-transform duration-500 ease-cinematic group-hover:translate-x-1 group-hover:text-amber"
                aria-hidden
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
