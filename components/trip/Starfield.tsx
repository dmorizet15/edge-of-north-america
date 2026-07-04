"use client";

import { useMemo } from "react";

/**
 * A quiet field of twinkling stars with the occasional shooting star — for the
 * dark-sky moments. Positions are seeded (deterministic) so server and client
 * render identically. Honours prefers-reduced-motion via the global CSS reset.
 */
export default function Starfield({
  count = 90,
  className = "",
  shooting = true,
  seed = 7,
}: {
  count?: number;
  className?: string;
  shooting?: boolean;
  seed?: number;
}) {
  const stars = useMemo(() => {
    // small deterministic PRNG (mulberry32)
    let s = seed >>> 0;
    const rand = () => {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: count }, () => {
      const size = 0.6 + rand() * 1.9;
      return {
        left: `${(rand() * 100).toFixed(2)}%`,
        top: `${(rand() * 100).toFixed(2)}%`,
        size,
        dur: `${(2.4 + rand() * 4).toFixed(2)}s`,
        delay: `${(rand() * 6).toFixed(2)}s`,
        base: 0.35 + rand() * 0.5,
      };
    });
  }, [count, seed]);

  const shoots = useMemo(
    () => [
      { top: "14%", left: "8%", delay: "2s", dur: "9s" },
      { top: "30%", left: "52%", delay: "7s", dur: "13s" },
      { top: "9%", left: "70%", delay: "12s", dur: "17s" },
    ],
    []
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: st.left,
            top: st.top,
            width: st.size,
            height: st.size,
            opacity: st.base,
            boxShadow: "0 0 4px rgba(255,255,255,0.6)",
            animation: `twinkle ${st.dur} ease-in-out ${st.delay} infinite`,
          }}
        />
      ))}
      {shooting &&
        shoots.map((sh, i) => (
          <span
            key={`s${i}`}
            className="absolute h-px w-16 bg-gradient-to-r from-white/90 to-transparent"
            style={{
              top: sh.top,
              left: sh.left,
              opacity: 0,
              animation: `shoot ${sh.dur} ease-in ${sh.delay} infinite`,
            }}
          />
        ))}
    </div>
  );
}
