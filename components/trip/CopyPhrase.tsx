"use client";

import { useState } from "react";

/**
 * The apple-allergy phrase, made trivially copyable at a restaurant table.
 *
 * Two independent ways to get it, because this one matters: the text itself is
 * `select-all`, so a single tap or click selects the whole phrase ready to
 * copy, and the button uses the async clipboard API where it exists. The button
 * is the ONLY client-side JavaScript added by the reroute work — if it fails or
 * never hydrates, the select-all text still does the job.
 */
export default function CopyPhrase({ phrase }: { phrase: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(phrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard blocked (insecure context, permissions) — the select-all
         text below is the fallback, so there is nothing to recover from. */
    }
  }

  return (
    <div className="mt-4 rounded-sm border border-amber/35 bg-black/30 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow text-amber" style={{ fontSize: "0.58rem" }}>
          Say this at the table
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-full border border-amber/45 px-3 py-1.5 font-sans text-[0.78rem] font-semibold text-amber transition-colors duration-200 hover:border-amber hover:bg-amber/10"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="9" y="9" width="11" height="11" rx="1.6" />
              <path d="M5 15V5a1 1 0 0 1 1-1h9" />
            </svg>
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p
        lang="fr"
        className="mt-3 select-all font-serif text-[clamp(1.08rem,2vw,1.32rem)] font-normal leading-relaxed text-paper"
      >
        {phrase}
      </p>
      <span aria-live="polite" className="sr-only">
        {copied ? "Phrase copied to the clipboard" : ""}
      </span>
    </div>
  );
}
