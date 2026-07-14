import type { MetadataRoute } from "next";

/**
 * Web app manifest served at /manifest.webmanifest.
 * Icons live in /public; the SVG favicon, favicon.ico and apple-icon
 * are picked up automatically from the app/ directory by Next.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sitelab — pracownia stron internetowych",
    short_name: "Sitelab",
    description:
      "Strony internetowe dla lokalnych firm w Warszawie. Darmowy projekt strony głównej w 24 h, gotowa strona w 72 h.",
    lang: "pl",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#F7F5F0",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
