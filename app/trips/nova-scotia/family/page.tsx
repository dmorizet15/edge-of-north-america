import type { Metadata } from "next";
import ScrollRouteMap from "@/components/trip/ScrollRouteMap";
import DayGallery from "@/components/trip/DayGallery";
import DayComments from "@/components/trip/DayComments";
import BackButton from "@/components/trip/BackButton";
import { NS_DAYS } from "@/content/nova-scotia/itinerary";
import { NS_WAYPOINTS } from "@/content/nova-scotia/route";
import { NS_TRIP, dateForDay, tripStatus, statusLine } from "@/content/nova-scotia/trip-meta";
import { getAllPhotosByDay } from "@/lib/photos";
import { getAllCommentCountsByDay } from "@/lib/comments";

export const metadata: Metadata = {
  title: "Nova Scotia — Follow Along",
  description: "The Nova Scotia 2026 road trip, day by day, with photos from the road.",
};

// Live data (photos + today's date) — never statically cached.
export const dynamic = "force-dynamic";

/** Plain-text label from itinerary token/markdown copy. */
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

function longDate(n: string): string {
  return new Date(dateForDay(n) + "T00:00:00Z").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function FamilyView() {
  const today = new Date().toISOString().slice(0, 10);
  const status = tripStatus(today);
  const [photosByDay, commentCounts] = await Promise.all([
    getAllPhotosByDay(),
    getAllCommentCountsByDay(),
  ]);
  const totalPhotos = Object.values(photosByDay).reduce((n, list) => n + list.length, 0);

  return (
    <main className="min-h-screen w-full bg-nearblack">
      {/* Header + you-are-here */}
      <section className="mx-auto max-w-6xl px-[clamp(1.3rem,5vw,4.5rem)] pt-[8vh]">
        <BackButton />
        <span className="mt-8 block eyebrow text-amber">Follow along</span>
        <h1 className="mt-5 font-serif text-[clamp(2.2rem,7vw,4rem)] font-normal leading-[1.03] tracking-title text-paper">
          Nova Scotia, day by day
        </h1>
        <p className="mt-5 font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] font-light italic leading-relaxed text-paper/85">
          {NS_TRIP.title.replace("Nova Scotia — ", "")} · August 7–18, 2026.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-amber/40 bg-amber/[0.08] px-4 py-2">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-amber" aria-hidden />
            <span className="font-sans text-[1.02rem] font-medium text-paper/90">
              {statusLine(status)}
            </span>
          </div>
          {totalPhotos > 0 && (
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-4 py-2 font-sans text-[1rem] font-light text-paper/75">
              {totalPhotos} photo{totalPhotos === 1 ? "" : "s"} so far
            </span>
          )}
        </div>
        <p className="mt-6 max-w-2xl font-sans text-[1.08rem] font-light leading-relaxed text-paper/70">
          Tap any day&rsquo;s photo to open the album — it plays through on its own,
          or use the arrows. Scroll down and leave a note under any day; no sign-in,
          just add your name.
        </p>
      </section>

      {/* The whole route, drawn */}
      <section className="mx-auto mt-14 max-w-6xl px-[clamp(1.3rem,5vw,4.5rem)]">
        <div className="rounded-sm border border-paper/10 bg-black/20 p-4">
          <ScrollRouteMap
            points={NS_WAYPOINTS}
            mapId="ns-route"
            variant="route"
            ariaLabel="The Nova Scotia route: up the Maine coast into Canada, around Nova Scotia to Cape Breton, and home by ferry."
          />
        </div>
      </section>

      {/* Day by day */}
      <section className="mx-auto mt-16 max-w-6xl px-[clamp(1.3rem,5vw,4.5rem)] pb-[16vh]">
        <ol className="flex flex-col gap-5">
          {NS_DAYS.map((day) => {
            const iso = dateForDay(day.n);
            const isPast = iso < status.todayISO;
            const isCurrent = status.phase === "during" && Number(day.n) === status.currentDay;
            const photos = photosByDay[day.n] ?? [];
            const hasPhotos = photos.length > 0;
            const subtitle = plain(day.subtitle);
            return (
              <li
                key={day.n}
                className={`rounded-sm border p-5 sm:p-7 ${
                  isCurrent
                    ? "border-amber/60 bg-amber/[0.06]"
                    : isPast
                      ? "border-paper/10 bg-black/20"
                      : "border-paper/10 bg-black/10"
                }`}
              >
                <div
                  className={
                    hasPhotos
                      ? "grid gap-6 md:gap-9 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start"
                      : ""
                  }
                >
                  {/* Text column */}
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="eyebrow tabular-nums text-amber">Day {day.n}</span>
                      <span className="h-px w-6 bg-paper/25" aria-hidden />
                      <span
                        className={`eyebrow ${isPast && !isCurrent ? "text-paper/50" : "text-paper/80"}`}
                      >
                        {longDate(day.n)}
                      </span>
                      {isCurrent && (
                        <span className="rounded-full bg-amber px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-nearblack">
                          You are here
                        </span>
                      )}
                      {isPast && !isCurrent && (
                        <span className="text-[0.66rem] uppercase tracking-wide text-paper/40">
                          done
                        </span>
                      )}
                    </div>

                    <h2
                      className={`mt-3 font-serif text-[clamp(1.4rem,2.6vw,2rem)] font-normal leading-snug tracking-title ${
                        isPast && !isCurrent ? "text-paper/75" : "text-paper"
                      }`}
                    >
                      {plain(day.title)}
                    </h2>
                    <p className="mt-2 font-sans text-[1.05rem] font-light leading-snug text-paper/65">
                      {plain(day.region)} · {plain(day.leg)}
                    </p>

                    {subtitle && (
                      <p className="mt-4 max-w-2xl font-serif text-[clamp(1.12rem,1.8vw,1.35rem)] font-light leading-relaxed text-paper/80">
                        {subtitle}
                      </p>
                    )}

                    {day.stops.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {day.stops.map((s, i) => (
                          <li
                            key={i}
                            className="rounded-full border border-paper/15 px-3.5 py-1.5 font-sans text-[0.95rem] font-light text-paper/80"
                          >
                            {plain(s.name)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Photo column (only when the day has photos) */}
                  {hasPhotos && (
                    <div className="lg:pt-1">
                      <DayGallery photos={photos} />
                    </div>
                  )}
                </div>

                <DayComments day={day.n} initialCount={commentCounts[day.n] ?? 0} />
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
