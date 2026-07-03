interface Props {
  /** Formatted coordinate string, e.g. "47.52° N · 52.62° W". */
  coord: string;
  /** Optional place name shown beneath the coordinate. */
  place?: string;
  /** Light text (on dark photos) or dark text (on paper). */
  variant?: "light" | "dark";
  className?: string;
  align?: "left" | "right" | "center";
}

/**
 * Reusable coordinate badge — a tiny, tracked geographic marker.
 * A small tick, the coordinate, and an optional place name.
 */
export default function CoordinateBadge({
  coord,
  place,
  variant = "light",
  className = "",
  align = "left",
}: Props) {
  const isLight = variant === "light";
  const text = isLight ? "text-paper/85" : "text-ink/80";
  const quiet = isLight ? "text-paper/45" : "text-ink/45";
  const tick = isLight ? "bg-amber" : "bg-amber";
  const alignment =
    align === "right"
      ? "items-end text-right"
      : align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex flex-col gap-1.5 ${alignment} ${className}`}>
      <span className={`h-3 w-px ${tick}`} aria-hidden />
      <span
        className={`font-sans text-micro uppercase tracking-wide tabular-nums ${text}`}
      >
        {coord}
      </span>
      {place && (
        <span className={`eyebrow ${quiet}`} style={{ fontSize: "0.6rem" }}>
          {place}
        </span>
      )}
    </div>
  );
}
