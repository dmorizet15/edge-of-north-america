import type { Photo } from "@/content/photos";

/**
 * NOVA SCOTIA — PHOTOGRAPHY REGISTRY
 * ----------------------------------
 * Single source of truth for every image in the Nova Scotia experience.
 * Same rules as the Newfoundland registry (see content/photos.ts):
 *
 *  - Real photography only. No AI scenery. No invented or substituted places.
 *  - Every frame names its EXACT location, suggested search terms, aspect
 *    ratio, and ideal composition, so a real photo can be dropped in later.
 *  - To place a real photo: add the file at `src` inside /public/assets/photos.
 *    <EditorialImage> detects it and fades it in automatically.
 *
 * Tone selection leans to the warmer half of the shared palette — dawn, amber,
 * rock, sunrise, paper — so Nova Scotia reads easier and gentler than the
 * predawn Newfoundland arc, using the very same visual system.
 */

export const NS_PHOTOS = {
  cover: {
    src: "/assets/photos/ns/01-cover.jpg",
    location: "Cabot Trail coastal highway, Cape Breton Highlands, Nova Scotia — morning",
    searchTerms:
      "Cabot Trail coastal road ocean cliffs Cape Breton Highlands morning light aerial",
    aspectRatio: "16:9",
    composition:
      "A ribbon of road curving along a warm, sunlit Atlantic coast — headlands stacking into soft haze. Inviting, open, unhurried. The ocean road as a promise, not a dare.",
    tone: "dawn",
  },
  portland: {
    src: "/assets/photos/ns/02-portland.jpg",
    location: "Old Port, Portland, Maine — cobblestone waterfront at golden hour",
    searchTerms:
      "Portland Maine Old Port cobblestone waterfront wharf golden hour boats brick",
    aspectRatio: "16:9",
    composition:
      "Warm brick and cobblestone, working wharves and masts, late light on the harbour. The easy first evening — New England at its most welcoming.",
    tone: "amber",
  },
  standrews: {
    src: "/assets/photos/ns/03-st-andrews.jpg",
    location: "St. Andrews by-the-Sea, New Brunswick — the wharf on Passamaquoddy Bay",
    searchTerms:
      "St Andrews by-the-Sea New Brunswick waterfront wharf Passamaquoddy Bay Algonquin",
    aspectRatio: "3:2",
    composition:
      "A genteel seaside town easing into evening — the long wharf, calm tidal bay, whale-watch boats at rest. First Canadian coast, soft and unhurried.",
    tone: "dawn",
  },
  hopewell: {
    src: "/assets/photos/ns/04-hopewell.jpg",
    location: "Hopewell Rocks, Bay of Fundy, New Brunswick — flowerpot stacks at low tide",
    searchTerms:
      "Hopewell Rocks Bay of Fundy low tide flowerpot sea stacks people ocean floor",
    aspectRatio: "16:9",
    composition:
      "People small at the base of tree-topped stone flowerpots, standing on the actual ocean floor. The scale of a forty-foot tide, made calm and walkable.",
    tone: "ocean",
  },
  fundy: {
    src: "/assets/photos/ns/05-fundy.jpg",
    location: "Cape Enrage / Fundy National Park, New Brunswick — cliffs above the bay",
    searchTerms:
      "Cape Enrage Fundy National Park cliffs lighthouse Bay of Fundy tide coastline",
    aspectRatio: "21:9",
    composition:
      "A weathered headland and lighthouse over a wide, tidal bay — muted greens, warm rock, the water far out. Big country, gentle mood.",
    tone: "rock",
  },
  wolfville: {
    src: "/assets/photos/ns/06-wolfville.jpg",
    location: "Grand-Pré / Annapolis Valley, Nova Scotia — vineyard rows toward the dykelands",
    searchTerms:
      "Annapolis Valley Nova Scotia vineyard rows Grand Pre dykelands golden afternoon",
    aspectRatio: "16:9",
    composition:
      "Ordered vineyard rows running to reclaimed dykeland and a soft ridge beyond. Warm, cultivated, abundant — the valley that grows the trip's wine and orchards.",
    tone: "amber",
  },
  halifax: {
    src: "/assets/photos/ns/07-halifax.jpg",
    location: "Halifax waterfront, Nova Scotia — the boardwalk and harbour at dusk",
    searchTerms:
      "Halifax waterfront boardwalk harbour dusk tall ship lights Nova Scotia city",
    aspectRatio: "16:9",
    composition:
      "The long wooden boardwalk, warm window light, a schooner at the quay, harbour going blue. A city that feels like a big coastal town — the reassurance that it isn't all car time.",
    tone: "amber",
  },
  peggys: {
    src: "/assets/photos/ns/08-peggys-cove.jpg",
    location: "Peggy's Cove, Nova Scotia — the lighthouse on the granite at first light",
    searchTerms:
      "Peggys Cove lighthouse granite rocks Nova Scotia sunrise calm minimal iconic",
    aspectRatio: "3:2",
    composition:
      "The classic red-capped light on smooth wave-worn granite, early and near-empty, warm low sun. Photograph it before the buses — stillness and one clean icon.",
    tone: "dawn",
  },
  mahone: {
    src: "/assets/photos/ns/09-mahone-bay.jpg",
    location: "Mahone Bay, Nova Scotia — the three churches on the waterfront",
    searchTerms:
      "Mahone Bay Nova Scotia three churches waterfront reflection calm morning",
    aspectRatio: "16:9",
    composition:
      "Three steepled churches mirrored in a calm bay, small craft moored close. Postcard-perfect but earned — the gentlest possible South Shore stop.",
    tone: "dawn",
  },
  lunenburg: {
    src: "/assets/photos/ns/10-lunenburg.jpg",
    location: "Old Town Lunenburg, Nova Scotia — the UNESCO waterfront and Bluenose berth",
    searchTerms:
      "Lunenburg Nova Scotia waterfront colourful buildings UNESCO Bluenose fishing wharf",
    aspectRatio: "16:9",
    composition:
      "Bold red and ochre waterfront buildings, dories and a tall ship, sharp clear light. A designed town — the kind of architecture Darren will want to photograph.",
    tone: "amber",
  },
  brasdor: {
    src: "/assets/photos/ns/11-bras-dor.jpg",
    location: "Bras d'Or Lake near Baddeck, Cape Breton, Nova Scotia — the inland sea",
    searchTerms:
      "Bras d'Or Lake Baddeck Cape Breton calm water sailboat evening warm light",
    aspectRatio: "21:9",
    composition:
      "A vast, glass-calm inland sea, wooded shores, a single sail. Serene and warm at day's end — the antidote to open-Atlantic drama.",
    tone: "dawn",
  },
  bellMuseum: {
    src: "/assets/photos/ns/12-bell-museum.jpg",
    location: "Alexander Graham Bell National Historic Site, Baddeck — museum above Bras d'Or Lake",
    searchTerms:
      "Alexander Graham Bell museum Baddeck Cape Breton hydrofoil HD-4 Silver Dart exhibit",
    aspectRatio: "3:2",
    composition:
      "The airy modern museum with the HD-4 hydrofoil or Silver Dart replica, the lake framed through glass beyond. Invention and setting in one frame — engineering as romance.",
    tone: "paper",
  },
  cabotWest: {
    src: "/assets/photos/ns/13-cabot-trail-west.jpg",
    location: "Cabot Trail west side near Chéticamp — Skyline Trail headland, Cape Breton Highlands",
    searchTerms:
      "Cabot Trail Skyline Trail headland boardwalk Cape Breton Highlands sunset ocean switchback",
    aspectRatio: "16:9",
    composition:
      "The famous descending headland boardwalk or a switchback plunging to the Gulf, warm end-of-day light. Grandeur, but paced and walkable.",
    tone: "dawn",
  },
  ingonish: {
    src: "/assets/photos/ns/14-ingonish.jpg",
    location: "Ingonish / Middle Head, Cape Breton Highlands, Nova Scotia — the eastern coast",
    searchTerms:
      "Ingonish Cape Breton Highlands Middle Head Keltic Lodge beach headland warm coast",
    aspectRatio: "16:9",
    composition:
      "A crescent beach or wooded headland reaching into a calm eastern sea, soft warm light. Coastal drama at rest — beaches, not cliffs to climb.",
    tone: "rock",
  },
  capeForchu: {
    src: "/assets/photos/ns/15-cape-forchu.jpg",
    location: "Cape Forchu Lightstation, Yarmouth, Nova Scotia — the 'apple-core' light at sunset",
    searchTerms:
      "Cape Forchu lighthouse Yarmouth Nova Scotia sunset rocks Atlantic apple core light",
    aspectRatio: "3:2",
    composition:
      "The distinctive tapered light on bare rock against a burning southwest sky, ocean going gold to violet. The last Nova Scotia sunset before the crossing home.",
    tone: "sunrise",
  },
  ferry: {
    src: "/assets/photos/ns/16-ferry.jpg",
    location: "The CAT ferry, Yarmouth to Bar Harbor — open Gulf of Maine crossing",
    searchTerms:
      "The CAT ferry Yarmouth Bar Harbor high speed catamaran ocean crossing wake deck day",
    aspectRatio: "16:9",
    composition:
      "The wake fanning behind a fast catamaran on open water, Nova Scotia dissolving astern, Maine not yet in view. The elegant ocean road home — arrival, not escape.",
    tone: "ocean",
  },
  barHarbor: {
    src: "/assets/photos/ns/17-bar-harbor.jpg",
    location: "Bar Harbor & Acadia National Park, Maine — the harbour and Porcupine Islands",
    searchTerms:
      "Bar Harbor Maine Acadia harbour Porcupine Islands Cadillac Mountain warm evening",
    aspectRatio: "16:9",
    composition:
      "The snug harbour and low spruce islands under warm evening light, Acadia's hills behind. Home soil again, but still on holiday — the closing chapter, not the grind.",
    tone: "amber",
  },
  closing: {
    src: "/assets/photos/ns/18-closing.jpg",
    location: "Maine coast, US-1 south of Acadia — the drive home at golden hour",
    searchTerms:
      "Maine coast US-1 road tree line ocean inlet golden hour drive south autumn",
    aspectRatio: "16:9",
    composition:
      "An easy coastal road threading spruce and inlet in warm low light, heading south. What stays after the last ferry — resolved, unhurried, already planning the next one.",
    tone: "paper",
  },
  nightSky: {
    src: "/assets/photos/ns/19-night-sky.jpg",
    location: "Cape Breton Highlands, Nova Scotia — the Milky Way over the coast (dark sky)",
    searchTerms:
      "Cape Breton Highlands Milky Way stars dark sky ocean silhouette long exposure Nova Scotia",
    aspectRatio: "21:9",
    composition:
      "The Milky Way arcing over a dark headland and a faint sea horizon — no light pollution, no moon. Weather-dependent; the payoff for staying somewhere dark.",
    tone: "night",
    note: "Astrophotography frame — honest to a clear, moonless night. Never implied as guaranteed.",
  },
} satisfies Record<string, Photo>;

export type NSPhotoKey = keyof typeof NS_PHOTOS;
