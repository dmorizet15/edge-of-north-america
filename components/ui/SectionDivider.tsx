import Reveal from "./Reveal";

interface Props {
  /** A single quiet line — one image, one thought. */
  line?: string;
  variant?: "light" | "dark";
  /** Vertical breathing room. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Reusable section divider — a passage of near-empty space with, at most,
 * one whispered line. Silence and whitespace as design elements.
 */
export default function SectionDivider({
  line,
  variant = "light",
  size = "md",
  className = "",
}: Props) {
  const isLight = variant === "light";
  const text = isLight ? "text-paper/75" : "text-ink/70";
  const dot = isLight ? "bg-paper/40" : "bg-ink/35";
  const pad =
    size === "lg"
      ? "py-[26vh]"
      : size === "sm"
      ? "py-[12vh]"
      : "py-[19vh]";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 px-6 text-center ${pad} ${className}`}
    >
      <span className={`h-1 w-1 rounded-full ${dot}`} aria-hidden />
      {line && (
        <Reveal>
          <p
            className={`max-w-reading font-serif text-[clamp(1.15rem,2.3vw,1.7rem)] italic leading-relaxed ${text}`}
          >
            {line}
          </p>
        </Reveal>
      )}
    </div>
  );
}
