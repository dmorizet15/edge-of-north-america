import type { ReactNode } from "react";
import type { PhotoKey } from "@/content/photos";
import { PHOTOS } from "@/content/photos";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";
import CoordinateBadge from "@/components/ui/CoordinateBadge";

type Placement = "bottom-left" | "bottom-right" | "center" | "top-left";

interface Props {
  photo: PhotoKey;
  index: string;
  chapter: string;
  title: ReactNode;
  /** One quiet thought beneath the title. */
  line?: string;
  coord?: string;
  place?: string;
  placement?: Placement;
  /** Relative title scale. */
  scale?: "md" | "lg" | "xl";
  /** Darken the image for legibility / mood. */
  overlay?: "soft" | "medium" | "strong";
  height?: "screen" | "tall";
  drift?: boolean;
  priority?: boolean;
}

const PLACEMENT: Record<Placement, string> = {
  "bottom-left": "items-end justify-start text-left",
  "bottom-right": "items-end justify-end text-right",
  center: "items-center justify-center text-center",
  "top-left": "items-start justify-start text-left",
};

const SCALE: Record<NonNullable<Props["scale"]>, string> = {
  md: "text-[clamp(2rem,4.5vw,3.4rem)]",
  lg: "text-[clamp(2.6rem,6.5vw,5rem)]",
  xl: "text-[clamp(3.2rem,9vw,7.5rem)]",
};

const OVERLAY: Record<NonNullable<Props["overlay"]>, string> = {
  soft: "from-black/55 via-black/10 to-black/25",
  medium: "from-black/70 via-black/20 to-black/40",
  strong: "from-black/80 via-black/40 to-black/60",
};

/**
 * Expressive full-bleed chapter: photography dominates, type is quiet.
 * Used across the coastline chapters with per-section placement and mood.
 */
export default function PhotoChapter({
  photo,
  index,
  chapter,
  title,
  line,
  coord,
  place,
  placement = "bottom-left",
  scale = "lg",
  overlay = "medium",
  height = "screen",
  drift = true,
  priority = false,
}: Props) {
  const p = PHOTOS[photo];
  const isCenter = placement === "center";

  return (
    <section
      className={`relative w-full overflow-hidden ${
        height === "screen" ? "h-screen min-h-[640px]" : "min-h-[86vh]"
      }`}
    >
      <EditorialImage photo={p} fill drift={drift} priority={priority} />

      {/* Cinematic gradient scrim */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${OVERLAY[overlay]}`}
      />

      <div
        className={`absolute inset-0 flex flex-col p-[clamp(1.6rem,5vw,5rem)] ${PLACEMENT[placement]}`}
      >
        <div className={isCenter ? "max-w-3xl" : "max-w-2xl"}>
          <Reveal>
            <ChapterLabel
              index={index}
              label={chapter}
              align={isCenter ? "center" : "left"}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className={`mt-6 font-serif font-normal leading-[0.98] tracking-title text-paper ${SCALE[scale]}`}
            >
              {title}
            </h2>
          </Reveal>

          {line && (
            <Reveal delay={0.16}>
              <p
                className={`mt-6 max-w-reading font-serif text-[clamp(1.05rem,2vw,1.5rem)] font-light italic leading-relaxed text-paper/80 ${
                  isCenter ? "mx-auto" : ""
                }`}
              >
                {line}
              </p>
            </Reveal>
          )}

          {coord && (
            <Reveal delay={0.24}>
              <div className={`mt-8 ${isCenter ? "flex justify-center" : ""}`}>
                <CoordinateBadge
                  coord={coord}
                  place={place}
                  align={
                    placement === "bottom-right"
                      ? "right"
                      : isCenter
                      ? "center"
                      : "left"
                  }
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
