import type { Metadata } from "next";
import { TRIPS } from "@/lib/trips";
import TripCard from "@/components/trip/TripCard";
import Reveal from "@/components/ui/Reveal";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: "Trips — Two Roads North",
  description:
    "A private travel portal: choose a journey. Newfoundland, the dramatic expedition to the easternmost light; or Nova Scotia, the warmer ocean road home by ferry.",
};

/**
 * THE MENU
 * --------
 * The trip-selection landing page. Every journey is a card; the cards are
 * driven entirely by the trip registry (lib/trips.ts), so adding a trip adds a
 * card. Quiet, editorial, and unhurried — Apple product page meets a good atlas.
 */
export default function Home() {
  const trips = [...TRIPS].sort((a, b) => a.order - b.order);

  return (
    <main className="relative min-h-screen bg-nearblack">
      <ScrollProgress />

      {/* Masthead */}
      <header className="mx-auto max-w-6xl px-[clamp(1.4rem,5vw,4.5rem)] pt-[16vh] pb-[8vh] text-center">
        <Reveal>
          <span className="eyebrow text-amber">For Darren &amp; Melissa</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mx-auto mt-8 max-w-4xl font-serif text-[clamp(2.4rem,6.5vw,5.2rem)] font-normal leading-[1.02] tracking-title text-paper">
            Two roads north.
            <br />
            Both worth it.
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mx-auto mt-10 h-px w-16 bg-paper/25" />
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mx-auto mt-10 max-w-reading font-serif text-[clamp(1.05rem,2.1vw,1.45rem)] font-light italic leading-relaxed text-paper/75">
            One is a dramatic expedition to the edge of the continent. One is a
            warmer, easier ocean road that ends with a ferry home. Choose a
            journey — the whole thing unfolds from there.
          </p>
        </Reveal>
      </header>

      {/* The trips */}
      <section className="mx-auto max-w-6xl px-[clamp(1.4rem,5vw,4.5rem)] pb-[14vh]">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {trips.map((trip, i) => (
            <TripCard
              key={trip.slug}
              trip={trip}
              index={String(i + 1).padStart(2, "0")}
              delay={i * 0.1}
            />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-16 max-w-reading text-center font-sans text-sm font-light leading-relaxed text-paper/45">
            Two trips today, more to come. Each is a full cinematic overview and
            a day-by-day guide — planned around the meals, the views, and the
            rest. Timings and distances are honest working estimates; verify
            before booking.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
