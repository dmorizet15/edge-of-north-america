"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import mapmeta from "@/lib/mapmeta.json";

interface Pt {
  label: string;
  lat: number;
  lon: number;
  ferry?: boolean;
}
interface Props {
  points: Pt[];
  /** Key into lib/mapmeta.json (e.g. "ns-day-03", "nf-route"). */
  mapId: string;
  ariaLabel?: string;
  variant?: "day" | "route";
}

type Meta = { center: [number, number]; zoom: number; w: number; h: number; src: string };
const META = mapmeta as unknown as Record<string, Meta>;

// Web Mercator (256px tiles) — identical math to the map baker, so overlay
// coordinates line up exactly with the baked raster.
const R = 256;
const lon2x = (lon: number, z: number) => ((lon + 180) / 360) * R * 2 ** z;
const lat2y = (lat: number, z: number) => {
  const s = Math.sin((lat * Math.PI) / 180);
  return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * R * 2 ** z;
};

export default function ScrollRouteMap({ points, mapId, ariaLabel, variant = "day" }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const meta = META[mapId];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const progress = useSpring(reduce ? (1 as unknown as MotionValue<number>) : scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.001,
  });

  const model = useMemo(() => {
    if (!meta) return null;
    const { center, zoom, w, h } = meta;
    const cx = lon2x(center[1], zoom);
    const cy = lat2y(center[0], zoom);
    const originX = cx - w / 2;
    const originY = cy - h / 2;
    const pts = points.map((p) => ({
      ...p,
      x: lon2x(p.lon, zoom) - originX,
      y: lat2y(p.lat, zoom) - originY,
    }));
    // segment lengths → cumulative fraction (0..1) per vertex
    const segLen = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
    const total = segLen.reduce((a, b) => a + b, 0) || 1;
    const frac = [0];
    let acc = 0;
    for (const l of segLen) {
      acc += l;
      frac.push(acc / total);
    }
    const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    const segs = pts.slice(1).map((p, i) => ({ from: pts[i], to: p, ferry: p.ferry || pts[i].ferry }));
    return { pts, frac, d, segs, w, h };
  }, [meta, points]);

  if (!meta || !model) return null;
  const { pts, frac, d, segs, w, h } = model;

  const isRoute = variant === "route";
  const dotR = isRoute ? 4 : 4.5;
  const labelSize = isRoute ? 13 : 15;

  return (
    <div ref={ref} className="relative overflow-hidden rounded-sm ring-1 ring-paper/12">
      {/* Real baked dark map */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={meta.src} alt={ariaLabel ?? "Route map"} className="block w-full" loading="lazy" />
      {/* gentle depth + edge fade so the raster sits on the page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 90px 20px rgba(6,9,12,0.7)" }}
      />

      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <filter id={`glow-${mapId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint full route for context (ferry legs dashed) */}
        <g fill="none" strokeLinecap="round">
          {segs.map((s, i) => (
            <line
              key={i}
              x1={s.from.x}
              y1={s.from.y}
              x2={s.to.x}
              y2={s.to.y}
              stroke="#BE6B2E"
              strokeOpacity={0.22}
              strokeWidth={isRoute ? 2 : 2.5}
              strokeDasharray={s.ferry ? "2 9" : undefined}
            />
          ))}
        </g>

        {/* Animated bright line that draws with scroll */}
        <motion.path
          d={d}
          fill="none"
          stroke="#E0A24A"
          strokeWidth={isRoute ? 3 : 3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${mapId})`}
          style={{ pathLength: progress }}
        />

        {/* Moving head + stop markers */}
        <Head pts={pts} frac={frac} progress={progress} />
        {pts.map((p, i) => (
          <Stop
            key={i}
            p={p}
            f={frac[i]}
            progress={progress}
            isEnd={i === 0 || i === pts.length - 1}
            dotR={dotR}
            labelSize={labelSize}
            below={p.y < h * 0.22}
          />
        ))}
      </svg>

      {/* North + attribution */}
      <div className="pointer-events-none absolute right-2 top-2 text-paper/45" aria-hidden>
        <svg width="26" height="30" viewBox="0 0 26 30">
          <path d="M13,3 L16,12 L13,9 L10,12 Z" fill="#BE6B2E" />
          <text x="13" y="26" textAnchor="middle" style={{ fontSize: 10, letterSpacing: "0.18em", fill: "rgba(244,239,231,0.5)", fontFamily: "var(--font-body), sans-serif" }}>
            N
          </text>
        </svg>
      </div>
      <span className="pointer-events-none absolute bottom-1.5 right-2 font-sans text-[9px] tracking-wide text-paper/35">
        © OpenStreetMap · CARTO
      </span>
    </div>
  );
}

function Stop({
  p,
  f,
  progress,
  isEnd,
  dotR,
  labelSize,
  below,
}: {
  p: { x: number; y: number; label: string };
  f: number;
  progress: MotionValue<number>;
  isEnd: boolean;
  dotR: number;
  labelSize: number;
  below: boolean;
}) {
  // dim → pop → settle lit, as the drawn line reaches this stop
  const w = 0.045;
  const dotScale = useTransform(progress, [f - w, f, f + w, 1], [0.9, 2.5, 1.25, 1.25]);
  const dotOpacity = useTransform(progress, [f - 0.02, f], [0.35, 1]);
  const ringScale = useTransform(progress, [f - w, f + 0.1], [0.5, 3]);
  const ringOpacity = useTransform(progress, [f - w, f, f + 0.11], [0, 0.75, 0]);
  const labelOpacity = useTransform(progress, [f - 0.01, f + 0.04], [0, 1]);

  return (
    <g>
      <motion.circle cx={p.x} cy={p.y} r={dotR + 2} fill="none" stroke="#F6D9A0" strokeWidth={1.2} style={{ scale: ringScale, opacity: ringOpacity, originX: p.x, originY: p.y }} />
      <motion.circle cx={p.x} cy={p.y} r={dotR} fill={isEnd ? "#F6D9A0" : "#F4EFE7"} style={{ scale: dotScale, opacity: dotOpacity, originX: p.x, originY: p.y }} />
      <motion.text
        x={p.x}
        y={below ? p.y + labelSize + 8 : p.y - 10}
        textAnchor="middle"
        style={{
          opacity: labelOpacity,
          fontSize: labelSize,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fill: "rgba(244,239,231,0.9)",
          fontFamily: "var(--font-body), sans-serif",
          paintOrder: "stroke",
          stroke: "rgba(6,9,12,0.9)",
          strokeWidth: 3,
        }}
      >
        {p.label}
      </motion.text>
    </g>
  );
}

function Head({
  pts,
  frac,
  progress,
}: {
  pts: { x: number; y: number }[];
  frac: number[];
  progress: MotionValue<number>;
}) {
  const at = (t: number, axis: "x" | "y") => {
    if (t <= 0) return pts[0][axis];
    if (t >= 1) return pts[pts.length - 1][axis];
    let i = 0;
    while (i < frac.length - 1 && frac[i + 1] < t) i++;
    const span = frac[i + 1] - frac[i] || 1;
    const local = (t - frac[i]) / span;
    return pts[i][axis] + (pts[i + 1][axis] - pts[i][axis]) * local;
  };
  const x = useTransform(progress, (t) => at(t, "x"));
  const y = useTransform(progress, (t) => at(t, "y"));
  const opacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);
  return <motion.circle cx={x} cy={y} r={5} fill="#F6D9A0" style={{ opacity }} />;
}
