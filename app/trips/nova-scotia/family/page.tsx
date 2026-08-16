import type { Metadata } from "next";
import ScrollRouteMap from "@/components/trip/ScrollRouteMap";
import DayGallery from "@/components/trip/DayGallery";
import DayComments from "@/components/trip/DayComments";
import EditorialImage from "@/components/ui/EditorialImage";
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
        <span className="block eyebrow text-amber">Follow along</span>
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

        {/* The plan changed mid-trip — say so here too, so the family aren't
            following an itinerary that stopped being true on the 16th. */}
        <div className="mt-7 max-w-2xl rounded-sm border border-amber/30 bg-amber/[0.06] p-5">
          <span className="eyebrow text-amber" style={{ fontSize: "0.6rem" }}>
            The plan changed · Aug 16
          </span>
          <p className="mt-2.5 font-sans text-[1rem] font-light leading-relaxed text-paper/80">
            The ferry home from Yarmouth to Bar Harbor was cancelled by the
            carrier, so the last three days turned west instead — across New
            Brunswick, a night on Lake Témiscouata, a day inside the walls of Old
            Québec, and home to Salt Point on the eighteenth. Days 10 to 12 below
            are the road actually driven.
          </p>
        </div>
      </section>

      {/* The whole route, drawn */}
      <section className="mx-auto mt-14 max-w-6xl px-[clamp(1.3rem,5vw,4.5rem)]">
        <div className="rounded-sm border border-paper/10 bg-black/20 p-4">
          <ScrollRouteMap
            points={NS_WAYPOINTS}
            mapId="ns-route"
            variant="route"
            ariaLabel="The route: up the Maine coast into Canada, around Nova Scotia to Cape Breton, then west through New Brunswick to Québec City and south home to Salt Point."
          />
        </div>
      </section>

      {/* Day by day */}
      <section className="mx-auto mt-16 max-w-6xl px-[clamp(1.3rem,5vw,4.5rem)] pb-[16vh]">
        <ol className="flex flex-col gap-8">
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
                className={`overflow-hidden rounded-lg border ${
                  isCurrent
                    ? "border-amber/60"
                    : "border-paper/10"
                }`}
              >
                {/* Dramatic full-bleed day hero — same treatment as the private view */}
                <div className="relative h-[62vh] max-h-[820px] min-h-[440px] w-full overflow-hidden">
                  {day.photo && (
                    <EditorialImage photo={day.photo} fill drift showBrief={false} />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nearblack via-nearblack/45 to-black/20" />

                  {(isCurrent || isPast) && (
                    <div className="absolute right-4 top-4">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-wide text-nearblack shadow-lg shadow-black/40">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-nearblack/70" aria-hidden />
                          You are here
                        </span>
                      ) : (
                        <span className="rounded-full bg-black/50 px-3 py-1 text-[0.66rem] font-medium uppercase tracking-wide text-paper/80 backdrop-blur">
                          Done
                        </span>
                      )}
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-[clamp(1.4rem,4vw,3.25rem)]">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="eyebrow tabular-nums text-amber">Day {day.n}</span>
                      <span className="h-px w-7 bg-paper/40" aria-hidden />
                      <span className="eyebrow tabular-nums text-paper/85">{longDate(day.n)}</span>
                      <span className="h-px w-7 bg-paper/40" aria-hidden />
                      <span className="eyebrow text-paper/75">{plain(day.region)}</span>
                    </div>
                    <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,3.4rem)] font-normal leading-[1.03] tracking-title text-paper drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                      {plain(day.title)}
                    </h2>
                    {subtitle && (
                      <p className="mt-3 max-w-2xl font-serif text-[clamp(1.15rem,2vw,1.5rem)] font-light italic leading-relaxed text-paper/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                        {subtitle}
                      </p>
                    )}
                    <p className="eyebrow mt-4 text-paper/65">{plain(day.leg)}</p>
                  </div>
                </div>

                {/* Body — stops, family photos, and the guestbook, one clean panel */}
                <div className={`p-5 sm:p-7 ${isCurrent ? "bg-amber/[0.05]" : "bg-black/20"}`}>
                  {day.stops.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
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

                  {hasPhotos && (
                    <div className={day.stops.length > 0 ? "mt-6" : ""}>
                      <span className="eyebrow text-amber">From the road</span>
                      <div className="mt-3 max-w-lg">
                        <DayGallery photos={photos} />
                      </div>
                    </div>
                  )}

                  <DayComments day={day.n} initialCount={commentCounts[day.n] ?? 0} />
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
