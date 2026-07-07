#!/usr/bin/env python3
"""
Bake the Nova Scotia route/day basemaps.

Runs on YOUR machine (needs internet — the tile servers are blocked in the
Cowork sandbox). It re-frames the four maps that changed (Bangor + Rockland),
then re-bakes ALL Nova Scotia maps in a crisp 2x dark style with a subtle
terrain hillshade so the Highlands and coast gain depth.

    pip install pillow numpy         # numpy optional (enables the hillshade)
    python3 scripts/bake-ns-maps.py

Outputs: public/assets/maps/ns/ns-*.png  +  updates lib/mapmeta.json framing.
Flags (env):  TERRAIN=0 to skip the hillshade (pure clean dark),
              STRENGTH=0.55 to tune relief intensity (0.3-0.8 sensible).
"""
import json, math, os, sys, time, urllib.request, io
from PIL import Image

try:
    import numpy as np
    HAVE_NP = True
except Exception:
    HAVE_NP = False

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAPMETA = os.path.join(ROOT, "lib", "mapmeta.json")
OUTDIR = os.path.join(ROOT, "public", "assets", "maps", "ns")
SCALE = 2                       # retina output
TERRAIN = os.environ.get("TERRAIN", "1") != "0" and HAVE_NP
STRENGTH = float(os.environ.get("STRENGTH", "0.55"))
PAD = 0.18                      # fraction of padding around a day's points
MAXZOOM = 10
UA = {"User-Agent": "eona-map-baker/1.0 (personal trip site)"}

# Points for the four re-framed maps (must match content/nova-scotia/*).
REFRAME = {
    "ns-day-01": [(41.87,-73.8),(43.07,-70.76),(43.66,-70.26),(44.8,-68.77)],
    "ns-day-02": [(44.8,-68.77),(45.19,-67.28),(45.07,-67.05)],
    "ns-day-11": [(43.84,-66.12),(44.39,-68.2),(44.34,-68.25),(44.1,-69.11)],
    "ns-day-12": [(44.1,-69.11),(43.66,-70.26),(43.07,-70.76),(41.87,-73.8)],
}

def lon2x(lon, z): return (lon + 180.0) / 360.0 * (256 * 2**z)
def lat2y(lat, z):
    s = math.sin(math.radians(lat))
    return (0.5 - math.log((1+s)/(1-s))/(4*math.pi)) * (256 * 2**z)

def fit(points, w, h):
    lats = [p[0] for p in points]; lons = [p[1] for p in points]
    clat = (min(lats)+max(lats))/2.0; clon = (min(lons)+max(lons))/2.0
    for z in range(MAXZOOM, 2, -1):
        xs = [lon2x(lo, z) for lo in lons]; ys = [lat2y(la, z) for la in lats]
        bw = (max(xs)-min(xs)) * (1+2*PAD); bh = (max(ys)-min(ys)) * (1+2*PAD)
        if bw <= w and bh <= h:
            return round(clat,5), round(clon,5), z
    return round(clat,5), round(clon,5), 3

def fetch(url, tries=3):
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=15) as r:
                return Image.open(io.BytesIO(r.read())).convert("RGB")
        except Exception as e:
            if i == tries-1: return None
            time.sleep(0.6*(i+1))
    return None

CARTO = "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png"
NORMAL = "https://elevation-tiles-prod.s3.amazonaws.com/normal/{z}/{x}/{y}.png"
SUBS = ["a","b","c","d"]

def stitch(meta, tmpl, tilesize, retina):
    """Stitch a viewport (meta center/zoom, logical w/h) from an XYZ template."""
    z = meta["zoom"]; w = meta["w"]; h = meta["h"]
    ppf = SCALE if retina else 1                 # output pixels per logical px
    cx = lon2x(meta["center"][1], z) * ppf
    cy = lat2y(meta["center"][0], z) * ppf
    ox = cx - w*ppf/2.0; oy = cy - h*ppf/2.0
    out = Image.new("RGB", (w*ppf, h*ppf), (11,15,19))
    n = 2**z
    tpx = tilesize                                # tile pixel size in output space
    x0 = math.floor(ox/tpx); x1 = math.floor((ox+w*ppf-1)/tpx)
    y0 = math.floor(oy/tpx); y1 = math.floor((oy+h*ppf-1)/tpx)
    got = 0; total = 0
    for tx in range(x0, x1+1):
        for ty in range(y0, y1+1):
            total += 1
            xx = tx % n
            if ty < 0 or ty >= n: continue
            url = tmpl.format(s=SUBS[(tx+ty)%4], z=z, x=xx, y=ty)
            im = fetch(url)
            if im is None: continue
            if im.size[0] != tpx: im = im.resize((tpx, tpx))
            out.paste(im, (int(tx*tpx-ox), int(ty*tpx-oy)))
            got += 1
    return out, got, total

def hillshade(meta):
    """Grayscale relief (0..1) at 2x from Terrarium 'normal' tiles."""
    base, got, total = stitch(meta, NORMAL, 256*SCALE, retina=True)  # 256 tiles upscaled
    if got == 0: return None
    a = np.asarray(base).astype(np.float32)/255.0
    nx = a[...,0]*2-1; ny = a[...,1]*2-1; nz = a[...,2]*2-1
    L = np.array([-0.55,-0.55,0.63], np.float32); L /= np.linalg.norm(L)
    sh = np.clip(nx*L[0]+ny*L[1]+nz*L[2], 0, 1)
    return sh

def bake(mid, meta):
    base, got, total = stitch(meta, CARTO, 256*SCALE, retina=True)
    if got == 0:
        print(f"  ! {mid}: no base tiles fetched — skipped"); return False
    if TERRAIN:
        try:
            sh = hillshade(meta)
            if sh is not None:
                arr = np.asarray(base).astype(np.float32)
                factor = 1.0 + STRENGTH*(sh-0.5)*2.0
                arr = np.clip(arr * factor[...,None], 0, 255).astype("uint8")
                base = Image.fromarray(arr, "RGB")
        except Exception as e:
            print(f"    (terrain skipped for {mid}: {e})")
    os.makedirs(OUTDIR, exist_ok=True)
    path = os.path.join(OUTDIR, f"{mid}.png")
    base.save(path, optimize=True)
    print(f"  ✓ {mid}  z{meta['zoom']}  tiles {got}/{total}  -> {os.path.relpath(path, ROOT)}")
    return True

def main():
    meta = json.load(open(MAPMETA))
    # 1) re-frame the four changed maps and persist to mapmeta
    for mid, pts in REFRAME.items():
        if mid not in meta: continue
        clat, clon, z = fit(pts, meta[mid]["w"], meta[mid]["h"])
        meta[mid]["center"] = [clat, clon]; meta[mid]["zoom"] = z
        print(f"reframed {mid}: center {clat},{clon} zoom {z}")
    json.dump(meta, open(MAPMETA, "w"), indent=2)
    print("updated lib/mapmeta.json")
    # 2) re-bake every Nova Scotia map (ns-*) in the new style
    ns = [k for k in meta if k.startswith("ns-")]
    print(f"baking {len(ns)} NS maps  (terrain={'on' if TERRAIN else 'off'}, scale={SCALE}x)")
    ok = 0
    for mid in sorted(ns):
        if bake(mid, meta[mid]): ok += 1
    print(f"done: {ok}/{len(ns)} baked")
    if not HAVE_NP:
        print("note: numpy not installed — baked clean dark (no hillshade). `pip install numpy` to enable relief.")

if __name__ == "__main__":
    main()
