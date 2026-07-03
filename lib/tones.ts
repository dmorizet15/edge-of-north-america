import type { CSSProperties } from "react";
import type { Tone } from "@/content/photos";

/**
 * Each tone is a layered gradient in the project palette. Together they carry
 * the emotional arc: predawn darkness → ocean night → dawn → warm rock →
 * amber → Cape Spear sunrise → reflective paper. Placeholders render these so
 * the piece reads as intentional even before real photography is placed.
 */
interface ToneStyle {
  /** Layered background for the placeholder frame. */
  frame: CSSProperties;
  /** Whether foreground metadata should be light or dark. */
  onDark: boolean;
  /** Accent (usually amber) for the placeholder's fine details. */
  accent: string;
}

export const TONES: Record<Tone, ToneStyle> = {
  predawn: {
    frame: {
      backgroundColor: "#0a0d11",
      backgroundImage:
        "radial-gradient(120% 80% at 50% 118%, rgba(22,41,61,0.9) 0%, rgba(16,19,23,0.6) 45%, rgba(6,8,11,0) 70%), linear-gradient(180deg, #070a0d 0%, #0d1116 55%, #12181f 100%)",
    },
    onDark: true,
    accent: "#BE6B2E",
  },
  night: {
    frame: {
      backgroundColor: "#0b1420",
      backgroundImage:
        "radial-gradient(100% 90% at 70% 10%, rgba(199,216,223,0.10) 0%, rgba(22,41,61,0) 55%), linear-gradient(180deg, #0a1119 0%, #12222f 60%, #16293d 100%)",
    },
    onDark: true,
    accent: "#C7D8DF",
  },
  ocean: {
    frame: {
      backgroundColor: "#16293d",
      backgroundImage:
        "radial-gradient(120% 70% at 30% 0%, rgba(199,216,223,0.16) 0%, rgba(22,41,61,0) 55%), linear-gradient(180deg, #16293d 0%, #24455e 55%, #33627e 100%)",
    },
    onDark: true,
    accent: "#C7D8DF",
  },
  dawn: {
    frame: {
      backgroundColor: "#1a2a3a",
      backgroundImage:
        "radial-gradient(120% 90% at 80% 6%, rgba(190,107,46,0.34) 0%, rgba(190,107,46,0) 45%), linear-gradient(180deg, #14212f 0%, #2b3b47 55%, #5c5540 100%)",
    },
    onDark: true,
    accent: "#BE6B2E",
  },
  rock: {
    frame: {
      backgroundColor: "#4a4438",
      backgroundImage:
        "radial-gradient(110% 80% at 50% 120%, rgba(190,107,46,0.30) 0%, rgba(190,107,46,0) 55%), linear-gradient(180deg, #3c3a34 0%, #5a5142 55%, #7c6a4c 100%)",
    },
    onDark: true,
    accent: "#BE6B2E",
  },
  amber: {
    frame: {
      backgroundColor: "#2a2a2c",
      backgroundImage:
        "radial-gradient(120% 90% at 70% 90%, rgba(190,107,46,0.55) 0%, rgba(190,107,46,0) 55%), linear-gradient(180deg, #16293d 0%, #3f3a34 55%, #7a4f2b 100%)",
    },
    onDark: true,
    accent: "#E0A24A",
  },
  sunrise: {
    frame: {
      backgroundColor: "#3a2c1e",
      backgroundImage:
        "radial-gradient(90% 120% at 50% 108%, rgba(246,217,160,0.95) 0%, rgba(224,162,74,0.7) 26%, rgba(190,107,46,0.4) 48%, rgba(22,41,61,0) 74%), linear-gradient(180deg, #101d2b 0%, #3a2c1e 60%, #7a4f2b 100%)",
    },
    onDark: true,
    accent: "#F6D9A0",
  },
  paper: {
    frame: {
      backgroundColor: "#f4efe7",
      backgroundImage:
        "radial-gradient(120% 90% at 50% 0%, rgba(199,216,223,0.5) 0%, rgba(244,239,231,0) 55%), linear-gradient(180deg, #faf7f0 0%, #f1ebe0 100%)",
    },
    onDark: false,
    accent: "#BE6B2E",
  },
};
