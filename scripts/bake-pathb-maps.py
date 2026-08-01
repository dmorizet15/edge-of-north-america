#!/usr/bin/env python3
"""
Bake the two NEW Path B (The Summit) basemaps for the Two Paths final-night
branch — the Bar Harbor -> Gorham NH Monday and the Mt Washington -> Kancamagus
-> home Tuesday. Path A reuses the existing Rockland-framed day maps.

Reuses the exact rendering (framing, tone, hillshade) from bake-ns-maps.py so
the new maps match the rest of the set. Only touches ns-pathb-mon / ns-pathb-tue
in lib/mapmeta.json and writes their two PNGs — every existing map is left as-is.

Tile servers are reachable here through the agent proxy; urllib needs the proxy
CA, so run with:

    SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 scripts/bake-pathb-maps.py
"""
import json, os, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load bake-ns-maps.py as a module (its main() is guarded) to reuse fit()/bake().
_spec = importlib.util.spec_from_file_location(
    "bake_ns_maps", os.path.join(ROOT, "scripts", "bake-ns-maps.py")
)
baker = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(baker)

MAPMETA = os.path.join(ROOT, "lib", "mapmeta.json")
W, H = 800, 480

# (lat, lon) route points — same order you'd drive them.
NEW = {
    "ns-pathb-mon": {
        # Bar Harbor -> (inland) Bethel charge -> Gorham NH / Glen House
        "points": [(44.39, -68.20), (44.40, -70.79), (44.39, -71.18)],
        "src": "/assets/maps/ns/ns-pathb-mon.png",
    },
    "ns-pathb-tue": {
        # Mt Washington summit -> Conway -> Lincoln (Kancamagus) -> home
        "points": [(44.27, -71.30), (43.98, -71.12), (44.05, -71.69), (41.87, -73.80)],
        "src": "/assets/maps/ns/ns-pathb-tue.png",
    },
}

def main():
    meta = json.load(open(MAPMETA))
    for mid, cfg in NEW.items():
        clat, clon, z = baker.fit(cfg["points"], W, H)
        meta[mid] = {"center": [clat, clon], "zoom": z, "w": W, "h": H, "src": cfg["src"]}
        print(f"framed {mid}: {clat},{clon} z{z}")
    json.dump(meta, open(MAPMETA, "w"), indent=2)
    print("updated lib/mapmeta.json (added ns-pathb-mon / ns-pathb-tue)")
    ok = sum(baker.bake(mid, meta[mid]) for mid in NEW)
    print(f"done: {ok}/{len(NEW)} baked")

if __name__ == "__main__":
    main()
