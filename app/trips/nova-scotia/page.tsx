import type { Metadata } from "next";
import Link from "next/link";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionDivider from "@/components/ui/SectionDivider";
import TextChapter from "@/components/sections/TextChapter";
import Reveal from "@/components/ui/Reveal";
import ChapterLabel from "@/components/ui/ChapterLabel";
import EditorialImage from "@/components/ui/EditorialImage";
import SceneChapter from "@/components/trip/SceneChapter";
import ScrollRouteMap from "@/components/trip/ScrollRouteMap";
import Starfield from "@/components/trip/Starfield";
import TripDayChapter from "@/components/trip/TripDayChapter";
import TwoPaths from "@/components/trip/TwoPaths";
import { NS_PHOTOS } from "@/content/nova-scotia/photos";
import { NS_WAYPOINTS } from "@/content/nova-scotia/route";
import { NS_DAYS, NS_GLANCE, NS_ROUTE_NOTES } from "@/content/nova-scotia/itinerary";

export const metadata: Metadata = {
  title: "Nova Scotia — The Ocean Road",
  description:
    "The warmer, easier one: ocean roads and historic inns, seafood and the Cabot Trail, dark skies over Cape Breton, and a ferry home across the Gulf of Maine. A 12-day 2026 road trip (Aug 7–18).",
};

/**
 * NOVA SCOTIA — THE OCEAN ROAD
 * A short cinematic overview (the emotional case for the easy trip), then the
 * practical day-by-day guide. Same premium visual system as Newfoundland, in a
 * warmer register — closer, gentler, and easy to say yes to.
 */
export default function NovaScotiaTrip() {
  // The cinematic overview ("sales pitch") is hidden by default; set the Vercel
  // env var SHOW_INTRO=true to show it. Read at build time — toggling it takes
  // a redeploy. None of the intro content or styling is removed, only gated.
  const showIntro = process.env.SHOW_INTRO === "true";

  return (
    <main className="relative bg-nearblack">
      <ScrollProgress />

      {/* Add-photos button — only on this gated private view (so family never
          sees it). Fixed so it's always reachable while scrolling the trip. */}
      <Link
        href="/trips/nova-scotia/upload"
        aria-label="Add photos to the trip"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex items-center gap-2 rounded-full bg-amber px-4 py-3 font-sans text-[0.9rem] font-semibold text-nearblack shadow-lg shadow-black/50 transition-all duration-200 hover:brightness-110 active:scale-95"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4l-1.5-2z" />
          <circle cx="12" cy="13" r="3.2" />
        </svg>
        Add photos
      </Link>

      {/* ─────────── PART ONE · The cinematic overview (gated by SHOW_INTRO) ─────────── */}
      {showIntro && (
        <>
      {/* 01 — Hero · The Ocean Road */}
      <SceneChapter
        photo={NS_PHOTOS.cover}
        index="01"
        chapter="Nova Scotia"
        title={
          <>
            The Ocean
            <br />
            Road
          </>
        }
        line="Warmer, closer, and easy to say yes to — a coast you drive with the windows down."
        placement="center"
        scale="xl"
        overlay="medium"
        priority
        parallax
      />

      {/* 02 — Why this feels easier */}
      <TextChapter
        index="02"
        chapter="Why this one feels easier"
        variant="navy"
        lines={[
          "No overnight ferry to catch. No dark, pre-dawn start.",
          "Two longer drives — the first day and the reposition — and the rest are short.",
          "Historic inns, warm seafood, and a ferry that brings you home.",
        ]}
        footnote="Newfoundland is the expedition. This is the one you take because it's easy — and it turns out to be unforgettable anyway."
      />

      {/* 03 — The gentle northern approach */}
      <SceneChapter
        photo={NS_PHOTOS.portland}
        index="03"
        chapter="The approach"
        title="North, the soft way"
        line="Up the Maine coast — a lobster roll under Portland Head Light — then on to Bangor for the night, and a road-crossing at Calais you barely feel."
        coord="44.80° N · 68.77° W"
        place="Bangor, Maine — the first night"
        placement="bottom-left"
        scale="lg"
        overlay="medium"
      />

      {/* 04 — The Bay of Fundy */}
      <SceneChapter
        photo={NS_PHOTOS.hopewell}
        index="04"
        chapter="Bay of Fundy"
        title="Walk the floor of the ocean."
        line="The highest tides on earth — stand on the sea bed at noon, and watch four storeys of water take it back by dark. Coastal villages, scallops, and the first dark sky."
        coord="45.82° N · 64.58° W"
        place="Hopewell Rocks · New Brunswick"
        placement="bottom-left"
        scale="lg"
        overlay="strong"
      />

      <SectionDivider
        line="Then across into Nova Scotia — through orchards, dykelands, and a valley that makes the wine."
        variant="light"
      />

      {/* 05 — Halifax & the South Shore */}
      <SceneChapter
        photo={NS_PHOTOS.lunenburg}
        index="05"
        chapter="Halifax & the South Shore"
        title="A city you can walk, a coast you can photograph."
        line="Halifax's waterfront and a day out of the car; then Peggy's Cove at first light, Mahone Bay's three churches, and Lunenburg's painted, UNESCO waterfront."
        coord="44.38° N · 64.31° W"
        place="Old Town Lunenburg · Nova Scotia"
        placement="bottom-right"
        scale="lg"
        overlay="medium"
      />

      {/* 06 — Cape Breton & the Cabot Trail */}
      <SceneChapter
        photo={NS_PHOTOS.cabotWest}
        index="06"
        chapter="Cape Breton & the Cabot Trail"
        title="The road that everyone means."
        line="The Cabot Trail's switchbacks and the Skyline at golden hour, Bell's hydrofoils and flight over Bras d'Or Lake, and the darkest skies of the whole trip."
        coord="46.68° N · 60.39° W"
        place="Cape Breton Highlands · Nova Scotia"
        placement="bottom-left"
        scale="lg"
        overlay="medium"
      />

      {/* Tonight's Sky — the dark-sky promise (honest, weather-dependent) */}
      <DarkSkyBand />

      {/* 07 — The route, drawn + the trip at a glance */}
      <RouteBand />

      {/* ─────────── PART TWO · The Journey, Day by Day ─────────── */}
      <ActTwoIntroNS />
        </>
      )}
      {/* Days 1–10 render normally; Days 11–12 are replaced by the Two Paths
          final-night branch (the decision made Aug 15). NS_DAYS keeps all 12
          days of data intact — the branch just renders the last two. */}
      {NS_DAYS.filter((day) => Number(day.n) <= 10).map((day) => (
        <TripDayChapter
          key={day.n}
          day={day}
          addPhotoHref={`/trips/nova-scotia/upload?day=${day.n}`}
        />
      ))}
      <TwoPaths />

      {/* Closing */}
      <SceneChapter
        photo={NS_PHOTOS.closing}
        index="—"
        chapter="Home by a different sea"
        title="Say yes to the easy one."
        line="Twelve days, one ocean crossing home, and the trip you'll keep talking about. August 7–18, 2026 — when do we go?"
        placement="center"
        scale="lg"
        overlay="strong"
        drift
      />
    </main>
  );
}

/**
 * Tonight's Sky — the recurring dark-sky theme, introduced honestly. Never
 * promises stars; names the best weather-dependent candidates along the route.
 */
function DarkSkyBand() {
  const candidates = [
    "Fundy National Park — a certified Dark Sky Preserve",
    "Bras d'Or Lake, around Baddeck",
    "Cape Breton Highlands, the Gulf side",
    "Ingonish & the northern Highlands — the best bet",
    "Cape Forchu & the coast near Yarmouth",
    "The Maine coast on the ferry day — an optional last look",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-nearblack">
      <div className="relative h-[42vh] min-h-[300px] w-full overflow-hidden">
        <EditorialImage photo={NS_PHOTOS.nightSky} fill drift showBrief={false} />
        <Starfield count={130} seed={17} className="mix-blend-screen" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nearblack via-nearblack/50 to-black/25" />
      </div>
      <div className="mx-auto max-w-5xl px-[clamp(1.4rem,5vw,4.5rem)] py-[10vh]">
        <Reveal>
          <ChapterLabel index="✦" label="Tonight's Sky" align="center" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-8 max-w-3xl text-center font-serif text-[clamp(1.8rem,4vw,3rem)] font-normal leading-[1.1] tracking-title text-paper">
            Six chances at a sky you can&rsquo;t see from home.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-prose text-center font-sans text-[clamp(1.08rem,1.7vw,1.28rem)] font-light leading-relaxed text-paper/75">
            No one can promise stars — only clear, moonless nights can. But this
            route strings together some of the darkest skies in the Maritimes,
            and on the nights it works, it&rsquo;s the kind of sky most people
            never get to stand under. Each day&rsquo;s guide flags its best
            window under <span className="text-ice">Tonight&rsquo;s Sky</span>.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {candidates.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ice/80" aria-hidden />
                <span className="font-sans text-[1.05rem] font-light leading-relaxed text-paper/80">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** The whole shape, drawn, plus the trip's headline numbers. */
function RouteBand() {
  return (
    <section className="w-full bg-nearblack px-[clamp(1.2rem,5vw,5rem)] py-[16vh]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <ChapterLabel index="07" label="The Ocean Road, drawn" align="center" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-8 max-w-3xl text-center font-serif text-[clamp(1.8rem,4vw,3rem)] font-normal leading-[1.1] tracking-title text-paper">
            Out by road, home by sea — the way back is a different water than the
            way out.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-16">
            <ScrollRouteMap
              points={NS_WAYPOINTS}
              mapId="ns-route"
              variant="route"
              ariaLabel="Route map: Salt Point, New York, north up the Maine coast into Canada, a loop around Nova Scotia to Cape Breton, and home by ferry from Yarmouth to Bar Harbor, Maine."
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
            {NS_ROUTE_NOTES.map((n) => (
              <div key={n.k} className="flex flex-col items-center gap-3 text-center">
                <span className="eyebrow text-amber" style={{ fontSize: "0.6rem" }}>
                  {n.k}
                </span>
                <span className="h-px w-6 bg-paper/20" />
                <p className="max-w-[16rem] font-sans text-[1.02rem] font-light leading-relaxed text-paper/70">
                  {n.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {NS_GLANCE.map((s) => (
              <div key={s.v} className="flex max-w-[10rem] flex-col items-center gap-1 text-center">
                <span className="font-serif text-[clamp(1.8rem,3.2vw,2.6rem)] tabular-nums text-paper">
                  {s.k}
                </span>
                <span className="eyebrow text-paper/50" style={{ fontSize: "0.6rem" }}>
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The act break into the practical guide — Nova Scotia's warmer register. */
function ActTwoIntroNS() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-nearblack px-6 py-[18vh] text-center">
      <Reveal>
        <span className="eyebrow text-amber">Part Two</span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-8 font-serif text-[clamp(2.4rem,7vw,5.5rem)] font-normal leading-[1.0] tracking-title text-paper">
          The Journey,
          <br />
          Day by Day
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mx-auto mt-10 h-px w-16 bg-paper/25" />
      </Reveal>
      <Reveal delay={0.28}>
        <p className="mt-10 max-w-prose font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] font-light italic leading-relaxed text-paper/80">
          Twelve days from Salt Point to the Cabot Trail and home across the
          Gulf of Maine — August 7 to 18, 2026, timed around the Yarmouth ferry.
          Planned around the meals, the views, the rest, and the charging. Each
          day is a luxury guide, not a spreadsheet: where to wake, where to stop,
          where to look up.
        </p>
      </Reveal>
    </section>
  );
}
