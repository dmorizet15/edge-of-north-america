/**
 * PHOTOGRAPHY REGISTRY
 * --------------------
 * Single source of truth for every image in the experience.
 *
 * Rules (from the brief):
 *  - Real photography only. No AI-generated scenery. No invented places.
 *  - Never substitute one named location for another.
 *  - Until a licensed/real photo is placed, an elegant placeholder renders
 *    in-frame with the EXACT location, suggested search terms, aspect ratio,
 *    and ideal composition so it can be sourced and dropped in later.
 *
 * To place a real photo: add the file at `src` (in /public/assets/photos)
 * The <EditorialImage> component detects it and swaps automatically.
 */

export type Tone =
  | "predawn"
  | "night"
  | "ocean"
  | "dawn"
  | "rock"
  | "amber"
  | "sunrise"
  | "paper";

export interface Photo {
  /** Public path where the real photograph should live. */
  src: string;
  /** Exact, named location — never generalized. */
  location: string;
  /** Suggested search phrase for sourcing licensed/real imagery. */
  searchTerms: string;
  /** Ideal aspect ratio for the frame. */
  aspectRatio: "16:9" | "3:2" | "4:5" | "2:3" | "1:1" | "21:9";
  /** Ideal composition notes for a photo editor. */
  composition: string;
  /** Emotional tone → drives the placeholder gradient before dawn to first light. */
  tone: Tone;
  /** Licensing / sourcing flag, where relevant. */
  note?: string;
}

export const PHOTOS = {
  cover: {
    src: "/assets/photos/01-cover.jpg",
    location: "Atlantic horizon before dawn (open ocean, North Atlantic)",
    searchTerms: "dark Atlantic ocean horizon before dawn long exposure minimal",
    aspectRatio: "16:9",
    composition:
      "Near-black sea meeting a barely-lighter sky. Horizon low. No land, no subject — only distance and the suggestion of light to come.",
    tone: "predawn",
  },
  roadNorth: {
    src: "/assets/photos/02-road-north.jpg",
    location: "Hudson Valley, New York — two-lane road heading north at dusk",
    searchTerms: "Hudson Valley empty road north dusk headlights autumn",
    aspectRatio: "16:9",
    composition:
      "Empty road drawing to a vanishing point. Low light, headlights just on. The house behind, unseen. Motion implied, not shown.",
    tone: "night",
  },
  ferry: {
    src: "/assets/photos/03-ferry.jpg",
    location: "Marine Atlantic ferry, North Sydney, Nova Scotia at dusk",
    searchTerms: "Marine Atlantic ferry North Sydney dusk departure deck",
    aspectRatio: "16:9",
    composition:
      "The ship as threshold — hull and lit deck against a darkening sky. Water black. A sense of casting off, not arriving.",
    tone: "night",
  },
  landfall: {
    src: "/assets/photos/04-landfall.jpg",
    location: "Port aux Basques, Newfoundland — coastline at first light",
    searchTerms: "Port aux Basques Newfoundland coast dawn first light rocky",
    aspectRatio: "16:9",
    composition:
      "Low rocky coast emerging from dawn mist as the ferry approaches. The reveal frame — this is where the name is earned.",
    tone: "dawn",
  },
  grosMorne: {
    src: "/assets/photos/05-gros-morne.jpg",
    location: "Gros Morne National Park, Newfoundland — the fjord",
    searchTerms: "Gros Morne National Park fjord landlocked cliffs autumn",
    aspectRatio: "21:9",
    composition:
      "Sheer fjord walls plunging into still water. Human scale absent or tiny. Weather soft. Awe through vastness.",
    tone: "ocean",
  },
  westernBrook: {
    src: "/assets/photos/06-western-brook-pond.jpg",
    location: "Western Brook Pond, Gros Morne — billion-year cliffs",
    searchTerms: "Western Brook Pond cliffs boat tour gorge waterfall",
    aspectRatio: "2:3",
    composition:
      "A thousand feet of rock rising straight from black water. Tour boat as a speck for scale, or no boat at all. Vertical, overwhelming.",
    tone: "ocean",
  },
  tablelands: {
    src: "/assets/photos/07-tablelands.jpg",
    location: "The Tablelands, Gros Morne — exposed mantle rock",
    searchTerms: "Tablelands Gros Morne orange peridotite rock barren",
    aspectRatio: "16:9",
    composition:
      "Rust-orange barren plateau — the Earth's mantle in daylight. Alien, quiet, sunlit. Almost no green.",
    tone: "rock",
  },
  vikingTrail: {
    src: "/assets/photos/08-viking-trail.jpg",
    location: "Viking Trail (Route 430), Northern Peninsula, Newfoundland",
    searchTerms: "Viking Trail Newfoundland highway autumn coast empty road",
    aspectRatio: "16:9",
    composition:
      "Ribbon of empty highway between mountain and sea, tundra colour. The far north pulling forward. A Tesla-scale journey, unhurried.",
    tone: "rock",
  },
  lanseAuxMeadows: {
    src: "/assets/photos/09-lanse-aux-meadows.jpg",
    location: "L'Anse aux Meadows, Newfoundland — Norse settlement site",
    searchTerms: "L'Anse aux Meadows Norse site sod huts coastal UNESCO",
    aspectRatio: "3:2",
    composition:
      "Reconstructed sod longhouses low against a wide, windswept coastal meadow. Grey sea beyond. A thousand years pressing in.",
    tone: "ocean",
  },
  twillingate: {
    src: "/assets/photos/10-twillingate.jpg",
    location: "Twillingate, Newfoundland — harbour in fog",
    searchTerms: "Twillingate Newfoundland harbour fog fishing stage colourful",
    aspectRatio: "16:9",
    composition:
      "Working harbour softened by fog. Weathered stages and small boats. Muted colour, salt air made visible.",
    tone: "ocean",
  },
  whales: {
    src: "/assets/photos/11-whales.jpg",
    location: "Notre Dame Bay / Northeast Coast, Newfoundland — humpback",
    searchTerms: "humpback whale Newfoundland fluke tail spout ocean",
    aspectRatio: "16:9",
    composition:
      "A fluke or arched back breaking calm water — realistic, not a full breach. Distance and stillness around it.",
    tone: "ocean",
    note: "Breach is aspirational; spout / fluke / back is the realistic, honest frame.",
  },
  fogo: {
    src: "/assets/photos/12-fogo.jpg",
    location: "Fogo Island, Newfoundland — rocky coast",
    searchTerms: "Fogo Island rocky coast erratic boulders windswept shore",
    aspectRatio: "21:9",
    composition:
      "Raw granite shore meeting open ocean. Enormous erratic boulders. Space, wind, and nothing to do — deliberately.",
    tone: "rock",
  },
  fogoInn: {
    src: "/assets/photos/13-fogo-inn.jpg",
    location: "Fogo Island Inn, Joe Batt's Arm, Fogo Island",
    searchTerms: "Fogo Island Inn architecture stilts modern coastal licensed",
    aspectRatio: "4:5",
    composition:
      "The Inn on stilts against bare rock and sea — modernist lines, warm interior light. An interior-calm frame: a room, a large ocean.",
    tone: "dawn",
    note: "Fogo Island Inn imagery REQUIRES licensing or written permission. Placeholder must remain until cleared.",
  },
  bonavista: {
    src: "/assets/photos/14-bonavista-trinity.jpg",
    location: "Bonavista / Trinity, Newfoundland — sea stacks & village",
    searchTerms: "Bonavista Newfoundland sea stacks Dungeon cliffs Trinity village",
    aspectRatio: "16:9",
    composition:
      "Layered sea stacks and cliff coast, or the postcard-perfect village of Trinity nestled in its harbour. Deep colour, clear light.",
    tone: "dawn",
  },
  capeStMarys: {
    src: "/assets/photos/15-cape-st-marys.jpg",
    location: "Cape St. Mary's Ecological Reserve — Bird Rock gannet colony",
    searchTerms: "Cape St Mary's gannet colony Bird Rock cliffs thousands birds",
    aspectRatio: "3:2",
    composition:
      "A single sea stack white with tens of thousands of gannets, cliff edge in foreground. Vertigo and multitude.",
    tone: "ocean",
  },
  ferryland: {
    src: "/assets/photos/16-ferryland.jpg",
    location: "Ferryland, Newfoundland — the lighthouse point",
    searchTerms: "Ferryland lighthouse picnic headland grassy cliff Avalon",
    aspectRatio: "16:9",
    composition:
      "Grassy headland running out to a small lighthouse, ocean on three sides. A picnic quilt on the cliff — stillness, nowhere to be.",
    tone: "dawn",
  },
  stJohns: {
    src: "/assets/photos/17-st-johns.jpg",
    location: "St. John's, Newfoundland — Jellybean Row houses",
    searchTerms: "St John's Newfoundland row houses colourful Jellybean hill harbour",
    aspectRatio: "16:9",
    composition:
      "Stacked rows of saturated houses climbing the hill above the Narrows. Human warmth after the wild coast. Late-afternoon light.",
    tone: "amber",
  },
  signalHill: {
    src: "/assets/photos/18-signal-hill.jpg",
    location: "Signal Hill & Cabot Tower, St. John's, Newfoundland",
    searchTerms: "Signal Hill Cabot Tower St John's harbour Narrows dusk",
    aspectRatio: "16:9",
    composition:
      "Cabot Tower on the ridge above the Narrows, the whole city and Atlantic below. Golden hour bleeding to blue.",
    tone: "amber",
  },
  capeSpear: {
    src: "/assets/photos/19-cape-spear.jpg",
    location: "Cape Spear, Newfoundland — easternmost point of North America, sunrise",
    searchTerms: "Cape Spear sunrise lighthouse easternmost point North America",
    aspectRatio: "21:9",
    composition:
      "The lighthouse in silhouette as the sun breaks the Atlantic. Warmest, brightest frame in the whole piece — the climax. First light on the continent.",
    tone: "sunrise",
  },
  routeMap: {
    src: "/assets/photos/20-route-map.jpg",
    location: "Custom illustrated route map (not a photograph)",
    searchTerms: "n/a — bespoke SVG, see components/RouteMap.tsx",
    aspectRatio: "3:2",
    composition: "Handled as a bespoke National Geographic-style SVG, not a photo.",
    tone: "paper",
  },
  closing: {
    src: "/assets/photos/21-closing.jpg",
    location: "Argentia ferry, Placentia Bay, Newfoundland — departure at dawn",
    searchTerms: "Argentia ferry Newfoundland departure wake dawn calm sea",
    aspectRatio: "16:9",
    composition:
      "The wake trailing behind the returning ferry, island receding into soft light. What stays. Quiet, warm, resolved.",
    tone: "paper",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
