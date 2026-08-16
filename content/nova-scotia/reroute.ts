/**
 * NOVA SCOTIA → QUÉBEC — THE AUGUST 16 REROUTE
 * --------------------------------------------
 * On Sunday, August 16, 2026 the carrier cancelled the Yarmouth → Bar Harbor
 * CAT sailing booked for Monday the 17th. The whole Maine return leg died with
 * it — Bar Harbor, Acadia, Cadillac Mountain, and the Path A / Path B final
 * night. The trip turned west instead: New Brunswick to Québec, then home.
 *
 * Everything in this file was verified against live sources on August 16, 2026
 * and is transcribed as given. Prices, ratings, review counts, hours, addresses
 * and phone numbers are NOT rounded, adjusted, or embellished. Where a source
 * contradicts itself, the contradiction is preserved and surfaced in the UI
 * rather than quietly resolved (see APPLE.screeningGap).
 *
 * Copy uses the lib/richtext.tsx tokens — [[map|Label|Address]] for GPS,
 * [[tel|number]] for tap-to-call, **bold** for emphasis — so the page is usable
 * from a phone on the road.
 *
 * The day-by-day spine (dates, regions, stop names, maps) lives in
 * ./itinerary.ts as NS_DAYS entries 10–12, so the photo-upload dropdowns, the
 * family view, and the #day-NN anchors all follow from one source.
 */

/* ───────────────────────────── Types ───────────────────────────── */

/** A badge on a timed stop. `null`/undefined renders as an unbadged beat. */
export type StopKind =
  | "Lunch"
  | "Dinner"
  | "Charge"
  | "Hotel"
  | "Anchor"
  | "Option"
  | "Border";

/** One timed entry in a rerouted day. */
export interface RerouteStop {
  time: string;
  kind?: StopKind;
  name: string;
  address?: string;
  /** Highway exit reference, e.g. "Hwy 104 Exit 23". */
  exit?: string;
  phone?: string;
  phoneAlt?: string;
  rating?: number;
  reviews?: number;
  /** Pre-formatted price string, e.g. "FREE", "$18.50 each", "$7 per person". */
  price?: string;
  detail?: string;
  /** A named fallback for this slot. */
  alternative?: string;
  /** Provenance for a booking, e.g. "by phone, Aug 16, 2026". */
  booked?: string;
  /** Open items that need chasing — rendered as warnings on the stop. */
  flags?: string[];
}

export interface RerouteDay {
  /** Matches the NS_DAYS day number ("10", "11", "12"). */
  n: string;
  dateLabel: string;
  route: string;
  status: "booked" | "home";
  statusLabel: string;
  distance: string;
  driveTime: string;
  via: string;
  /** A single clarifying line, e.g. the border time change. */
  note?: string;
  /** Departure/arrival timing for the drive. */
  driveNote?: string;
  stops?: RerouteStop[];
  warnings?: string[];
}

export interface MustDo {
  rank: number;
  name: string;
  address: string;
  phone?: string;
  price: string;
  hours: string;
  duration?: string;
  rating?: number;
  reviews?: number;
  bestMoment: string;
  note?: string;
}

/* ─────────────────────────── The header ─────────────────────────── */

export const REROUTE_META = {
  title: "Cape Breton to Salt Point — revised route",
  subtitle:
    "Aug 16–18, 2026 · CAT ferry cancelled, rerouted through New Brunswick and Québec City",
  revised: "2026-08-16",
  nightsBooked: 11,
  nightsTotal: 11,
  status: "All 11 nights booked. Trip fully locked.",
  homeEta: "Home ≈ 7:45 PM Tuesday. The target was 10:00 PM.",
  verified:
    "Prices, hours, drive times, border waits, restaurant menus and charger locations verified against two or more sources on Aug 16, 2026.",
} as const;

/* ───────────────────────── What was cancelled ───────────────────────── */

export const CANCELLED = {
  route: "Yarmouth · CAT ferry · Bar Harbor → Rockland",
  note: "The carrier cancelled the Aug 17 sailing. Both the ferry and the Yarmouth hotel were cancelled by phone on Aug 16.",
  items: [
    {
      time: "Aug 16",
      name: "Rodd Grand Yarmouth · Hotels.com #72076973572173",
      detail: "Cancelled, ferry cancellation cited.",
    },
    {
      time: "Aug 17",
      name: "CAT ferry · Bay Ferries #2516892",
      price: "$481",
      phone: "+1-877-762-7245",
      detail: "Cancelled. Confirm the refund lands.",
    },
    {
      time: "Aug 17",
      name: "Rockland, ME / Gorham, NH",
      detail:
        "Never booked. Path A / Path B died with the ferry, along with Acadia and Cadillac Mountain.",
    },
  ],
  /** The downstream plans that died with the sailing. */
  downstream: [
    "Bar Harbor, Maine — the landfall",
    "Acadia National Park — Sand Beach, Thunder Hole, Jordan Pond popovers",
    "Cadillac Mountain timed entry, and the Acadia park pass",
    "13 Oak, Rockland — the last-night dinner",
    "Maison St George, Annapolis Royal — the Aug 16 lunch",
  ],
} as const;

/* ──────────────────────── Sunday · August 16 ──────────────────────── */

export const DAY_16: RerouteDay = {
  n: "10",
  dateLabel: "Sun Aug 16",
  route: "Whycocomagh, NS → Témiscouata-sur-le-Lac, QC",
  status: "booked",
  statusLabel: "Booked",
  distance: "892 km",
  driveTime: "10h05",
  via: "Hwy 105 → Hwy 104 → NB Route 2 → A-85",
  note: "Gain one hour at the Québec border. Drive-thru meals only — no getting out of the car.",
  stops: [
    {
      time: "11:10a",
      name: "Depart [[map|Whycocomagh|Whycocomagh, Nova Scotia]]",
      detail:
        "Charge on the NS Power 180 kW unit first. **No Tesla Supercharger anywhere in Nova Scotia on this route — the first is Aulac NB, 330 km out.**",
    },
    {
      time: "1:30p",
      kind: "Lunch",
      name: "Wendy's · New Glasgow",
      address: "750 Westville Road, New Glasgow, NS",
      exit: "Hwy 104 Exit 23",
      detail: "~2 min off the highway, drive-thru, open to midnight",
    },
    {
      time: "3:45p",
      kind: "Charge",
      name: "Aulac, NB",
      address: "170 Aulac Road",
      detail: "8 stalls, 150 kW, 20 min to 80%",
    },
    {
      time: "6:15p",
      kind: "Charge",
      name: "Lincoln, NB",
      address: "415 Nevers Road, Waasis",
      detail: "8 stalls, 20 min",
    },
    {
      time: "7:45p",
      kind: "Dinner",
      name: "McDonald's · Woodstock, NB",
      address: "392 Connell Street",
      exit: "Route 2 Exit 188",
      detail: "~5 min off, open 24 hours",
    },
    {
      time: "9:40p",
      kind: "Charge",
      name: "Saint-Léonard, NB",
      address: "382 Rue Saint Jean",
      detail:
        "25 min. Tim Hortons at 388 Rue St Jean is open 24h on the same Irving site.",
    },
    {
      time: "10:45p",
      kind: "Hotel",
      name: "Hôtel Château Fraser · Témiscouata-sur-le-Lac",
      address: "1 rue du Quai, Cabano sector, on Lake Témiscouata",
      phone: "+1-418-854-3015",
      phoneAlt: "+1-866-841-3015",
      rating: 4.4,
      reviews: 74,
      booked: "by phone, Aug 16, 2026",
      detail:
        "#1 of 3 hotels in town. Cleanliness 4.6, sleep quality 4.6. 14-unit boutique; king categories are 'Versailles King' and 'Romance King'. On-site EV charging, outdoor pool, breakfast lounge ($8/person), kitchenette, balconies, free outdoor parking. 2h45 from Québec City.",
      flags: [
        "Get a written confirmation number — booked by phone, and one TripAdvisor review reports the hotel cancelling on a guest last-minute in peak season.",
        "Confirm the after-hours key arrangement. No front-desk hours are published anywhere; a 14-room inn will not staff a desk to 11 PM by default.",
        "DIRECT-BOOKING ONLY — not in Booking.com or Expedia inventory. Searching the OTAs alone makes Témiscouata look empty. Search the town, not the channels.",
      ],
    },
  ],
  warnings: [
    "Past Dégelis nothing is open. Témiscouata and Dégelis Tim Hortons both close at 7 PM. Last hot food is McDonald's, [[map|190 Hébert Blvd, Edmundston|190 Boulevard Hébert, Edmundston, New Brunswick]] (24h).",
    "Moose: NB averages 247 collisions/yr, 66% between 6 PM and midnight. Route 2 is twinned and does not rank among the bad roads (4, 95, 17). Run 90–95 km/h after dark, high beams when clear, don't lean on Autopilot, and brake hard rather than swerve.",
    "A-85 has an active 8.2 km work zone (Tronçon 7) between Saint-Honoré-de-Témiscouata and Saint-Louis-du-Ha! Ha!. Stopping at Témiscouata means driving it Monday in daylight. Check [quebec511.info](https://www.quebec511.info/).",
  ],
};

/* ──────────────────────── Monday · August 17 ──────────────────────── */

export const DAY_17: RerouteDay = {
  n: "11",
  dateLabel: "Mon Aug 17",
  route: "Québec City — the history day",
  status: "booked",
  statusLabel: "Booked",
  distance: "255 km",
  driveTime: "2h45",
  via: "A-85 → A-20",
  driveNote: "Depart Témiscouata 7:30 AM ET, arrive Québec City ~10:15 AM.",
};

/** Why the toggle exists — Environment Canada, as given. */
export const MONDAY_FORECAST =
  "Environment Canada: a few showers ending in the morning, then mainly cloudy with 30% chance of showers. High 23°C, humidex 30, 5–10 mm, no warnings.";

export const MONDAY_FAIR: RerouteStop[] = [
  {
    time: "10:15a",
    kind: "Hotel",
    name: "Hotel Clarendon",
    address: "57 rue Sainte-Anne, Upper Town",
    phone: "+1-418-692-2480",
    detail:
      "Hotels.com #72078073520709. **2nd-floor room — one flight, elevator skippable.** Car to the valet ($37+tax, in-and-out all day), bags to the desk. On foot from here until Tuesday.",
  },
  {
    time: "10:45a",
    name: "Basilique-cathédrale Notre-Dame de Québec",
    address: "16 rue De Buade",
    price: "FREE",
    detail:
      "196 m, 2 min. Monday 7:30–4:00. The Holy Door, the only one outside Europe. 15 minutes. Crypt and museum are closed; the basilica is not.",
  },
  {
    time: "11:00a",
    kind: "Anchor",
    name: "Morrin Centre",
    address: "44 chaussée des Écossais",
    phone: "+1-418-694-9147",
    rating: 4.6,
    reviews: 762,
    price: "$18.50 each",
    detail:
      "89 m — one minute from the hotel door. #7 of 360 things to do in Quebec City. English tours 10, 11, 1, 2, 3, 5. An 1808 prison cell, then twenty steps into a gaslit Victorian library of 28,000 books. **RESERVATION REQUIRED.** 25–30% off with a Citadelle ticket.",
  },
  {
    time: "12:15p",
    kind: "Lunch",
    name: "Portofino Bistro Italiano",
    address: "54 rue Couillard",
    phone: "+1-866-692-8882",
    detail:
      "192 m, 2 min. Monday 11:00–10:00. Italian in a 1760s building. **APPLE: food menu screened completely clean — zero apple, cider or Calvados in any preparation. The only apple item in the house is an eau-de-vie de cidre on the digestif list; decline it or ask for grappa.** 4,000-bottle cellar, real by-the-glass whites at normal prices. Filet mignon $53, seafood risotto with scallops $45, surf and turf $72.",
    alternative:
      "L'Échaudé, 73 rue du Sault-au-Matelot, [[tel|+1-418-692-1299]], 416 m — also apple-screened.",
  },
  {
    time: "1:15p",
    name: "Walk to the Grand Tour",
    detail:
      "172 m, same street as the hotel. No funicular needed outbound — you're already on top of the cliff. You'll want it coming back up from Petit-Champlain or the ferry: [[map|16 rue du Petit-Champlain|16 rue du Petit-Champlain, Québec City]], **$7 per person, CASH ONLY**, 9 AM–9 PM.",
  },
  {
    time: "1:30p",
    kind: "Anchor",
    name: "'The Grand Tour' · Tours Voir Québec",
    address: "Meets 12 rue Sainte-Anne",
    rating: 4.8,
    reviews: 4363,
    price: "CAD $80 for two",
    detail:
      "Meets 12 rue Sainte-Anne — same street as the hotel, 172 m. #4 of 173 tours in the city. 2 hours, Upper and Lower Town, max 14 per guide. Ends at the funicular in Lower Town.",
  },
  {
    time: "3:45p",
    kind: "Anchor",
    name: "Saint-Louis Forts & Châteaux crypt",
    address: "Under the Dufferin Terrace boardwalk",
    price: "FREE",
    detail:
      "254 m, 3 min. Daily 9:30–5:00. Original 1690s vaults and the governors' kitchen beneath Frontenac's château. One staircase down, level inside.",
  },
  {
    time: "5:00p",
    name: "Check in properly",
    detail: "Deliberate gap.",
  },
  {
    time: "6:45p",
    kind: "Dinner",
    name: "MATTO",
    address: "71 rue Saint-Pierre",
    phone: "+1-418-266-9444",
    detail:
      "379 m, 5 min downhill. Two-minute flat walk. Monday 5:30–10:30. **Full menu screened, zero apple.** No lava cake — the Bomba is the warm-chocolate slot.",
    alternative:
      "At 156 m: Le Continental, 26 rue Saint-Louis, [[tel|+1-418-694-9995]] — everything flambéed tableside, 4.6/5 on 1,831 reviews, but **NOT apple-screened**.",
  },
  {
    time: "8:30p",
    kind: "Anchor",
    name: "Québec–Lévis ferry",
    address: "10 rue des Traversiers",
    price: "$17 for two",
    detail:
      "560 m, 7 min. 700 m, nine minutes, flat. Daily, hourly in the evening, last boat 2:20 AM. 12 min each way, heated enclosed cabin. No booking — decide at the table.",
  },
];

export const MONDAY_RAIN: RerouteStop[] = [
  {
    time: "10:15a",
    kind: "Hotel",
    name: "Hotel Clarendon",
    address: "57 rue Sainte-Anne",
    phone: "+1-418-692-2480",
    detail: "Car straight to the valet, bags to the desk. Ask for loaner umbrellas.",
  },
  {
    time: "12:15p",
    kind: "Lunch",
    name: "Portofino Bistro Italiano",
    address: "54 rue Couillard",
    phone: "+1-866-692-8882",
    detail: "192 m, 2 min. Food menu screened clean of apple.",
  },
  {
    time: "1:45p",
    kind: "Anchor",
    name: "Musée de la civilisation",
    address: "85 rue Dalhousie",
    price: "$27",
    detail:
      "300 m, four minutes, flat, no climb. Open daily 10–5 through Sept 7 (closes Mondays only off-season). 'Plaisirs' five-zone multisensory show, 'Foules' participatory lab, plus the permanent exhibition on Québec's eleven Indigenous nations. 2.5–3 hours, benches throughout.",
  },
  {
    time: "4:50p",
    name: "Back to the hotel",
    detail: "Dry off, change shoes and socks.",
  },
  {
    time: "6:45p",
    kind: "Dinner",
    name: "MATTO",
    address: "71 rue Saint-Pierre",
    phone: "+1-418-266-9444",
    detail: "200 m, three minutes, flat.",
  },
  {
    time: "8:30p",
    name: "Ferry, or Pub L'Oncle Antoine",
    address: "29 rue Saint-Pierre",
    detail:
      "Ferry is indoors and still works. Or the pub: 200 m, open to 1 AM, vaulted stone cellar of a 1754 building, 4.6/5 across 1,700+ reviews. **Order beer, not cider.**",
  },
];

export const RAIN_UPGRADE = {
  name: "Strøm Nordic Spa",
  address: "515 boulevard Champlain",
  phone: "+1-877-761-2772",
  price: "$115 each",
  detail:
    "Rain improves a Nordic spa. Outdoor whirlpools and an infinity pool over the St. Lawrence, plus indoor saunas, steam bath, flotation bath and fireside rooms. Outdoor half closes only for thunderstorms. Daily 9 AM–10 PM. Aug 17 is inside high season so the $85 weekday rate does not apply. Taxi it. Bring swimsuits and sandals.",
} as const;

export const MONDAY_WARNINGS = [
  "**Cobblestones.** 400-year-old granite setts polished smooth, dangerously slippery wet. Lower Town is flat so the failure mode is a foot skating sideways while turning or stepping off a curb. Rubber-lugged walking shoes, no smooth leather soles, no heels, no thin sandals. Skip the Breakneck Stairs if wet. Two umbrellas, not one.",
  "**Do not prepay Montmorency.** Sépaq access is non-refundable with no bad-weather clause. Check 'Informations du jour' or call [[tel|418-663-3330]].",
];

export const CLOSED_MONDAY = [
  "Château Frontenac guided tour — discontinued entirely as of July 1, 2026 (lobby still free)",
  "Notre-Dame Basilica crypt and museum — closed indefinitely (basilica open Mon 7:30–4:00, free, Holy Door viewable)",
  "Église Notre-Dame-des-Victoires — closed Mondays and Wednesdays, June 4 – Aug 30",
  "Pôle culturel du Monastère des Ursulines — closed Mondays",
  "Musée naval de Québec — Wed–Sun only",
  "Maison Chevalier — permanently closed as a museum",
  "'Music in Red' at the Citadelle — Wed–Sun only, and it's a 10 AM ceremony",
  "Grands Feux Loto-Québec fireworks — Tuesdays and Thursdays only, no Aug 17 show",
  "AML river cruises — Monday evening operation unconfirmed, all sales final",
];

/* ──────────────────────── Tuesday · August 18 ──────────────────────── */

export const DAY_18: RerouteDay = {
  n: "12",
  dateLabel: "Tue Aug 18",
  route: "Québec City → Salt Point, NY",
  status: "home",
  statusLabel: "Home",
  distance: "745 km / 463 mi",
  driveTime: "7h50–8h30",
  via: "A-20 → A-15 → I-87 → Thruway Exit 19 → NY-199 → US-9G → US-44",
  stops: [
    {
      time: "8:00a",
      name: "Depart Québec City at 100%",
      detail:
        "Charge at Rue de l'Hétrière, [[map|3373 Rue de l'Hétrière|3373 Rue de l'Hétrière, Saint-Augustin-de-Desmaures, Québec]] — 8 stalls, 250 kW, directly on A-40 westbound, zero detour.",
    },
    {
      time: "11:30a",
      kind: "Option",
      name: "Nice lunch — Stellina, Old Montréal",
      address: "410 rue Saint-Jacques",
      phone: "+1-514-843-9191",
      rating: 4.7,
      reviews: 768,
      detail:
        "Tuesday lunch 11:30–3:00. Park at the Palais des congrès garage, [[map|1025 rue Chenneville|1025 rue Chenneville, Montréal, Québec]], ~$15–20, indoor, 1.9 m clearance, Circuit électrique L2 inside. Home ~7:45 PM. **NOT YET APPLE-SCREENED.**",
    },
    {
      time: "or",
      kind: "Option",
      name: "Fast lunch — Wendy's, Queensbury NY",
      address: "714 Upper Glen Street",
      detail:
        "One mile from the Queensbury Supercharger at I-87 Exit 19. Drive-thru, open to 3 AM. Eat while charging. Saves ~90 min, home ~6:15 PM.",
    },
    {
      time: "2:15p",
      kind: "Border",
      name: "Champlain – Lacolle · US POE 0712",
      phone: "+1-518-298-8346",
      detail:
        "Open 24/7. Tuesday early afternoon 15–30 min, typically 20. Live: [bwt.cbp.gov](https://bwt.cbp.gov/details/04071201/POV)",
    },
    {
      time: "3:35p",
      kind: "Charge",
      name: "Plattsburgh, NY",
      address: "60 Smithfield Blvd",
      detail:
        "8 stalls, 150 kW, 20 min. Wendy's at 397 State Route 3 is one minute away.",
    },
    {
      time: "6:20p",
      kind: "Charge",
      name: "Glenmont, NY",
      address: "33 Frontage Road",
      detail:
        "8 V4 stalls, 325 kW, 15 min. Best charger on the run, 83 miles from home. Skip Queensbury for charging — 150 kW and worse placed.",
    },
    {
      time: "7:45p",
      name: "Home · Salt Point, NY",
      detail: "Target was 10:00 PM.",
    },
  ],
  warnings: [
    "**Do not use the Indigo garage at 500 Place d'Armes.** Closest lot to Stellina and top hit on every parking app — posted max vehicle height **1.55 m**. The Model Y is **1.62 m**. It will not clear.",
    "The I-87 / Thruway merge south of Albany lands around 5:30–6:00 PM. If the day runs late, that's where 15–20 minutes disappears.",
  ],
};

/* ─────────────────────── The swap menu ─────────────────────── */

export const MUST_DOS: MustDo[] = [
  {
    rank: 1,
    name: "Saint-Louis Forts & Châteaux crypt",
    address: "Under the Dufferin Terrace boardwalk",
    price: "FREE",
    hours: "Daily 9:30–5:00",
    duration: "45–60 min",
    bestMoment:
      "Descending under the boardwalk into Frontenac's original 1690s vaults.",
    note: "Free under the Canada Strong Pass — every Parks Canada historic site, June 19 – Sept 7, no residency requirement.",
  },
  {
    rank: 2,
    name: "Morrin Centre",
    address: "44 chaussée des Écossais",
    phone: "+1-418-694-9147",
    price: "$18.50 each",
    hours: "English tours 10, 11, 1, 2, 3, 5",
    rating: 4.6,
    reviews: 762,
    bestMoment:
      "Standing in an 1808 prison cell, then twenty steps into a gaslit library of 28,000 books.",
    note: "#7 of 360 things to do in Quebec City. RESERVATION REQUIRED. 25–30% off with a Citadelle ticket.",
  },
  {
    rank: 3,
    name: "La Citadelle de Québec",
    address: "1 côte de la Citadelle",
    price: "$22 each",
    hours: "Daily 9:00–5:30, guided-tour-only, English at least hourly",
    bestMoment: "The ramparts of a working star fort 100 m above the St. Lawrence.",
    note: "8 min drive, free parking and an EV charger on site. The Governor General's Residence tour is FREE, daily 10–4, no reservation — meet inside, turn left toward the Dalhousie Gate.",
  },
  {
    rank: 4,
    name: "Tours Voir Québec — 'The Grand Tour'",
    address: "Meets 12 rue Sainte-Anne",
    price: "CAD $80 for two",
    hours: "Departures 9:30, 10, 10:30, 11, 12, 1:30, 3:30",
    duration: "2 hours",
    rating: 4.8,
    reviews: 4363,
    bestMoment:
      "Standing on Place Royale on the exact footprint of Champlain's 1608 Habitation.",
  },
  {
    rank: 5,
    name: "Sanctuaire Sainte-Anne-de-Beaupré",
    address: "10018 avenue Royale",
    price: "FREE including parking",
    hours: "Basilica daily 8:00–7:00; memorial chapel and Scala Santa 9:30–3:30",
    rating: 4.7,
    reviews: 1355,
    bestMoment:
      "The two pillars inside the doors, stacked floor to ceiling with crutches left by pilgrims since 1658.",
    note: "32 min northeast, flat and step-free. Pair with Montmorency (cable car only, no zipline) and return on the Route de la Nouvelle-France, lined with 17th and 18th century stone farmhouses including one built in 1652. This is the half-day option — it costs you the walled city.",
  },
];

export const RUNNER_UP = {
  name: "Observatoire de la Capitale",
  address: "1037 rue De La Chevrotière, 31st floor",
  price: "$14.75 each",
  hours: "Daily 10–5",
  rating: 4.4,
  reviews: 344,
  note: "Best orientation view in the city. TICKETS ONLINE-ONLY — buy before you go.",
} as const;

/* ─────────────────────── The apple field guide ─────────────────────── */

export const APPLE = {
  who: "Darren",
  severity: "critical",
  note: "Québec hides apple widely. Every restaurant in this plan is menu-screened. Do not substitute without screening.",
  hiddenSources: [
    "Cidre de glace (ice cider) — most common exposure; on dessert-wine lists and cooked into reductions and vinaigrettes",
    "Calvados / eau-de-vie de cidre — digestif lists, and used to flambé",
    "Sauce normande / 'à la normande' — cream + cider + Calvados",
    "Any pork main — compote de pommes or apple-cider jus is routine",
    "Boudin noir — classically served with apple compote",
    "Foie gras — chutney or gelée is often apple",
    "Cretons and country terrines — apple as binder",
    "Cheese and charcuterie boards — apple slices, gelée de pommes",
    "Salads — 'julienne de pommes' in celeriac remoulade, fennel and kale salads",
    "Apple juice is the default juice in Québec, including hotel breakfasts",
    "Île d'Orléans is cider country — skip Cidrerie Verger Bilodeau and Cidrerie du Bout de l'Île",
  ],
  safeDesserts: [
    "tarte au sucre",
    "pouding chômeur",
    "tarte au sirop d'érable",
    "crème brûlée à l'érable",
  ],
  /**
   * Rendered verbatim and made one-tap copyable. Deliberately the plain-ASCII
   * form from the source data (straight apostrophe, no guillemets) — it is the
   * more reliable paste target for booking forms and SMS.
   */
  phraseFr:
    "Je suis allergique aux pommes. Est-ce qu'il y a de la pomme, du cidre, du cidre de glace ou du calvados dans ce plat, dans la sauce ou dans la garniture?",
  phraseEn:
    "I am allergic to apples. Is there any apple, cider, ice cider or Calvados in this dish, in the sauce, or in the garnish?",
  screenedClean: [
    "MATTO (all six menu sections; only fruit is fig)",
    "L'Échaudé lunch menu",
  ],
  screenedWarnings: [
    "L'Échaudé DINNER menu: 'scallops and pork flank, onion sauce, apple, celery'",
    "L'Échaudé dessert-wine list carries ice cider",
    "Le Cochon Dingue Champlain makes house apple butter daily — avoid",
  ],
  notScreened: ["Stellina, Old Montréal"],
  /**
   * A real inconsistency in the source data, surfaced rather than silently
   * reconciled: Monday's lunch stop states Portofino's food menu is screened
   * clean, but Portofino appears in neither list below.
   */
  screeningGap:
    "**Portofino** is described in Monday's plan as screened completely clean — zero apple, cider or Calvados — with one caveat: an eau-de-vie de cidre on the digestif list. It is not yet reflected in either list above. Treat the day-plan note as current and re-confirm at the table.",
} as const;

/* ───────────────────────── The call list ───────────────────────── */

export interface CallItem {
  n: number;
  status?: "done";
  phone?: string;
  url?: string;
  what: string;
}

export const CALL_LIST: CallItem[] = [
  {
    n: 1,
    status: "done",
    what: "All 11 nights booked. Château Fraser by phone; Hotel Clarendon on Hotels.com #72078073520709.",
  },
  {
    n: 2,
    phone: "+1-418-694-9147",
    what: "Morrin Centre, Monday 11:00 AM English tour, $18.50 each. RESERVATION REQUIRED — the one thing here that actually sells out. 89 m from the hotel.",
  },
  {
    n: 3,
    url: "https://toursvoirquebec.com",
    what: "The Grand Tour, Monday 1:30 PM, ~$80 for two. 172 m from the hotel.",
  },
  {
    n: 4,
    url: "https://portofino.ca",
    phone: "+1-866-692-8882",
    what: "Portofino, Monday lunch 12:15. 192 m, apple-screened.",
  },
  { n: 5, phone: "+1-418-266-9444", what: "MATTO, Monday dinner 6:45." },
  {
    n: 6,
    phone: "+1-418-854-3015",
    what: "Château Fraser — get a written confirmation number if you don't have one.",
  },
  {
    n: 7,
    phone: "+1-877-762-7245",
    what: "Confirm the Bay Ferries $481 refund, #2516892.",
  },
];
