"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PhotoMeta } from "@/lib/photos";

/**
 * One day's photos on the family view: the first photo shows on the page as a
 * preview; tapping it opens a fullscreen, swipeable carousel through that day's
 * photos (arrows + keyboard + touch swipe, a real fullscreen toggle where the
 * browser supports it, caption/uploader per photo).
 */
export default function DayGallery({ photos }: { photos: PhotoMeta[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const open = idx !== null;
  const count = photos.length;

  const go = useCallback(
    (delta: number) => setIdx((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );
  const close = useCallback(() => setIdx(null), []);

  if (count === 0) return null;
  const first = photos[0];

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setIdx(0)}
        aria-label={`Open ${count} photo${count === 1 ? "" : "s"} from this day`}
        className="group relative block w-full max-w-md overflow-hidden rounded-sm border border-paper/12 bg-black/30"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={first.url}
          alt={first.caption || `${first.stop} — Nova Scotia`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-sans text-[0.72rem] font-medium text-paper backdrop-blur">
          <StackIcon />
          {count} photo{count === 1 ? "" : "s"}
        </span>
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3">
          <span className="text-left">
            {first.caption && (
              <span className="block font-sans text-[0.9rem] font-light leading-snug text-paper">
                {first.caption}
              </span>
            )}
            <span className="mt-0.5 block font-sans text-[0.66rem] uppercase tracking-wide text-paper/60">
              {first.stop}
              {first.uploader ? ` · ${first.uploader}` : ""}
            </span>
          </span>
          <span className="shrink-0 rounded-full border border-paper/40 bg-black/40 px-2.5 py-1 font-sans text-[0.68rem] font-medium text-paper/90 backdrop-blur transition-colors group-hover:border-amber group-hover:text-amber">
            View →
          </span>
        </span>
      </button>

      {open && (
        <Lightbox
          photos={photos}
          index={idx as number}
          onIndex={setIdx}
          onGo={go}
          onClose={close}
        />
      )}
    </div>
  );
}

function Lightbox({
  photos,
  index,
  onIndex,
  onGo,
  onClose,
}: {
  photos: PhotoMeta[];
  index: number;
  onIndex: (i: number) => void;
  onGo: (d: number) => void;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const [fsSupported, setFsSupported] = useState(false);
  const p = photos[index];
  const count = photos.length;

  useEffect(() => setMounted(true), []);

  // Keyboard nav + body scroll lock while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onGo(1);
      else if (e.key === "ArrowLeft") onGo(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setFsSupported(!!document.fullscreenEnabled);
    const onFs = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFs);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onGo]);

  function toggleFullscreen() {
    const el = rootRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.requestFullscreen?.().catch(() => {});
  }

  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) onGo(dx < 0 ? 1 : -1);
    touchX.current = null;
  }

  if (!mounted) return null;

  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      style={{ height: "100dvh" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-sans text-[0.85rem] tabular-nums text-paper/70">
          {index + 1} / {count}
        </span>
        <div className="flex items-center gap-1">
          {fsSupported && (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFs ? "Exit full screen" : "Full screen"}
              className="rounded-full p-2 text-paper/70 transition-colors hover:bg-white/10 hover:text-paper"
            >
              <FsIcon exit={isFs} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-paper/70 transition-colors hover:bg-white/10 hover:text-paper"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Image */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={p.url}
          src={p.url}
          alt={p.caption || `${p.stop} — Nova Scotia`}
          className="max-h-full max-w-full select-none object-contain"
          draggable={false}
        />

        {count > 1 && (
          <>
            <NavButton side="left" onClick={() => onGo(-1)} />
            <NavButton side="right" onClick={() => onGo(1)} />
          </>
        )}
      </div>

      {/* Caption + dots */}
      <div
        className="px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {p.caption && (
          <p className="mx-auto max-w-2xl font-sans text-[0.98rem] font-light leading-relaxed text-paper/90">
            {p.caption}
          </p>
        )}
        <p className="mt-1 font-sans text-[0.72rem] uppercase tracking-wide text-paper/50">
          {p.stop}
          {p.uploader ? ` · ${p.uploader}` : ""}
        </p>
        {count > 1 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => onIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-amber" : "w-1.5 bg-paper/35 hover:bg-paper/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-paper/80 backdrop-blur transition-colors hover:bg-black/70 hover:text-paper ${
        side === "left" ? "left-2" : "right-2"
      }`}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {side === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

function StackIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="7" y="3" width="14" height="14" rx="2" />
      <path d="M3 7v12a2 2 0 0 0 2 2h12" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function FsIcon({ exit }: { exit: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {exit ? (
        <path d="M9 4v3a2 2 0 0 1-2 2H4M20 9h-3a2 2 0 0 1-2-2V4M15 20v-3a2 2 0 0 1 2-2h3M4 15h3a2 2 0 0 1 2 2v3" />
      ) : (
        <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 0-1 1h-4" />
      )}
    </svg>
  );
}
