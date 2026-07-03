"use client";

import { useState } from "react";
import type { Photo } from "@/content/photos";
import { TONES } from "@/lib/tones";

const RATIO: Record<Photo["aspectRatio"], string> = {
  "16:9": "16 / 9",
  "3:2": "3 / 2",
  "4:5": "4 / 5",
  "2:3": "2 / 3",
  "1:1": "1 / 1",
  "21:9": "21 / 9",
};

interface Props {
  photo: Photo;
  /** Optional: subtle ken-burns drift on the placeholder/real image. */
  drift?: boolean;
  /** Fill the parent (absolute) instead of using intrinsic aspect ratio. */
  fill?: boolean;
  className?: string;
  /** Priority hint for above-the-fold frames. */
  priority?: boolean;
}

/**
 * The single image primitive for the whole piece.
 *
 * If a real photograph exists at `photo.src`, it renders full-bleed.
 * Until then, it renders a composed, tonal placeholder that states — quietly,
 * in-frame — exactly what belongs here: location, search terms, aspect ratio,
 * and ideal composition. The placeholder is designed to be beautiful on its
 * own so the experience never looks unfinished.
 */
export default function EditorialImage({
  photo,
  drift = false,
  fill = false,
  className = "",
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const tone = TONES[photo.tone];
  const showPlaceholder = failed || !loaded;

  const wrapperStyle = fill
    ? { position: "absolute" as const, inset: 0 }
    : { aspectRatio: RATIO[photo.aspectRatio] };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={wrapperStyle}
    >
      {/* Real photograph (only shown once it successfully loads). */}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.src}
          alt={photo.location}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            loaded && !failed ? "opacity-100" : "opacity-0"
          } ${drift ? "animate-slow-zoom" : ""}`}
        />
      )}

      {/* Tonal placeholder — visible until a real photo loads. */}
      {showPlaceholder && (
        <Placeholder photo={photo} onDark={tone.onDark} accent={tone.accent} drift={drift} frame={tone.frame} />
      )}
    </div>
  );
}

function Placeholder({
  photo,
  onDark,
  accent,
  drift,
  frame,
}: {
  photo: Photo;
  onDark: boolean;
  accent: string;
  drift: boolean;
  frame: React.CSSProperties;
}) {
  const fg = onDark ? "rgba(244,239,231,0.92)" : "rgba(27,27,29,0.9)";
  const fgQuiet = onDark ? "rgba(244,239,231,0.5)" : "rgba(27,27,29,0.5)";
  const hair = onDark ? "rgba(244,239,231,0.16)" : "rgba(27,27,29,0.14)";

  return (
    <div className="absolute inset-0">
      {/* Gradient field */}
      <div
        className={`absolute inset-0 ${drift ? "animate-slow-zoom" : ""}`}
        style={frame}
      />
      {/* Film grain */}
      <div className="grain-layer absolute inset-0 opacity-[0.09] mix-blend-overlay" />
      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: onDark
            ? "inset 0 0 180px 40px rgba(0,0,0,0.55)"
            : "inset 0 0 160px 30px rgba(120,110,95,0.18)",
        }}
      />

      {/* Editorial metadata — the sourcing brief, rendered as design. */}
      <div className="absolute inset-0 flex flex-col justify-between p-[clamp(1rem,3vw,2.5rem)]">
        <div className="flex items-start justify-between gap-4">
          <span
            className="eyebrow"
            style={{ color: accent, letterSpacing: "0.34em" }}
          >
            Photograph to place
          </span>
          <span
            className="eyebrow tabular-nums"
            style={{ color: fgQuiet }}
          >
            {photo.aspectRatio}
          </span>
        </div>

        <div className="max-w-prose">
          <div
            className="mb-4 h-px w-full max-w-[8rem]"
            style={{ background: hair }}
          />
          <p
            className="font-serif text-[clamp(1.15rem,2.4vw,2rem)] leading-[1.15]"
            style={{ color: fg }}
          >
            {photo.location}
          </p>
          <div className="mt-4 grid gap-2 sm:max-w-lg">
            <MetaLine label="Search" value={photo.searchTerms} color={fgQuiet} accent={accent} />
            <MetaLine label="Compose" value={photo.composition} color={fgQuiet} accent={accent} />
            {photo.note && (
              <MetaLine label="Licensing" value={photo.note} color={fgQuiet} accent={accent} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaLine({
  label,
  value,
  color,
  accent,
}: {
  label: string;
  value: string;
  color: string;
  accent: string;
}) {
  return (
    <p className="flex gap-3 text-[0.78rem] leading-relaxed">
      <span
        className="eyebrow shrink-0 pt-[0.15rem]"
        style={{ color: accent, fontSize: "0.6rem" }}
      >
        {label}
      </span>
      <span style={{ color }}>{value}</span>
    </p>
  );
}
