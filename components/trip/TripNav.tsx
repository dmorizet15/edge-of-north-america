"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The single piece of persistent chrome on a trip page: a quiet, fixed
 * "All trips" affordance in the top-left, legible over any hero image thanks
 * to a soft blur. Deliberately minimal so it never competes with the film.
 */
export default function TripNav() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed left-[clamp(1rem,3vw,2rem)] top-[clamp(1rem,3vw,1.75rem)] z-50"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/"
        aria-label="Back to all trips"
        className="group flex items-center gap-2.5 rounded-full border border-paper/15 bg-nearblack/40 px-4 py-2 backdrop-blur-md transition-colors duration-300 hover:border-paper/35 hover:bg-nearblack/60"
      >
        <span
          className="font-serif text-base leading-none text-paper/80 transition-transform duration-300 ease-cinematic group-hover:-translate-x-0.5 group-hover:text-amber"
          aria-hidden
        >
          ←
        </span>
        <span className="eyebrow text-paper/75 transition-colors duration-300 group-hover:text-paper">
          All trips
        </span>
      </Link>
    </motion.div>
  );
}
