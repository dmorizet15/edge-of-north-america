import type { ReactNode } from "react";

/**
 * Lightweight inline-link renderer for itinerary copy. Turns a plain string
 * containing markdown-style links — `[Eventide Oyster Co.](https://…)` — into
 * React nodes, with real anchors for the linked spans. Everything else renders
 * as text. Keeps content authorable as simple strings while letting hotels,
 * restaurants, wineries, parks, and the ferry be clickable.
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function renderText(input?: string): ReactNode {
  if (!input) return null;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK.lastIndex = 0;
  let key = 0;
  while ((m = LINK.exec(input)) !== null) {
    if (m.index > last) out.push(input.slice(last, m.index));
    const [, label, href] = m;
    out.push(
      <a
        key={key++}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#E0A24A" }}
        className="font-medium underline decoration-2 decoration-[#E0A24A]/45 underline-offset-[3px] transition-all duration-200 hover:decoration-[#E0A24A] hover:brightness-110"
      >
        {label}
        <span aria-hidden className="ml-[0.15em] text-[0.72em] align-baseline opacity-70">
          ↗
        </span>
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < input.length) out.push(input.slice(last));
  return out.length === 1 ? out[0] : out;
}
