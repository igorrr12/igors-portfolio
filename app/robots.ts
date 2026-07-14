import type { MetadataRoute } from "next";

/**
 * robots.txt served at https://getsitelab.pl/robots.txt
 * Allows all crawlers and points them at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://getsitelab.pl/sitemap.xml",
    host: "https://getsitelab.pl",
  };
}
