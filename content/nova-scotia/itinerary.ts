import type { TripDay } from "@/lib/trip-types";
import { NS_PHOTOS } from "./photos";

/**
 * NOVA SCOTIA — THE JOURNEY, DAY BY DAY  (itinerary v2.1)
 * ------------------------------------------------------
 * A relaxed 12-day 2026 road trip for Darren & Melissa. Originally built from
 * the "Nova Scotia Hotel Master Plan V2.1" spreadsheet, then reconciled again
 * to the live Notion "MASTER Hotel Plan" — the actual source of truth for
 * bookings, updated as reservations land — which favours value over luxury:
 * honest, well-reviewed inns that support the trip instead of becoming it.
 *
 * REROUTED AUG 16, 2026. The carrier cancelled the Yarmouth -> Bar Harbor CAT
 * sailing booked for Monday the 17th, which killed the whole Maine return leg
 * (Bar Harbor, Acadia, Cadillac, and the Two Paths final night). Days 10-12 now
 * run west instead — New Brunswick to Temiscouata, a day in Old Quebec, and
 * home down the I-87 on Tuesday the 18th. Days 1-9 are the completed trip as
 * driven and are deliberately untouched. The rerouted days keep only their
 * spine here (dates, regions, stops, maps) so the photo-upload dropdowns, the
 * family view and the #day-NN anchors stay correct; their verified timed plans,
 * warnings and booking detail live in ./reroute.ts.
 *
 * Locked overnights: Bangor / Bangor Inn & Suites, St. Andrews /
 * Kennedy House, Alma / Rodd Moncton (refundable fallback — Alma village was
 * sold out; still chasing Alpine Motor Inn / Parkland Village Inn direct for
 * an in-village upgrade), Halifax / Cambridge Suites, Lunenburg / The Kinley
 * House (Sail Inn sold out for this date), Baddeck / Auberge Gisele's Inn
 * (Telegraph House archived — Gisele's won on king bed + rate), Chéticamp /
 * L'Auberge Doucet Inn (waitlisted for an upgrade to Outback Inn or Archie &
 * Isidore), Ingonish / Seascape. Yarmouth / Rodd Grand was CANCELLED on Aug 16
 * with the ferry; the last two nights are Temiscouata-sur-le-Lac / Hotel
 * Chateau Fraser and Quebec City / Hotel Clarendon. All 11 nights are booked.
 * Added by request during planning: Blue Rocks, Ovens Natural Park, and Meat
 * Cove.
 *
 * LINK MODEL (as of the Aug 2026 dining pass):
 *  - The day "summary" copy (breakfast/lunch/dinner/stops/stay) links each place
 *    to its own WEBSITE with [label](url); places with no website are plain text.
 *  - The expandable "Detailed daily plan — hour by hour" carries the Google Maps
 *    GPS directions, one tap per stop, via [[map|Words|Address]] tokens.
 *  - Verified restaurant facts and closures were refreshed in this pass; six
 *    permanently-closed businesses were removed. Days 10-12 were later replaced
 *    wholesale by the Aug 16 reroute and no longer carry dining prose here.
 *
 * NOTE: the day basemaps for the rerouted days were re-baked on Aug 16 (see
 * scripts/bake-reroute-maps.py). Days 1-9 still show the earlier framing.
 */

export const NS_DAYS: TripDay[] = [
  {
    n: "01",
    date: "Friday · August 7, 2026",
    region: "The gentle launch",
    leg: "Salt Point, NY → Bangor, Maine",
    title: "North, without the alarm clock",
    subtitle: "The one long day — the coast of Maine by lunch, and Bangor by dinner.",
    photo: NS_PHOTOS.portland,
    morningLocation: "Home in Salt Point, at a civilized hour — coffee on the porch, the car already packed for the trip's longest drive.",
    breakfast: "Something quick at home, or a pastry from the village. The real eating starts on the coast.",
    drive: "≈ 7 hr moving · 700 km — Taconic to the Mass Pike, then I-95 up through New Hampshire and the Maine coast to Bangor. All highway, all easy — just long, so today carries the miles and tomorrow is short.",
    stops: [
      { name: "Portsmouth, New Hampshire", time: "45 min", note: "A stretch and a harbour walk where New England first smells like the sea. Running behind already? This is the easiest stop to shorten to a 10-minute leg-stretch — Portland's Old Port covers the same 'first taste of the coast' feeling." },
      { name: "Portland Head Light, Cape Elizabeth", time: "45 min", note: "The most photographed lighthouse in Maine, right off the highway — a soft first postcard for Darren's camera, and a lobster-roll lunch at Fort Williams Park before you point the car north." },
    ],
    lunch: "[Bite Into Maine](https://www.biteintomaine.com/fort-williams) at Fort Williams Park, which sits in the same parking lot as Portland Head Light, so lunch and the lighthouse become one stop on the longest driving day of the trip. Order the Connecticut style, warm butter and cold lobster. 4.8 stars across 808 reviews, walk-up, open from 10:30. If you would rather sit down in town, [Portland Lobster Company](https://portlandlobstercompany.com/) on Commercial St is the fallback.",
    afternoon: "The easy run up I-95 from Portland to Bangor — inland and quick, the coast behind you and Canada a short hop tomorrow.",
    hotel: "[Bangor Inn & Suites](https://bangorinnandsuites.com/), Bangor — booked: a 9.0-rated deluxe king room with free continental breakfast and self parking, perfectly placed to make tomorrow's border run short.",
    dinner: "Bangor — [Timber Kitchen & Bar](https://www.timberkitchenandbar.com/) (wood-fired) or the [Sea Dog Brewing](https://www.seadogbrewing.com/location/bangor/) pub; downtown's indie spots are a 10-minute hop if you want livelier. Rolling in later than planned after the long drive? Both are casual, walk-in places — no reservation pressure tonight.",
    evening: "An early, easy night after the long haul — you have bought yourself a short, gentle Day 2.",
    charging: "Superchargers all the way up I-95 (Sturbridge, Portland, Augusta) — charge over lunch in Portland, then top up in Bangor (Broadway); Level 2 at the hotel overnight. Nothing to plan.",
    walking: "Easy — town strolls only.",
    rainy: "The Portland Museum of Art (Homer and the Wyeths) breaks the drive; the day is mostly windshield either way, and a rainy first day costs you nothing.",
    detailedPlan: [
      { time: "7:30 AM", label: "Depart Salt Point", detail: "Car packed the night before; coffee for the road." },
      { time: "12:00 PM", label: "[[map|Portsmouth, NH|Portsmouth, New Hampshire]] — 45 min", detail: "Leg-stretch and a first harbour smell." },
      { time: "1:00 PM", label: "Portland, ME — [[map|Bite Into Maine|Bite Into Maine, Fort Williams Park, Cape Elizabeth, Maine]] at the lighthouse", detail: "Lobster roll at Fort Williams first, then Supercharge at [[map|295 Forest Ave|295 Forest Ave, Portland, Maine]] on the way north — it is the far side of downtown, so charge after, not before." },
      { time: "2:30 PM", label: "Drive Portland → Bangor", detail: "≈ 2 hr up I-95, inland and quick." },
      { time: "4:45 PM", label: "Arrive Bangor — [[map|Bangor Inn & Suites|Bangor Inn & Suites, Bangor, Maine]]", detail: "Check in, unwind." },
      { time: "6:45 PM", label: "Dinner — [[map|Timber Kitchen & Bar|Timber Kitchen & Bar, Bangor, Maine]] / [[map|Sea Dog|Sea Dog Brewing Company, Bangor, Maine]]" },
      { time: "7:52 PM", label: "Sunset ≈ 7:52 PM" },
      { time: "10:30 PM", label: "Early night", detail: "Long day done; tomorrow is short and gentle." },
    ],
    memory: "A lobster roll under Portland Head Light with the Atlantic finally in the frame — then the satisfying tick of the long day falling behind you as Bangor arrives.",
    map: [
      { label: "Salt Point", lat: 41.87, lon: -73.8 },
      { label: "Portsmouth", lat: 43.07, lon: -70.76 },
      { label: "Portland", lat: 43.66, lon: -70.26 },
      { label: "Bangor", lat: 44.8, lon: -68.77 },
    ],
  },
  {
    n: "02",
    date: "Saturday · August 8, 2026",
    region: "Into Canada, softly",
    leg: "Bangor, Maine → St. Andrews by-the-Sea, New Brunswick",
    title: "The border you barely feel",
    subtitle: "A short, easy morning across at Calais — and a whole afternoon in the gentlest town in Canada.",
    photo: NS_PHOTOS.standrews,
    morningLocation: "Bangor — an unhurried breakfast; today is the reward for yesterday, barely three hours to the border.",
    breakfast: "A proper Maine breakfast at the [Governor's Restaurant](https://www.governorsrestaurant.com/), and a coffee for Route 9.",
    drive: "≈ 3 hr · 240 km — the quiet Route 9 'Airline' east through the Maine woods to Calais, over the border at St. Stephen, then a short hop to St. Andrews. The road empties the whole way.",
    stops: [
      { name: "St. Stephen, New Brunswick", time: "1 hr", note: "The Ganong chocolate town, right at the border — the Chocolate Museum and a bag of chicken-bone candy for the road." },
      { name: "Kingsbrae Garden, St. Andrews", time: "1.5 hr", note: "Twenty-seven acres of coastal garden above Passamaquoddy Bay — the soft, unhurried arrival into Canada, with time to spare because the drive was short." },
    ],
    lunch: "[The Red Herring Pub](https://www.theredherringpub.com/) on Water Street once you are in town, Saturday kitchen 11:30 to 9. Fried clams and fish and chips made with fresh cod. Keep it moderate because Rossmount is at 7. The prettier alternative is the Niger Reef Tea House out on the water, a 1926 heritage log building, but it has no website and its lunch hours are not reliably published, so call 506-529-8005 the morning of if you want it.",
    afternoon: "Cross into Canada (passports ready; the crossing here is calm and quick), then settle into St. Andrews — Kingsbrae Garden, the long wharf, or a whale-watch boat out onto the bay. Short on time this afternoon? The free wharf walk (20 min) covers the mood in a fraction of Kingsbrae's 1.5 hr; if a whale-watch boat happens to be sailing and you've got 3 hours free, that beats either.",
    hotel: "[Kennedy House](https://www.kennedy-house.ca) — an excellent-value inn (8.5, 700+ reviews) a short walk from Water Street; half the price of the grand resort, in a town you came for anyway.",
    dinner: "[Rossmount Inn](https://www.rossmountinn.com/), one of the Maritimes' best tables (reserve), or the Niger Reef Tea House on the water. No Rossmount table, or running too late to make the reservation? Niger Reef doesn't take reservations and is a flat walk from the inn — the easy fallback.",
    evening: "Sunset from the wharf; whales sometimes roll through the bay off the point — and the first real spread of stars once the light goes.",
    charging: "Charge full in Bangor before Route 9 (no chargers on the Airline); Canadian charging begins around St. Stephen and Saint John. Kennedy House / town Level 2 overnight.",
    walking: "Easy — gardens and a flat seaside town.",
    rainy: "Kingsbrae's pavilions, the Ganong Chocolate Museum, or the Huntsman Fundy Discovery Aquarium.",
    sky: "If skies are clear, the wharf gives your first real spread of stars — light pollution thins the moment you leave the I-95 corridor. An easy, optional first look up.",
    detailedPlan: [
      { time: "9:00 AM", label: "Breakfast in Bangor — [[map|Governor's|Governor's Restaurant, Bangor, Maine]]" },
      { time: "10:00 AM", label: "Depart east on Route 9", detail: "Charge full first; the Airline has no chargers." },
      { time: "12:15 PM", label: "St. Stephen border + [[map|Ganong|Ganong Chocolate Museum, St. Stephen, New Brunswick]] — ≈ 1 hr", detail: "Chocolate Museum; passports ready." },
      { time: "2:00 PM", label: "Arrive St. Andrews — [[map|Kennedy House|Kennedy House, St. Andrews, New Brunswick]]", detail: "Check in, drop bags." },
      { time: "2:15 PM", label: "Lunch in St. Andrews — [[map|The Red Herring Pub|The Red Herring Pub, St. Andrews, New Brunswick]]", detail: "Lunch lands on arrival, not midday — the 12:30 to 1:30 window is the Ganong Museum hour." },
      { time: "2:45 PM", label: "[[map|Kingsbrae Garden|Kingsbrae Garden, St. Andrews, New Brunswick]] / the wharf — ≈ 1.5 hr", detail: "Or a whale-watch boat if one's sailing." },
      { time: "7:00 PM", label: "Dinner — [[map|Rossmount Inn|Rossmount Inn, St. Andrews, New Brunswick]] (reserve)" },
      { time: "8:46 PM", label: "Sunset ≈ 8:46 PM ADT", detail: "First stars from the wharf if it's clear." },
      { time: "10:30 PM", label: "Bedtime" },
    ],
    memory: "Crossing into Canada before lunch and feeling the whole trip downshift — chocolate in hand, a garden above the bay, and a long, slow afternoon with nowhere you had to be.",
    map: [
      { label: "Bangor", lat: 44.8, lon: -68.77 },
      { label: "St. Stephen", lat: 45.19, lon: -67.28 },
      { label: "St. Andrews", lat: 45.07, lon: -67.05 },
    ],
  },
  {
    n: "03",
    date: "Sunday · August 9, 2026",
    region: "The highest tides on earth",
    leg: "St. Andrews → Hopewell Rocks → Alma & the Bay of Fundy",
    title: "Walk the floor of the ocean",
    subtitle: "Time the day to the tide, and stand where the sea will be.",
    photo: NS_PHOTOS.fundy,
    morningLocation: "St. Andrews — a good breakfast, then east along the Fundy shore (check today's low-tide time first; the whole day pivots on it).",
    breakfast: "Honeybeans in town, or the inn; a coffee for the coast road.",
    drive: "≈ 3 hr 15 min · 260 km to Hopewell, plus the Fundy park loop — an easy day of short hops between big views.",
    stops: [
      { name: "Saint John, NB", time: "1 hr", note: "The uptown red-brick core and the Reversing Falls, where the Fundy tide runs the river backwards. A Supercharger and a real Sunday lunch here — the Saint John City Market is closed Sundays, so don't plan around it." },
      { name: "[Hopewell Rocks](https://www.thehopewellrocks.ca/)", time: "1.5–2 hr", note: "Descend the stairs to the actual sea floor at low tide and walk among tree-topped flowerpot stacks carved by forty vertical feet of tide." },
    ],
    lunch: "[Saint John Ale House](https://www.saintjohnalehouse.com/) at Market Square, Sunday from 11:30. Make this the real meal, because the next food is Alma at 3:30. Worth knowing: the Saint John City Market is closed Sundays, so do not plan around it. If you would rather go at 11:00 sharp, [Britts Pub + Eatery](https://www.brittspub.ca/) on Princess St opens at 10 and closes at 3:30 Sunday.",
    afternoon: "Hopewell Rocks at low tide, then Cape Enrage's cliffs; the sea floor you walked at noon is under three storeys of water by dusk. If the day's run long by the time you leave Hopewell, Cape Enrage is the stop to drop — Hopewell is the one that's actually tide-locked and won't repeat.",
    hotel: "[Rodd Moncton](https://www.roddvacations.com/rodd-moncton) — booked (refundable): Alma village sold out everywhere, so tonight is Moncton, about an hour (79 km via Route 114) from the Fundy park gate. Still chasing Alpine Motor Inn / Parkland Village Inn direct for an in-village upgrade — if one lands, reclaim the walk-to-the-gate evening below.",
    dinner: "Eat early in Alma while you are already there rather than driving back for it. Tipsy Tails around 4:30, 4.4 stars across 451 reviews and the top-rated place in the village, for beer-battered haddock, fish cakes and Boujie fries. Call 506-887-2190 first, because their Sunday hours are not reliably published. Two minutes away if it is full: the [Tides at the Parkland](https://www.parklandvillageinn.com/).",
    evening: "Back to the flats at dusk to watch the water swallow the ground you stood on — the same view, twice, transformed. Then the hour back to Moncton for the night.",
    charging: "Superchargers in Saint John and Moncton, both near food. Alma is remote — arrive with a good charge and top up before the park; the inn has Level 2.",
    walking: "Easy–moderate — stairs down to the ocean floor at Hopewell; flat clifftop paths at Cape Enrage.",
    rainy: "The tide performs in any weather; the Hopewell interpretive centre and Cape Enrage's café keep you dry between shows.",
    sky: "Skip the Fundy dark sky tonight. You are based in Moncton, an hour from the dark flats at Alma, so this is not the night to chase stars. The real one is coming: Ingonish on August 15, the darkest sky of the trip, and worth saving your late night for.",
    detailedPlan: [
      { time: "8:30 AM", label: "Breakfast — [[map|Honeybeans|Honeybeans, 180 Water St, St. Andrews, New Brunswick]]", detail: "Check today's low-tide time; the day pivots on it." },
      { time: "9:30 AM", label: "Depart east along the Fundy shore" },
      { time: "11:30 AM", label: "Saint John — [[map|Saint John Ale House|Saint John Ale House, Market Square, Saint John, New Brunswick]] + Reversing Falls, ≈ 1 hr", detail: "Sunday lunch from 11:30; Supercharge here. City Market is closed Sundays." },
      { time: "1:30 PM", label: "[[map|Hopewell Rocks|Hopewell Rocks Provincial Park, New Brunswick]] — ≈ 1.5–2 hr", detail: "Walk the sea floor at low tide." },
      { time: "3:30 PM", label: "Alma — [[map|Kelly's Bake Shop|Kelly's Bake Shop, 8587 Main St, Alma, New Brunswick]] sticky buns", detail: "Buy tomorrow's breakfast now (506-887-2460) — it removes an hour-each-way detour in the morning." },
      { time: "4:30 PM", label: "Early dinner in Alma — [[map|Tipsy Tails|Tipsy Tails, 8607 Main St, Alma, New Brunswick]]", detail: "Call 506-887-2190; the Tides at the Parkland is two minutes away if it's full." },
      { time: "6:45 PM", label: "Arrive [[map|Rodd Moncton|Rodd Moncton, Moncton, New Brunswick]] (booked, refundable)", detail: "About an hour (79 km via Route 114) from the Fundy park gate." },
      { time: "8:33 PM", label: "Sunset ≈ 8:33 PM ADT", detail: "The flats at high tide, transformed, before the drive back." },
    ],
    memory: "Standing on the ocean floor at noon, then watching four storeys of tide quietly erase it by dark — the same view, twice, transformed.",
    map: [
      { label: "St. Andrews", lat: 45.07, lon: -67.05 },
      { label: "Saint John", lat: 45.27, lon: -66.06 },
      { label: "Hopewell Rocks", lat: 45.82, lon: -64.58 },
      { label: "Alma", lat: 45.6, lon: -64.95 },
    ],
  },
  {
    n: "04",
    date: "Monday · August 10, 2026",
    region: "Across into Nova Scotia",
    leg: "Moncton → Wolfville & Grand-Pré → Halifax",
    title: "Wine country by the world's biggest tide",
    subtitle: "Cross into Nova Scotia through orchards and dykelands; arrive in Halifax by evening.",
    photo: NS_PHOTOS.wolfville,
    morningLocation: "Moncton — a patisserie breakfast, then the flat, painless drive into Nova Scotia over the Tantramar marshes.",
    breakfast: "[Tony's Bistro & Pâtisserie](http://www.tonysbistro.ca/) on McLaughlin Dr, Monday from 8. A real patisserie rather than a chain, croissants reviewers call to die for, and it is already pointed at the Route 15 exit east. Eat the Kelly's sticky buns you bought in Alma yesterday alongside it. If you sleep in, [Cora](https://www.chezcora.com/en/breakfast-lunch-restaurants/cora-moncton/) on Main St opens at 6 and is walking distance from the hotel.",
    drive: "≈ 3 hr to Wolfville, then 1 hr on to Halifax · 330 km total — over the isthmus at Amherst into Nova Scotia.",
    stops: [
      { name: "Grand-Pré National Historic Site", time: "1 hr", note: "A UNESCO landscape of Acadian dykelands and the moving story of the 1755 deportation — quiet, beautiful, and grounding." },
      { name: "Wolfville wineries", time: "1.5–2 hr", note: "[Lightfoot & Wolfville](https://www.lightfootandwolfville.com/) or [Domaine de Grand Pré](https://www.grandprewines.com/) — Nova Scotia's crisp Tidal Bay whites, tasted on a patio above the flats. Running late out of Fundy? One patio beats two — pick whichever you're eating lunch at and skip the second tasting." },
    ],
    lunch: "[Le Caveau](https://grandprewines.com/pages/le-caveau) at [Domaine de Grand Pré](https://www.grandprewines.com/), or the [Lightfoot & Wolfville](https://www.lightfootandwolfville.com/) terrace — valley-to-table with the Bay of Fundy shining below.",
    afternoon: "Walk the Grand-Pré dykelands, then the genuinely easy hour into Halifax — the biggest city of the trip arrives gently.",
    hotel: "[Cambridge Suites Hotel](https://www.cambridgesuiteshalifax.com), Halifax — booked: a Superior Suite (one-bedroom, king bed) with breakfast, central and steps from the waterfront and Citadel — the value pick over the Prince George, same neighbourhood for less.",
    dinner: "[The Bicycle Thief](https://bicyclethief.ca/) on the boardwalk, and book it: they take reservations through [SevenRooms](https://www.sevenrooms.com/reservations/thebicyclethief) and Monday is the softest night of their week. If it falls through, [Ristorante a Mano](https://www.ristoranteamano.ca/) is run by the same family and sits sixty seconds' walk away at Bishop's Landing, or [The Five Fishermen](https://www.fivefishermen.com/) on Argyle St does Digby scallops with chestnut gnudi. Bar Kismet is closed Mondays, so it is not the backup it was listed as.",
    evening: "The Halifax waterfront after dark — schooners, buskers, harbour lights, and the longest downtown boardwalk in the world underfoot.",
    charging: "Supercharge in Truro at the midpoint (or New Minas near Wolfville); Enfield and Halifax have Superchargers, and the hotel has valet Level 2 overnight.",
    walking: "Easy — vineyard rows and a flat historic site.",
    rainy: "Tastings are indoors; Grand-Pré's interpretive centre is excellent; and Halifax is a city built for a rainy evening.",
    detailedPlan: [
      { time: "8:15 AM", label: "Breakfast — [[map|Tony's Bistro|Tony's Bistro & Pâtisserie, McLaughlin Dr, Moncton, New Brunswick]]", detail: "Eat the Kelly's sticky buns from Alma alongside it." },
      { time: "9:15 AM", label: "Depart over the isthmus into Nova Scotia" },
      { time: "12:15 PM", label: "[[map|Grand-Pré NHS|Grand-Pré National Historic Site, Nova Scotia]] — ≈ 1 hr", detail: "Dykelands and the Acadian story." },
      { time: "1:30 PM", label: "[[map|Wolfville|Wolfville, Nova Scotia]] — lunch + a tasting, ≈ 2 hr", detail: "Le Caveau or Lightfoot & Wolfville. Charge at New Minas." },
      { time: "4:45 PM", label: "Arrive Halifax — [[map|Cambridge Suites Hotel|Cambridge Suites Hotel, Halifax, Nova Scotia]]" },
      { time: "7:00 PM", label: "Dinner — [[map|The Bicycle Thief|The Bicycle Thief, Halifax, Nova Scotia]] (reserve)" },
      { time: "8:28 PM", label: "Sunset ≈ 8:28 PM ADT", detail: "Boardwalk after dark." },
      { time: "11:00 PM", label: "Bedtime" },
    ],
    memory: "A glass of Tidal Bay on a vineyard patio, the Bay of Fundy shining below — the moment Nova Scotia stopped being a plan and started being the trip.",
    map: [
      { label: "Moncton", lat: 46.09, lon: -64.77 },
      { label: "Amherst", lat: 45.83, lon: -64.21 },
      { label: "Wolfville", lat: 45.09, lon: -64.36 },
      { label: "Halifax", lat: 44.65, lon: -63.57 },
    ],
  },
  {
    n: "05",
    date: "Tuesday · August 11, 2026",
    region: "Halifax, at ease",
    leg: "Halifax — a day out of the car",
    title: "A city that feels like a coastal town",
    subtitle: "Waterfront, Citadel, a museum with a Titanic story — and a chocolate lava cake worth planning your night around.",
    photo: NS_PHOTOS.halifax,
    morningLocation: "Halifax — coffee on the waterfront; today the car doesn't move and neither do you, faster than you want to.",
    breakfast: "The Seaport Farmers' Market (North America's oldest) for coffee and pastries among the stalls.",
    drive: "None to speak of — this is the day that proves the trip isn't all windshield.",
    stops: [
      { name: "[Halifax Citadel](https://parks.canada.ca/lhn-nhs/ns/halifax)", time: "1.5 hr", note: "The star-shaped hilltop fort, the noon gun, kilted guards, and the whole harbour laid out below." },
      { name: "[Maritime Museum of the Atlantic](https://maritimemuseum.novascotia.ca/)", time: "1.5 hr", note: "The definitive Titanic collection and the story of the 1917 Halifax Explosion — history and engineering in one waterfront hall for Darren." },
      { name: "Halifax Public Gardens", time: "45 min", note: "Formal Victorian gardens, a bandstand, and a bench in the shade — the softest possible city stop." },
    ],
    lunch: "[Dave's Lobster](https://daveslobster.com/) at The Salt Yard on Lower Water St, named the city's best lobster roll by Discover Halifax. Open from 11, walk-up, and four minutes' walk from the Maritime Museum, which fits neatly between the noon gun and your 1:30 museum slot. Order the cold classic rather than the warm one. Salt Yard Social next door has the full bar if Melissa wants a glass of white. It is outdoors and seasonal, so if it is pouring go to the Bicycle Thief instead.",
    afternoon: "Take the Dartmouth ferry across the harbour and back — the oldest saltwater ferry in North America and, at a few dollars, the best harbour cruise there is. Running behind after the noon gun and the museum? The ferry round-trip is the easiest thing to cut — Public Gardens gives you the same quiet-breather feeling in a quarter of the time.",
    hotel: "Cambridge Suites again — no repacking, no logistics, just a second easy night in the heart of downtown.",
    dinner: "[The Keg Steakhouse + Bar](https://thekeg.com/en/locations/halifax) (4.7 across 2,483 OpenTable reviews; 1712 Market St, 902-425-8355, [book here](https://www.opentable.ca/r/the-keg-steakhouse-and-bar-halifax)) — scallops and bacon to start and a proper filet. They close at 9, so do not linger over it, because dessert is happening somewhere else. **Then walk six minutes up to [The Middle Spoon](https://themiddlespoon.com/) on Barrington St for the Chocolate Lava Cake.** Warm dark chocolate cake with a molten centre, ice cream and fresh fruit, $15.49, open till 11. This is the only real lava cake in Halifax — complete dessert menus at fourteen of the city's better rooms were checked and every one of them had landed on tarts, flourless cakes or crème brûlée instead. There is also a hidden speakeasy called Noble behind the dessert room. For a once-in-a-trip splurge instead of the steakhouse, [Mystic](https://mysticnovascotia.ca/) at Queen's Marque is eight courses under a suspended ship's-hull sculpture, No. 16 on Canada's 100 Best 2026, $175 a person, business casual, [bookable on OpenTable](https://www.opentable.com/r/mystic-halifax). Ask about the four-course Short Form at $120, which has its own seating inventory. The lava cake walk still works after it.",
    evening: "A pint and a tune at [The Carleton](https://www.thecarleton.ca/) or the Lower Deck — the real Maritime warmth, no cover charge on the feeling. The Carleton now opens only when an event is booked, so check their calendar before counting on the fiddle; the Lower Deck is the reliable alternative.",
    charging: "The car rests all day on the hotel's Level 2 — genuinely nothing to think about.",
    walking: "Easy — city strolling entirely at your own pace.",
    rainy: "Everything today has a roof — the museums, the market, the fiddle. A rainy Halifax day is a good day by design.",
    detailedPlan: [
      { time: "8:30 AM", label: "Breakfast — [[map|Seaport Farmers' Market|Halifax Seaport Farmers' Market, Halifax, Nova Scotia]]" },
      { time: "10:30 AM", label: "[[map|Halifax Citadel|Halifax Citadel National Historic Site, Halifax, Nova Scotia]] — ≈ 1.5 hr", detail: "Stay for the noon gun at 12:00." },
      { time: "12:30 PM", label: "Lunch — [[map|Dave's Lobster|Dave's Lobster, The Salt Yard, Lower Water St, Halifax, Nova Scotia]] at The Salt Yard" },
      { time: "1:30 PM", label: "[[map|Maritime Museum of the Atlantic|Maritime Museum of the Atlantic, Halifax, Nova Scotia]] — ≈ 1.5 hr" },
      { time: "3:15 PM", label: "[[map|Public Gardens|Halifax Public Gardens, Halifax, Nova Scotia]] — 45 min · coffee (Java Blend)" },
      { time: "4:15 PM", label: "[[map|Dartmouth ferry|Halifax–Dartmouth Ferry Terminal, Halifax, Nova Scotia]] round-trip — 45 min" },
      { time: "7:00 PM", label: "Dinner — [[map|The Keg|The Keg Steakhouse, 1712 Market St, Halifax, Nova Scotia]] (reserve)", detail: "Closes at 9 — keep it moving, dessert is elsewhere." },
      { time: "8:27 PM", label: "Sunset ≈ 8:27 PM ADT" },
      { time: "9:15 PM", label: "[[map|The Middle Spoon|The Middle Spoon, Barrington St, Halifax, Nova Scotia]] — the Chocolate Lava Cake", detail: "Six minutes' walk up Barrington. Open till 11." },
      { time: "11:30 PM", label: "Bedtime" },
    ],
    memory: "The harbour ferry at dusk, the city gold behind you, then a molten chocolate lava cake up on Barrington — the day you didn't touch the car and didn't miss it once.",
    map: [
      { label: "Halifax", lat: 44.65, lon: -63.57 },
      { label: "Dartmouth", lat: 44.67, lon: -63.57 },
    ],
  },
  {
    n: "06",
    date: "Wednesday · August 12, 2026",
    region: "The South Shore",
    leg: "Halifax → Peggy's Cove → Mahone Bay → Lunenburg",
    title: "Lighthouses, three churches, and a painted town",
    subtitle: "The classic coast — photographed early, tasted slowly, with two hidden corners most people miss.",
    photo: NS_PHOTOS.peggys,
    morningLocation: "Halifax — an early start out along St. Margarets Bay, ahead of the tour buses, to have Peggy's Cove to yourselves.",
    breakfast: "Coffee and a pastry in the Cambridge Suites lobby, which opens at 6:30 on weekdays, then the actual breakfast an hour up the coast. Shoot Peggy's Cove first in the empty early light, then sit down at the [Sou'Wester](https://shoppeggyscove.com/) at 8:30 for eggs, fish cakes, bacon and homemade jam, served hot off the grill until noon. Skip their lobster roll, which is where the complaints cluster. If the hotel lobby is slow, the Tim Hortons on Duke St opens at 6.",
    drive: "≈ 2 hr 30 min total across the whole day · 160 km — short, scenic legs with long stops between.",
    stops: [
      { name: "Peggy's Cove", time: "1–1.5 hr", note: "The red-capped light on wave-worn granite. Go early for the low light, the quiet, and the safe new viewing deck — mind the wet black rock." },
      { name: "Mahone Bay", time: "1 hr", note: "The three steepled churches mirrored in a calm bay, and a main street of makers, bakers, and a very good kouign-amann. For a mid-morning coffee and pastry, [Rebecca's](https://rebeccasrestaurant.com/) is the pick; Oh My Cod has closed." },
      { name: "Ovens Natural Park", time: "1.5 hr", note: "Added by request: sea caves in the cliffs south of Lunenburg — a coastal boardwalk into booming caverns (the 'Cannon Cave'), and a gold-rush beach you can still pan. A wild, low-key counterpoint to the postcard towns." },
      { name: "Blue Rocks", time: "1 hr", note: "Added by request: a tiny fishing hamlet 10 minutes past Lunenburg — slate-blue ledges, weathered fish shacks, and still water. The photographer's secret of the South Shore; go for golden hour." },
    ],
    lunch: "[Salt Shaker Deli](https://www.saltshakerdeli.com/) on Montague St, the top-rated restaurant in Lunenburg across 1,332 reviews. Bacon-wrapped scallops, the chowder people call the best in town, and a back deck over the harbour. Walk-in only, no reservations by any method: give them your name and number at 12:15, then wander Old Town and hit [Laughing Whale](https://laughingwhalecoffee.com/) until they call you. Since dinner is small plates, make this the substantial meal of the day.",
    afternoon: "Into Lunenburg to drop bags, then the pair most visitors miss — the sea caves at Ovens Natural Park, and the blue-slate ledges of Blue Rocks in the low evening light. If Peggy's Cove or Mahone Bay ran long, protect Blue Rocks — it's golden-hour dependent and won't repeat — and shorten or skip Ovens Natural Park instead.",
    hotel: "[The Kinley House](https://thekinleyhouse.com/), Lunenburg — booked: a one-bedroom apartment suite with a king bed and kitchenette in a restored heritage home, 10–15 min walk to the UNESCO Old Town. Non-refundable, prepaid. (Sail Inn was the original pick but sold out for this date on both Booking.com and its own site.)",
    dinner: "[Bar Salvador](https://www.barsalvador.com/) for tapas, but go when they open at 4 rather than at 7:30. It seats 22, takes no reservations by any method, and a 22-seat room at 7:30 in peak August is a real gamble. Hold a table at the [Grand Banker](https://grandbanker.com/) as insurance, precisely because Salvador cannot be booked. Not the Old Fish Factory: recent reviews describe hard dark batter, a lobster roll with almost no meat in it, and chowder with no flavour in the broth.",
    evening: "The waterfront at blue hour — dories, rigging, and reflections; a nightcap on the inn porch.",
    charging: "Supercharge in Bridgewater (ten minutes from Lunenburg, and right by Ovens Natural Park) or back in Halifax; a short-mileage day makes charging an afterthought.",
    walking: "Easy–moderate — Peggy's granite is slick when wet; the Ovens cliff boardwalk has stairs and drops; the towns are flat and gentle.",
    rainy: "The Fisheries Museum of the Atlantic is a superb indoor half-day; Ironworks Distillery for a tasting; Peggy's Cove is at its most dramatic in fog.",
    sky: "Optional and photogenic rather than dark: if the harbour's clear, the Lunenburg and Blue Rocks waterfront scatters soft stars over the rigging — not the trip's darkest sky, but its prettiest for a long exposure.",
    detailedPlan: [
      { time: "7:00 AM", label: "Depart Halifax", detail: "Beat the buses to Peggy's Cove." },
      { time: "8:00 AM", label: "[[map|Peggy's Cove|Peggy's Cove, Nova Scotia]] — arrive for the empty early light", detail: "Shoot first, then eat." },
      { time: "8:30 AM", label: "Breakfast — [[map|Sou'Wester|Sou'Wester Restaurant, Peggy's Cove, Nova Scotia]]", detail: "Eggs and fish cakes off the grill till noon." },
      { time: "10:00 AM", label: "[[map|Mahone Bay|Mahone Bay, Nova Scotia]] — ≈ 1 hr + coffee at [[map|Rebecca's|Rebecca's Restaurant, Mahone Bay, Nova Scotia]]" },
      { time: "12:15 PM", label: "Lunch — [[map|Salt Shaker Deli|Salt Shaker Deli, Montague St, Lunenburg, Nova Scotia]] (put your name in, then wander)" },
      { time: "12:30 PM", label: "Lunenburg — drop bags at [[map|The Kinley House|The Kinley House, Lunenburg, Nova Scotia]], Old Town wander", detail: "Coffee at [[map|Laughing Whale|Laughing Whale Coffee, Lunenburg, Nova Scotia]]." },
      { time: "2:30 PM", label: "[[map|Ovens Natural Park|Ovens Natural Park, Nova Scotia]] — ≈ 1.5 hr", detail: "Sea-cave boardwalk; charge at Bridgewater nearby." },
      { time: "4:45 PM", label: "Early dinner — [[map|Bar Salvador|Bar Salvador, Lunenburg, Nova Scotia]] (walk-in, opens at 4)", detail: "22 seats, no reservations; [[map|Grand Banker|Grand Banker Bar & Grill, Lunenburg, Nova Scotia]] as insurance." },
      { time: "7:00 PM", label: "[[map|Blue Rocks|Blue Rocks, Nova Scotia]] — golden hour, ≈ 1 hr", detail: "The photographer's hamlet." },
      { time: "8:27 PM", label: "Sunset ≈ 8:27 PM ADT", detail: "Blue hour on the waterfront." },
      { time: "11:00 PM", label: "Nightcap on the porch, then bed" },
    ],
    memory: "Peggy's Cove almost to yourselves at first light, and the blue ledges of Blue Rocks glowing at dusk — the famous coast and its quiet secret, both in one unhurried day.",
    map: [
      { label: "Halifax", lat: 44.65, lon: -63.57 },
      { label: "Peggy's Cove", lat: 44.49, lon: -63.92 },
      { label: "Mahone Bay", lat: 44.45, lon: -64.38 },
      { label: "Lunenburg", lat: 44.38, lon: -64.31 },
    ],
  },
  {
    n: "07",
    date: "Thursday · August 13, 2026",
    region: "Toward Cape Breton",
    leg: "Lunenburg → Antigonish → Baddeck, Cape Breton",
    title: "The long, easy reach to the inland sea",
    subtitle: "A scenic repositioning day that ends on the shore of Bras d'Or Lake.",
    photo: NS_PHOTOS.brasdor,
    morningLocation: "Lunenburg — a last harbour coffee, then north; the day is about arriving somewhere serene, not rushing.",
    breakfast: "Nº 9 Coffee Bar on Montague St, 4.7 stars and the best coffee in town, for cinnamon buns, a cheese scone people rave about, and a breakfast galette, with a secret garden out back. One caveat worth a phone call: sources disagree on whether they open Thursdays, so ring 902-634-3204 Wednesday afternoon while you are already in town. If they are dark, the Tim Hortons on Victoria Rd opens at 5 and sits directly on your route out to Highway 103.",
    drive: "≈ 4 hr 30 min · 430 km — up through the province and over the Canso Causeway onto Cape Breton, broken by good stops.",
    stops: [
      { name: "Truro", time: "30 min", note: "A charge and a leg-stretch; if the tide's right, catch the Salmon River tidal bore rolling upstream." },
      { name: "Antigonish", time: "1 hr", note: "A pretty university town for a relaxed main-street lunch — the last real town before the island." },
      { name: "Canso Causeway & Aulds Cove", time: "20 min", note: "Cross the deepest causeway in the world onto Cape Breton — and charge to 100% at Aulds Cove first: it is the last fast charging before the island's sparse network." },
    ],
    lunch: "[Gabrieau's Bistro](https://www.gabrieaus.com/) at 350 Main Street, chef-owned since 1998 and literally the bistro the plan was gesturing at. Pistachio-crusted halibut, lobster bisque, and a dessert list reviewers keep coming back to. It is the rare menu that runs sushi, pasta, steaks and local seafood in one room, and it is open year-round so the university's summer break does not close it. Phone reservations only, 902-863-1925. Backup: [Brownstone](https://brownstonecafe.ca/) at 244 Main.",
    afternoon: "Over the causeway and along the shore of Bras d'Or Lake — a vast inland sea — into Baddeck by late afternoon.",
    hotel: "[Auberge Gisele's Inn](https://giseles.com/), Baddeck — booked: a Deluxe King Room, central and great value; picked fresh over Telegraph House for the king bed at about $35 less. (Telegraph House — in operation since 1861, with an Alexander Graham Bell connection — was the original pick, archived when this beat it on rate and bed type.)",
    dinner: "[Baddeck Lobster Suppers](https://www.baddecklobstersuppers.ca/), and go at 5 rather than 6:30. They close at 8 and take no reservations for parties under six, and reviews report twenty to sixty minute waits at any hour, so arriving early is the only protection you have. Rolling in late, or if the line is out the door: the [Bell Buoy](https://www.bellbuoy.ca/) is the fallback, but call first because their published hours conflict between sources.",
    evening: "The Bras d'Or shore at dusk — glass-calm water, loons calling, the quietest night of the trip so far.",
    charging: "Supercharge in Truro and near New Glasgow on the way, then top to 100% at Aulds Cove before the causeway — Cape Breton has no Superchargers. Baddeck has a FLO fast charger on Highway 105 and the inn has Level 2. This is your staging point for the Cabot Trail.",
    walking: "Easy — a stretch-your-legs travel day.",
    rainy: "The drive is the day and it's comfortable in any weather; if it pours, the [Bell museum](https://parks.canada.ca/lhn-nhs/ns/grahambell) tomorrow is entirely indoors.",
    sky: "Best chance for dark sky tonight: away from the village, the Bras d'Or shore is genuinely dark. If it's clear, step out after dinner — the lake doubles every star.",
    detailedPlan: [
      { time: "8:15 AM", label: "Breakfast — [[map|Nº 9 Coffee Bar|Nº 9 Coffee Bar, 135 Montague St, Lunenburg, Nova Scotia]]", detail: "Call 902-634-3204 the day before — Thursday hours are uncertain; Tim Hortons on Victoria Rd from 5 as the backup." },
      { time: "9:15 AM", label: "Depart north" },
      { time: "11:30 AM", label: "[[map|Truro|Truro, Nova Scotia]] — 30 min charge + stretch" },
      { time: "1:00 PM", label: "[[map|Antigonish|Antigonish, Nova Scotia]] — lunch at [[map|Gabrieau's Bistro|Gabrieau's Bistro, 350 Main St, Antigonish, Nova Scotia]], ≈ 1 hr" },
      { time: "2:45 PM", label: "[[map|Aulds Cove|Aulds Cove, Nova Scotia]] — CHARGE TO 100%", detail: "Last fast charging before Cape Breton; then the Canso Causeway." },
      { time: "4:00 PM", label: "Arrive Baddeck — [[map|Auberge Gisele's Inn|Auberge Gisele's Inn, Baddeck, Nova Scotia]]" },
      { time: "5:00 PM", label: "Dinner — [[map|Baddeck Lobster Suppers|Baddeck Lobster Suppers, Baddeck, Nova Scotia]] (go at 5)", detail: "Closes at 8, no reservations under six; early is the only protection. Bell Buoy as fallback." },
      { time: "8:15 PM", label: "Sunset ≈ 8:15 PM ADT", detail: "Bras d'Or shore; stargaze if clear." },
      { time: "10:30 PM", label: "Bedtime (later if the sky delivers)" },
    ],
    memory: "The first sight of Bras d'Or Lake opening out beyond the causeway — an inland sea you didn't expect, and the calmest water of the whole trip.",
    map: [
      { label: "Lunenburg", lat: 44.38, lon: -64.31 },
      { label: "Truro", lat: 45.37, lon: -63.28 },
      { label: "Antigonish", lat: 45.62, lon: -61.99 },
      { label: "Baddeck", lat: 46.1, lon: -60.75 },
    ],
  },
  {
    n: "08",
    date: "Friday · August 14, 2026",
    region: "Bell's lake & the Cabot Trail (west)",
    leg: "Baddeck → Alexander Graham Bell museum → Chéticamp",
    title: "Hydrofoils in the morning, the Skyline at dusk",
    subtitle: "Invention over Bras d'Or Lake, then up the western rampart of the Cabot Trail.",
    photo: NS_PHOTOS.bellMuseum,
    morningLocation: "Baddeck — a full charge and an unhurried morning on Bras d'Or before the museum opens.",
    breakfast: "[Highwheeler Cafe & Bakery](https://visitbaddeck.com/listings/highwheeler-cafe-bakery/) on Chebucto St opens at 7 and roasts its own coffee, so eat there: scones, breakfast sandwiches, oatcakes. Then carry the second coffee down to [The Freight Shed at the Terrace](https://visitbaddeck.com/listings/the-freight-shed-at-the-terrace/) on Water St, which is the view the morning asks for. Gisele's does serve a hot buffet, but it charges about $16 a head for it and has no lake view, and the Freight Shed's kitchen runs slow enough that eating there risks the 9:30 departure.",
    drive: "≈ 2 hr 30 min of actual driving spread across the day · 130 km to Chéticamp and the park's west gate — slow, and stopped often.",
    stops: [
      { name: "[Alexander Graham Bell museum](https://parks.canada.ca/lhn-nhs/ns/grahambell)", time: "1.5–2 hr", note: "The best small museum on the route. The telephone was only the start: the HD-4 hydrofoil that set a world marine-speed record in 1919; the Silver Dart and the first powered flight in the British Empire; his tetrahedral kites; and a lifetime of work on deafness and communication — all in a light-filled hall over the lake he chose for exactly this view. Engineering as romance, for Darren." },
      { name: "Chéticamp", time: "1 hr", note: "A proud Acadian fishing village — hooked-rug shops, a tall church, and the last full services before the park's west gate." },
      { name: "[Skyline Trail](https://parks.canada.ca/pn-np/ns/cbreton)", time: "1.5–2 hr", note: "The Trail's signature walk: a wide, mostly flat 7 km loop out to a headland boardwalk stepping down toward the Gulf. Moose common at dusk. Go for golden hour — or take the drive-up lookoffs for the view without the walk." },
    ],
    lunch: "[Le Gabriel](https://www.legabriel.com/) on the Cabot Trail for Acadian seafood and a bowl of fish fricot, with the hooked-rug tradition to look at afterward. Note the Co-op's Restaurant Acadien has closed.",
    afternoon: "The [Cabot Trail's](https://cabottrail.travel/) western switchbacks and lookoffs at French and MacKenzie Mountains, an early dinner, then the Skyline for sunset. Running behind after the Bell museum? Take French and MacKenzie Mountains as drive-up viewpoints without getting out — Skyline at golden hour is the one to protect, not the lookoffs.",
    hotel: "[L'Auberge Doucet Inn](https://www.aubergedoucet.com/) — booked: a hilltop inn on the Cabot Trail, two double beds. Waitlisted for an upgrade to [Cheticamp Outback Inn](https://www.cheticampoutbackinn.com) or [The Archie & Isidore Hotel](https://www.archieandisidore.ca) (both 9.6) if a room opens up before August.",
    dinner: "[L'Abri Café, Restaurant et Bar](https://groupebridou.com/labri/) a kilometre up the Cabot Trail, 4.7 across 670 diner reviews and the best-rated room in the village. Seafood linguine, scallops, a chowder people call divine, and a lemon curd cheesecake regulars pre-order so it does not sell out. [Book on OpenTable](https://www.opentable.com/r/labri-cafe-restaurant-et-bar-cheticamp) for 5:15 and tell them at seating that you leave at 6:45 for the Skyline, because service speed reviews are mixed. If you would rather have a guaranteed fast table, the [Doryman](https://www.doryman.ca/) is pub-paced and looks out over the water.",
    evening: "The Gulf sunset from the Skyline headland, where the sun drops straight into the sea.",
    charging: "No Superchargers on Cape Breton. You arrived on a full charge from Aulds Cove; use the inn's Level 2 and the Parks Canada fast charger at the Chéticamp Visitor Centre, and treat the Trail as a loop, not a dash. Plan it once and the whole day stays stress-free.",
    walking: "Skyline is easy–moderate (flat, exposed, 7 km round trip); the lookoffs are drive-up. You choose your effort. The museum is flat with lake-view terraces.",
    rainy: "The Bell museum is a superb rain plan on its own; the lookoffs and drive still deliver in cloud; save the Skyline for a clear evening.",
    sky: "Best chance for dark sky on the west of the Trail: Cape Breton Highlands has some of the darkest skies in Nova Scotia. If it's clear, the Gulf side after sunset is exceptional — no towns, no glow.",
    detailedPlan: [
      { time: "7:30 AM", label: "[[map|Highwheeler Cafe|Highwheeler Cafe & Bakery, Chebucto St, Baddeck, Nova Scotia]] — coffee and a scone" },
      { time: "8:15 AM", label: "Second coffee on the water at [[map|The Freight Shed|The Freight Shed at the Terrace, Water St, Baddeck, Nova Scotia]]" },
      { time: "9:30 AM", label: "[[map|Alexander Graham Bell museum|Alexander Graham Bell National Historic Site, Baddeck, Nova Scotia]] — ≈ 1.5–2 hr" },
      { time: "11:30 AM", label: "Drive the western Cabot Trail toward Chéticamp" },
      { time: "1:00 PM", label: "Arrive Chéticamp — [[map|L'Auberge Doucet Inn|L'Auberge Doucet Inn, Chéticamp, Nova Scotia]]" },
      { time: "1:30 PM", label: "Lunch — [[map|Le Gabriel|Le Gabriel Restaurant, Chéticamp, Nova Scotia]]" },
      { time: "3:00 PM", label: "[[map|French & MacKenzie Mountain lookoffs|French Mountain, Cape Breton Highlands National Park, Nova Scotia]]", detail: "Charge at the Parks Canada DCFC / inn L2." },
      { time: "5:15 PM", label: "Early dinner — [[map|L'Abri Café|L'Abri Café Restaurant et Bar, Chéticamp, Nova Scotia]] (book 5:15)", detail: "Tell them you leave at 6:45 for the Skyline; the Doryman is the fast fallback." },
      { time: "6:45 PM", label: "[[map|Skyline Trail|Skyline Trail, Cape Breton Highlands National Park, Nova Scotia]] for golden hour — ≈ 2 hr" },
      { time: "8:22 PM", label: "Sunset ≈ 8:22 PM ADT", detail: "The sun into the Gulf; Milky Way after, if clear." },
      { time: "11:00 PM", label: "Bedtime" },
    ],
    memory: "Standing under the HD-4's hull in the morning, then the Skyline headland at golden hour that evening — the man who invented the telephone chose this lake, and by dusk you understand exactly why.",
    map: [
      { label: "Baddeck", lat: 46.1, lon: -60.75 },
      { label: "Margaree", lat: 46.34, lon: -61.09 },
      { label: "Chéticamp", lat: 46.63, lon: -61.01 },
      { label: "Skyline Trail", lat: 46.75, lon: -60.86 },
    ],
  },
  {
    n: "09",
    date: "Saturday · August 15, 2026",
    region: "The Cabot Trail (east) & Ingonish",
    leg: "Chéticamp → Meat Cove → Ingonish",
    title: "The wild top of the island, and the darkest sky of all",
    subtitle: "Over the highlands to the rugged northern tip, then down the eastern coast to a warm sea and a sky full of stars.",
    photo: NS_PHOTOS.ingonish,
    morningLocation: "The western Highlands — coffee, then up and over the top of the park on the trip's most scenic single stretch.",
    breakfast: "L'Auberge Doucet includes a self-serve continental breakfast — eggs, yogurt, muffins, bread, a Nespresso machine — but the serving hours are not published anywhere, so call 902-224-3438 to confirm it starts by 8, and get there at opening because guests report the room filling fast. It will not hold you to a 12:45 lunch, so stop at [Aucoin Bakery](https://www.aucoinbakery.com/) in Petit Étang, open from 7, and carry Acadian meat pies over the Highlands.",
    drive: "≈ 3 hr of actual driving · 150 km with the Meat Cove detour — taken all day, because every bend is a lookoff (and the last few km to Meat Cove are gravel; take them slow).",
    stops: [
      { name: "Pleasant Bay", time: "30–45 min", note: "The whale-watching capital of the Trail — pilot whales are near-certain in season. Take a short morning look, or a full tour if you skip a longer stop elsewhere. No breakfast here: the [Rusty Anchor](https://therustyanchorrestaurant.com/) does not open until 11 and nothing else in the village serves food earlier, so treat this as a scenic and whale-watching stop only." },
      { name: "Meat Cove", time: "2 hr", note: "Added by request: the rugged northern tip of Cape Breton, reached by a committed detour (the last stretch is gravel). Sheer green headlands over open ocean, whales offshore, and a cliff-edge food trailer for lunch — the wildest, most remote view of the whole trip. One caution: the old Chowder Hut is now the Lawless Lobster Seafood Trailer, and the campground's own site currently says closed until further notice (last updated in January), so call 902-383-2379 before committing to the gravel. Confirmed fallback: [Morrison's Restaurant](https://capebretonisland.com/morrisons-restaurant/) at the Cape North junction, open 11 to 9 Saturday, which you pass in both directions anyway." },
      { name: "Neil's Harbour", time: "30 min", note: "A working lighthouse and the Chowder House on the rocks — the best ice-cream-and-a-view stop on the island, on the way down to Ingonish." },
    ],
    lunch: "Meat Cove — chowder and a lobster roll at the cliff-edge food trailer (the old Chowder Hut, now the Lawless Lobster Seafood Trailer), ocean straight ahead; but call 902-383-2379 first, because the campground currently lists it closed until further notice. Confirmed fallback either way: [Morrison's Restaurant](https://capebretonisland.com/morrisons-restaurant/) at the Cape North junction, or Neil's Harbour if you skip the detour.",
    afternoon: "Back onto the Trail and down to Ingonish — the beach (freshwater on one side, warm salt on the other), the easy 4 km Middle Head headland walk, or just the sand. The sea here is genuinely swimmable in late summer.",
    hotel: "[Seascape Coastal Retreat](https://seascapecoastalretreat.com), Ingonish — oceanfront adults-only cottages with a hot tub (9.1), real character at about half a grand-resort price; Castle Rock Country Inn is the value alternative.",
    dinner: "Coastal Waters or the Main Street Restaurant & Bakery. The Keltic Lodge's Purple Thistle is no longer an option — the main lodge has been closed since 2024. While you are at the Main Street Bakery, buy pastries for tomorrow morning: nothing in Ingonish opens early enough on a Sunday, and tomorrow starts at 7.",
    evening: "The Highlands go pitch dark early — tonight is the one to stay up for.",
    charging: "No Superchargers on Cape Breton: use the Parks Canada fast charger at Ingonish Beach and destination charging in the village, and bring the car toward full here before you leave the Trail tomorrow. (Meat Cove has none — go with plenty of range.)",
    walking: "Easy–moderate — beaches and the flat Middle Head headland; Meat Cove's viewpoints involve short, steep gravel paths.",
    rainy: "Whale tours still sail in light rain; Neil's Harbour and its ice cream are cozy in fog; and the mountain road is glorious in drifting mist. Meat Cove's gravel road is best skipped in heavy rain.",
    sky: "The trip's marquee dark sky. Ingonish and the northern Highlands are the best bet of the whole route — if skies are clear, walk down to Ingonish Beach after dark for the Milky Way over the water, no light for miles.",
    detailedPlan: [
      { time: "8:00 AM", label: "Inn breakfast + [[map|Aucoin Bakery|Aucoin Bakery, Petit Étang, Nova Scotia]] meat pies", detail: "Call 902-224-3438 to confirm the inn's start time; then up over the top of the park." },
      { time: "10:15 AM", label: "[[map|Pleasant Bay|Pleasant Bay, Nova Scotia]] — 30–45 min (or a whale tour)", detail: "Pick Meat Cove OR a long tour, not both, unless you start early. No food here before 11." },
      { time: "12:00 PM", label: "Drive to [[map|Meat Cove|Meat Cove, Nova Scotia]]", detail: "Last few km gravel — slow and steady." },
      { time: "12:45 PM", label: "[[map|Meat Cove|Meat Cove, Nova Scotia]] — cliffs + lunch, ≈ 2 hr", detail: "Food trailer may be closed — call 902-383-2379; [[map|Morrison's|Morrison's Restaurant, Cape North, Nova Scotia]] at Cape North is the fallback." },
      { time: "3:30 PM", label: "Back to the Trail; Lone Shieling / [[map|Neil's Harbour|Neil's Harbour, Nova Scotia]]", detail: "Ice cream at the Chowder House." },
      { time: "5:45 PM", label: "Arrive Ingonish — [[map|Seascape Coastal Retreat|Seascape Coastal Retreat, Ingonish, Nova Scotia]]", detail: "Charge at Ingonish Beach DCFC." },
      { time: "7:00 PM", label: "Dinner — [[map|Coastal Waters|Coastal Waters Restaurant, 36404 Cabot Trail, Ingonish, Nova Scotia]] / [[map|Main Street Bakery|Main Street Restaurant & Bakery, 36448 Cabot Trail, Ingonish Beach, Nova Scotia]]", detail: "Buy tomorrow's pastries here — nothing opens early Sunday." },
      { time: "8:12 PM", label: "Sunset ≈ 8:12 PM ADT" },
      { time: "11:30 PM", label: "[[map|Ingonish Beach|Ingonish Beach, Nova Scotia]] after dark — the best stars of the trip" },
    ],
    memory: "Chowder on a cliff at the wild top of the island by day, then lying on Ingonish Beach after dark under more stars than either of you had ever tried to count.",
    map: [
      { label: "Chéticamp", lat: 46.63, lon: -61.01 },
      { label: "Pleasant Bay", lat: 46.83, lon: -60.8 },
      { label: "Neil's Harbour", lat: 46.81, lon: -60.35 },
      { label: "Ingonish", lat: 46.68, lon: -60.39 },
    ],
  },
  {
    n: "10",
    date: "Sunday · August 16, 2026",
    region: "The reroute west",
    leg: "Whycocomagh, NS → Témiscouata-sur-le-Lac, QC",
    title: "892 kilometres west",
    subtitle:
      "The CAT was cancelled this morning, so the road turned west instead — New Brunswick end to end, drive-thru meals only, and Lake Témiscouata by 10:45 PM.",
    drive:
      "892 km · 10h05 moving — Hwy 105 → Hwy 104 → NB Route 2 → A-85. Gain one hour at the Québec border. **No Tesla Supercharger anywhere in Nova Scotia on this route — the first is Aulac NB, 330 km out.**",
    stops: [
      { name: "Wendy's · New Glasgow", time: "Lunch", note: "750 Westville Road, Hwy 104 Exit 23 — about two minutes off the highway, drive-thru, open to midnight." },
      { name: "Aulac, NB", time: "Charge", note: "170 Aulac Road — 8 stalls, 150 kW, 20 min to 80%. The first Supercharger since Cape Breton, 330 km out." },
      { name: "Lincoln, NB", time: "Charge", note: "415 Nevers Road, Waasis — 8 stalls, 20 min." },
      { name: "McDonald's · Woodstock, NB", time: "Dinner", note: "392 Connell Street, Route 2 Exit 188 — about five minutes off, open 24 hours." },
      { name: "Saint-Léonard, NB", time: "Charge", note: "382 Rue Saint Jean — 25 min. The Tim Hortons at 388 Rue St Jean is open 24h on the same Irving site." },
      { name: "Hôtel Château Fraser · Témiscouata-sur-le-Lac", time: "Stay", note: "1 rue du Quai, Cabano sector, on Lake Témiscouata — 4.4 across 74 reviews, #1 of 3 hotels in town. A 14-unit boutique with EV charging on site. Booked by phone on Aug 16." },
    ],
    map: [
      { label: "Whycocomagh", lat: 45.98, lon: -61.13 },
      { label: "New Glasgow", lat: 45.59, lon: -62.65 },
      { label: "Aulac", lat: 45.86, lon: -64.29 },
      { label: "Lincoln", lat: 45.86, lon: -66.53 },
      { label: "Woodstock", lat: 46.15, lon: -67.57 },
      { label: "Saint-Léonard", lat: 47.16, lon: -67.92 },
      { label: "Témiscouata", lat: 47.68, lon: -68.88 },
    ],
  },
  {
    n: "11",
    date: "Monday · August 17, 2026",
    region: "Québec City",
    leg: "Témiscouata-sur-le-Lac → Québec City",
    title: "Québec City — the history day",
    subtitle:
      "Depart at 7:30, in Old Québec by 10:15, and on foot from there until Tuesday. Two plans below: one for fair weather, one for rain.",
    drive:
      "255 km · 2h45 — A-85 → A-20. Depart Témiscouata 7:30 AM ET, arrive Québec City ~10:15 AM.",
    stops: [
      { name: "Hotel Clarendon", time: "Stay", note: "57 rue Sainte-Anne, Upper Town — the 2nd-floor room, one flight up. Car to the valet, bags to the desk, and on foot from here." },
      { name: "Basilique-cathédrale Notre-Dame de Québec", time: "15 min", note: "16 rue De Buade — free, Monday 7:30–4:00. The Holy Door, the only one outside Europe. The crypt and museum are closed; the basilica is not." },
      { name: "Morrin Centre", time: "Anchor", note: "44 chaussée des Écossais — an 1808 prison cell, then twenty steps into a gaslit Victorian library of 28,000 books. 89 m from the hotel door." },
      { name: "Portofino Bistro Italiano", time: "Lunch", note: "54 rue Couillard — Italian in a 1760s building, 192 m away. The food menu is screened clean of apple." },
      { name: "'The Grand Tour' · Tours Voir Québec", time: "2 hr", note: "Meets 12 rue Sainte-Anne — Upper and Lower Town on foot, max 14 to a guide, ending at the funicular. Place Royale sits on the exact footprint of Champlain's 1608 Habitation." },
      { name: "Saint-Louis Forts & Châteaux crypt", time: "Anchor", note: "Under the Dufferin Terrace boardwalk — free, daily 9:30–5:00. The original 1690s vaults and the governors' kitchen beneath Frontenac's château." },
      { name: "Musée de la civilisation", time: "Rain plan", note: "85 rue Dalhousie — 300 m, flat, no climb, benches throughout. The rain-day anchor, 2.5–3 hours." },
      { name: "MATTO", time: "Dinner", note: "71 rue Saint-Pierre — Monday 5:30–10:30. The full menu is screened, zero apple." },
      { name: "Québec–Lévis ferry", time: "Evening", note: "10 rue des Traversiers — 700 m and nine minutes across, heated enclosed cabin, last boat 2:20 AM. No booking; decide at the table." },
    ],
    map: [
      { label: "Témiscouata", lat: 47.68, lon: -68.88 },
      { label: "Québec City", lat: 46.81, lon: -71.21 },
    ],
  },
  {
    n: "12",
    date: "Tuesday · August 18, 2026",
    region: "The road home",
    leg: "Québec City → Salt Point, New York",
    title: "745 kilometres home",
    subtitle:
      "Two lunches on the table and neither one chosen — a sit-down in Old Montréal, or a drive-thru at Queensbury that buys back ninety minutes.",
    drive:
      "745 km / 463 mi · 7h50–8h30 — A-20 → A-15 → I-87 → Thruway Exit 19 → NY-199 → US-9G → US-44. Home between 6:15 and 7:45 PM, against a 10:00 PM target.",
    photo: NS_PHOTOS.closing,
    stops: [
      { name: "Stellina, Old Montréal", time: "Lunch · option", note: "410 rue Saint-Jacques — Tuesday lunch 11:30–3:00, 4.7 across 768 reviews. Park at the Palais des congrès garage, 1025 rue Chenneville. Not yet apple-screened. Home ~7:45 PM." },
      { name: "Wendy's, Queensbury NY", time: "Lunch · option", note: "714 Upper Glen Street — one mile from the Queensbury Supercharger at I-87 Exit 19, drive-thru, open to 3 AM. Eat while charging. Saves ~90 min; home ~6:15 PM." },
      { name: "Champlain – Lacolle · US POE 0712", time: "Border", note: "Open 24/7. Tuesday early afternoon runs 15–30 min, typically 20." },
      { name: "Plattsburgh, NY", time: "Charge", note: "60 Smithfield Blvd — 8 stalls, 150 kW, 20 min." },
      { name: "Glenmont, NY", time: "Charge", note: "33 Frontage Road — 8 V4 stalls, 325 kW, 15 min. The best charger on the run, 83 miles from home." },
      { name: "Home · Salt Point, NY", time: "≈ 7:45p", note: "The driveway at Salt Point, twelve days after leaving it — by a road nobody planned on Friday." },
    ],
    map: [
      { label: "Québec City", lat: 46.81, lon: -71.21 },
      { label: "Montréal", lat: 45.5, lon: -73.57 },
      { label: "Lacolle", lat: 45.08, lon: -73.37 },
      { label: "Plattsburgh", lat: 44.7, lon: -73.45 },
      { label: "Glenmont", lat: 42.6, lon: -73.79 },
      { label: "Salt Point", lat: 41.87, lon: -73.8 },
    ],
  },
];

/** Headline numbers for the "trip at a glance" band. */
export const NS_GLANCE: { k: string; v: string }[] = [
  { k: "12", v: "days · Aug 7–18, 2026" },
  { k: "11", v: "nights, all booked" },
  { k: "4", v: "dark-sky chances" },
  { k: "3", v: "longer drives — the rest are short" },
];

/** The three-beat route summary for the map section. */
export const NS_ROUTE_NOTES: { k: string; v: string }[] = [
  { k: "Out", v: "Up the Maine coast to Bangor, then a soft road-crossing at Calais — no ferry to make on the way north." },
  { k: "Around", v: "A relaxed loop: Fundy, the Valley, Halifax, the South Shore, and the Cabot Trail — value inns, not luxury, unhurried the whole way." },
  { k: "Home", v: "The Aug 17 CAT sailing was cancelled by the carrier, so the way back turned west instead — New Brunswick, a night in Témiscouata, a day in Old Québec, and home down the I-87." },
];
