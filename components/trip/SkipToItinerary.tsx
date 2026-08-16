"use client";

import { useEffect, useState } from "react";
import { tripStatus } from "@/content/nova-scotia/trip-meta";

/**
 * A smart "skip to the itinerary" pill for the PRIVATE Nova Scotia view. It
 * jumps straight to the day that matters right now:
 *
 *   - before the trip  → Day 1 (the start)
 *   - during the trip  → today's day
 *   - after the trip   → Day 12 (the drive home)
 *
 * "Today" is computed on the client (this page is otherwise static), so the
 * target is always current without a redeploy. Fixed bottom-left so it mirrors
 * the "Add photos" FAB and stays reachable while scrolling. Honours
 * prefers-reduced-motion for the scroll.
 */
export default function SkipToItinerary() {
  const [target, setTarget] = useState<string | null>(null);
  const [label, setLabel] = useState("Skip to the itinerary");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const s = tripStatus(today);

    if (s.phase === "before") {
      setTarget("day-01");
      setLabel("Skip to Day 1");
      return;
    }
    if (s.phase === "after") {
      setTarget("day-12");
      setLabel("Skip to the last day");
      return;
    }
    // During the trip: every day 1–12 is its own section with a #day-NN anchor,
    // including the rerouted days 10–12 (see components/trip/Reroute.tsx).
    const n = s.currentDay;
    setTarget(`day-${String(n).padStart(2, "0")}`);
    setLabel(`Skip to today · Day ${n}`);
  }, []);

  function onSkip() {
    if (!target) return;
    const el = document.getElementById(target);
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  // Nothing to point at until the client has resolved "today".
  if (!target) return null;

  return (
    <button
      type="button"
      onClick={onSkip}
      aria-label={label}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 inline-flex items-center gap-2 rounded-full border border-paper/25 bg-nearblack/80 px-4 py-3 font-sans text-[0.9rem] font-semibold text-paper shadow-lg shadow-black/50 backdrop-blur-sm transition-all duration-200 hover:border-amber hover:text-amber active:scale-95"
    >
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 5v14" />
        <path d="M19 12l-7 7-7-7" />
      </svg>
      {label}
    </button>
  );
}
