import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ScrollRouteMap from "@/components/trip/ScrollRouteMap";
import { renderText } from "@/lib/richtext";
import MondayWeather from "@/components/trip/MondayWeather";
import {
  SectionHead,
  StatusBadge,
  StopList,
  Warn,
} from "@/components/trip/RerouteParts";
import {
  REROUTE_META,
  CANCELLED,
  DAY_16,
  DAY_17,
  DAY_18,
  CLOSED_MONDAY,
  MONDAY_WARNINGS,
  MUST_DOS,
  RUNNER_UP,
  CALL_LIST,
  type RerouteDay,
} from "@/content/nova-scotia/reroute";
import type { TripMapPoint } from "@/lib/trip-types";

/**
 * THE AUGUST 16 REROUTE — Days 10–12, rebuilt.
 *
 * Renders the three rerouted days from verified source data rather than through
 * the prose day template, plus the material that only exists because the plan
 * changed: what was cancelled, the Monday weather switch, the swap menu, the
 * closed-Monday list, and the call list.
 *
 * All server components except <CopyPhrase/> (used by the allergy band). The
 * Monday switch is CSS-only — see MondayWeather.tsx.
 */

export function RerouteBanner() {
  return (
    <section
      id="reroute"
      className="w-full border-t border-paper/10 bg-nearblack px-[clamp(1.4rem,5vw,4.5rem)] pt-[13vh]"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead
          eyebrow="The plan changed"
          title={REROUTE_META.title}
          lede={REROUTE_META.subtitle}
          badge={<StatusBadge label={REROUTE_META.status} />}
        />

        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl font-sans text-[0.95rem] font-light leading-relaxed text-paper/60">
            {REROUTE_META.homeEta} {REROUTE_META.verified}
          </p>
        </Reveal>

        {/* What died with the sailing. Kept on the page, visibly retired. */}
        <Reveal delay={0.2}>
          <div className="mt-10 rounded-sm border border-paper/12 bg-black/25 p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <StatusBadge label="Cancelled" tone="muted" />
              <span className="font-sans text-[0.95rem] font-light text-paper/50 line-through decoration-paper/30">
                {CANCELLED.route}
              </span>
            </div>
            <p className="mt-4 max-w-2xl font-sans text-[0.95rem] font-light leading-relaxed text-paper/65">
              {CANCELLED.note}
            </p>

            <ul className="mt-6 divide-y divide-paper/10 border-y border-paper/10">
              {CANCELLED.items.map((it) => (
                <li key={it.name} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
                  <span className="eyebrow pt-1 text-paper/40" style={{ fontSize: "0.58rem" }}>
                    {it.time}
                  </span>
                  <div>
                    <p className="font-sans text-[0.98rem] font-medium leading-snug text-paper/55 line-through decoration-paper/25">
                      {it.name}
                    </p>
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 font-sans text-[0.9rem] font-light leading-relaxed text-paper/50">
                      <span>{it.detail}</span>
                      {"price" in it && it.price && (
                        <span className="font-medium tabular-nums text-paper/60">
                          {it.price}
                        </span>
                      )}
                      {"phone" in it && it.phone && (
                        <a
                          href={`tel:+${it.phone.replace(/[^\d]/g, "")}`}
                          style={{ color: "#E0A24A" }}
                          className="whitespace-nowrap underline decoration-[#E0A24A]/40 underline-offset-[3px] transition-colors hover:decoration-[#E0A24A]"
                        >
                          {it.phone}
                        </a>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <span className="eyebrow text-paper/40" style={{ fontSize: "0.58rem" }}>
                And everything downstream of the ferry
              </span>
              <ul className="mt-3 flex flex-wrap gap-2">
                {CANCELLED.downstream.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-paper/12 px-3.5 py-1.5 font-sans text-[0.88rem] font-light text-paper/45 line-through decoration-paper/25"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── A rerouted day ─────────────────────────── */

export function RerouteDayCard({
  day,
  mapPoints,
  mapId,
  children,
}: {
  day: RerouteDay;
  mapPoints?: TripMapPoint[];
  mapId?: string;
  children?: React.ReactNode;
}) {
  const meta = [day.distance, `${day.driveTime} driving`, day.via].filter(Boolean);

  return (
    <section
      id={`day-${day.n}`}
      className="w-full scroll-mt-4 border-t border-paper/10 bg-nearblack px-[clamp(1.4rem,5vw,4.5rem)] py-[10vh]"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow tabular-nums text-amber">Day {day.n}</span>
            <span className="h-px w-8 bg-paper/30" aria-hidden />
            <span className="eyebrow tabular-nums text-paper/80">{day.dateLabel}</span>
            <StatusBadge label={day.statusLabel} />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="mt-4 font-serif text-[clamp(2rem,5vw,3.4rem)] font-normal leading-[1.03] tracking-title text-paper">
            {day.route}
          </h3>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.95rem] font-light text-paper/65">
            {meta.map((m, i) => (
              <span key={i} className="flex items-center gap-2.5">
                {i > 0 && <span className="text-paper/25" aria-hidden>·</span>}
                <span className={i === 0 ? "font-medium tabular-nums text-paper/85" : ""}>
                  {m}
                </span>
              </span>
            ))}
          </p>
        </Reveal>

        {(day.note || day.driveNote) && (
          <Reveal delay={0.16}>
            <p className="mt-2.5 max-w-2xl font-sans text-[0.92rem] font-light italic leading-relaxed text-paper/60">
              {day.driveNote ?? day.note}
            </p>
          </Reveal>
        )}

        {mapPoints && mapId && (
          <Reveal delay={0.18}>
            <div className="mt-8 rounded-sm border border-paper/10 bg-black/20 p-4">
              <ScrollRouteMap
                points={mapPoints}
                mapId={mapId}
                variant="day"
                ariaLabel={`Map of day ${day.n}: ${mapPoints.map((p) => p.label).join(" to ")}.`}
              />
            </div>
          </Reveal>
        )}

        {day.stops && <StopList stops={day.stops} />}

        {children}

        {day.warnings && day.warnings.length > 0 && (
          <Reveal>
            <div className="mt-9">
              {day.warnings.map((w, i) => (
                <Warn key={i} text={w} />
              ))}
            </div>
          </Reveal>
        )}

        <Reveal>
          <Link
            href={`/trips/nova-scotia/upload?day=${day.n}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/[0.08] px-4 py-2 font-sans text-[0.85rem] font-medium text-amber transition-colors hover:border-amber hover:bg-amber/15"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4l-1.5-2z" />
              <circle cx="12" cy="13" r="3.2" />
            </svg>
            Add a photo to Day {day.n}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────── Monday extras: closed + swaps ───────────────────── */

export function ClosedMonday() {
  return (
    <Reveal>
      <div className="mt-10 rounded-sm border border-paper/12 bg-black/25 p-6 sm:p-7">
        <span className="eyebrow text-paper/60" style={{ fontSize: "0.62rem" }}>
          Closed Monday — don&rsquo;t chase these
        </span>
        <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
          {CLOSED_MONDAY.map((c) => (
            <li key={c} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-paper/35" aria-hidden />
              <span className="font-sans text-[0.93rem] font-light leading-snug text-paper/60">
                {c}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function SwapMenu() {
  return (
    <section
      id="swap-menu"
      className="w-full border-t border-paper/10 bg-nearblack px-[clamp(1.4rem,5vw,4.5rem)] py-[11vh]"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHead
          eyebrow="Swap menu"
          title="Five must-dos, all open Monday"
          lede="Ranked, verified open Mon Aug 17, 2026 — swap any of these into the afternoon."
        />

        <ol className="mt-10 divide-y divide-paper/10 border-y border-paper/10">
          {MUST_DOS.map((m) => (
            <Reveal key={m.rank}>
              <li className="grid grid-cols-[2.5rem_1fr] gap-4 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                <span className="font-serif text-[clamp(1.8rem,3.2vw,2.4rem)] leading-none text-amber/80 tabular-nums">
                  {m.rank}
                </span>
                <div>
                  <h3 className="font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] font-normal leading-snug tracking-title text-paper">
                    {m.name}
                  </h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.86rem] font-light text-paper/60">
                    <a
                      href={
                        "https://www.google.com/maps/dir/?api=1&destination=" +
                        encodeURIComponent(`${m.name}, ${m.address}, Québec`)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#E0A24A" }}
                      className="underline decoration-[#E0A24A]/40 underline-offset-[3px] transition-colors hover:decoration-[#E0A24A]"
                    >
                      {m.address}
                    </a>
                    {m.phone && (
                      <a
                        href={`tel:+${m.phone.replace(/[^\d]/g, "")}`}
                        style={{ color: "#E0A24A" }}
                        className="whitespace-nowrap underline decoration-[#E0A24A]/40 underline-offset-[3px] transition-colors hover:decoration-[#E0A24A]"
                      >
                        {m.phone}
                      </a>
                    )}
                    <span className="font-medium text-paper/80">{m.price}</span>
                    <span>· {m.hours}</span>
                    {m.duration && <span>· {m.duration}</span>}
                    {m.rating !== undefined && (
                      <span className="tabular-nums text-paper/70">
                        · ★ {m.rating}
                        {m.reviews !== undefined &&
                          ` · ${m.reviews.toLocaleString("en-US")} reviews`}
                      </span>
                    )}
                  </p>

                  <p className="mt-3 max-w-2xl border-l-2 border-amber/50 pl-4 font-serif text-[clamp(1.02rem,1.7vw,1.2rem)] font-light italic leading-relaxed text-paper/85">
                    {m.bestMoment}
                  </p>

                  {m.note && (
                    <p className="mt-3 max-w-2xl font-sans text-[0.92rem] font-light leading-relaxed text-paper/65">
                      {m.note}
                    </p>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-8 rounded-sm border border-paper/12 bg-black/25 p-5 sm:p-6">
            <span className="eyebrow text-paper/55" style={{ fontSize: "0.6rem" }}>
              Runner-up
            </span>
            <h3 className="mt-2 font-serif text-[clamp(1.15rem,1.9vw,1.4rem)] font-normal leading-snug tracking-title text-paper">
              {RUNNER_UP.name}
            </h3>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.86rem] font-light text-paper/60">
              <span>{RUNNER_UP.address}</span>
              <span className="font-medium text-paper/80">{RUNNER_UP.price}</span>
              <span>· {RUNNER_UP.hours}</span>
              <span className="tabular-nums text-paper/70">
                · ★ {RUNNER_UP.rating} · {RUNNER_UP.reviews.toLocaleString("en-US")} reviews
              </span>
            </p>
            <p className="mt-3 max-w-2xl font-sans text-[0.94rem] font-light leading-relaxed text-paper/75">
              {RUNNER_UP.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── Call list ───────────────────────────── */

export function CallList() {
  return (
    <section
      id="call-list"
      className="w-full border-t border-paper/10 bg-nearblack px-[clamp(1.4rem,5vw,4.5rem)] py-[11vh]"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHead
          eyebrow="Call list"
          title="What still needs a phone call"
          lede="Everything is booked. These are the confirmations, reservations and one refund still worth chasing."
        />

        <ol className="mt-9 divide-y divide-paper/10 border-y border-paper/10">
          {CALL_LIST.map((c) => {
            const done = c.status === "done";
            return (
              <li key={c.n} className="flex gap-4 py-5">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-sans text-[0.72rem] font-semibold tabular-nums ${
                    done
                      ? "bg-ice/20 text-ice"
                      : "bg-amber/15 text-amber ring-1 ring-amber/35"
                  }`}
                  aria-hidden
                >
                  {done ? "✓" : c.n}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-sans text-[0.98rem] font-light leading-relaxed ${
                      done ? "text-paper/55" : "text-paper/85"
                    }`}
                  >
                    {renderText(c.what)}
                  </p>
                  {(c.phone || c.url) && (
                    <p className="mt-2 flex flex-wrap items-center gap-2.5">
                      {c.phone && (
                        <a
                          href={`tel:+${c.phone.replace(/[^\d]/g, "")}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 px-3.5 py-1.5 font-sans text-[0.82rem] font-semibold text-amber transition-colors duration-200 hover:border-amber hover:bg-amber/10"
                        >
                          {c.phone}
                        </a>
                      )}
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-paper/25 px-3.5 py-1.5 font-sans text-[0.82rem] font-medium text-paper/75 transition-colors duration-200 hover:border-paper/50"
                        >
                          {c.url.replace(/^https?:\/\//, "")}
                          <span aria-hidden className="text-[0.72em] opacity-70">↗</span>
                        </a>
                      )}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ──────────────────────────── The whole block ──────────────────────────── */

export default function Reroute({
  mapPoints,
}: {
  /** Day maps, keyed by day number, passed in from the itinerary spine. */
  mapPoints: Record<string, TripMapPoint[]>;
}) {
  return (
    <>
      <RerouteBanner />

      <RerouteDayCard day={DAY_16} mapPoints={mapPoints["10"]} mapId="ns-day-10" />

      <RerouteDayCard day={DAY_17} mapPoints={mapPoints["11"]} mapId="ns-day-11">
        <MondayWeather />
        <Reveal>
          <div className="mt-9">
            {MONDAY_WARNINGS.map((w, i) => (
              <Warn key={i} text={w} />
            ))}
          </div>
        </Reveal>
        <ClosedMonday />
      </RerouteDayCard>

      <SwapMenu />

      <RerouteDayCard day={DAY_18} mapPoints={mapPoints["12"]} mapId="ns-day-12" />

      <CallList />
    </>
  );
}
