import type { Config } from "tailwindcss";

/**
 * "Live Design Canvas" system.
 * Palette is deliberately minimal: ink (navy-black), navy, paper, one flame accent.
 * Flame = the "selected / active" color, used like a design tool's selection highlight.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080B12", // near-black with a navy bias, main dark canvas
        "ink-soft": "#0C1420", // raised surfaces on dark
        navy: "#0C2547", // deep brand navy, gradients + panels
        "navy-line": "#1C3A63", // blueprint grid + borders on dark
        paper: "#F4F6F9", // light section ground
        slate: {
          DEFAULT: "#8DA0B8", // muted text on dark
          deep: "#51627A", // muted text on light
        },
        flame: {
          DEFAULT: "#FF6A2C", // the single accent: selection / action
          hover: "#FF7E48",
          deep: "#E5511A",
        },
      },
      fontFamily: {
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 2px 6px rgba(8,11,18,0.06), 0 24px 48px -24px rgba(8,11,18,0.25)",
        "card-dark": "0 2px 6px rgba(0,0,0,0.4), 0 32px 64px -32px rgba(0,0,0,0.6)",
        cta: "0 12px 32px -10px rgba(255,106,44,0.5)",
      },
      transitionTimingFunction: {
        // Slight overshoot: elements "snap" into place like in a design tool.
        snap: "cubic-bezier(0.22, 1.2, 0.36, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
