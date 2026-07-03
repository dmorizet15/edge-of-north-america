import Reveal from "@/components/ui/Reveal";

/**
 * The act break between the cinematic first act and the practical guide.
 * The film has just asked "So… when do we go?" — this answers, quietly:
 * here is exactly how.
 */
export default function ActTwoIntro() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-nearblack px-6 py-[18vh] text-center">
      <Reveal>
        <span className="eyebrow text-amber">Act Two</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-8 font-serif text-[clamp(2.4rem,7vw,5.5rem)] font-normal leading-[1.0] tracking-title text-paper">
          The Journey,
          <br />
          Day by Day
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mx-auto mt-10 h-px w-16 bg-paper/25" />
      </Reveal>
      <Reveal delay={0.28}>
        <p className="mt-10 max-w-reading font-serif text-[clamp(1.05rem,2.1vw,1.45rem)] font-light italic leading-relaxed text-paper/75">
          Fifteen days from the Hudson Valley to the easternmost light — the
          crossing you sleep through, the island crossed once, and home by a
          different sea. Everything planned around the meals, the views, and the
          rest.
        </p>
      </Reveal>
      <Reveal delay={0.36}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <Stat k="15" v="days" />
          <Stat k="2" v="ocean ferries" />
          <Stat k="1" v="direction — west to east" />
        </div>
      </Reveal>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] tabular-nums text-paper">
        {k}
      </span>
      <span className="eyebrow text-paper/50" style={{ fontSize: "0.6rem" }}>
        {v}
      </span>
    </div>
  );
}
