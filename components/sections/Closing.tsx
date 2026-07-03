"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PHOTOS } from "@/content/photos";
import EditorialImage from "@/components/ui/EditorialImage";

/**
 * Closing. The return — Argentia, the wake, the island receding into soft
 * light. What stays. The personal turn, then the only question that matters.
 */
export default function Closing() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-nearblack">
      {/* Reflection over the returning wake */}
      <div className="relative h-screen min-h-[680px] w-full">
        <EditorialImage photo={PHOTOS.closing} fill drift />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-nearblack" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            className="eyebrow text-paper/55"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
          >
            The return · Argentia
          </motion.p>
          <motion.p
            className="mt-10 max-w-3xl font-serif text-[clamp(1.8rem,4.5vw,3.4rem)] font-normal leading-[1.12] tracking-title text-paper"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            You crossed an ocean for this.
            <br />
            You did it together.
            <br />
            Almost no one does.
          </motion.p>
        </div>
      </div>

      {/* The final question, on soft first light */}
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-12 bg-paper px-6 py-[16vh] text-center text-ink">
        <motion.div
          className="h-px w-16 bg-ink/25"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.h2
          className="font-serif text-[clamp(2.6rem,8vw,6.5rem)] font-normal leading-[1] tracking-title text-ink"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          So… when do we go?
        </motion.h2>
        <motion.p
          className="eyebrow text-ink/45"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.8 }}
        >
          Edge of North America
        </motion.p>
      </div>
    </section>
  );
}
