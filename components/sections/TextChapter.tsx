import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";

interface Props {
  index?: string;
  chapter: string;
  /** Serif statement lines, revealed in sequence. */
  lines: string[];
  /** A smaller closing thought in body sans. */
  footnote?: string;
  variant?: "dark" | "navy" | "paper";
  /** Background utility class override. */
  bg?: string;
  className?: string;
}

const BG: Record<NonNullable<Props["variant"]>, string> = {
  dark: "bg-nearblack",
  navy: "bg-navy",
  paper: "bg-paper",
};

/**
 * A quiet page: mostly empty, a tracked chapter label, and one thought at a
 * time in large serif. Whitespace and silence do the work.
 */
export default function TextChapter({
  index,
  chapter,
  lines,
  footnote,
  variant = "dark",
  bg,
  className = "",
}: Props) {
  const isPaper = variant === "paper";
  const labelVariant = isPaper ? "dark" : "light";
  const text = isPaper ? "text-ink" : "text-paper";
  const foot = isPaper ? "text-ink/55" : "text-paper/55";

  return (
    <section
      className={`flex min-h-screen w-full flex-col items-center justify-center px-6 py-[16vh] text-center ${
        bg ?? BG[variant]
      } ${className}`}
    >
      <Reveal>
        <ChapterLabel
          index={index}
          label={chapter}
          variant={labelVariant}
          align="center"
        />
      </Reveal>

      <div className="mt-12 flex max-w-3xl flex-col gap-6">
        {lines.map((line, i) => (
          <Reveal key={i} delay={0.1 + i * 0.14}>
            <p
              className={`font-serif text-[clamp(1.6rem,4.2vw,3.1rem)] font-normal leading-[1.12] tracking-title ${text}`}
            >
              {line}
            </p>
          </Reveal>
        ))}
      </div>

      {footnote && (
        <Reveal delay={0.2 + lines.length * 0.14}>
          <p
            className={`mt-14 max-w-reading font-sans text-[clamp(0.95rem,1.4vw,1.05rem)] font-light leading-relaxed ${foot}`}
          >
            {footnote}
          </p>
        </Reveal>
      )}
    </section>
  );
}
