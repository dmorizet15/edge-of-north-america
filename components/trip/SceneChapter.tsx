"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Photo } from "@/content/photos";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";
import CoordinateBadge from "@/components/ui/CoordinateBadge";

type Placement = "bottom-left" | "bottom-right" | "center" | "top-left";

interface Props {
  /** Resolved photo object (any trip's registry). */
  photo: Photo;
  index: string;
  chapter: string;
  title: ReactNode;
  line?: string;
  coord?: string;
  place?: string;
  placement?: Placement;
  scale?: "md" | "lg" | "xl";
  overlay?: "soft" | "medium" | "strong";
  height?: "screen" | "tall";
  drift?: boolean;
  priority?: boolean;
  /** Show the placeholder sourcing brief. Off for pure cinematic frames. */
  showBrief?: boolean;
  /** Scroll-linked parallax on the image (depth as you pass the scene). */
  parallax?: boolean;
}

// NOTE: this is a `flex flex-col`, so `justify-*` is the vertical axis and
// `items-*` the horizontal. (The original PhotoChapter's map renders
// "bottom-left" as top-right; this corrected map keeps names honest so the
// text always lands in the named corner — and on the matching scrim.)
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

// A second, text-anchored scrim so type always lands on darkness — regardless
// of how busy the photograph is behind it (fixes low-contrast heroes).
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
 * Expressive full-bleed overview chapter — photography dominates, type is quiet.
 * The registry-agnostic sibling of the Newfoundland <PhotoChapter/>: it takes a
 * resolved Photo object, so any trip can compose its cinematic overview from it.
 */
export default function SceneChapter({
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
  showBrief = false,
  parallax = false,
}: Props) {
  const isCenter = placement === "center";
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden ${
        height === "screen" ? "h-screen min-h-[640px]" : "min-h-[86vh]"
      }`}
    >
      {parallax && !reduce ? (
        <motion.div className="absolute inset-0 scale-[1.18]" style={{ y: imgY }}>
          <EditorialImage photo={photo} fill drift={drift} priority={priority} showBrief={showBrief} />
        </motion.div>
      ) : (
        <EditorialImage photo={photo} fill drift={drift} priority={priority} showBrief={showBrief} />
      )}

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
