import { PHOTOS } from "@/content/photos";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";
import CoordinateBadge from "@/components/ui/CoordinateBadge";

/**
 * Fogo Island Inn — restorative luxury. Interior calm: a full frame, barely
 * captioned. The rest chapter of the whole trip. A day with nothing in it,
 * on purpose. (Imagery here is licensing-flagged; placeholder holds until cleared.)
 */
export default function FogoInn() {
  return (
    <section className="w-full bg-nearblack">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* The frame */}
        <div className="relative lg:col-span-7">
          <EditorialImage photo={PHOTOS.fogoInn} drift />
        </div>

        {/* The quiet */}
        <div className="flex flex-col justify-center gap-8 px-[clamp(1.6rem,5vw,4.5rem)] py-[12vh] lg:col-span-5">
          <Reveal>
            <ChapterLabel index="15" label="Fogo Island Inn" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2rem,3.8vw,3.2rem)] font-normal leading-[1.05] tracking-title text-paper">
              Nothing between you and the ocean.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="max-w-prose font-sans text-[clamp(1.05rem,1.6vw,1.25rem)] font-light leading-relaxed text-paper/75">
              A room the size of the weather. Wood, wool, and a window that
              holds the whole North Atlantic. Two nights here is not a stop on
              the way — it is the reason the rest of the drive feels easy.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="pt-2">
              <CoordinateBadge
                coord="49.73° N · 54.17° W"
                place="Joe Batt's Arm, Fogo Island"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
