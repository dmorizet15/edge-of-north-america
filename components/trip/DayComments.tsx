"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CommentMeta } from "@/lib/comments";

/**
 * Public, no-login guestbook thread for one day on the family view. Collapsed by
 * default (a friendly "Notes" toggle with a count); expanding loads that day's
 * comments once. Anyone can post — we just capture the name they type, and
 * remember it in localStorage so repeat visitors don't re-enter it. Optimistic:
 * a new note appears immediately, then is confirmed by the server response.
 */

const NAME_KEY = "ns-guest-name";

function when(ts: number): string {
  const d = new Date(ts);
  const now = Date.now();
  const mins = Math.round((now - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function DayComments({
  day,
  initialCount = 0,
}: {
  day: string;
  initialCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<CommentMeta[]>([]);
  const [count, setCount] = useState(initialCount);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  // Remember the commenter's name across days/visits.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(NAME_KEY);
      if (saved) setName(saved);
    } catch {
      /* storage blocked — fine */
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/nova-scotia/comments?day=${day}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (Array.isArray(data.comments)) {
        setComments(data.comments);
        setCount(data.comments.length);
      }
      setLoaded(true);
    } catch {
      setError("Couldn’t load notes. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }, [day]);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && !loaded && !loading) void load();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedBody = body.trim();
    if (!trimmedName) {
      setError("Please add your name.");
      return;
    }
    if (!trimmedBody) {
      setError("Please write a note.");
      bodyRef.current?.focus();
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      localStorage.setItem(NAME_KEY, trimmedName);
    } catch {
      /* ignore */
    }
    try {
      const res = await fetch("/api/nova-scotia/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, name: trimmedName, body: trimmedBody }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Couldn’t post your note. Try again.");
        return;
      }
      setComments((prev) => [...prev, data.comment as CommentMeta]);
      setCount((c) => c + 1);
      setBody("");
      setLoaded(true);
    } catch {
      setError("Couldn’t post your note. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const label =
    count > 0 ? `Notes · ${count}` : "Leave a note";

  return (
    <div className="mt-6 border-t border-paper/10 pt-4">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="inline-flex items-center gap-2 font-sans text-[0.95rem] font-medium text-paper/75 transition-colors hover:text-amber"
      >
        <ChatIcon />
        {label}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="mt-4">
          {loading && (
            <p className="font-sans text-[0.95rem] font-light text-paper/50">
              Loading notes…
            </p>
          )}

          {loaded && comments.length === 0 && (
            <p className="font-sans text-[0.98rem] font-light text-paper/55">
              No notes yet. Be the first to say hello.
            </p>
          )}

          {comments.length > 0 && (
            <ul className="flex flex-col gap-3.5">
              {comments.map((c) => (
                <li
                  key={c.id}
                  className="rounded-sm border border-paper/10 bg-black/20 px-4 py-3"
                >
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="font-sans text-[1rem] font-medium text-paper">
                      {c.name}
                    </span>
                    <span className="font-sans text-[0.8rem] text-paper/45">
                      {when(c.ts)}
                    </span>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap font-sans text-[1.02rem] font-light leading-relaxed text-paper/85">
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={submit} className="mt-5">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={40}
                autoComplete="name"
                className="w-full rounded-sm border border-paper/15 bg-black/30 px-3.5 py-2.5 font-sans text-[1.02rem] text-paper placeholder:text-paper/40 focus:border-amber/60 focus:outline-none"
              />
              <textarea
                ref={bodyRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Leave a note for Darren & Melissa…"
                rows={3}
                maxLength={1000}
                className="w-full resize-y rounded-sm border border-paper/15 bg-black/30 px-3.5 py-2.5 font-sans text-[1.02rem] leading-relaxed text-paper placeholder:text-paper/40 focus:border-amber/60 focus:outline-none"
              />
            </div>

            {error && (
              <p className="mt-2 font-sans text-[0.9rem] text-red-300/90">{error}</p>
            )}

            <div className="mt-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 font-sans text-[0.95rem] font-semibold text-nearblack transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Posting…" : "Post note"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
