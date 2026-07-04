import { PHOTOS } from "@/content/photos";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";

/**
 * Whales. A spout, then nothing. Kept deliberately minimal and honest —
 * the realistic gift of the northeast coast is a back, a fluke, and silence.
 */
export default function Whales() {
  return (
    <section className="relative w-full overflow-hidden bg-nearblack">
      <div className="relative h-[78vh] min-h-[520px] w-full">
        <EditorialImage photo={PHOTOS.whales} fill drift />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-nearblack/70 via-transparent to-nearblack" />
      </div>

      <div className="relative -mt-[22vh] flex flex-col items-center gap-8 px-6 pb-[16vh] text-center">
        <Reveal>
          <ChapterLabel index="13" label="Whales" variant="light" align="center" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-normal leading-[1.02] tracking-title text-paper">
            Breath, then silence.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-prose font-sans text-[clamp(1.05rem,1.7vw,1.25rem)] font-light leading-relaxed text-paper/70">
            You hear it before you see it — a slow exhale across the water. A
            back, a fluke, and the sea closing over the space where it was.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
