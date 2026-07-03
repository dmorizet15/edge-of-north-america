"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WAYPOINTS, MINOR_POINTS } from "@/content/route";

/**
 * Bespoke route map — a National Geographic-inspired SVG, not a screenshot.
 * Muted, abstract landmasses; a thin amber route (solid for driving, dashed
 * for ferry legs); small dots; tiny tracked labels; generous whitespace.
 *
 * Waypoint positions are a true projection of the real lat/lon coordinates.
 */

const VB = { w: 1000, h: 660, pad: 96 };

// Equirectangular projection with latitude correction, fit to the viewBox.
function project() {
  const lats = WAYPOINTS.map((w) => w.lat);
  const lons = WAYPOINTS.map((w) => w.lon);
  const meanLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const k = Math.cos((meanLat * Math.PI) / 180);

  const xs = lons.map((lon) => lon * k);
  const ys = lats.map((lat) => lat);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const innerW = VB.w - VB.pad * 2;
  const innerH = VB.h - VB.pad * 2;
  const scale = Math.min(innerW / (maxX - minX), innerH / (maxY - minY));

  const offX = (innerW - (maxX - minX) * scale) / 2;
  const offY = (innerH - (maxY - minY) * scale) / 2;

  // Shared projector so minor points use the exact same transform.
  const toXY = (lat: number, lon: number) => ({
    x: VB.pad + offX + (lon * k - minX) * scale,
    y: VB.pad + offY + (maxY - lat) * scale, // invert Y so north is up
  });

  const pts = WAYPOINTS.map((w) => ({ ...w, ...toXY(w.lat, w.lon) }));
  const minor = MINOR_POINTS.map((m) => ({ ...m, ...toXY(m.lat, m.lon) }));
  return { pts, minor };
}

// Small per-label placement tweaks so nothing collides in the eastern cluster.
const LABEL: Record<
  string,
  { dx: number; dy: number; anchor: "start" | "end" | "middle" }
> = {
  hudson: { dx: 0, dy: 26, anchor: "middle" },
  newengland: { dx: -12, dy: 24, anchor: "end" },
  northsydney: { dx: -14, dy: 6, anchor: "end" },
  portauxbasques: { dx: -14, dy: 18, anchor: "end" },
  grosmorne: { dx: -16, dy: 2, anchor: "end" },
  lanseauxmeadows: { dx: 14, dy: -6, anchor: "start" },
  twillingate: { dx: 14, dy: -4, anchor: "start" },
  fogo: { dx: 16, dy: 12, anchor: "start" },
  bonavista: { dx: 16, dy: 4, anchor: "start" },
  capestmarys: { dx: -6, dy: 26, anchor: "middle" },
  ferryland: { dx: 16, dy: 14, anchor: "start" },
  stjohns: { dx: 16, dy: -4, anchor: "start" },
  capespear: { dx: 16, dy: 16, anchor: "start" },
  argentia: { dx: -14, dy: 8, anchor: "end" },
};

export default function RouteMap() {
  const reduce = useReducedMotion();
  const { pts, minor } = project();

  // Build the route path, segment by segment (so ferry legs can be dashed).
  const segments = pts.slice(0, -1).map((p, i) => {
    const next = pts[i + 1];
    return { from: p, to: next, ferry: !!next.ferry || !!p.ferry };
  });

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="h-auto w-full"
        role="img"
        aria-label="Route map from the Hudson Valley to Cape Spear, Newfoundland, and back via Argentia."
      >
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#233647" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#16293d" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Abstract, muted landmasses — grounding, not literal cartography. */}
        <g fill="url(#land)" stroke="rgba(202,210,214,0.14)" strokeWidth="1">
          {/* Mainland / Atlantic Canada (west) */}
          <path d="M40,300 C120,250 190,255 250,300 C300,340 300,430 250,520 C190,600 90,600 40,540 C10,470 10,360 40,300 Z" />
          {/* Newfoundland (east) — stylized triangular silhouette */}
          <path d="M560,150 C660,140 780,170 860,230 C930,285 940,360 890,430 C840,500 740,540 660,520 C600,505 560,470 545,410 C560,370 540,330 560,290 C575,255 545,200 560,150 Z" />
        </g>

        {/* Faint graticule — a few tracked reference lines. */}
        <g stroke="rgba(202,210,214,0.08)" strokeWidth="1">
          <line x1="0" y1="220" x2={VB.w} y2="220" />
          <line x1="0" y1="440" x2={VB.w} y2="440" />
          <line x1="360" y1="0" x2="360" y2={VB.h} />
          <line x1="680" y1="0" x2="680" y2={VB.h} />
        </g>

        {/* Minor points of interest — small unlabeled dots, off the route line */}
        <g fill="rgba(244,239,231,0.4)">
          {minor.map((m) => (
            <circle key={m.id} cx={m.x} cy={m.y} r={1.5} />
          ))}
        </g>

        {/* Route segments */}
        <g fill="none" strokeLinecap="round">
          {segments.map((s, i) => (
            <motion.line
              key={i}
              x1={s.from.x}
              y1={s.from.y}
              x2={s.to.x}
              y2={s.to.y}
              stroke="#BE6B2E"
              strokeWidth={s.ferry ? 1.4 : 2}
              strokeDasharray={s.ferry ? "2 7" : undefined}
              initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: s.ferry ? 0.8 : 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.35 + i * 0.13,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Waypoint dots + labels */}
        <g>
          {pts.map((p, i) => {
            const l = LABEL[p.id] ?? { dx: 12, dy: 0, anchor: "start" as const };
            const isCape = p.id === "capespear";
            return (
              <motion.g
                key={p.id}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.13 }}
              >
                {isCape && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="10"
                    fill="none"
                    stroke="#F6D9A0"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.major ? 3.4 : 2.2}
                  fill={isCape ? "#F6D9A0" : "#F4EFE7"}
                />
                <text
                  x={p.x + l.dx}
                  y={p.y + l.dy}
                  textAnchor={l.anchor}
                  className="fill-paper/75"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body), sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {p.label}
                </text>
              </motion.g>
            );
          })}
        </g>

        {/* Compass hint */}
        <g
          transform={`translate(${VB.w - 58}, 74)`}
          className="fill-paper/55"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          <line x1="0" y1="-22" x2="0" y2="22" stroke="rgba(244,239,231,0.3)" strokeWidth="1" />
          <path d="M0,-22 L4,-12 L-4,-12 Z" fill="#BE6B2E" />
          <text x="0" y="-28" textAnchor="middle" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>
            N
          </text>
        </g>
      </svg>
    </div>
  );
}
