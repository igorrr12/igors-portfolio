import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CONTACT, igLink } from "@/lib/config";
import "./globals.css";

/** Display — Gambetta (Fontshare, self-hosted). High-contrast editorial serif. */
const gambetta = localFont({
  src: [
    { path: "./fonts/Gambetta-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gambetta-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Gambetta-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-gambetta",
  display: "swap",
});

/** Body — Satoshi (Fontshare, self-hosted). Quiet, very legible. */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getsitelab.pl"),
  title: "Sitelab — pracownia stron internetowych · Warszawa",
  description:
    "Galeria Sitelab: strony internetowe dla lokalnych firm w Warszawie. Darmowy projekt strony głównej w 24 h, gotowa strona w 72 h za 399 zł.",
  keywords: [
    "strony internetowe Warszawa",
    "strona dla firmy",
    "strona dla restauracji",
    "strona dla barbera",
    "strona dla salonu",
    "projekt strony internetowej",
  ],
  openGraph: {
    title: "Sitelab — galeria stron dla warszawskich firm",
    description:
      "Strony dla firm, które ogląda się jak sztukę. Darmowy projekt w 24 godziny, bez zobowiązań.",
    type: "website",
    locale: "pl_PL",
    siteName: "Sitelab",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

/**
 * Structured data (JSON-LD). Gives Google clean, formatted business facts so it
 * can render a better search result and is more likely to trust the description.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://getsitelab.pl/#business",
  name: CONTACT.brand,
  url: "https://getsitelab.pl",
  image: "https://getsitelab.pl/icon-512.png",
  logo: "https://getsitelab.pl/icon-512.png",
  description:
    "Pracownia stron internetowych dla lokalnych firm w Warszawie. Darmowy projekt strony głównej w 24 h, gotowa strona w 72 h za 399 zł.",
  email: CONTACT.email,
  sameAs: [igLink],
  areaServed: { "@type": "City", name: CONTACT.city },
  address: {
    "@type": "PostalAddress",
    addressLocality: CONTACT.city,
    addressCountry: "PL",
  },
  priceRange: "399 zł",
  makesOffer: {
    "@type": "Offer",
    name: "Strona internetowa dla lokalnej firmy",
    price: "399",
    priceCurrency: "PLN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${gambetta.variable} ${satoshi.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
