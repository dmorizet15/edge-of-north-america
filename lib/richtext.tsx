import type { ReactNode } from "react";

/**
 * Lightweight inline renderer for itinerary copy. Turns a plain string into
 * React nodes, supporting these inline tokens so content stays authorable as
 * simple strings:
 *
 *   [label](https://…)          a normal link to a page (restaurant, hotel,
 *                               park, ferry). Rendered with a ↗ marker. Used in
 *                               the day "summary" copy so places link to their
 *                               own websites.
 *
 *   [[map|Words|Address]]       makes the words themselves clickable, launching
 *   [[map|Words]]               Google Maps directions to Address (defaults to
 *                               Words when no Address is given). Rendered with a
 *                               pin marker. Used in the "Detailed daily plan"
 *                               rows so each stop is one tap to GPS directions.
 *
 *   [[dir|Address]]             a compact "Directions" button that opens Google
 *                               Maps directions to Address, added alongside a
 *                               place that already links to its own page.
 *
 *   [[tel|207-555-0000]]        a tap-to-call phone link (tel:). For use on the
 *                               road from a phone.
 *
 *   **bold**                    inline emphasis; may itself contain links or
 *                               other tokens (rendered recursively).
 *
 * Everything else renders as plain text.
 */

// Google Maps "directions" deep link with the destination pre-populated.
const MAPS_DIR = "https://www.google.com/maps/dir/?api=1&destination=";

function mapsHref(query: string): string {
  return MAPS_DIR + encodeURIComponent(query.trim());
}

function telHref(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.length === 10) return "tel:+1" + digits;
  if (digits.length === 11 && digits.startsWith("1")) return "tel:+" + digits;
  return "tel:" + digits;
}

// Ordered alternation. A fresh RegExp is built per call so renderText can
// recurse (for bold spans) without clobbering an outer scan's lastIndex.
const TOKEN_SRC =
  "\\*\\*([^*]+)\\*\\*" + // 1: **bold**
  "|\\[\\[tel\\|([^\\]]+)\\]\\]" + // 2: [[tel|number]]
  "|\\[\\[dir\\|([^\\]]+)\\]\\]" + // 3: [[dir|address]]
  "|\\[\\[map\\|([^\\]]+)\\]\\]" + // 4: [[map|label|address]]
  "|\\[([^\\]]+)\\]\\(([^)\\s]+)\\)"; // 5: label, 6: href

const LINK_CLASS =
  "font-medium underline decoration-2 decoration-[#E0A24A]/45 underline-offset-[3px] transition-all duration-200 hover:decoration-[#E0A24A] hover:brightness-110";

export function renderText(input?: string): ReactNode {
  if (!input) return null;
  const out: ReactNode[] = [];
  const re = new RegExp(TOKEN_SRC, "g");
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) out.push(input.slice(last, m.index));

    if (m[1] !== undefined) {
      // **bold** — emphasised span; render its contents recursively.
      out.push(
        <strong key={key++} className="font-semibold text-paper">
          {renderText(m[1])}
        </strong>
      );
    } else if (m[2] !== undefined) {
      // [[tel|number]] — tap-to-call.
      out.push(
        <a
          key={key++}
          href={telHref(m[2])}
          style={{ color: "#E0A24A" }}
          className="font-medium underline decoration-[#E0A24A]/45 underline-offset-[3px] whitespace-nowrap transition-all duration-200 hover:decoration-[#E0A24A] hover:brightness-110"
        >
          <PhoneMark />
          {m[2].trim()}
        </a>
      );
    } else if (m[3] !== undefined) {
      // [[dir|address]] — a standalone "Directions" button.
      out.push(<DirectionsButton key={key++} query={m[3]} />);
    } else if (m[4] !== undefined) {
      // [[map|label|address]] — the words themselves open Google Maps.
      const parts = m[4].split("|");
      const label = parts[0];
      const query = parts.length > 1 ? parts.slice(1).join("|") : parts[0];
      out.push(
        <a
          key={key++}
          href={mapsHref(query)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#E0A24A" }}
          className={LINK_CLASS}
        >
          {label}
          <PinMark />
        </a>
      );
    } else {
      // [label](url) — a normal link to a page.
      const label = m[5];
      const href = m[6];
      out.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#E0A24A" }}
          className={LINK_CLASS}
        >
          {label}
          <span
            aria-hidden
            className="ml-[0.15em] align-baseline text-[0.72em] opacity-70"
          >
            ↗
          </span>
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < input.length) out.push(input.slice(last));
  return out.length === 1 ? out[0] : out;
}

/** A small map-pin glyph, sized to the surrounding text via `em` units. */
function PinGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden
      className="inline-block align-[-0.12em]"
    >
      <path d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

/** Pin marker trailing an inline maps link (parallels the ↗ on page links). */
function PinMark() {
  return (
    <span
      aria-hidden
      className="ml-[0.15em] inline-block align-baseline text-[0.78em] opacity-70"
    >
      <PinGlyph />
    </span>
  );
}

/** Phone marker leading a tel: link. */
function PhoneMark() {
  return (
    <span
      aria-hidden
      className="mr-[0.3em] inline-block align-[-0.1em] text-[0.82em] opacity-80"
    >
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden className="inline-block">
        <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.2 2.3z" />
      </svg>
    </span>
  );
}

/**
 * A compact "Directions" pill that opens Google Maps directions to `query`.
 * Used to add directions alongside a place that already has its own page link.
 */
function DirectionsButton({ query }: { query: string }) {
  return (
    <a
      href={mapsHref(query)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Directions to ${query.trim()} in Google Maps`}
      style={{ color: "#E0A24A" }}
      className="ml-2 inline-flex items-center gap-[0.28em] whitespace-nowrap rounded-full border border-[#E0A24A]/40 px-[0.6em] py-[0.12em] align-[0.08em] text-[0.62em] font-medium uppercase tracking-[0.08em] no-underline transition-colors duration-200 hover:border-[#E0A24A] hover:bg-[#E0A24A]/10"
    >
      <PinGlyph />
      Directions
    </a>
  );
}
