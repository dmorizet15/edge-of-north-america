"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import ScrollRouteMap from "@/components/trip/ScrollRouteMap";
import { renderText } from "@/lib/richtext";
import {
  SHARED_MORNING,
  DECISION_GATE,
  COMPARE,
  PATHS,
  type FinalPath,
  type PathStep,
  type PathDayPlan,
  type PathStay,
} from "@/content/nova-scotia/two-paths";

/**
 * TWO PATHS — the final-night branch (Days 11–12).
 *
 * The last night is an open decision (Aug 15) between Path A · The Coast
 * (Acadia + Rockland) and Path B · The Summit (Mount Washington + the
 * Kancamagus). Three states, held in `path` and persisted to localStorage
 * (`ns-final-path`) with a `?path=` override. Built to be used on a phone, on
 * the road: every phone number is tap-to-call, every place is one tap to GPS.
 */

type PathState = "undecided" | "coast" | "summit";
const STORAGE_KEY = "ns-final-path";

function isChosen(v: string | null): v is "coast" | "summit" {
  return v === "coast" || v === "summit";
}

export default function TwoPaths() {
  const [path, setPath] = useState<PathState>("undecided");
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const chosenRef = useRef<HTMLDivElement>(null);

  // Resolve the persisted / URL choice on the client only, so SSR + first
  // client render both show 'undecided' and hydration stays consistent.
  useEffect(() => {
    let initial: PathState = "undecided";
    try {
      const q = new URL(window.location.href).searchParams.get("path");
      if (isChosen(q)) {
        initial = q;
        localStorage.setItem(STORAGE_KEY, q);
      } else {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (isChosen(stored)) initial = stored;
      }
    } catch {
      /* localStorage / URL unavailable — stay undecided */
    }
    setPath(initial);
    setMounted(true);
  }, []);

  function choose(next: PathState) {
    setPath(next);
    try {
      const url = new URL(window.location.href);
      if (next === "undecided") {
        localStorage.removeItem(STORAGE_KEY);
        url.searchParams.delete("path");
      } else {
        localStorage.setItem(STORAGE_KEY, next);
        url.searchParams.set("path", next);
      }
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* ignore */
    }
    if (next !== "undecided") {
      requestAnimationFrame(() =>
        chosenRef.current?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        })
      );
    }
  }

  const chosen: FinalPath | null =
    path === "coast" ? PATHS[0] : path === "summit" ? PATHS[1] : null;
  const other: FinalPath | null =
    path === "coast" ? PATHS[1] : path === "summit" ? PATHS[0] : null;

  const showUndecided = !mounted || path === "undecided" || !chosen || !other;

  return (
    <section
      id="two-paths"
      className="relative w-full border-t border-paper/10 bg-nearblack"
    >
      <SharedMorning />

      <div className="mx-auto max-w-5xl px-[clamp(1.4rem,5vw,4.5rem)] pb-[12vh]">
        {showUndecided ? (
          <>
            <DecisionGate />
            <PathCards onChoose={choose} />
            <CompareBlock />
          </>
        ) : (
          <div ref={chosenRef} className="scroll-mt-6">
            <ChosenChip chosen={chosen} onReset={() => choose("undecided")} />
            <DecisionGate collapsed />
            <PathItinerary path={chosen} />
            <SwitchBar
              to={other}
              onSwitch={() => choose(other.key)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────── Shared morning ─────────────────────────── */

function SharedMorning() {
  return (
    <div className="px-[clamp(1.6rem,5vw,4.5rem)] pt-[14vh]">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow tabular-nums text-amber">Day 11</span>
            <span className="h-px w-8 bg-paper/30" aria-hidden />
            <span className="eyebrow tabular-nums text-paper/80">
              Monday · August 17, 2026
            </span>
            <span className="h-px w-8 bg-paper/30" aria-hidden />
            <span className="eyebrow text-paper/70">The ocean road home</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mt-5 font-serif text-[clamp(2.1rem,5vw,3.6rem)] font-normal leading-[1.04] tracking-title text-paper">
            Home by a different sea — then the trip&rsquo;s one real choice.
          </h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl font-serif text-[clamp(1.15rem,2vw,1.5rem)] font-light italic leading-relaxed text-paper/80">
            The morning is the same either way: breakfast in Yarmouth, the CAT
            across the Gulf of Maine, and Bar Harbor by noon. The last night is
            still open.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <ol className="mt-10 border-l border-paper/15 pl-5 sm:pl-7">
            {SHARED_MORNING.steps.map((s, i) => (
              <StepRow key={i} step={s} />
            ))}
          </ol>
        </Reveal>
      </div>
    </div>
  );
}

/* ─────────────────────────── Decision gate ─────────────────────────── */

function DecisionGate({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <details className="mt-10 rounded-sm border border-amber/30 bg-amber/[0.06]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
          <span className="font-sans text-[0.98rem] font-light text-paper/85">
            <span className="eyebrow mr-3 text-amber" style={{ fontSize: "0.6rem" }}>
              Decision
            </span>
            Decide on Saturday, August 15 from the Mount Washington forecast.
          </span>
          <span className="text-amber/80" aria-hidden>
            +
          </span>
        </summary>
        <div className="px-5 pb-6">
          <GateBody />
        </div>
      </details>
    );
  }

  return (
    <Reveal>
      <div className="mt-14 rounded-sm border border-amber/40 bg-amber/[0.06] p-6 shadow-[0_0_0_1px_rgba(190,107,46,0.15)] sm:p-9">
        <span className="eyebrow text-amber">{DECISION_GATE.eyebrow}</span>
        <h2 className="mt-4 font-serif text-[clamp(2rem,5vw,3.2rem)] font-normal leading-[1.02] tracking-title text-paper">
          {DECISION_GATE.headline}
        </h2>
        <p className="mt-5 max-w-2xl font-sans text-[clamp(1.05rem,1.7vw,1.25rem)] font-light leading-relaxed text-paper/85">
          {DECISION_GATE.line}
        </p>
        <GateBody />
      </div>
    </Reveal>
  );
}

function GateBody() {
  return (
    <>
      {/* The rule */}
      <div className="mt-8 overflow-hidden rounded-sm border border-paper/12">
        <div className="hidden grid-cols-[1fr_1.4fr_1fr] gap-px bg-paper/10 sm:grid">
          {["Forecast cloud base · Tue Aug 18", "What it means", "Choose"].map(
            (h) => (
              <div
                key={h}
                className="bg-nearblack px-4 py-2.5 eyebrow text-paper/55"
                style={{ fontSize: "0.58rem" }}
              >
                {h}
              </div>
            )
          )}
        </div>
        <ul className="divide-y divide-paper/10">
          {DECISION_GATE.ruleRows.map((r) => (
            <li
              key={r.cloud}
              className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[1fr_1.4fr_1fr] sm:items-center sm:gap-4"
            >
              <span className="font-sans text-[0.95rem] font-medium tabular-nums text-paper/90">
                {r.cloud}
              </span>
              <span className="font-sans text-[0.92rem] font-light leading-snug text-paper/70">
                {r.read}
              </span>
              <span className="font-sans text-[0.92rem] font-medium text-amber">
                {r.choose}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Live links */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        {DECISION_GATE.links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 px-3.5 py-1.5 font-sans text-[0.82rem] font-medium text-amber transition-colors duration-200 hover:border-amber hover:bg-amber/10"
          >
            {l.label}
            <span aria-hidden className="text-[0.72em] opacity-70">
              ↗
            </span>
          </a>
        ))}
        <a
          href={`tel:${DECISION_GATE.phone.replace(/[^\d]/g, "")}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-paper/25 px-3.5 py-1.5 font-sans text-[0.82rem] font-medium text-paper/80 transition-colors duration-200 hover:border-paper/50"
        >
          Higher Summits by phone · {DECISION_GATE.phone}
        </a>
      </div>

      {/* The odds, honest */}
      <div className="mt-7 space-y-3">
        {DECISION_GATE.copy.map((p, i) => (
          <p
            key={i}
            className="max-w-2xl font-sans text-[0.98rem] font-light leading-relaxed text-paper/70"
          >
            {p}
          </p>
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────── Path cards ─────────────────────────── */

function PathCards({ onChoose }: { onChoose: (p: PathState) => void }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
      {PATHS.map((p) => (
        <Reveal key={p.key} delay={p.key === "summit" ? 0.08 : 0}>
          <div className="flex h-full flex-col rounded-sm border border-paper/15 bg-black/20 p-6 transition-colors duration-300 hover:border-paper/30 sm:p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[2.4rem] leading-none text-amber">
                {p.letter}
              </span>
              <span className="eyebrow text-paper/60" style={{ fontSize: "0.64rem" }}>
                Path {p.letter} · {p.name}
              </span>
            </div>
            <p className="mt-4 font-serif text-[clamp(1.2rem,2vw,1.5rem)] font-light italic leading-snug text-paper/90">
              {p.pitch}
            </p>

            <dl className="mt-6 divide-y divide-paper/10 border-y border-paper/10">
              <StatRow k="Overnight" v={p.overnight} />
              <StatRow k="Monday drive" v={p.mondayDrive} />
              <StatRow k="Tuesday drive" v={p.tuesdayDrive} />
              <StatRow k="Headline" v={p.headline} />
            </dl>

            <ul className="mt-5 space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber/80"
                    aria-hidden
                  />
                  <span className="font-sans text-[0.96rem] font-light leading-snug text-paper/80">
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 font-sans text-[0.9rem] font-light italic leading-relaxed text-paper/55">
              {p.tradeoff}
            </p>

            <div className="mt-6 flex-1" />
            <button
              type="button"
              onClick={() => onChoose(p.key)}
              className="mt-2 w-full rounded-sm bg-amber px-5 py-3.5 font-sans text-[0.95rem] font-semibold tracking-wide text-nearblack transition-all duration-200 hover:brightness-110 active:scale-[0.99]"
            >
              Choose Path {p.letter} · {p.name}
            </button>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function StatRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-2.5">
      <dt className="eyebrow pt-0.5 text-amber/90" style={{ fontSize: "0.58rem" }}>
        {k}
      </dt>
      <dd className="font-sans text-[0.95rem] font-light leading-snug text-paper/85">
        {v}
      </dd>
    </div>
  );
}

function CompareBlock() {
  return (
    <Reveal>
      <div className="mt-8">
        <span className="eyebrow text-paper/55" style={{ fontSize: "0.62rem" }}>
          How they compare
        </span>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-paper/15">
                <th className="py-2 pr-4 font-sans text-[0.72rem] font-medium uppercase tracking-wide text-paper/50" />
                <th className="py-2 pr-4 font-sans text-[0.72rem] font-medium uppercase tracking-wide text-paper/50">
                  Monday
                </th>
                <th className="py-2 pr-4 font-sans text-[0.72rem] font-medium uppercase tracking-wide text-paper/50">
                  Tuesday
                </th>
                <th className="py-2 font-sans text-[0.72rem] font-medium uppercase tracking-wide text-paper/50">
                  Two-day total
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r) => (
                <tr key={r.label} className="border-b border-paper/10">
                  <td className="py-3 pr-4 font-sans text-[0.9rem] font-medium text-paper/90">
                    {r.label}
                  </td>
                  <td className="py-3 pr-4 font-sans text-[0.9rem] font-light tabular-nums text-paper/70">
                    {r.monday}
                  </td>
                  <td className="py-3 pr-4 font-sans text-[0.9rem] font-light tabular-nums text-paper/70">
                    {r.tuesday}
                  </td>
                  <td className="py-3 font-sans text-[0.9rem] font-semibold tabular-nums text-paper">
                    {r.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-2xl font-sans text-[0.92rem] font-light italic leading-relaxed text-paper/60">
          {COMPARE.note}
        </p>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────── Chosen view ─────────────────────────── */

function ChosenChip({
  chosen,
  onReset,
}: {
  chosen: FinalPath;
  onReset: () => void;
}) {
  return (
    <div className="mt-10 flex items-center justify-between gap-3 rounded-full border border-amber/30 bg-black/30 px-4 py-2.5">
      <span className="font-sans text-[0.85rem] font-medium text-paper/90">
        <span className="text-amber">Path {chosen.letter}</span> ·{" "}
        {chosen.name} selected
      </span>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full px-3 py-1 font-sans text-[0.8rem] font-medium text-amber underline decoration-amber/40 underline-offset-2 transition-colors hover:decoration-amber"
      >
        change
      </button>
    </div>
  );
}

function SwitchBar({ to, onSwitch }: { to: FinalPath; onSwitch: () => void }) {
  return (
    <button
      type="button"
      onClick={onSwitch}
      className="mt-12 flex w-full items-center justify-between rounded-sm border border-paper/15 bg-black/20 px-5 py-4 text-left transition-colors duration-200 hover:border-paper/35"
    >
      <span className="font-sans text-[0.92rem] font-light text-paper/70">
        Switch to Path {to.letter} · {to.name}
      </span>
      <span className="text-amber" aria-hidden>
        &rarr;
      </span>
    </button>
  );
}

/* ─────────────────────────── Itinerary render ─────────────────────────── */

function PathItinerary({ path }: { path: FinalPath }) {
  return (
    <div className="mt-8">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-[2.6rem] leading-none text-amber">
          {path.letter}
        </span>
        <div>
          <span className="eyebrow text-paper/60" style={{ fontSize: "0.64rem" }}>
            Path {path.letter}
          </span>
          <h3 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-normal leading-[1.05] tracking-title text-paper">
            {path.name}
          </h3>
        </div>
      </div>

      <PathDayBlock plan={path.monday} />
      <PathDayBlock plan={path.tuesday} />

      <LockItIn items={path.checklist} letter={path.letter} />
    </div>
  );
}

function PathDayBlock({ plan }: { plan: PathDayPlan }) {
  return (
    <Reveal>
      <div className="mt-12">
        <h4 className="font-serif text-[clamp(1.3rem,2.4vw,1.8rem)] font-normal leading-snug tracking-title text-paper/95">
          {plan.date}
        </h4>
        {plan.intro && (
          <p className="mt-3 max-w-2xl font-sans text-[0.95rem] font-light leading-relaxed text-paper/70">
            {plan.intro}
          </p>
        )}
        {plan.sunset && (
          <p className="mt-2 font-sans text-[0.82rem] font-light tabular-nums text-ice/70">
            {plan.sunset}
          </p>
        )}

        {plan.map && plan.mapId && (
          <div className="mt-6 rounded-sm border border-paper/10 bg-black/20 p-4">
            <ScrollRouteMap
              points={plan.map}
              mapId={plan.mapId}
              variant="day"
              ariaLabel={`Map: ${plan.map.map((p) => p.label).join(" to ")}.`}
            />
          </div>
        )}

        <ol className="mt-6 border-l border-paper/15 pl-5 sm:pl-7">
          {plan.steps.map((s, i) => (
            <StepRow key={i} step={s} />
          ))}
        </ol>

        {plan.stay && <StayBlock stay={plan.stay} />}

        {!plan.map && plan.route && (
          <div className="mt-6 rounded-sm border border-paper/12 bg-black/20 p-5">
            <span className="eyebrow text-paper/55" style={{ fontSize: "0.58rem" }}>
              Route (no baked map yet)
            </span>
            <ol className="mt-3 space-y-1.5">
              {plan.route.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 font-sans text-[0.9rem] font-light leading-snug text-paper/75"
                >
                  <span className="tabular-nums text-amber/70">{i + 1}.</span>
                  <span>{renderText(r)}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function StepRow({ step }: { step: PathStep }) {
  return (
    <li className="relative pb-8 last:pb-0">
      <span
        className="absolute -left-[calc(1.25rem+1px)] top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-amber sm:-left-[calc(1.75rem+1px)]"
        aria-hidden
      />
      {step.time && (
        <span className="block font-sans text-[0.78rem] font-medium tabular-nums text-amber/90">
          {step.time}
        </span>
      )}
      <h5 className="mt-0.5 font-serif text-[clamp(1.1rem,1.8vw,1.35rem)] font-normal leading-snug tracking-title text-paper">
        {renderText(step.heading)}
      </h5>
      {step.detail?.map((d, i) => (
        <p
          key={i}
          className="mt-2 max-w-2xl font-sans text-[0.94rem] font-light leading-relaxed text-paper/75"
        >
          {renderText(d)}
        </p>
      ))}
      {step.feature && (
        <figure className="mt-4 flex gap-4 rounded-sm border border-ice/25 bg-navy/30 p-4 sm:p-5">
          <TeslaMark />
          <div>
            <figcaption
              className="eyebrow text-ice"
              style={{ fontSize: "0.6rem" }}
            >
              {step.feature.title}
            </figcaption>
            <div className="mt-2 space-y-2">
              {step.feature.lines.map((l, i) => (
                <p
                  key={i}
                  className="max-w-2xl font-sans text-[0.9rem] font-light leading-relaxed text-paper/80"
                >
                  {renderText(l)}
                </p>
              ))}
            </div>
          </div>
        </figure>
      )}
      {step.warnings?.map((w, i) => (
        <WarnRow key={i} text={w} />
      ))}
    </li>
  );
}

function StayBlock({ stay }: { stay: PathStay }) {
  return (
    <div className="mt-6 rounded-sm border border-amber/25 bg-amber/[0.05] p-5 sm:p-6">
      <span className="eyebrow text-amber" style={{ fontSize: "0.6rem" }}>
        Stay
      </span>
      <h5 className="mt-2 font-serif text-[clamp(1.1rem,1.8vw,1.35rem)] font-normal leading-snug tracking-title text-paper">
        {renderText(stay.heading)}
      </h5>
      {stay.detail.map((d, i) => (
        <p
          key={i}
          className="mt-2 max-w-2xl font-sans text-[0.94rem] font-light leading-relaxed text-paper/75"
        >
          {renderText(d)}
        </p>
      ))}
      {stay.warnings?.map((w, i) => (
        <WarnRow key={i} text={w} />
      ))}
    </div>
  );
}

function WarnRow({ text }: { text: string }) {
  return (
    <div className="mt-3 flex gap-2.5 rounded-sm border border-amber/25 bg-amber/[0.07] px-3.5 py-2.5">
      <span className="mt-0.5 shrink-0 text-amber" aria-hidden>
        &#9888;
      </span>
      <p className="font-sans text-[0.88rem] font-light leading-relaxed text-paper/80">
        {renderText(text)}
      </p>
    </div>
  );
}

function LockItIn({ items, letter }: { items: string[]; letter: string }) {
  return (
    <Reveal>
      <div className="mt-12 rounded-sm border border-paper/15 bg-black/25 p-6 sm:p-7">
        <span className="eyebrow text-amber">Lock it in · Path {letter}</span>
        <ol className="mt-5 divide-y divide-paper/10">
          {items.map((it, i) => (
            <li key={i} className="flex gap-3.5 py-3.5">
              <span className="font-serif text-[1.1rem] leading-tight text-amber/80 tabular-nums">
                {i + 1}
              </span>
              <p className="font-sans text-[0.96rem] font-light leading-relaxed text-paper/85">
                {renderText(it)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

function TeslaMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 13l3-6h10l3 6M6 13h12l-1.5 4h-9L6 13z"
        stroke="#C7D8DF"
        strokeWidth="1.3"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}
