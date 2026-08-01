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

// Ordered alternation: bold, directions button, inline maps link, then a normal
// markdown link. A fresh RegExp is built per call so renderText can recurse
// (for bold spans) without clobbering an outer scan's lastIndex.
const TOKEN_SRC =
  "\\*\\*([^*]+)\\*\\*" + // 1: **bold**
  "|\\[\\[dir\\|([^\\]]+)\\]\\]" + // 2: [[dir|address]]
  "|\\[\\[map\\|([^\\]]+)\\]\\]" + // 3: [[map|label|address]]
  "|\\[([^\\]]+)\\]\\(([^)\\s]+)\\)"; // 4: label, 5: href

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
      // [[dir|address]] — a standalone "Directions" button.
      out.push(<DirectionsButton key={key++} query={m[2]} />);
    } else if (m[3] !== undefined) {
      // [[map|label|address]] — the words themselves open Google Maps.
      const parts = m[3].split("|");
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
      const label = m[4];
      const href = m[5];
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
