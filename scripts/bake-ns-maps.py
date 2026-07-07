#!/usr/bin/env python3
"""
Bake the Nova Scotia route/day basemaps — v2 (lighter + more terrain texture).

Runs on YOUR machine (the tile servers are blocked in the Cowork sandbox).
Re-frames the four changed maps (Bangor + Rockland), then re-bakes ALL NS maps
at 2x in a lifted dark style with a strong-but-tasteful hillshade.

    pip install pillow          # numpy optional; texture works without it
    python3 scripts/bake-ns-maps.py

Dial it in with env vars, then re-run + re-commit:
    BRIGHT   overall lightness       (default 1.42; try 1.25 darker / 1.6 lighter)
    STRENGTH hillshade relief        (default 0.95; try 0.6 subtle / 1.3 dramatic)
    GAMMA    midtone lift            (default 0.72; lower = lighter mids)
    HSZOOM   extra zoom for detail   (default 1;   2 = finer texture, slower)
    TERRAIN=0  bake clean dark, no hillshade
"""
import json, math, os, time, urllib.request, io
from PIL import Image, ImageEnhance, ImageChops, ImageFilter, ImageOps

try:
    import numpy as np; HAVE_NP = True
except Exception:
    HAVE_NP = False

ROOT   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAPMETA= os.path.join(ROOT, "lib", "mapmeta.json")
OUTDIR = os.path.join(ROOT, "public", "assets", "maps", "ns")
SCALE  = 2
TERRAIN  = os.environ.get("TERRAIN", "1") != "0"
STRENGTH = float(os.environ.get("STRENGTH", "0.95"))
BRIGHT   = float(os.environ.get("BRIGHT", "1.42"))
GAMMA    = float(os.environ.get("GAMMA", "0.72"))
HSZOOM   = int(os.environ.get("HSZOOM", "1"))
PAD, MAXZOOM = 0.18, 10
UA = {"User-Agent": "eona-map-baker/2.0 (personal trip site)"}
SUBS = ["a","b","c","d"]
CARTO  = "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png"
NORMAL = "https://elevation-tiles-prod.s3.amazonaws.com/normal/{z}/{x}/{y}.png"

def lon2x(lon,z): return (lon+180.0)/360.0*(256*2**z)
def lat2y(lat,z):
    s=math.sin(math.radians(lat)); return (0.5-math.log((1+s)/(1-s))/(4*math.pi))*(256*2**z)

def fit(points,w,h):
    lats=[p[0] for p in points]; lons=[p[1] for p in points]
    clat=(min(lats)+max(lats))/2; clon=(min(lons)+max(lons))/2
    for z in range(MAXZOOM,2,-1):
        xs=[lon2x(lo,z) for lo in lons]; ys=[lat2y(la,z) for la in lats]
        if (max(xs)-min(xs))*(1+2*PAD)<=w and (max(ys)-min(ys))*(1+2*PAD)<=h:
            return round(clat,5),round(clon,5),z
    return round(clat,5),round(clon,5),3

def fetch(url,tries=3):
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=15) as r:
                return Image.open(io.BytesIO(r.read())).convert("RGB")
        except Exception:
            if i==tries-1: return None
            time.sleep(0.5*(i+1))

def stitch(center,zoom,w,h,tmpl,tile_out):
    """Stitch a (w x h) logical viewport at 2x from an XYZ template."""
    cx=lon2x(center[1],zoom)*SCALE; cy=lat2y(center[0],zoom)*SCALE
    ox=cx-w*SCALE/2; oy=cy-h*SCALE/2
    out=Image.new("RGB",(w*SCALE,h*SCALE),(20,26,31)); n=2**zoom; got=tot=0
    for tx in range(math.floor(ox/tile_out), math.floor((ox+w*SCALE-1)/tile_out)+1):
        for ty in range(math.floor(oy/tile_out), math.floor((oy+h*SCALE-1)/tile_out)+1):
            tot+=1
            if ty<0 or ty>=n: continue
            im=fetch(tmpl.format(s=SUBS[(tx+ty)%4],z=zoom,x=tx%n,y=ty))
            if im is None: continue
            if im.size[0]!=tile_out: im=im.resize((tile_out,tile_out))
            out.paste(im,(int(tx*tile_out-ox),int(ty*tile_out-oy))); got+=1
    return out,got,tot

def relief(center,zoom,w,h):
    """A 0..1 hillshade sized to the 2x output; numpy if available, else emboss."""
    hz=min(zoom+HSZOOM, 12)
    normals,got,_=stitch(center,hz,w,h,NORMAL,256)  # 256 tiles at higher zoom = finer
    if got==0: return None
    normals=normals.resize((w*SCALE,h*SCALE))
    if HAVE_NP:
        a=np.asarray(normals).astype(np.float32)/255.0
        nx=a[...,0]*2-1; ny=a[...,1]*2-1; nz=a[...,2]*2-1
        L=np.array([-0.6,-0.6,0.55],np.float32); L/=np.linalg.norm(L)
        sh=np.clip(nx*L[0]+ny*L[1]+nz*L[2],0,1)
        lo,hi=np.percentile(sh,4),np.percentile(sh,96)          # contrast stretch
        sh=np.clip((sh-lo)/max(hi-lo,1e-3),0,1)
        return sh
    # numpy-free fallback: emboss the elevation into a relief texture (0..1)
    g=ImageOps.grayscale(normals).filter(ImageFilter.EMBOSS).filter(ImageFilter.SMOOTH)
    g=ImageOps.autocontrast(g, cutoff=3)
    return g  # PIL image, mean ~128

def tone(base):
    base=base.point(lambda v:int(255*((v/255.0)**GAMMA)))     # lift midtones
    return ImageEnhance.Brightness(base).enhance(BRIGHT)

def bake(mid,m):
    base,got,tot=stitch(m["center"],m["zoom"],m["w"],m["h"],CARTO,256*SCALE)
    if got==0: print(f"  ! {mid}: no base tiles — skipped"); return False
    base=tone(base)
    if TERRAIN:
        try:
            sh=relief(m["center"],m["zoom"],m["w"],m["h"])
            if sh is not None:
                if HAVE_NP:
                    arr=np.asarray(base).astype(np.float32)
                    f=1.0+STRENGTH*(sh-0.5)*2.0
                    base=Image.fromarray(np.clip(arr*f[...,None],0,255).astype("uint8"),"RGB")
                else:
                    tex=Image.merge("RGB",[sh]*3)
                    lit=ImageChops.overlay(base,tex)
                    base=Image.blend(base,lit,min(max(STRENGTH*0.7,0),1))
        except Exception as e:
            print(f"    (terrain skipped for {mid}: {e})")
    os.makedirs(OUTDIR,exist_ok=True)
    p=os.path.join(OUTDIR,f"{mid}.png"); base.save(p,optimize=True)
    print(f"  ✓ {mid}  z{m['zoom']}  tiles {got}/{tot}  -> {os.path.relpath(p,ROOT)}")
    return True

REFRAME={
 "ns-day-01":[(41.87,-73.8),(43.07,-70.76),(43.66,-70.26),(44.8,-68.77)],
 "ns-day-02":[(44.8,-68.77),(45.19,-67.28),(45.07,-67.05)],
 "ns-day-11":[(43.84,-66.12),(44.39,-68.2),(44.34,-68.25),(44.1,-69.11)],
 "ns-day-12":[(44.1,-69.11),(43.66,-70.26),(43.07,-70.76),(41.87,-73.8)],
}
def main():
    m=json.load(open(MAPMETA))
    for mid,pts in REFRAME.items():
        if mid in m:
            clat,clon,z=fit(pts,m[mid]["w"],m[mid]["h"])
            m[mid]["center"]=[clat,clon]; m[mid]["zoom"]=z
            print(f"reframed {mid}: {clat},{clon} z{z}")
    json.dump(m,open(MAPMETA,"w"),indent=2); print("updated lib/mapmeta.json")
    ns=sorted(k for k in m if k.startswith("ns-"))
    print(f"baking {len(ns)} NS maps (terrain={'on' if TERRAIN else 'off'}, "
          f"hillshade={'numpy' if (TERRAIN and HAVE_NP) else 'emboss' if TERRAIN else 'none'}, "
          f"BRIGHT={BRIGHT}, STRENGTH={STRENGTH})")
    ok=sum(bake(mid,m[mid]) for mid in ns)
    print(f"done: {ok}/{len(ns)} baked")
    if TERRAIN and not HAVE_NP:
        print("note: numpy not found — used the emboss texture path. `pip install numpy` gives finer hillshade.")

if __name__=="__main__": main()
