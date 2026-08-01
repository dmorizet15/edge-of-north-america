/**
 * NOVA SCOTIA — "TWO PATHS" FINAL-NIGHT BRANCH
 * --------------------------------------------
 * Days 11–12 are an open decision between two complete alternative plans, made
 * on Saturday, August 15, 2026 from the Mount Washington summit forecast:
 *
 *   Path A · The Coast  — Acadia + Rockland, ME (the plan with no failure mode)
 *   Path B · The Summit — Mount Washington Auto Road + the Kancamagus, via
 *                         Gorham, NH (weather-dependent)
 *
 * Every fact here was verified against at least two current sources on
 * August 1, 2026. Copy is authored with the lib/richtext.tsx tokens:
 *   [label](url)          website link
 *   [[dir|Address]]       Google Maps directions button (beside a website link)
 *   [[map|Label|Address]] the words open Google Maps directions (no website)
 *   [[tel|number]]        tap-to-call
 *   **bold**              emphasis
 *
 * Path B has no baked route map yet (the day-map PNGs are framed for the Bar
 * Harbor / Rockland routing); new NH basemaps via scripts/bake-ns-maps.py are a
 * tracked follow-up. Sunset lines are shown only where the Maine value is valid.
 */

export interface RuleRow {
  cloud: string;
  read: string;
  choose: string;
}

export interface GateLink {
  label: string;
  url: string;
}

export interface CompareRow {
  label: string;
  monday: string;
  tuesday: string;
  total: string;
}

/** One timed stop in a path's day. `heading`/`detail`/`warnings` are token-rich. */
export interface PathStep {
  time?: string;
  heading: string;
  detail?: string[];
  warnings?: string[];
  /** An emphasised feature block (e.g. the Tesla-on-the-Auto-Road note). */
  feature?: { title: string; lines: string[] };
}

export interface PathStay {
  heading: string;
  detail: string[];
  warnings?: string[];
}

export interface PathMapPoint {
  label: string;
  lat: number;
  lon: number;
  ferry?: boolean;
}

export interface PathDayPlan {
  date: string;
  intro?: string;
  steps: PathStep[];
  stay?: PathStay;
  /** Route points for the day map, projected onto the baked basemap `mapId`. */
  map?: PathMapPoint[];
  /** Key into lib/mapmeta.json, e.g. "ns-day-11", "ns-pathb-mon". */
  mapId?: string;
  /** Plain route list, a fallback used only when there is no baked map. */
  route?: string[];
  sunset?: string;
}

export interface FinalPath {
  key: "coast" | "summit";
  letter: string;
  name: string;
  pitch: string;
  overnight: string;
  mondayDrive: string;
  tuesdayDrive: string;
  headline: string;
  highlights: string[];
  tradeoff: string;
  monday: PathDayPlan;
  tuesday: PathDayPlan;
  checklist: string[];
}

/** Day 11 morning — identical on both paths, rendered once above the branch. */
export const SHARED_MORNING: { date: string; steps: PathStep[] } = {
  date: "Monday, August 17 — the crossing",
  steps: [
    {
      time: "6:45 AM ADT",
      heading:
        "Breakfast — [Gale's Restaurant](https://roddvacations.com/hotels/rodd-grand-yarmouth/dining/)[[dir|Rodd Grand Yarmouth, Yarmouth, Nova Scotia]]",
      detail: [
        "Downstairs in the Rodd Grand, open 6:30 AM Mondays. Eggs benedict and the local Yarmouth-style fishcakes. The terminal is four minutes away.",
      ],
    },
    {
      time: "8:00 AM ADT",
      heading:
        "[[map|Bay Ferries CAT terminal|Bay Ferries CAT Terminal, 58 Water St, Yarmouth, Nova Scotia]] check-in",
      detail: [
        "Bay Ferries needs every passenger checked in by 8:30. Have the plate number, length and height ready. [[tel|902-742-6800]]",
      ],
    },
    {
      time: "9:30 AM ADT",
      heading: "The CAT departs Yarmouth",
      detail: [
        "≈ 3 hr 30 min open-water crossing. Onboard: the Scotia Market Café (breakfast through dinner), Sip@Sea for espresso and house-made gelato, and the Forchu Lounge with Nova Scotia wine, craft beer and bacon-wrapped scallops. Service start times aren't published, so eat before boarding and treat the Forchu scallops as a mid-crossing stop around 11.",
      ],
    },
    {
      time: "12:00 PM EDT",
      heading:
        "The CAT arrives [[map|Bar Harbor|Bar Harbor Ferry Terminal, 121 Eden St, Bar Harbor, Maine]]",
      detail: [
        "121 Eden St, Bar Harbor, ME 04609 · [[tel|207-901-0077]]. Clocks go back an hour; allow 30 to 45 minutes for US customs and disembarkation.",
        "**The two paths branch here.**",
      ],
    },
  ],
};

export const DECISION_GATE = {
  eyebrow: "Decision due",
  headline: "Saturday, August 15",
  line: "The last night is still open. Both plans cost about the same. The Mount Washington summit is in cloud roughly 60% of the time, so this decision waits until the forecast can actually tell you something.",
  ruleRows: [
    { cloud: "Above 6,300 ft", read: "Summit is clear", choose: "Path B · The Summit" },
    {
      cloud: "4,000 to 6,200 ft",
      read: "Summit buried, but the road above treeline still delivers",
      choose: "Judgement call",
    },
    {
      cloud: "Below 3,300 ft",
      read: "You will see nothing from the gate onward",
      choose: "Path A · The Coast",
    },
  ] as RuleRow[],
  links: [
    {
      label: "Cloud-base forecast",
      url: "https://www.mountain-forecast.com/peaks/Mount-Washington-2/forecasts/1917",
    },
    {
      label: "Higher Summits Forecast",
      url: "https://mountwashington.org/weather/higher-summits-forecast/",
    },
    { label: "Summit webcam", url: "https://mountwashington.org/webcams/" },
    {
      label: "Auto Road status (morning of)",
      url: "https://mt-washington.com/status-weather/",
    },
  ] as GateLink[],
  phone: "603-356-2137",
  copy: [
    "The Observatory's own figure is that the summit sits in fog 60 percent of the year. In four of the last five Augusts it was mostly cloudy or overcast on 27 to 29 days out of 31. On one fixed morning the realistic odds are about half nothing, a quarter partial, a quarter genuinely clear.",
    "No forecast is meaningful more than three days out, which is why this waits until the 15th. The road itself is pay-at-the-gate with no reservation, so choosing the coast on the morning costs nothing.",
  ],
};

export const COMPARE: { rows: CompareRow[]; note: string } = {
  rows: [
    { label: "Path A · The Coast", monday: "84 mi · 2h00", tuesday: "351 mi · 6h45", total: "435 mi · 8h45" },
    { label: "Path B · The Summit", monday: "185 mi · 4h50", tuesday: "318 mi · 6h20", total: "503 mi · 11h10" },
  ],
  note: "Tuesday genuinely is shorter on Path B, by about 40 minutes. Monday is nearly three hours longer, so the summit costs roughly two hours of net driving plus the Acadia afternoon.",
};

export const PATHS: FinalPath[] = [
  {
    key: "coast",
    letter: "A",
    name: "The Coast",
    pitch: "The plan with no failure mode. Acadia in the afternoon, popovers on the lawn, and a quiet harbour town to finish.",
    overnight: "Rockland, Maine",
    mondayDrive: "84 mi · 2h00",
    tuesdayDrive: "351 mi · 6h45",
    headline: "Jordan Pond House popovers, Acadia Park Loop",
    highlights: [
      "A lobster roll on the pier within an hour of landing",
      "Sand Beach and Thunder Hole on the Park Loop Road",
      "Century-old popovers on the Jordan Pond lawn",
      "Scallop risotto and a strip steak in Rockland",
    ],
    tradeoff: "Nothing here is weather-dependent, but you have already had eleven days of coastline.",
    monday: {
      date: "Monday, August 17 — Bar Harbor, Acadia, Rockland",
      mapId: "ns-day-11",
      map: [
        { label: "Yarmouth", lat: 43.84, lon: -66.12 },
        { label: "Bar Harbor", lat: 44.39, lon: -68.2, ferry: true },
        { label: "Acadia", lat: 44.34, lon: -68.25 },
        { label: "Rockland", lat: 44.1, lon: -69.11 },
      ],
      steps: [
        {
          time: "1:00 PM",
          heading: "Lunch — [Stewman's Lobster Pound](https://www.stewmanslobsterpound.com/)[[dir|Stewman's Lobster Pound, 35 West Street, Bar Harbor, Maine]]",
          detail: [
            "35 West Street, Bar Harbor, ME 04609 · [[tel|207-288-0346]]. Monday 11:30 AM to 8:00 PM, walk-in only, oceanfront seating on the town pier.",
            "Backup: [Side Street Cafe](https://www.sidestreetbarharbor.com/)[[dir|Side Street Cafe, 49 Rodick Street, Bar Harbor, Maine]], 49 Rodick Street · [[tel|207-801-2591]] · opens 11:00 AM · no reservations, but join the remote waitlist from the boat. 4.4 from 4,625 reviews.",
          ],
          warnings: [
            "There is a second Stewman's at 123 Eden Street beside the ferry terminal. That one is dinner-only and is not an option at lunch. Go to 35 West Street.",
            "The real constraint downtown is parking, not distance. Mid-August at 12:15 PM is peak.",
          ],
        },
        {
          time: "2:00 PM",
          heading: "[Acadia National Park](https://www.nps.gov/acad/)[[dir|Acadia National Park, Maine]] — Park Loop Road",
          detail: [
            "Entrance pass $35 per private vehicle, valid 7 days. Park Loop Road is fully drivable; the spring culvert closure reopened June 12. Sand Beach and Thunder Hole need nothing beyond the entrance pass — no timed entry, no vehicle reservation.",
            "Cadillac Mountain is separate and optional: $6 per vehicle, timed entry at [recreation.gov](https://www.recreation.gov/timed-entry/400000). 70% of slots release two days ahead at 10:00 AM ET, so for Aug 18 that is Aug 16 at 10:00 AM ET.",
          ],
          warnings: [
            "The park is cashless. Card or mobile payment only at official outlets. If you buy online you must print the pass and display it in the windshield.",
          ],
        },
        {
          time: "3:30 PM",
          heading: "[Jordan Pond House](https://jordanpondhouse.com/)[[dir|Jordan Pond House, 2928 Park Loop Road, Seal Harbor, Maine]] — the popovers",
          detail: [
            "2928 Park Loop Road, Seal Harbor, ME 04675 · [[tel|207-813-4342]]. Open daily 11:00 AM to 8:30 PM. Average peak-season wait 40 minutes; parking is severely limited 11:00 to 4:00. The Island Explorer Route 5 shuttle runs about every 30 minutes and is the recommended approach.",
            "Indoor booking if you want it: [book on Toast](https://toast.app/r/acadia-national-park-jordan-pond-house).",
          ],
          warnings: [
            "The lawn cannot be reserved. Their words: reservations are for inside dining only, and due to weather variability they cannot accommodate reservations for the lawn. The lawn runs a walk-up Popover and Prosecco bar, first come first served.",
          ],
        },
        {
          time: "5:45 PM",
          heading: "Charge — [[map|Ellsworth Supercharger|Tesla Supercharger, 225 High St, Ellsworth, Maine]]",
          detail: [
            "225 High St, Ellsworth · 8 stalls, 250 kW. Listed by Tesla as “Bar Harbor” but physically in Ellsworth; there is no Supercharger in Bar Harbor itself.",
          ],
        },
        {
          time: "7:15 PM",
          heading: "Dinner — [13 Oak](https://www.13oakrockland.com/)[[dir|13 Oak, 13 Oak Street, Rockland, Maine]]",
          detail: [
            "13 Oak Street, Rockland, ME 04841 · [[tel|207-466-9264]] · [book on Resy](https://resy.com/cities/rockland-me/venues/13-oak). Monday opens 5:00 PM, last reservation 8:45 PM. Wood-fired oven; reviews name the scallop risotto and the strip steak.",
            "Harbour-view alternative: [Archer's on the Pier](https://archersonthepier.com/)[[dir|Archer's on the Pier, 58 Ocean St, Rockland, Maine]], 58 Ocean St · [[tel|207-594-2435]] · open Monday but closes 8:00 PM, so go at 6:00 or 6:30, not 7:15.",
          ],
          warnings: [
            "Both of the original backups are closed Mondays. In Good Company runs Tuesday to Saturday. Cafe Miranda runs Thursday to Saturday and Yelp currently flags it closed.",
          ],
        },
      ],
      stay: {
        heading: "Stay — [Rockland Harbor Hotel](https://www.rocklandharborhotel.com/)[[dir|Rockland Harbor Hotel, 520 Main Street, Rockland, Maine]]",
        detail: [
          "520 Main Street, Rockland, ME 04841 · [[tel|207-594-2131]] · [book direct](https://reservations.travelclick.com/99375). $249 on Booking.com, $326 total on Expedia, 8.8 from 1,258 reviews. Free hot breakfast, free parking. Check-in 4:00 PM, out 11:00 AM. Cancellation: free up to 48 hours before arrival, terms may vary by source.",
          "If EV charging at the hotel matters more than price: [250 Main Hotel](https://www.250mainhotel.com/)[[dir|250 Main Hotel, 250 Main St, Rockland, Maine]], 250 Main St · [[tel|207-594-5994]] · two free Tesla Destination chargers, best-reviewed hotel in town at 9.8 from 545 reviews — but $439 a night, which does not clear the bar for a one-night stop.",
        ],
        warnings: [
          "No EV charging on site. The Rockland Supercharger is 1.5 miles away at [[map|75 Maverick Street|Tesla Supercharger, 75 Maverick Street, Rockland, Maine]] (Rockland Plaza / Hannaford), 8 stalls, 250 kW, 24/7 — a five-minute detour with a grocery store and restrooms.",
        ],
      },
      sunset: "Sunset ≈ 7:38 PM EDT",
    },
    tuesday: {
      date: "Tuesday, August 18 — Rockland home to Salt Point",
      intro: "Two things that were in the original plan are closed on Tuesdays: the Farnsworth Art Museum and Home Kitchen Café. Both are handled below.",
      mapId: "ns-day-12",
      map: [
        { label: "Rockland", lat: 44.1, lon: -69.11 },
        { label: "Portland", lat: 43.66, lon: -70.26 },
        { label: "Portsmouth", lat: 43.07, lon: -70.76 },
        { label: "Salt Point", lat: 41.87, lon: -73.8 },
      ],
      steps: [
        {
          time: "7:30 AM",
          heading: "Breakfast — [Rockland Café](https://rocklandcafe.com/)[[dir|Rockland Cafe, 441 Main Street, Rockland, Maine]]",
          detail: [
            "441 Main Street, Rockland, ME 04841 · [[tel|207-596-7556]]. Open 6:00 AM to 9:30 PM, seven days; breakfast served until 11:00 AM in August. A genuine local diner, 4.0 from 631 reviews.",
            "Lighter option: [Rock City Café](https://rockcitycoffee.com/pages/cafe)[[dir|Rock City Cafe, 316 Main Street, Rockland, Maine]], 316 Main Street · [[tel|207-594-4123]] · 7:00 AM to 5:00 PM daily.",
          ],
          warnings: [
            "Home Kitchen Café is closed Tuesdays — their day of rest. It is the best breakfast in Rockland every other day of the week (650 Main Street, [[tel|207-596-2449]]), but not on the 18th.",
            "The Farnsworth Art Museum is closed Tuesdays, so it is removed from today. Summer hours are Wednesday through Monday, 10 to 5. Their tickets stay valid for a year, so it is worth knowing for a future trip.",
          ],
        },
        {
          time: "9:00 AM",
          heading: "Depart for Salt Point",
          detail: [
            "351 miles, about 6 hours 45 minutes. US-1 to I-295 to I-95, then I-495 around Boston, I-90 west to Lee, and the Taconic south. Superchargers roughly every 20 to 40 miles the whole way — the better-served of the two corridors.",
            "The ideal single stop is [[map|Lee Supercharger|Tesla Supercharger, Lee, Massachusetts]] at I-90 Exit 2: 16 stalls at 325 kW, about 55 miles from home.",
          ],
        },
        {
          time: "12:30 PM",
          heading: "Lunch — [Eventide Oyster Co.](https://www.eventideoysterco.com/portland)[[dir|Eventide Oyster Co., 86 Middle Street, Portland, Maine]]",
          detail: [
            "86 Middle Street, Portland, ME 04101 · [[tel|207-774-8538]]. Tuesday 11:00 AM to 11:00 PM. The order is the brown butter lobster roll.",
            "Backup: [Highroller Lobster Co.](https://highrollerlobster.com/location/portland/)[[dir|Highroller Lobster Co., 104 Exchange Street, Portland, Maine]], 104 Exchange Street · [[tel|207-536-1623]] · opens 11:00 AM · no reservations.",
          ],
          warnings: [
            "Eventide is mostly first-come first-served and releases only limited reservations, on a two-week rolling window. Aug 18 reservations open around Aug 4 on [Resy](https://resy.com/cities/pwm/eventide-oyster-co). Walk-ins are actively encouraged and realistic for two people midday on a Tuesday.",
          ],
        },
        {
          time: "~6:30 PM",
          heading: "Home — [[map|Salt Point, NY|Salt Point, New York]]",
        },
      ],
    },
    checklist: [
      "Book [Rockland Harbor Hotel](https://www.rocklandharborhotel.com/) — [[tel|207-594-2131]] or [book direct](https://reservations.travelclick.com/99375). Confirm a king room; that could not be verified at room-type level.",
      "Book [13 Oak](https://resy.com/cities/rockland-me/venues/13-oak) on Resy for 7:15 PM.",
      "Buy the Acadia entrance pass at [recreation.gov](https://www.nps.gov/acad/planyourvisit/fees.htm), or on arrival by card. The park is cashless.",
      "From Aug 4, try for an [Eventide](https://resy.com/cities/pwm/eventide-oyster-co) reservation on Resy. Optional; walk-in works.",
      "Optional, from Aug 16 at 10:00 AM ET: a [Cadillac Mountain](https://www.recreation.gov/timed-entry/400000) summit reservation, $6.",
    ],
  },
  {
    key: "summit",
    letter: "B",
    name: "The Summit",
    pitch: "Drive to the top of the Northeast. Your Tesla is close to the ideal car for it, and the Kancamagus takes you home.",
    overnight: "Gorham, New Hampshire",
    mondayDrive: "185 mi · 4h50",
    tuesdayDrive: "318 mi · 6h20",
    headline: "Mount Washington Auto Road, then the Kancamagus Highway",
    highlights: [
      "Hotel directly across the road from the toll gate",
      "6,288 feet with no hiking required",
      "The Kancamagus home at zero detour",
      "Alpine tundra as a contrast to eleven days of ocean",
    ],
    tradeoff: "A five-hour Monday drive, no Acadia, and roughly a one-in-four chance of the clear summit.",
    monday: {
      date: "Monday, August 17 — Bar Harbor to Gorham, New Hampshire",
      mapId: "ns-pathb-mon",
      map: [
        { label: "Bar Harbor", lat: 44.39, lon: -68.2 },
        { label: "Bethel", lat: 44.4, lon: -70.79 },
        { label: "Gorham", lat: 44.39, lon: -71.18 },
      ],
      steps: [
        {
          time: "1:00 PM",
          heading: "Fast lunch — [Trenton Bridge Lobster Pound](https://www.trentonbridgelobster.com)[[dir|Trenton Bridge Lobster Pound, 1237 Bar Harbor Road, Trenton, Maine]]",
          detail: [
            "1237 Bar Harbor Road (Route 3), Trenton, ME 04605 · [[tel|207-667-2977]]. Mon–Sat 8:00 AM to 7:30 PM, walk-up counter, picnic tables by the water. 4.3 from 1,143 reviews. Directly on your outbound route, 9 miles and about 15 minutes from the terminal, so it costs zero detour on a day where you must be rolling by 1:00.",
            "Italian alternative if you can leave at 1:15 instead: [The Chart Room](https://www.opentable.com/r/the-chart-room-bar-harbor)[[dir|The Chart Room, 565 Eden St, Bar Harbor, Maine]], 565 Eden St · [[tel|207-288-9740]] · 11:00 AM to 9:00 PM · 4.5 from 617 reviews, lobster ravioli and seafood linguine, a deck over Frenchman's Bay two miles out of town in your direction. Call from the boat for a deck table.",
          ],
        },
        {
          time: "1:15 PM",
          heading: "Depart west",
          detail: [
            "185 miles, about 4 hours 50 minutes. Route 3 to Ellsworth, US-1 south, ME-3 west to Augusta, I-95 south to Auburn, then ME-4 and ME-26 northwest through Norway and South Paris to Bethel, US-2 west into Gorham, then NH-16 south.",
          ],
        },
        {
          time: "4:30 PM",
          heading: "Charge and eat — [[map|Bethel Supercharger|Tesla Supercharger, 211 Mayville Road, Bethel, Maine]]",
          detail: [
            "211 Mayville Road, Bethel, ME 04217, at the Irving station. 6 stalls, up to 250 kW, 24/7. This is the last Supercharger before the White Mountains and sits essentially on the route for five extra minutes.",
            "Food while you charge: [Butcher Burger](https://butcherburger.com/bethel/)[[dir|Butcher Burger, 188 Main St, Bethel, Maine]], 188 Main St · [[tel|207-824-1171]] · 7 days 11:30 AM to 9:00 PM · 1.5 miles from the Supercharger. Hand-cut Butcher Fries, and both a Maine lobster roll and a hot-buttered lobster roll.",
          ],
          warnings: [
            "Mayville Union House is 200 yards from the Supercharger and looks ideal, but it has had a fire and is temporarily closed for repairs. Only a backyard food truck is running, Thursday to Sunday.",
          ],
        },
        {
          time: "7:00 PM",
          heading: "Dinner — [The Notch Grille](https://www.thenotchgrille.com)[[dir|The Notch Grille, 979 NH Route 16, Gorham, New Hampshire]]",
          detail: [
            "On site at The Glen House · [[tel|603-466-2891]] · [book on Resy](https://resy.com/cities/coos-county-nh/venues/the-notch-grille). Monday 2:30 PM to 9:00 PM. 4.5 from 183 reviews, #3 of 18 in Gorham. Reviews name the steak tips and the baked haddock, plus a seared salmon worth the price. Zero drive after a five-hour day.",
            "Better-food alternative: [Ledges at the White Mountain Hotel](https://www.whitemountainhotel.com/dining/ledges-restaurant)[[dir|Ledges at White Mountain Hotel, 87 Fairway Drive, North Conway, New Hampshire]], 87 Fairway Drive, North Conway · [[tel|603-356-7100]] · [book on OpenTable](https://www.opentable.com/r/ledges-at-white-mountain-hotel-hales-location) · Monday 5:30 to 9:00 PM · 4.6 from 1,093 reviews · a Wine Spectator Award of Excellence continuously since 1995. Braveheart filet $69, tenderloin tips $45, salmon piccata $39. Trade-off: 27 miles and 35 to 40 minutes each way through Pinkham Notch, a 75-minute round trip after a five-hour drive.",
          ],
          warnings: [
            "The Notch Grille is the only restaurant within about twenty minutes of the hotel. Book it or call ahead.",
            "Ledges' “chocolate bomb” is the only lava-cake candidate in the valley, but the evidence points to a set mousse rather than a molten centre — one listing calls it a mousse bomb and no review uses the words molten or lava. If that dessert is the reason for the drive, call [[tel|603-356-7100]] ext. 406 and ask outright first.",
            "Mountain-town Mondays are brutal: both top Italian options in the valley are closed Monday (Vito Marcello's and Nonna's). Red Parka Steakhouse is closed Monday and Tuesday. Margarita Grill and Thompson House Eatery are permanently closed.",
          ],
        },
      ],
      stay: {
        heading: "Stay — [The Glen House](https://theglenhouse.com)[[dir|The Glen House, 979 NH Route 16, Gorham, New Hampshire]]",
        detail: [
          "979 NH Route 16, Gorham, NH 03581 · [[tel|603-466-3420]] · [book direct](https://be.synxis.com/?Hotel=2493&Chain=23448). $283.05 on Booking.com, $308 total on Expedia, 9.6 from 1,004 reviews, #1 of 8 in Gorham. King Room with Mountain View and King Room with Balcony both available. Check-in 4:00 PM, out 11:00 AM. It sits directly across Route 16 from the Auto Road toll gate, about two minutes.",
          "Book direct, not through an OTA: they publish a Best Rate Guarantee, and the direct flexible rate is the only channel where the hotel's own cancellation terms apply — OTA prepaid inventory here is frequently non-refundable.",
          "EV charging: two ClipperCreek Level 2 J1772 units at the entrance, plus more across Route 16 at the Great Glen Trails base. Bring the J1772 adapter that came with the car. Assume Level 2 speeds (20 to 30 miles of range per hour) — an overnight top-up, not a fast fill.",
        ],
        warnings: [
          "Two things about The Glen House could not be verified and both need one call to [[tel|603-466-3420]]. First, the cancellation policy is not published anywhere, and the whole weather hedge depends on it — ask for the free-cancellation deadline before 4:00 PM arrival on Aug 17, whether a deposit is taken, and whether the lowest rate carries the same terms. Second, reports conflict on whether the Tesla Destination connectors across the road still exist and whether charging is still free.",
        ],
      },
    },
    tuesday: {
      date: "Tuesday, August 18 — the summit, the Kancamagus, and home",
      mapId: "ns-pathb-tue",
      map: [
        { label: "Mt Washington", lat: 44.27, lon: -71.3 },
        { label: "Conway", lat: 43.98, lon: -71.12 },
        { label: "Lincoln", lat: 44.05, lon: -71.69 },
        { label: "Salt Point", lat: 41.87, lon: -73.8 },
      ],
      steps: [
        {
          time: "7:00 AM",
          heading: "Breakfast — [The Notch Grille](https://www.thenotchgrille.com)[[dir|The Notch Grille, 979 NH Route 16, Gorham, New Hampshire]]",
          detail: [
            "Breakfast 7:00 to 10:30 AM. Reviews name the chicken and waffles and a veggie omelet with new potatoes, plus fresh-squeezed orange juice and blueberry muffins. Downstairs, and the toll gate is across the road.",
            "Backup: [[map|White Mountain Cafe & Bookstore|White Mountain Cafe, 212 Main St, Gorham, New Hampshire]], 212 Main St, Gorham · [[tel|603-466-2511]] · 7:00 AM to 4:00 PM · 4.5 from 232 reviews — but 8 miles north in Gorham village, the opposite direction from the Auto Road, so a 16-mile round trip.",
          ],
        },
        {
          time: "8:45 AM",
          heading: "Check conditions, then go",
          detail: [
            "[Auto Road status](https://mt-washington.com/status-weather/) · [summit webcam](https://mountwashington.org/webcams/).",
          ],
        },
        {
          time: "9:00 AM",
          heading: "The [Mount Washington Auto Road](https://mt-washington.com/drive-yourself/)[[dir|Mount Washington Auto Road, 1 Mount Washington Auto Road, Gorham, New Hampshire]]",
          detail: [
            "1 Mount Washington Auto Road, Gorham, NH · [[tel|603-466-3988]]. GPS also accepts “Glen House.” Open 9:00 AM to 6:00 PM through Aug 23 (6:00 is the last car up). $36 per adult, $72 for the two of you. No reservation, pay at the gate, all cards and cash. Included: the summit museum, the narrated audio tour app, and the bumper sticker. 7.6 miles, about 4,600 feet of gain, roughly 30 minutes up and 30 to 45 down.",
            "At the summit: the Sherman Adams building is open 8:30 to 5:00 with the Observatory's Extreme Mount Washington museum inside, covered by your toll. The Tip-Top House is closed for renovations. Expect roughly 50°F and a 25 mph wind on a day that is 80°F at the base — bring real jackets.",
          ],
          feature: {
            title: "Your Tesla is close to the ideal car for this road",
            lines: [
              "The Auto Road publishes an Electric Vehicles section that names Tesla by name: a Tesla will come down safely entirely on regenerative braking with little to no use of the conventional brakes, and stopping to cool brakes is normally not necessary in an EV. Brake fade on the descent is this road's real hazard and one-pedal driving removes it. Gas cars lose about 19 percent of their power in the thin air at the summit. You lose none.",
              "Four owner logs put the round trip at 6 to 8 percent of battery: roughly 15 to 16 percent to climb, 8 to 9 percent back on the way down.",
              "**Start at 50 to 60 percent.** Not for range, but because there is no charging, no services and effectively no cell coverage at 6,288 feet, and you will sit 15 to 20 points lower up there.",
              "Set regen to Standard and use Hold before you start down. **Do not use Autopilot or steering assist on this road.**",
            ],
          },
        },
        {
          time: "12:00 PM",
          heading: "Optional — [Cathedral Ledge](https://www.nhstateparks.org/find-parks-trails/cathedral-ledge-state-park)[[dir|Cathedral Ledge State Park, 579 Cathedral Ledge Road, Bartlett, New Hampshire]]",
          detail: [
            "579 Cathedral Ledge Road, Bartlett, NH 03812 · [[tel|603-356-2672]]. Open roughly 9:00 AM to 9:00 PM. A mile-long paved auto road climbs to the top of a 700-foot cliff over Echo Lake — a four-minute drive, ~25 spaces at the top, then a short walk to the vista. The non-hiker's viewpoint: you drive to the view.",
          ],
          warnings: [
            "Sources disagree on the fee. Carry $10 in cash; expect at most $4 per adult.",
            "The address is often listed wrong. Use 579 Cathedral Ledge Road, Bartlett NH 03812 — not the Intervale or Conway addresses that appear on aggregators.",
          ],
        },
        {
          time: "12:30 PM",
          heading: "The [[map|Kancamagus Highway|Kancamagus Highway, NH Route 112, Conway, New Hampshire]], westbound",
          detail: [
            "NH Route 112, 34.5 miles, Conway to Lincoln. Highest point is Kancamagus Pass at about 3,000 feet. A White Mountain National Forest day pass is $5 per vehicle, good all day at every WMNF lot (not per-lot); the named scenic overlooks are free. Self-serve iron rangers, so bring $5 cash.",
            "The four stops worth making, westbound in order: **Sabbaday Falls** (a 0.4–0.7 mile round trip, an easy 15-minute walk; Melissa can walk the flat part and see the lower cascades even if she skips the top); **Sugar Hill Overlook** (free); **C.L. Graham Wangan Grounds Overlook** just east of the pass, the signature viewpoint (free); **Pemigewasset Overlook** facing west toward Lincoln (free).",
          ],
          warnings: [
            "There is no food and no fuel anywhere along the 34.5 miles. Leave with adequate charge and do not plan to eat until Lincoln.",
          ],
        },
        {
          time: "1:30 PM",
          heading: "Lunch — [Woodstock Inn Station & Brewery](https://www.woodstockinnbrewery.com)[[dir|Woodstock Inn Station & Brewery, 135 Main Street, North Woodstock, New Hampshire]]",
          detail: [
            "135 Main Street, North Woodstock, NH 03262 · [[tel|603-745-3951]] · [book on OpenTable](https://www.opentable.com/r/woodstock-inn-station-and-brewery-north-woodstock). Tuesday 11:30 AM to 9:00 PM, a restored train depot half a mile from I-93 Exit 32. Sesame Maple Scallops $28.99, Station Scallops $28.99, Station Steak $29.99, Steak Tips $28.99, Shrimp Fra Diavolo $26.99.",
            "Wine alternative: [Tullamore Tavern](https://www.whitemountainhotel.com/dining/tullamore-tavern)[[dir|Tullamore Tavern, 87 Fairway Drive, North Conway, New Hampshire]] at the White Mountain Hotel · [[tel|603-356-7100]] · Tuesday 11:30 AM to 3:00 PM · same Wine Spectator programme as Ledges. You'd hit it around noon, before the Kancamagus rather than after.",
          ],
          warnings: [
            "It is a brewery, so beer is the point and the by-the-glass white wine list could not be verified. If the wine matters more, take the Tullamore alternative.",
            "Do not drive to The Common Man in Lincoln at lunchtime. It sits right at Exit 32 and looks obvious, but it is dinner-only from 4:00 PM.",
            "Skip Flume Gorge: it is a timed-entry ticket at Exit 34A costing 25 to 30 minutes of backtracking, and the loop is 2 miles and 90 minutes of sustained stairs. Cathedral Ledge delivers a comparable payoff for a four-minute drive.",
          ],
        },
        {
          time: "2:45 PM",
          heading: "I-93 south, then home — [[map|Salt Point, NY|Salt Point, New York]]",
          detail: [
            "318 miles, about 6 hours 20 minutes total for the day. I-93 south, or US-302 west to Littleton and I-91 south through Vermont, then I-90 west to Lee and the Taconic south.",
          ],
          warnings: [
            "This corridor is thinner than the Maine one. The first 100 miles have no Supercharger whichever way you go. Charge at [[map|North Conway Supercharger|Tesla Supercharger, 32 Mountain Valley Blvd, North Conway, New Hampshire]] before you leave the mountains — 8 stalls, 250 kW. After that, St. Johnsbury VT, West Lebanon NH, Brattleboro VT and Lee MA are all well served.",
          ],
        },
        { time: "~7:00 PM", heading: "Home — [[map|Salt Point, NY|Salt Point, New York]]" },
      ],
    },
    checklist: [
      "Call [The Glen House](https://theglenhouse.com), [[tel|603-466-3420]]. Confirm the cancellation deadline first, then book the direct flexible rate (not an OTA prepaid rate). Ask about the EV chargers while you have them.",
      "Book [The Notch Grille](https://resy.com/cities/coos-county-nh/venues/the-notch-grille) on Resy for 7:00 PM — the only restaurant within 20 minutes.",
      "If you want Ledges instead, call [[tel|603-356-7100]] ext. 406 and settle the chocolate-bomb question first.",
      "Book [Woodstock Inn](https://www.opentable.com/r/woodstock-inn-station-and-brewery-north-woodstock) for Tuesday 1:30 PM.",
      "Put $5 cash in the car for the Kancamagus iron ranger and $10 for Cathedral Ledge.",
      "Nothing to book for the Auto Road — pay at the gate on the morning.",
    ],
  },
];
