import Reveal from "@/components/ui/Reveal";
import { renderText } from "@/lib/richtext";
import type { RerouteStop, StopKind } from "@/content/nova-scotia/reroute";

/**
 * Shared building blocks for the Aug 16 reroute sections — the timed stop rows,
 * the status badges, and the warning callout. Server components, no client JS.
 * Everything here reuses the site's existing tokens (amber / ice / paper /
 * navy) and the `eyebrow` label style; no new colours are introduced.
 */

/* ───────────────────────────── Badges ───────────────────────────── */

/** Tone per stop kind — amber for the anchors of the day, ice for logistics. */
const KIND_TONE: Record<StopKind, string> = {
  Lunch: "border-amber/45 text-amber",
  Dinner: "border-amber/45 text-amber",
  Anchor: "border-amber/45 text-amber",
  Hotel: "border-ice/40 text-ice",
  Charge: "border-ice/40 text-ice",
  Border: "border-ice/40 text-ice",
  Option: "border-paper/30 text-paper/70",
};

export function KindBadge({ kind }: { kind: StopKind }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full border px-2.5 py-[0.15rem] font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] ${KIND_TONE[kind]}`}
    >
      {kind}
    </span>
  );
}

/** The day-level status pill: Booked / Home / Cancelled. */
export function StatusBadge({
  label,
  tone = "live",
}: {
  label: string;
  tone?: "live" | "muted";
}) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 font-sans text-[0.63rem] font-semibold uppercase tracking-[0.16em] ${
        tone === "muted"
          ? "bg-paper/10 text-paper/50"
          : "bg-amber/15 text-amber ring-1 ring-amber/35"
      }`}
    >
      {label}
    </span>
  );
}

/* ──────────────────────────── Warnings ──────────────────────────── */

/** An amber ⚠ callout. Used for the things that have caused real problems. */
export function Warn({ text, tone = "amber" }: { text: string; tone?: "amber" | "ice" }) {
  const amber = tone === "amber";
  return (
    <div
      className={`mt-3 flex gap-2.5 rounded-sm border px-3.5 py-2.5 ${
        amber ? "border-amber/30 bg-amber/[0.07]" : "border-ice/25 bg-navy/25"
      }`}
    >
      <span
        className={`mt-0.5 shrink-0 ${amber ? "text-amber" : "text-ice"}`}
        aria-hidden
      >
        &#9888;
      </span>
      <p className="font-sans text-[0.9rem] font-light leading-relaxed text-paper/85">
        {renderText(text)}
      </p>
    </div>
  );
}

/* ─────────────────────────── Timed stops ─────────────────────────── */

/** Google Maps directions link for a stop that has a real street address. */
function mapsHref(name: string, address: string): string {
  const q = /^\d/.test(address.trim()) ? `${address}` : `${name}, ${address}`;
  return (
    "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(q)
  );
}

function telHref(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  return digits.length === 11 ? `tel:+${digits}` : `tel:+1${digits}`;
}

/** One timed row on a rerouted day: time rail, badge, name, facts, detail. */
export function StopRow({ stop }: { stop: RerouteStop }) {
  const hasMeta =
    stop.address || stop.exit || stop.phone || stop.rating || stop.price;

  return (
    <li className="relative pb-7 last:pb-0">
      <span
        className="absolute -left-[calc(1.25rem+1px)] top-[0.45rem] h-2 w-2 -translate-x-1/2 rounded-full bg-amber sm:-left-[calc(1.75rem+1px)]"
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="font-sans text-[0.8rem] font-semibold tabular-nums tracking-wide text-amber/90">
          {stop.time}
        </span>
        {stop.kind && <KindBadge kind={stop.kind} />}
      </div>

      <h4 className="mt-1.5 font-serif text-[clamp(1.15rem,1.9vw,1.4rem)] font-normal leading-snug tracking-title text-paper">
        {renderText(stop.name)}
      </h4>

      {hasMeta && (
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[0.86rem] font-light text-paper/60">
          {stop.address && (
            <a
              href={mapsHref(stop.name, stop.address)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E0A24A" }}
              className="underline decoration-[#E0A24A]/40 underline-offset-[3px] transition-colors hover:decoration-[#E0A24A]"
            >
              {stop.address}
            </a>
          )}
          {stop.exit && <span className="text-paper/55">· {stop.exit}</span>}
          {stop.phone && (
            <a
              href={telHref(stop.phone)}
              style={{ color: "#E0A24A" }}
              className="whitespace-nowrap underline decoration-[#E0A24A]/40 underline-offset-[3px] transition-colors hover:decoration-[#E0A24A]"
            >
              {stop.phone}
            </a>
          )}
          {stop.phoneAlt && (
            <a
              href={telHref(stop.phoneAlt)}
              style={{ color: "#E0A24A" }}
              className="whitespace-nowrap underline decoration-[#E0A24A]/40 underline-offset-[3px] transition-colors hover:decoration-[#E0A24A]"
            >
              {stop.phoneAlt}
            </a>
          )}
          {stop.rating !== undefined && (
            <span className="tabular-nums text-paper/70">
              ★ {stop.rating}
              {stop.reviews !== undefined && (
                <span className="text-paper/50">
                  {" "}
                  · {stop.reviews.toLocaleString("en-US")} reviews
                </span>
              )}
            </span>
          )}
          {stop.price && (
            <span className="font-medium text-paper/75">{stop.price}</span>
          )}
        </p>
      )}

      {stop.detail && (
        <p className="mt-2 max-w-2xl font-sans text-[0.94rem] font-light leading-relaxed text-paper/75">
          {renderText(stop.detail)}
        </p>
      )}

      {stop.alternative && (
        <p className="mt-2 max-w-2xl border-l border-paper/15 pl-3 font-sans text-[0.88rem] font-light leading-relaxed text-paper/55">
          <span className="eyebrow mr-2 text-paper/45" style={{ fontSize: "0.55rem" }}>
            Instead
          </span>
          {renderText(stop.alternative)}
        </p>
      )}

      {stop.booked && (
        <p className="mt-2 font-sans text-[0.84rem] font-light italic text-ice/70">
          Booked {stop.booked}.
        </p>
      )}

      {stop.flags?.map((f, i) => (
        <Warn key={i} text={f} />
      ))}
    </li>
  );
}

/** The timed spine of a day. */
export function StopList({ stops }: { stops: RerouteStop[] }) {
  return (
    <ol className="mt-7 border-l border-paper/15 pl-5 sm:pl-7">
      {stops.map((s, i) => (
        <StopRow key={i} stop={s} />
      ))}
    </ol>
  );
}

/* ──────────────────────── Section scaffolding ──────────────────────── */

export function SectionHead({
  eyebrow,
  title,
  lede,
  badge,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="eyebrow text-amber">{eyebrow}</span>
          {badge}
        </div>
        <h2 className="mt-4 font-serif text-[clamp(1.8rem,4.4vw,2.9rem)] font-normal leading-[1.05] tracking-title text-paper">
          {title}
        </h2>
        {lede && (
          <p className="mt-4 max-w-2xl font-sans text-[clamp(1rem,1.6vw,1.15rem)] font-light leading-relaxed text-paper/75">
            {renderText(lede)}
          </p>
        )}
      </div>
    </Reveal>
  );
}
