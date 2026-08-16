import Reveal from "@/components/ui/Reveal";
import { renderText } from "@/lib/richtext";
import CopyPhrase from "@/components/trip/CopyPhrase";
import { APPLE } from "@/content/nova-scotia/reroute";

/**
 * APPLES — THE QUÉBEC FIELD GUIDE.
 *
 * A medical constraint, not a fun fact, so it gets its own band with its own
 * visual register: a warm amber-ringed panel that reads as a warning rather
 * than as itinerary copy, set apart from the day cards around it.
 *
 * The screened lists are rendered exactly as the source data has them. Where
 * the source contradicts itself — Monday's lunch stop calls Portofino screened
 * clean while Portofino appears in neither list — the gap is shown on the page
 * (APPLE.screeningGap) instead of being silently reconciled here. Moving a
 * restaurant between "screened" and "not screened" is not a formatting call.
 */
export default function AppleAllergy() {
  return (
    <section
      id="apple-allergy"
      className="w-full border-y border-amber/25 bg-amber/[0.04] px-[clamp(1.4rem,5vw,4.5rem)] py-[11vh]"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow text-amber">Allergy</span>
            <span className="rounded-full bg-amber/20 px-3 py-1 font-sans text-[0.63rem] font-semibold uppercase tracking-[0.16em] text-amber ring-1 ring-amber/40">
              Critical · {APPLE.who}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-4 font-serif text-[clamp(1.9rem,4.6vw,3rem)] font-normal leading-[1.05] tracking-title text-paper">
            Apples — the Québec field guide
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-4 max-w-2xl font-sans text-[clamp(1.02rem,1.7vw,1.2rem)] font-light leading-relaxed text-paper/85">
            {APPLE.note}
          </p>
        </Reveal>

        {/* The phrase — first, because it's the thing you need mid-meal. */}
        <Reveal delay={0.18}>
          <div className="mt-8 max-w-3xl">
            <CopyPhrase phrase={APPLE.phraseFr} />
            <p className="mt-2.5 font-sans text-[0.88rem] font-light italic leading-relaxed text-paper/55">
              {APPLE.phraseEn}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
          {/* Hidden sources */}
          <Reveal>
            <div>
              <span className="eyebrow text-amber" style={{ fontSize: "0.62rem" }}>
                Hidden sources — none of these announce themselves
              </span>
              <ul className="mt-5 space-y-3">
                {APPLE.hiddenSources.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber/80"
                      aria-hidden
                    />
                    <span className="font-sans text-[0.96rem] font-light leading-relaxed text-paper/80">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            {/* Safe desserts */}
            <Reveal>
              <div>
                <span className="eyebrow text-ice" style={{ fontSize: "0.62rem" }}>
                  Safe desserts
                </span>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {APPLE.safeDesserts.map((d) => (
                    <li
                      key={d}
                      lang="fr"
                      className="rounded-full border border-ice/35 bg-navy/25 px-3.5 py-1.5 font-sans text-[0.92rem] font-light text-paper/85"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* The screening ledger */}
            <Reveal delay={0.06}>
              <div className="rounded-sm border border-paper/12 bg-black/25 p-5 sm:p-6">
                <span className="eyebrow text-paper/60" style={{ fontSize: "0.62rem" }}>
                  Where it stands, restaurant by restaurant
                </span>

                <Ledger
                  tone="clean"
                  title="Screened clean"
                  items={[...APPLE.screenedClean]}
                />
                <Ledger
                  tone="warn"
                  title="Live warnings"
                  items={[...APPLE.screenedWarnings]}
                />
                <Ledger
                  tone="unknown"
                  title="Not screened"
                  items={[...APPLE.notScreened]}
                />

                {/* The source's own inconsistency, surfaced rather than fixed. */}
                <div className="mt-5 flex gap-2.5 rounded-sm border border-amber/30 bg-amber/[0.07] px-3.5 py-3">
                  <span className="mt-0.5 shrink-0 text-amber" aria-hidden>
                    &#9888;
                  </span>
                  <div>
                    <span
                      className="eyebrow block text-amber"
                      style={{ fontSize: "0.55rem" }}
                    >
                      Gap in the record
                    </span>
                    <p className="mt-1.5 font-sans text-[0.9rem] font-light leading-relaxed text-paper/85">
                      {renderText(APPLE.screeningGap)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ledger({
  tone,
  title,
  items,
}: {
  tone: "clean" | "warn" | "unknown";
  title: string;
  items: string[];
}) {
  const dot =
    tone === "clean" ? "bg-ice" : tone === "warn" ? "bg-amber" : "bg-paper/40";
  const label =
    tone === "clean" ? "text-ice" : tone === "warn" ? "text-amber" : "text-paper/55";

  return (
    <div className="mt-5 first:mt-4">
      <span className={`eyebrow ${label}`} style={{ fontSize: "0.55rem" }}>
        {title}
      </span>
      <ul className="mt-2.5 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5">
            <span
              className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${dot}`}
              aria-hidden
            />
            <span className="font-sans text-[0.92rem] font-light leading-snug text-paper/80">
              {it}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
