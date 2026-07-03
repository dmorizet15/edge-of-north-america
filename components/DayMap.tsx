import type { MapPoint } from "@/content/itinerary";

/**
 * A compact, auto-fitting map of a single day's leg — the same cartographic
 * language as the main route map (amber path, ferry legs dashed, tiny tracked
 * labels, a faint graticule, a north mark), scaled to just today's points.
 */

const VB = { w: 620, h: 300, pad: 52 };

export default function DayMap({ points }: { points: MapPoint[] }) {
  const lats = points.map((p) => p.lat);
  const lons = points.map((p) => p.lon);
  const meanLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const k = Math.cos((meanLat * Math.PI) / 180);

  const xs = lons.map((lon) => lon * k);
  const ys = lats;
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 0.5;
  const spanY = maxY - minY || 0.5;

  const innerW = VB.w - VB.pad * 2;
  const innerH = VB.h - VB.pad * 2;
  const scale = Math.min(innerW / spanX, innerH / spanY);
  const offX = (innerW - spanX * scale) / 2;
  const offY = (innerH - spanY * scale) / 2;

  const pts = points.map((p, i) => ({
    ...p,
    x: VB.pad + offX + (xs[i] - minX) * scale,
    y: VB.pad + offY + (maxY - ys[i]) * scale,
  }));

  const segments = pts.slice(0, -1).map((p, i) => {
    const next = pts[i + 1];
    return { from: p, to: next, ferry: !!next.ferry };
  });

  // Only show a label if it won't collide with a nearer neighbour's label.
  // First and last points always get a label; the rest defer if too close.
  const MIN = 66;
  let lastLabeled = { x: -999, y: -999 };
  const labeled = pts.map((p, i) => {
    const force = i === 0 || i === pts.length - 1;
    const far =
      Math.hypot(p.x - lastLabeled.x, p.y - lastLabeled.y) > MIN;
    const show = force || far;
    if (show) lastLabeled = { x: p.x, y: p.y };
    return show;
  });

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Map of the day's route: ${points.map((p) => p.label).join(" to ")}.`}
    >
      {/* Faint graticule */}
      <g stroke="rgba(202,210,214,0.09)" strokeWidth="1">
        <line x1="0" y1={VB.h / 3} x2={VB.w} y2={VB.h / 3} />
        <line x1="0" y1={(VB.h * 2) / 3} x2={VB.w} y2={(VB.h * 2) / 3} />
        <line x1={VB.w / 3} y1="0" x2={VB.w / 3} y2={VB.h} />
        <line x1={(VB.w * 2) / 3} y1="0" x2={(VB.w * 2) / 3} y2={VB.h} />
      </g>

      {/* Route path */}
      <g fill="none" strokeLinecap="round">
        {segments.map((s, i) => (
          <line
            key={i}
            x1={s.from.x}
            y1={s.from.y}
            x2={s.to.x}
            y2={s.to.y}
            stroke="#BE6B2E"
            strokeWidth={s.ferry ? 1.4 : 2}
            strokeDasharray={s.ferry ? "2 7" : undefined}
            opacity={s.ferry ? 0.85 : 1}
          />
        ))}
      </g>

      {/* Points + labels */}
      <g>
        {pts.map((p, i) => {
          const isEnd = i === 0 || i === pts.length - 1;
          return (
            <g key={p.label + i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={isEnd ? 3.6 : 2.6}
                fill={i === 0 ? "#F6D9A0" : "#F4EFE7"}
              />
              {labeled[i] && (
                <text
                  x={p.x}
                  y={p.y + 20}
                  textAnchor="middle"
                  className="fill-paper/70"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body), sans-serif",
                  }}
                >
                  {p.label}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* North mark */}
      <g transform={`translate(${VB.w - 34}, 40)`}>
        <path d="M0,-14 L3,-6 L-3,-6 Z" fill="#BE6B2E" />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          className="fill-paper/50"
          style={{ fontSize: "10px", letterSpacing: "0.2em", fontFamily: "var(--font-body), sans-serif" }}
        >
          N
        </text>
      </g>
    </svg>
  );
}
