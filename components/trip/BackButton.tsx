"use client";

import { useRouter } from "next/navigation";

/**
 * A small "back" control for the public family view. Returns to wherever the
 * visitor came from (browser history); if there's no history to go back to
 * (the page was opened directly or from a fresh tab), it falls back to `href`.
 */
export default function BackButton({
  href = "/",
  label = "Back",
}: {
  href?: string;
  label?: string;
}) {
  const router = useRouter();

  function onBack() {
    // history.length > 1 means there's a page to return to within this tab.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(href);
    }
  }

  return (
    <button
      type="button"
      onClick={onBack}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-black/20 px-4 py-2 font-sans text-[0.88rem] font-medium text-paper/75 transition-colors hover:border-amber hover:text-amber"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  );
}
