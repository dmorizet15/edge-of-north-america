import type { Metadata } from "next";
import Link from "next/link";
import UploadForm, { type DayOption } from "@/components/trip/UploadForm";
import { NS_DAYS } from "@/content/nova-scotia/itinerary";
import { dateForDay } from "@/content/nova-scotia/trip-meta";

export const metadata: Metadata = {
  title: "Nova Scotia — Add Photos",
  robots: { index: false, follow: false },
};

/** Strip the itinerary link/map/tel/bold tokens down to a plain dropdown label. */
function plain(s: string): string {
  return s
    .replace(/\[\[dir\|[^\]]*\]\]/g, "")
    .replace(/\[\[tel\|[^\]]*\]\]/g, "")
    .replace(/\[\[map\|([^\]]*)\]\]/g, (_m, seg: string) => seg.split("|")[0])
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function shortDate(n: string): string {
  const d = new Date(dateForDay(n) + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

/** Private page (behind the passcode gate) to add photos to a day/stop. */
export default function UploadPage() {
  const days: DayOption[] = NS_DAYS.map((d) => ({
    n: d.n,
    label: `Day ${d.n} · ${shortDate(d.n)} · ${plain(d.region)}`,
    stops: ["The day (general)", ...d.stops.map((s) => plain(s.name)).filter(Boolean)],
  }));

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl bg-nearblack px-5 py-12">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-amber">Add photos</span>
        <Link
          href="/trips/nova-scotia/family"
          className="font-sans text-[0.82rem] text-paper/60 underline decoration-paper/25 underline-offset-2 hover:text-paper/90"
        >
          View gallery →
        </Link>
      </div>
      <h1 className="mt-4 font-serif text-[clamp(1.8rem,6vw,2.6rem)] font-normal leading-tight tracking-title text-paper">
        Drop today&rsquo;s photos in
      </h1>
      <p className="mt-3 font-sans text-[0.98rem] font-light leading-relaxed text-paper/70">
        Pick the day and stop, add a caption if you like, and choose or take a
        photo. They&rsquo;ll appear in the family view, grouped by day.
      </p>

      <UploadForm days={days} />
    </main>
  );
}
