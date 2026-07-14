import type { MetadataRoute } from "next";

/**
 * Sitemap served at https://getsitelab.pl/sitemap.xml
 * Single-page site, so one canonical entry. Update `lastModified`
 * (or switch to `new Date()`) when the page content changes meaningfully.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://getsitelab.pl",
      lastModified: new Date("2026-07-14"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
