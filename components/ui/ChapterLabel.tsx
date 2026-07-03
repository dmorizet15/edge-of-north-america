interface Props {
  /** Roman-ish index, e.g. "01". */
  index?: string;
  /** The chapter name, tracked small-caps. */
  label: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

/**
 * Reusable chapter eyebrow — a small index and a tracked label with a hairline.
 * Used to title sections without shouting.
 */
export default function ChapterLabel({
  index,
  label,
  variant = "light",
  align = "left",
  className = "",
}: Props) {
  const isLight = variant === "light";
  const color = isLight ? "text-paper/70" : "text-ink/60";
  const line = isLight ? "bg-paper/25" : "bg-ink/20";
  const alignment = align === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`flex items-center gap-4 ${alignment} ${className}`}>
      {index && (
        <span className={`eyebrow tabular-nums ${color}`}>{index}</span>
      )}
      <span className={`h-px w-8 ${line}`} aria-hidden />
      <span className={`eyebrow ${color}`}>{label}</span>
    </div>
  );
}
