import { PHOTOS } from "@/content/photos";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";
import CoordinateBadge from "@/components/ui/CoordinateBadge";
import SectionDivider from "@/components/ui/SectionDivider";

/**
 * The Crossing. The ferry converts distance into sleep. Told as a slow
 * sequence of night beats — cast off, cabin, deck, stars, sleep — so the
 * longest leg of the journey feels like rest, not effort.
 */
export default function Ferry() {
  return (
    <>
      {/* The ship as threshold */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <EditorialImage photo={PHOTOS.ferry} fill drift />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/55" />

        <div className="absolute inset-0 flex flex-col items-start justify-end p-[clamp(1.6rem,5vw,5rem)]">
          <div className="max-w-2xl">
            <Reveal>
              <ChapterLabel index="05" label="The Crossing" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-serif text-[clamp(2.2rem,5.5vw,4.2rem)] font-normal leading-[1.02] tracking-title text-paper">
                There is a ship, and beyond
                <br className="hidden sm:block" /> it, an island.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8">
                <CoordinateBadge
                  coord="46.21° N · 60.25° W"
                  place="North Sydney, Nova Scotia — departure"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The night beats — deep navy, the sway of the sea */}
      <div className="relative w-full overflow-hidden bg-nearblack">
        {/* subtle moving field to suggest water at night */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(120% 60% at 50% 120%, rgba(22,41,61,0.85) 0%, rgba(16,19,23,0) 65%)",
          }}
        />
        <div className="relative">
          <SectionDivider line="The mainland lets go." size="lg" />
          <SectionDivider line="A small room, a large ocean." />
          <SectionDivider line="The last of the land, going." />

          {/* Night sky beat */}
          <div className="flex flex-col items-center justify-center gap-6 px-6 py-[20vh] text-center">
            <Reveal>
              <span className="eyebrow text-paper/40" style={{ fontSize: "0.6rem" }}>
                On deck · after midnight
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-reading font-serif text-[clamp(1.4rem,3.4vw,2.4rem)] font-light italic leading-relaxed text-paper/80">
                Then the stars, more than the city ever allowed.
              </p>
            </Reveal>
          </div>

          <SectionDivider line="Sleep comes with the sway." size="lg" />
        </div>
      </div>
    </>
  );
}
