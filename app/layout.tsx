import type { Metadata, Viewport } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sitelabwarsaw.pl"),
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
    title: "Więcej rezerwacji, telefonów i klientów. Strona gotowa w 72h.",
    description:
      "Nowoczesne strony dla lokalnych firm w Warszawie. Darmowy projekt w 24 godziny, bez zobowiązań.",
    type: "website",
    locale: "pl_PL",
    siteName: "Sitelab Warsaw",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff7ed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${outfit.variable} ${workSans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
