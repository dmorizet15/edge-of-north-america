"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PHOTOS } from "@/content/photos";
import { CAPE_SPEAR } from "@/content/route";
import EditorialImage from "@/components/ui/EditorialImage";
import CoordinateBadge from "@/components/ui/CoordinateBadge";

/**
 * Cape Spear — the climax. The easternmost point of North America, where the
 * sun arrives on the continent first. The brightest, warmest frame in the
 * whole piece: everything before this was dark; here it breaks open.
 */
export default function CapeSpear() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-nearblack">
      <EditorialImage photo={PHOTOS.capeSpear} fill drift />

      {/* Warm light blooming from the horizon */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          backgroundImage:
            "radial-gradient(80% 120% at 50% 130%, rgba(246,217,160,0.5) 0%, rgba(190,107,46,0.18) 40%, rgba(0,0,0,0) 70%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: "easeOut" }}
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
