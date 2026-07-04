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

// flex-col: justify-* is vertical, items-* is horizontal. Names kept honest so
// text lands in the corner it claims (and on the matching scrim).
const PLACEMENT: Record<Placement, string> = {
  "bottom-left": "items-start justify-end text-left",
  "bottom-right": "items-end justify-end text-right",
  center: "items-center justify-center text-center",
  "top-left": "items-start justify-start text-left",
};

const SCALE: Record<NonNullable<Props["scale"]>, string> = {
  md: "text-[clamp(2.4rem,5vw,3.8rem)]",
  lg: "text-[clamp(3rem,7vw,5.6rem)]",
  xl: "text-[clamp(3.6rem,9.5vw,8rem)]",
};

const OVERLAY: Record<NonNullable<Props["overlay"]>, string> = {
  soft: "from-black/60 via-black/15 to-black/30",
  medium: "from-black/78 via-black/28 to-black/45",
  strong: "from-black/88 via-black/45 to-black/60",
};

// Text-anchored scrim so type always lands on darkness, regardless of the photo.
const SCRIM: Record<Placement, string> = {
  "bottom-left":
    "linear-gradient(to top, rgba(9,12,16,0.92) 0%, rgba(9,12,16,0.5) 30%, rgba(9,12,16,0) 62%), linear-gradient(to right, rgba(9,12,16,0.72) 0%, rgba(9,12,16,0) 58%)",
  "bottom-right":
    "linear-gradient(to top, rgba(9,12,16,0.92) 0%, rgba(9,12,16,0.5) 30%, rgba(9,12,16,0) 62%), linear-gradient(to left, rgba(9,12,16,0.72) 0%, rgba(9,12,16,0) 58%)",
  center:
    "radial-gradient(120% 90% at 50% 62%, rgba(9,12,16,0.78) 0%, rgba(9,12,16,0.32) 45%, rgba(9,12,16,0) 78%)",
  "top-left":
    "linear-gradient(to bottom, rgba(9,12,16,0.9) 0%, rgba(9,12,16,0.4) 32%, rgba(9,12,16,0) 64%), linear-gradient(to right, rgba(9,12,16,0.7) 0%, rgba(9,12,16,0) 58%)",
};

const TEXT_SHADOW = "0 2px 30px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)";

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
        className="pointer-events-none absolute inset-0"
        style={{ background: SCRIM[placement] }}
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
              style={{ textShadow: TEXT_SHADOW }}
            >
              {title}
            </h2>
          </Reveal>

          {line && (
            <Reveal delay={0.16}>
              <p
                className={`mt-6 max-w-prose font-serif text-[clamp(1.2rem,2.2vw,1.7rem)] font-light italic leading-relaxed text-paper/90 ${
                  isCenter ? "mx-auto" : ""
                }`}
                style={{ textShadow: TEXT_SHADOW }}
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
