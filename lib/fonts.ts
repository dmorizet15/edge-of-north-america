import { Playfair_Display, Work_Sans } from "next/font/google";

/**
 * Typography is centralized here.
 * Display serif — Playfair Display (quiet, high-contrast, editorial).
 * Body sans — Work Sans (calm, legible, understated).
 */
export const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const bodySans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});
