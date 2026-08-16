"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";

export interface DayOption {
  n: string;
  label: string;
  stops: string[];
}

type Phase = "idle" | "working" | "done" | "error";

/**
 * Mobile-first photo uploader for the private Nova Scotia view. Photos go
 * straight to Vercel Blob via a short-lived client token (so large phone photos
 * aren't capped by the serverless body limit); metadata is then written to KV.
 */
export default function UploadForm({
  days,
  defaultDay,
}: {
  days: DayOption[];
  defaultDay?: string;
}) {
  const initial =
    defaultDay && days.some((d) => d.n === defaultDay) ? defaultDay : days[0]?.n ?? "01";
  const [dayN, setDayN] = useState(initial);
  const [stop, setStop] = useState(
    days.find((d) => d.n === initial)?.stops[0] ?? "The day (general)"
  );
  const [uploader, setUploader] = useState("Darren");
  const [caption, setCaption] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const stops = useMemo(
    () => days.find((d) => d.n === dayN)?.stops ?? ["The day (general)"],
    [days, dayN]
  );

  function onDayChange(n: string) {
    setDayN(n);
    const first = days.find((d) => d.n === n)?.stops[0] ?? "The day (general)";
    setStop(first);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const files = fileRef.current?.files;
    if (!files || files.length === 0) {
      setPhase("error");
      setMsg("Choose or take at least one photo first.");
      return;
    }
    setPhase("working");
    setMsg("");
    setTotal(files.length);
    setDone(0);
    setPct(0);

    let uploaded = 0;
    try {
      for (const file of Array.from(files)) {
        const safe = file.name.replace(/[^\w.\-]+/g, "-").slice(-80) || "photo.jpg";

        // Bound the whole per-file upload so a stalled request can't hang
        // forever (the blob client otherwise retries ~10× with backoff, which
        // looks like a permanent freeze). 2 minutes is generous for a phone
        // photo on a slow connection.
        setStep("Uploading photo");
        setPct(0);
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 120_000);

        let blob;
        try {
          blob = await upload(`nova-scotia/${dayN}/${Date.now()}-${safe}`, file, {
            access: "public",
            handleUploadUrl: "/api/nova-scotia/blob-upload",
            clientPayload: JSON.stringify({ day: dayN, stop, uploader }),
            abortSignal: controller.signal,
            onUploadProgress: (p) => setPct(Math.round(p.percentage)),
          });
        } catch (uErr) {
          if (uErr instanceof Error && uErr.name === "AbortError") {
            throw new Error(
              `The upload stalled and timed out at ${pct}%. If you opened this from a "…vercel.app/…-projects.vercel.app" preview link, use the main site (edge-of-north-america.vercel.app) instead — preview links are login-protected and block the upload.`
            );
          }
          throw uErr;
        } finally {
          clearTimeout(timer);
        }

        setStep("Saving details");
        const saveController = new AbortController();
        const saveTimer = setTimeout(() => saveController.abort(), 20_000);
        let res: Response;
        try {
          res = await fetch("/api/nova-scotia/photos", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ day: dayN, stop, uploader, caption, url: blob.url }),
            signal: saveController.signal,
          });
        } finally {
          clearTimeout(saveTimer);
        }
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || `Could not save that photo's details (HTTP ${res.status}).`);
        }
        uploaded += 1;
        setDone(uploaded);
      }
      setStep("");
      setPhase("done");
      setMsg(
        `${uploaded} photo${uploaded === 1 ? "" : "s"} added to Day ${dayN}. They're in the family view now.`
      );
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setStep("");
      setPhase("error");
      setMsg(
        (uploaded > 0 ? `${uploaded} uploaded, then ` : "") +
          (err instanceof Error ? err.message : "Upload failed. Try again.")
      );
    }
  }

  const working = phase === "working";
  const field =
    "w-full rounded-sm border border-paper/20 bg-black/30 px-4 py-3.5 font-sans text-[1.02rem] text-paper focus:border-amber focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="mt-9 flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-paper/60" style={{ fontSize: "0.62rem" }}>Day</span>
        <select className={field} value={dayN} onChange={(e) => onDayChange(e.target.value)}>
          {days.map((d) => (
            <option key={d.n} value={d.n}>{d.label}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="eyebrow text-paper/60" style={{ fontSize: "0.62rem" }}>Stop</span>
        <select className={field} value={stop} onChange={(e) => setStop(e.target.value)}>
          {stops.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-2">
        <span className="eyebrow text-paper/60" style={{ fontSize: "0.62rem" }}>From</span>
        <div className="grid grid-cols-2 gap-2">
          {["Darren", "Melissa"].map((who) => (
            <button
              key={who}
              type="button"
              onClick={() => setUploader(who)}
              aria-pressed={uploader === who}
              className={`rounded-sm border px-4 py-3 font-sans text-[0.98rem] transition-colors ${
                uploader === who
                  ? "border-amber bg-amber/15 text-paper"
                  : "border-paper/20 bg-black/20 text-paper/60 hover:border-paper/40"
              }`}
            >
              {who}
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="eyebrow text-paper/60" style={{ fontSize: "0.62rem" }}>Caption (optional)</span>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={400}
          placeholder="A line about this one…"
          className={field}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="eyebrow text-paper/60" style={{ fontSize: "0.62rem" }}>Photos</span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="w-full rounded-sm border border-dashed border-paper/25 bg-black/20 px-4 py-4 font-sans text-[0.95rem] text-paper/80 file:mr-4 file:rounded-sm file:border-0 file:bg-amber file:px-4 file:py-2 file:font-semibold file:text-nearblack"
        />
      </label>

      <button
        type="submit"
        disabled={working}
        className="mt-1 w-full rounded-sm bg-amber px-5 py-4 font-sans text-[1rem] font-semibold tracking-wide text-nearblack transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
      >
        {working
          ? step === "Saving details"
            ? `Saving ${done + 1}/${total}…`
            : `${step || "Uploading"} ${done + 1}/${total} · ${pct}%…`
          : "Add to the trip"}
      </button>

      {msg && (
        <p
          className={`font-sans text-[0.92rem] font-light leading-relaxed ${
            phase === "error" ? "text-amber" : "text-ice/90"
          }`}
          role="status"
        >
          {msg}
        </p>
      )}

      {/* After a successful upload there needs to be somewhere to go — back to
          the day you were just photographing, not a dead end on this form. */}
      {phase === "done" && (
        <div className="flex flex-wrap gap-2.5">
          <Link
            href={`/trips/nova-scotia#day-${dayN}`}
            className="inline-flex items-center gap-2 rounded-full border border-amber/45 bg-amber/[0.08] px-4 py-2.5 font-sans text-[0.88rem] font-semibold text-amber transition-colors hover:border-amber hover:bg-amber/15"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Day {dayN}
          </Link>
          <Link
            href="/trips/nova-scotia/family"
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2.5 font-sans text-[0.88rem] font-medium text-paper/75 transition-colors hover:border-paper/45 hover:text-paper"
          >
            See it in the gallery
          </Link>
        </div>
      )}
    </form>
  );
}
