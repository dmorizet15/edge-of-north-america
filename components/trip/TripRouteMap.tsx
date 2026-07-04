"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TripWaypoint } from "@/lib/trip-types";

/**
 * Reusable bespoke route map — a National Geographic-inspired SVG, not a
 * screenshot. Muted, abstract landmasses (passed in per trip); a thin amber
 * route (solid for driving, dashed for ferry legs); tiny tracked labels;
 * generous whitespace. Waypoint positions are a true projection of real
 * lat/lon, so any trip's geography draws correctly.
 */

const VB = { w: 1000, h: 660, pad: 96 };

type LabelSpec = { dx: number; dy: number; anchor: "start" | "end" | "middle" };

interface Props {
  waypoints: TripWaypoint[];
  labels?: Record<string, LabelSpec>;
  ariaLabel: string;
  /** Stylized background landmasses in the VB coordinate space (0..1000, 0..660). */
  landmasses?: ReactNode;
  /** Waypoint id to ring as the emotional climax of the route. */
  highlightId?: string;
}

function projectWaypoints(waypoints: TripWaypoint[]) {
  const lats = waypoints.map((w) => w.lat);
  const lons = waypoints.map((w) => w.lon);
  const meanLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const k = Math.cos((meanLat * Math.PI) / 180);

  const xs = lons.map((lon) => lon * k);
  const ys = lats;

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const innerW = VB.w - VB.pad * 2;
  const innerH = VB.h - VB.pad * 2;
  const scale = Math.min(innerW / (maxX - minX), innerH / (maxY - minY));

  const offX = (innerW - (maxX - minX) * scale) / 2;
  const offY = (innerH - (maxY - minY) * scale) / 2;

  return waypoints.map((w) => ({
    ...w,
    x: VB.pad + offX + (w.lon * k - minX) * scale,
    y: VB.pad + offY + (maxY - w.lat) * scale, // invert Y so north is up
  }));
}

export default function TripRouteMap({
  waypoints,
  labels = {},
  ariaLabel,
  landmasses,
  highlightId,
}: Props) {
  const reduce = useReducedMotion();
  const pts = projectWaypoints(waypoints);

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
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id="trip-land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#233647" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#16293d" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Abstract, muted landmasses — grounding, not literal cartography. */}
        <g fill="url(#trip-land)" stroke="rgba(202,210,214,0.14)" strokeWidth="1">
          {landmasses}
        </g>

        {/* Faint graticule */}
        <g stroke="rgba(202,210,214,0.08)" strokeWidth="1">
          <line x1="0" y1="220" x2={VB.w} y2="220" />
          <line x1="0" y1="440" x2={VB.w} y2="440" />
          <line x1="360" y1="0" x2="360" y2={VB.h} />
          <line x1="680" y1="0" x2="680" y2={VB.h} />
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
            const l = labels[p.id] ?? { dx: 12, dy: 0, anchor: "start" as const };
            const isHighlight = p.id === highlightId;
            return (
              <motion.g
                key={p.id}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.11 }}
              >
                {isHighlight && (
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
                  fill={isHighlight ? "#F6D9A0" : "#F4EFE7"}
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
