"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { PHOTOS } from "@/content/photos";
import { CAPE_SPEAR } from "@/content/route";
import EditorialImage from "@/components/ui/EditorialImage";
import CoordinateBadge from "@/components/ui/CoordinateBadge";

/**
 * Cape Spear — the climax. The easternmost point of North America, where the
 * sun arrives on the continent first. As you scroll into it, the sun literally
 * rises out of the Atlantic: the warm bloom climbs the horizon and the whole
 * frame breaks from dark to first light — choreographed to the scroll.
 */
export default function CapeSpear() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "center 0.4"] });
  const p = useSpring(scrollYProgress, { stiffness: 48, damping: 22, restDelta: 0.001 });

  // the rising sun
  const sunY = useTransform(p, [0, 1], ["44%", "-4%"]);
  const sunScale = useTransform(p, [0, 1], [0.7, 1.15]);
  const sunOpacity = useTransform(p, [0, 0.35, 1], [0, 0.65, 1]);
  const washOpacity = useTransform(p, [0.15, 1], [0, 0.6]);
  const darkLift = useTransform(p, [0, 1], [0.55, 0.12]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] w-full overflow-hidden bg-nearblack">
      <EditorialImage photo={PHOTOS.capeSpear} fill drift />

      {/* Darkness that lifts as the sun rises */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-nearblack"
        style={{ opacity: reduce ? 0.15 : darkLift }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      {/* The sun itself, climbing out of the sea */}
      <motion.div
        className="pointer-events-none absolute left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full"
        style={{
          bottom: 0,
          y: reduce ? "-4%" : sunY,
          scale: reduce ? 1.1 : sunScale,
          opacity: reduce ? 1 : sunOpacity,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,241,214,0.95) 0%, rgba(246,217,160,0.7) 22%, rgba(224,162,74,0.35) 42%, rgba(190,107,46,0.12) 62%, rgba(0,0,0,0) 74%)",
          filter: "blur(2px)",
        }}
      />
      {/* Warm wash across the whole frame */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          opacity: reduce ? 0.55 : washOpacity,
          backgroundImage:
            "radial-gradient(90% 120% at 50% 125%, rgba(246,217,160,0.5) 0%, rgba(190,107,46,0.18) 42%, rgba(0,0,0,0) 72%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="eyebrow text-paper/70"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
        >
          Cape Spear · 21 · easternmost light
        </motion.p>

        <motion.h2
          className="mt-8 max-w-4xl font-serif text-[clamp(2.2rem,6.5vw,5rem)] font-normal leading-[1.02] tracking-title text-softwhite"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          The sun reaches North America here first.
        </motion.h2>

        <motion.p
          className="mt-8 max-w-reading font-serif text-[clamp(1.1rem,2.4vw,1.7rem)] font-light italic leading-relaxed text-paper/85"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.7 }}
        >
          There is no land east of this until Europe.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.1 }}
        >
          <CoordinateBadge
            coord={CAPE_SPEAR.coord}
            place={CAPE_SPEAR.fact}
            align="center"
          />
        </motion.div>
      </div>
    </section>
  );
}
