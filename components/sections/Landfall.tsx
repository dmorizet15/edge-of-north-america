"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PHOTOS } from "@/content/photos";
import EditorialImage from "@/components/ui/EditorialImage";
import CoordinateBadge from "@/components/ui/CoordinateBadge";

/**
 * Landfall. Dawn. The reveal frame — the title is the event. After a night at
 * sea and a withheld destination, the name finally lands: Newfoundland.
 */
export default function Landfall() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
      <EditorialImage photo={PHOTOS.landfall} fill drift />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="eyebrow text-paper/60"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Landfall · first light
        </motion.p>

        <motion.h2
          className="mt-8 font-serif text-[clamp(2.8rem,10vw,8.5rem)] font-normal leading-[0.95] tracking-title text-paper"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, letterSpacing: "0.04em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.015em" }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Newfoundland.
        </motion.h2>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1 }}
        >
          <CoordinateBadge
            coord="47.57° N · 59.14° W"
            place="Port aux Basques — the island begins"
            align="center"
          />
        </motion.div>
      </div>
    </section>
  );
}
