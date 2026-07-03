import RouteMap from "@/components/RouteMap";
import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";

/**
 * Route Overview. The whole shape at a glance — drawn, not screenshotted.
 * West-to-east across the island, home by a different sea. The line does the
 * reassuring: one direction, no doubling back.
 */
export default function RouteSection() {
  return (
    <section className="w-full bg-nearblack px-[clamp(1.2rem,5vw,5rem)] py-[16vh]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ChapterLabel index="04" label="The Route" align="center" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-8 max-w-3xl text-center font-serif text-[clamp(1.8rem,4vw,3rem)] font-normal leading-[1.1] tracking-title text-paper">
            One line, drawn once — west to east across the island, home by a
            different sea.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-16">
            <RouteMap />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
            <RouteNote k="Out" v="Ferry to Port aux Basques. The crossing you sleep through." />
            <RouteNote k="Across" v="Gros Morne to Cape Spear — the island, in a single unbroken direction." />
            <RouteNote k="Home" v="Argentia ferry east of St. John's. No long drive back west." />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RouteNote({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="eyebrow text-amber" style={{ fontSize: "0.6rem" }}>
        {k}
      </span>
      <span className="h-px w-6 bg-paper/20" />
      <p className="max-w-[15rem] font-sans text-sm font-light leading-relaxed text-paper/65">
        {v}
      </p>
    </div>
  );
}
