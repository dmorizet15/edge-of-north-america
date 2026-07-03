import type { Config } from "tailwindcss";

/**
 * Centralized design tokens for EDGE OF NORTH AMERICA.
 * Palette and type scale live here so every page speaks one language.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette — the emotional range from before-dawn to first light.
        nearblack: "#101317",
        ink: "#1B1B1D",
        navy: "#16293D",
        paper: "#F4EFE7",
        ice: "#C7D8DF",
        fog: "#CAD2D6",
        amber: "#BE6B2E",
        softwhite: "#FAF7F0",
      },
      fontFamily: {
        // Wired to next/font CSS variables in app/layout.tsx
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.34em",
        wide: "0.18em",
        title: "-0.015em",
      },
      fontSize: {
        // Tiny, tracked editorial labels
        micro: ["0.6875rem", { lineHeight: "1.1" }],
        label: ["0.75rem", { lineHeight: "1.2" }],
      },
      maxWidth: {
        reading: "38rem",
        prose: "44rem",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "slow-zoom": {
          "0%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1.14)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "30%": { transform: "translate(3%, -2%)" },
          "50%": { transform: "translate(-1%, 2%)" },
          "70%": { transform: "translate(2%, 1%)" },
          "90%": { transform: "translate(-3%, 2%)" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 24s ease-out forwards",
        grain: "grain 8s steps(6) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
