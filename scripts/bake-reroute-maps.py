#!/usr/bin/env python3
"""
Re-bake the three day basemaps changed by the August 16, 2026 reroute.

The CAT sailing was cancelled, so days 10-12 no longer run Ingonish -> Yarmouth
-> Bar Harbor -> Rockland. They now run west through New Brunswick to Quebec and
home down the I-87, and the old Maritimes/Maine-framed rasters are wrong for
them. This re-frames and re-bakes ns-day-10 / ns-day-11 / ns-day-12 in place,
keeping the map ids stable so nothing else has to change.

Every other map is left untouched.

Reuses bake-ns-maps.py's fit()/bake() so the new rasters match the rest of the
set exactly (framing, tone, hillshade). Tile servers are reachable here through
the agent proxy; urllib needs the proxy CA, so run with:

    SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 scripts/bake-reroute-maps.py
"""
import json, os, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_spec = importlib.util.spec_from_file_location(
    "bake_ns_maps", os.path.join(ROOT, "scripts", "bake-ns-maps.py")
)
baker = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(baker)

MAPMETA = os.path.join(ROOT, "lib", "mapmeta.json")
W, H = 800, 480

# (lat, lon) in the order driven — mirrors the `map` arrays on NS_DAYS 10-12.
NEW = {
    # Sun Aug 16 — Whycocomagh NS to Temiscouata-sur-le-Lac QC, 892 km.
    "ns-day-10": [
        (45.98, -61.13),  # Whycocomagh
        (45.59, -62.65),  # New Glasgow
        (45.86, -64.29),  # Aulac
        (45.86, -66.53),  # Lincoln / Waasis
        (46.15, -67.57),  # Woodstock
        (47.16, -67.92),  # Saint-Leonard
        (47.68, -68.88),  # Temiscouata-sur-le-Lac
    ],
    # Mon Aug 17 — the short run into Quebec City, then the day is on foot.
    "ns-day-11": [
        (47.68, -68.88),  # Temiscouata-sur-le-Lac
        (46.81, -71.21),  # Quebec City
    ],
    # Tue Aug 18 — Quebec City home to Salt Point, 745 km.
    "ns-day-12": [
        (46.81, -71.21),  # Quebec City
        (45.50, -73.57),  # Montreal
        (45.08, -73.37),  # Champlain - Lacolle
        (44.70, -73.45),  # Plattsburgh
        (42.60, -73.79),  # Glenmont
        (41.87, -73.80),  # Salt Point
    ],
}


def main():
    meta = json.load(open(MAPMETA))
    for mid, points in NEW.items():
        clat, clon, z = baker.fit(points, W, H)
        meta[mid] = {
            "center": [clat, clon],
            "zoom": z,
            "w": W,
            "h": H,
            "src": f"/assets/maps/ns/{mid}.png",
        }
        print(f"framed {mid}: {clat},{clon} z{z}")
    json.dump(meta, open(MAPMETA, "w"), indent=2)
    print("updated lib/mapmeta.json (re-framed ns-day-10 / ns-day-11 / ns-day-12)")
    ok = sum(baker.bake(mid, meta[mid]) for mid in NEW)
    print(f"done: {ok}/{len(NEW)} baked")


if __name__ == "__main__":
    main()
