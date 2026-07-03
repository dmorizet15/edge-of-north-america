"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Delay in seconds for staggered reveals. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  className?: string;
  /** Fire once (default) or every time it enters view. */
  once?: boolean;
}

/**
 * The single motion primitive: a slow, confident fade + rise as content
 * enters the viewport. Honours prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  once = true,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
