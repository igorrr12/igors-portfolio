import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/** Display — Clash Display (Fontshare, self-hosted). Tight, confident. */
const clash = localFont({
  src: [
    { path: "./fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

/** Body — Satoshi (Fontshare, self-hosted). Warm-neutral, very legible. */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

/** Utility — JetBrains Mono for eyebrows, stats, measurement labels. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getsitelab.pl"),
  title: "Sitelab Warsaw — strony dla lokalnych firm w Warszawie w 72h",
  description:
    "Nowoczesna, szybka strona dla Twojej firmy w Warszawie. Gotowa w 72 godziny. Odbierz darmowy projekt strony głównej w 24h, bez zobowiązań.",
  keywords: [
    "strony internetowe Warszawa",
    "strona dla firmy",
    "strona dla restauracji",
    "strona dla barbera",
    "strona dla salonu",
    "tania strona internetowa",
  ],
  openGraph: {
    title: "Nowa strona Twojej firmy. Projekt w 24h, online w 72h.",
    description:
      "Nowoczesne strony dla lokalnych firm w Warszawie. Darmowy projekt w 24 godziny, bez zobowiązań.",
    type: "website",
    locale: "pl_PL",
    siteName: "Sitelab Warsaw",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080B12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${clash.variable} ${satoshi.variable} ${jetbrains.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
