// ─────────────────────────────────────────────────────────────
//  Accent fonts for the exhibited works only (next/font/google
//  self-hosts at build time — no runtime requests). The gallery
//  shell itself uses only Gambetta + Satoshi.
// ─────────────────────────────────────────────────────────────
import { Lora, Oswald, Playfair_Display } from "next/font/google";

/** Złoty Widelec — warm, appetizing serif. */
export const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

/** Antracyt — bold condensed grotesque. */
export const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

/** Pracownia Mila — soft literary serif. */
export const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
