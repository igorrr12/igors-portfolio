import type { Config } from "tailwindcss";

/**
 * "Galeria Sitelab" system.
 * The shell is a neutral gallery: ivory walls, ink text, stone captions.
 * The only shell accent is the logo's orange dot. Exhibited works bring
 * their own palettes, which pop against the neutral walls.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F5F0", // gallery walls
        ink: "#141311", // text + the one dark room (footer)
        stone: "#8A857C", // museum captions
        line: "rgba(20,19,17,0.12)", // hairline rules
        accent: "#FF6A2C", // the logo dot
      },
      fontFamily: {
        display: ["var(--font-gambetta)", "Georgia", "serif"],
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
        "prose-narrow": "65ch",
      },
      letterSpacing: {
        caption: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
