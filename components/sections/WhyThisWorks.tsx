import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";

/**
 * Why This Works. The one moment the piece speaks plainly — but still quietly.
 * The shape of the trip is what removes the hard parts. No arguing, no
 * defending: just the logic, laid out with air around it, on paper.
 */
const POINTS = [
  {
    n: "01",
    t: "The distance becomes sleep",
    b: "The longest leg is the overnight ferry. You board at dusk, have dinner, wake up on the island. The crossing does the driving for you.",
  },
  {
    n: "02",
    t: "The island is crossed once",
    b: "West to east, in a single direction — Gros Morne to Cape Spear. No backtracking, no re-driving a road you've already seen.",
  },
  {
    n: "03",
    t: "The mainland is unhurried",
    b: "The approach through New England is split over two or three easy days. Nothing about the drive down is a marathon.",
  },
  {
    n: "04",
    t: "Fogo is a chapter with nothing in it",
    b: "Two nights built in purely to stop. Not a detour to squeeze in — the rest that makes the rest of the trip feel effortless.",
  },
  {
    n: "05",
    t: "Home by a different sea",
    b: "The Argentia ferry leaves from the east, near St. John's. You end at the edge and sail home — you never turn around and drive back west.",
  },
  {
    n: "06",
    t: "Charging is where you'd stop anyway",
    b: "The car charges over meals, viewpoints, and lodgings — planned around the places you already want to linger, never around anxiety.",
  },
];

export default function WhyThisWorks() {
  return (
    <section className="w-full bg-paper px-[clamp(1.4rem,5vw,5rem)] py-[16vh] text-ink">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ChapterLabel index="22" label="Why This Works" variant="dark" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-3xl font-serif text-[clamp(2rem,4.5vw,3.4rem)] font-normal leading-[1.08] tracking-title text-ink">
            The far part is only the map. The trip itself is built to be gentle.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.n} delay={0.06 * i}>
              <div className="flex flex-col gap-4 border-t border-ink/15 pt-6">
                <span className="eyebrow tabular-nums text-amber">{p.n}</span>
                <h3 className="font-serif text-[1.35rem] font-normal leading-snug tracking-title text-ink">
                  {p.t}
                </h3>
                <p className="font-sans text-[0.98rem] font-light leading-relaxed text-ink/65">
                  {p.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
