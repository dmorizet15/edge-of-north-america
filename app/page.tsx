import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionDivider from "@/components/ui/SectionDivider";
import Hero from "@/components/sections/Hero";
import TextChapter from "@/components/sections/TextChapter";
import RouteSection from "@/components/sections/RouteSection";
import Ferry from "@/components/sections/Ferry";
import Landfall from "@/components/sections/Landfall";
import PhotoChapter from "@/components/sections/PhotoChapter";
import Whales from "@/components/sections/Whales";
import FogoInn from "@/components/sections/FogoInn";
import CapeSpear from "@/components/sections/CapeSpear";
import WhyThisWorks from "@/components/sections/WhyThisWorks";
import MelissasQuestions from "@/components/sections/MelissasQuestions";
import Closing from "@/components/sections/Closing";
import ActTwoIntro from "@/components/sections/ActTwoIntro";
import DayChapter from "@/components/sections/DayChapter";
import { DAYS } from "@/content/itinerary";

/**
 * EDGE OF NORTH AMERICA
 * The full sequence — darkness → curiosity → movement → ocean → arrival →
 * wonder → stillness → adventure → warmth → first light → reflection → "Let's go."
 */
export default function Home() {
  return (
    <main className="relative bg-nearblack">
      <ScrollProgress />

      {/* 01 — Hero / Cover · before dawn, the name withheld */}
      <Hero />

      {/* 02 — The Question · the pull, named gently */}
      <TextChapter
        index="02"
        chapter="The Question"
        variant="dark"
        lines={[
          "What if the trip you almost talked yourself out of",
          "is the one you'd never forget?",
        ]}
        footnote="Let's take the long way — just once."
      />

      {/* 03 — The Promise · the arc, in three lines */}
      <TextChapter
        index="03"
        chapter="The Promise"
        variant="navy"
        lines={[
          "Darkness, then an ocean.",
          "An island that still feels unfound.",
          "A morning where the light reaches you first.",
        ]}
      />

      {/* 04 — Route Overview · the whole shape, drawn */}
      <RouteSection />

      {/* Road North · the departure before dawn — first coordinate, mainland leaving */}
      <PhotoChapter
        photo="roadNorth"
        index=""
        chapter="The Road North"
        title="The house is asleep. The road is not."
        coord="41.70° N · 73.92° W"
        place="Hudson Valley — before dawn"
        placement="bottom-left"
        scale="md"
        overlay="strong"
      />

      {/* 05 — The Ferry · the crossing you sleep through */}
      <Ferry />

      {/* 06 — Landfall · the name is earned */}
      <Landfall />

      {/* 07 — Gros Morne */}
      <PhotoChapter
        photo="grosMorne"
        index="07"
        chapter="Gros Morne"
        title="The land stands up."
        line="Fjord walls half a mile high, and the water gone still between them."
        coord="49.69° N · 57.75° W"
        place="Gros Morne National Park"
        placement="bottom-left"
        overlay="medium"
      />

      {/* 08 — Western Brook Pond */}
      <PhotoChapter
        photo="westernBrook"
        index="08"
        chapter="Western Brook Pond"
        title="A thousand feet of rock, and no way in."
        coord="49.78° N · 57.83° W"
        place="Landlocked fjord, Gros Morne"
        placement="bottom-left"
        scale="md"
        overlay="strong"
      />

      {/* 09 — Tablelands */}
      <PhotoChapter
        photo="tablelands"
        index="09"
        chapter="The Tablelands"
        title="Rock that belongs miles underground, lying in the sun."
        coord="49.47° N · 57.95° W"
        place="Exposed mantle, Gros Morne"
        placement="bottom-left"
        scale="md"
        overlay="soft"
      />

      <SectionDivider line="Then the road turns north, and keeps going." variant="light" />

      {/* 10 — Viking Trail / Far North */}
      <PhotoChapter
        photo="vikingTrail"
        index="10"
        chapter="The Viking Trail"
        title="The road turns north."
        line="Tundra on one side, the Gulf on the other, and almost no one on it."
        coord="50.60° N · 57.10° W"
        place="Route 430, Northern Peninsula"
        placement="bottom-right"
        overlay="medium"
      />

      {/* 11 — L'Anse aux Meadows */}
      <PhotoChapter
        photo="lanseAuxMeadows"
        index="11"
        chapter="L'Anse aux Meadows"
        title="Someone crossed this ocean a thousand years before you."
        line="The first to arrive stood exactly here."
        coord="51.60° N · 55.53° W"
        place="Norse settlement · UNESCO World Heritage"
        placement="bottom-left"
        scale="md"
        overlay="strong"
      />

      {/* 12 — Twillingate / Northeast Coast */}
      <PhotoChapter
        photo="twillingate"
        index="12"
        chapter="Twillingate"
        title="Where the coast goes quiet."
        line="Fog on the stages, boats asleep at their moorings."
        coord="49.67° N · 54.77° W"
        place="Notre Dame Bay"
        placement="bottom-left"
        overlay="medium"
      />

      {/* 13 — Whales */}
      <Whales />

      {/* 14 — Fogo Island */}
      <PhotoChapter
        photo="fogo"
        index="14"
        chapter="Fogo Island"
        title="One of the corners of the earth."
        line="Granite, open water, and a day with nothing in it."
        coord="49.67° N · 54.18° W"
        place="Fogo Island"
        placement="bottom-left"
        overlay="medium"
      />

      {/* 15 — Fogo Island Inn / Restorative Luxury */}
      <FogoInn />

      {/* 16 — Bonavista / Trinity */}
      <PhotoChapter
        photo="bonavista"
        index="16"
        chapter="Bonavista · Trinity"
        title="Sea stacks and a painted harbour."
        line="Where the cliffs break into the Atlantic, and a village hides in the lee."
        coord="48.65° N · 53.11° W"
        place="Bonavista Peninsula"
        placement="bottom-right"
        overlay="medium"
      />

      {/* 17 — Cape St. Mary's */}
      <PhotoChapter
        photo="capeStMarys"
        index="17"
        chapter="Cape St. Mary's"
        title="A rock alive with wings."
        line="Tens of thousands of gannets on a single stack of stone."
        coord="46.82° N · 54.18° W"
        place="Bird Rock · Ecological Reserve"
        placement="bottom-left"
        scale="md"
        overlay="medium"
      />

      {/* 18 — Ferryland */}
      <PhotoChapter
        photo="ferryland"
        index="18"
        chapter="Ferryland"
        title="Nowhere to be."
        line="A picnic on the headland, the ocean on three sides, the afternoon going nowhere."
        coord="47.03° N · 52.87° W"
        place="The Avalon"
        placement="bottom-left"
        overlay="soft"
      />

      {/* 19 — St. John's */}
      <PhotoChapter
        photo="stJohns"
        index="19"
        chapter="St. John's"
        title="The oldest street in North America, still lit."
        line="Row houses stacked like paint chips above the Narrows."
        coord="47.56° N · 52.71° W"
        place="St. John's, Newfoundland"
        placement="bottom-left"
        overlay="medium"
      />

      {/* 20 — Signal Hill */}
      <PhotoChapter
        photo="signalHill"
        index="20"
        chapter="Signal Hill"
        title="The whole Atlantic, below you."
        line="Where the first signal ever sent across an ocean came ashore."
        coord="47.57° N · 52.68° W"
        place="Cabot Tower, St. John's"
        placement="bottom-right"
        overlay="medium"
      />

      <SectionDivider
        line="Before dawn, one more drive. Twenty minutes, to the edge."
        variant="light"
      />

      {/* 21 — Cape Spear · the climax */}
      <CapeSpear />

      {/* 22 — Why This Works · the reassurance, spoken plainly */}
      <WhyThisWorks />

      {/* 23 — Melissa's Questions · answered quietly */}
      <MelissasQuestions />

      {/* 24 — Closing · the return, and the only question left */}
      <Closing />

      {/* ─────────────── ACT TWO · The Journey, Day by Day ─────────────── */}
      <ActTwoIntro />
      {DAYS.map((day) => (
        <DayChapter key={day.n} day={day} />
      ))}
    </main>
  );
}
