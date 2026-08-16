import Reveal from "@/components/ui/Reveal";
import { renderText } from "@/lib/richtext";
import { StopList, Warn } from "@/components/trip/RerouteParts";
import {
  MONDAY_FAIR,
  MONDAY_RAIN,
  MONDAY_FORECAST,
  RAIN_UPGRADE,
} from "@/content/nova-scotia/reroute";

/**
 * MONDAY, AUGUST 17 — the fair-weather / rain switch.
 *
 * Deliberately CSS-only: one visually-hidden checkbox plus sibling selectors
 * (Tailwind's `peer-checked:` variants). No client component, no hydration, and
 * the control works before — or entirely without — JavaScript, which is the
 * point on a phone with one bar somewhere on the A-20.
 *
 * The mechanism constrains the markup: `peer-checked:` compiles to a general
 * sibling selector (`.peer:checked ~ &`), so every element that reacts to the
 * switch must be a DIRECT SIBLING of the input — hence the flat structure here
 * and the pair-of-labels pattern rather than one label with swapping innards.
 *
 * Accessibility: the input is a real focusable control (`sr-only` clips it but
 * does not remove it from the tab order), typed as `role="switch"` so its
 * on/off state is announced; both labels carry a visible `peer-focus-visible`
 * ring; and the current state is rendered as words ("Fair weather" / "Rain
 * plan"), never by colour alone.
 */
export default function MondayWeather() {
  const chip =
    "eyebrow rounded-full border px-3 py-1.5 align-middle";
  const control =
    "ml-3 cursor-pointer select-none items-center gap-2 rounded-full bg-amber px-4 py-2 align-middle font-sans text-[0.86rem] font-semibold text-nearblack transition-all duration-200 hover:brightness-110 active:scale-[0.99] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber";

  return (
    <div className="mt-8">
      {/* The single control backing the whole day. Must stay the first child:
          every `peer-checked:` sibling below reads its state. */}
      <input
        type="checkbox"
        id="ns-monday-rain"
        role="switch"
        className="peer sr-only"
        aria-label="Rain plan for Monday, August 17"
      />

      {/* Why the switch exists — Environment Canada, verbatim. */}
      <Reveal>
        <p className="max-w-2xl rounded-sm border border-ice/20 bg-navy/25 px-4 py-3 font-sans text-[0.92rem] font-light leading-relaxed text-paper/80">
          <span className="eyebrow mr-2 text-ice" style={{ fontSize: "0.58rem" }}>
            Forecast
          </span>
          {MONDAY_FORECAST}
        </p>
      </Reveal>

      {/* State, in words — and the control. Both are inline so they share a row,
          while staying direct siblings of the input. */}
      <span
        className={`${chip} mt-5 inline-block border-amber/40 text-amber peer-checked:hidden`}
      >
        Showing · Fair weather
      </span>
      <span
        className={`${chip} mt-5 hidden border-ice/40 text-ice peer-checked:inline-block`}
      >
        Showing · Rain plan
      </span>

      <label htmlFor="ns-monday-rain" className={`${control} inline-flex peer-checked:hidden`}>
        <RainMark />
        Switch to the rain plan
      </label>
      <label
        htmlFor="ns-monday-rain"
        className={`${control} hidden peer-checked:inline-flex`}
      >
        <SunMark />
        Back to the fair-weather plan
      </label>

      {/* ── The two days. Exactly one is rendered visible at a time. ── */}
      <div className="peer-checked:hidden">
        <StopList stops={MONDAY_FAIR} />
      </div>

      <div className="hidden peer-checked:block">
        <StopList stops={MONDAY_RAIN} />

        <div className="mt-8 rounded-sm border border-ice/25 bg-navy/30 p-5 sm:p-6">
          <span className="eyebrow text-ice" style={{ fontSize: "0.6rem" }}>
            If it really rains
          </span>
          <h4 className="mt-2 font-serif text-[clamp(1.15rem,1.9vw,1.4rem)] font-normal leading-snug tracking-title text-paper">
            {RAIN_UPGRADE.name}
          </h4>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.86rem] font-light text-paper/60">
            <a
              href={
                "https://www.google.com/maps/dir/?api=1&destination=" +
                encodeURIComponent(`${RAIN_UPGRADE.name}, ${RAIN_UPGRADE.address}`)
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E0A24A" }}
              className="underline decoration-[#E0A24A]/40 underline-offset-[3px] transition-colors hover:decoration-[#E0A24A]"
            >
              {RAIN_UPGRADE.address}
            </a>
            <a
              href={`tel:+${RAIN_UPGRADE.phone.replace(/[^\d]/g, "")}`}
              style={{ color: "#E0A24A" }}
              className="whitespace-nowrap underline decoration-[#E0A24A]/40 underline-offset-[3px] transition-colors hover:decoration-[#E0A24A]"
            >
              {RAIN_UPGRADE.phone}
            </a>
            <span className="font-medium text-paper/75">{RAIN_UPGRADE.price}</span>
          </p>
          <p className="mt-2.5 max-w-2xl font-sans text-[0.94rem] font-light leading-relaxed text-paper/75">
            {renderText(RAIN_UPGRADE.detail)}
          </p>
        </div>
      </div>

      {/* A note that only makes sense in the fair-weather ordering. */}
      <div className="peer-checked:hidden">
        <Warn
          tone="ice"
          text="The funicular is **$7 per person, CASH ONLY**, 9 AM–9 PM. You don't need it outbound — the Clarendon is already on top of the cliff — but you will want it coming back up from Petit-Champlain or the ferry."
        />
      </div>
    </div>
  );
}

function RainMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 13a5 5 0 0 1 3.6-8.6A5.5 5.5 0 0 1 18 6a4 4 0 0 1 1.3 7.8" />
      <path d="M8 17.5v2M12 18v2.5M16 17.5v2" />
    </svg>
  );
}

function SunMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}
