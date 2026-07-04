"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PHOTOS } from "@/content/photos";
import EditorialImage from "@/components/ui/EditorialImage";
import Starfield from "@/components/trip/Starfield";

/**
 * Hero / Cover. Before dawn. The destination is withheld.
 * Massive dark photography, a tiny title, one line, and a quiet pull downward.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
      <EditorialImage photo={PHOTOS.cover} fill drift priority />

      {/* Deepen the dark, keep the horizon breathing. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-nearblack/25" />

      {/* A field of stars over the pre-dawn Atlantic. */}
      <Starfield
        count={80}
        seed={3}
        className="opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_42%,transparent_72%)]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="eyebrow text-paper/60"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          A journey north
        </motion.p>

        <motion.h1
          className="mt-8 font-serif text-[clamp(2.4rem,7vw,6rem)] font-normal leading-[0.95] tracking-title text-paper"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Edge of
          <br />
          North America
        </motion.h1>

        <motion.div
          className="mx-auto mt-10 h-px w-16 bg-paper/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="mt-10 max-w-md font-serif text-[clamp(1.05rem,2.2vw,1.4rem)] font-light italic leading-relaxed text-paper/75"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Some directions are a feeling before they are a place.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-9 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.4 }}
      >
        <span className="eyebrow text-paper/45" style={{ fontSize: "0.6rem" }}>
          Begin before dawn
        </span>
        <motion.span
          className="block h-9 w-px bg-paper/35"
          animate={reduce ? {} : { scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
          style={{ originY: 0 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
