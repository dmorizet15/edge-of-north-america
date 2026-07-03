"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline amber progress line pinned to the top of the viewport.
 * Quiet, thin, and the only persistent chrome in the whole piece.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-amber/80"
      style={{ scaleX }}
    />
  );
}
