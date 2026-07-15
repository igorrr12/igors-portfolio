import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";
import { INDUSTRIES } from "@/lib/industries";
import { DISTRICTS } from "@/lib/districts";
import { WORKS } from "@/lib/works";
import { ARTICLES } from "@/lib/journal";
import { assertData } from "@/lib/validate";

/**
 * Sitemap served at https://getsitelab.pl/sitemap.xml — generated from the
 * same data as the pages, so it can never drift. `assertData()` fails the
 * build if a cross-reference is broken.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  assertData();

  const lastModified = new Date("2026-07-15");
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1.0),
    entry("/oferta", 0.7),
    entry("/strony-internetowe", 0.7),
    entry("/realizacje", 0.7),
    entry("/cennik", 0.8),
    entry("/dziennik", 0.6),
    entry("/faq", 0.5),
    entry("/o-mnie", 0.5, "yearly"),
    ...INDUSTRIES.map((i) => entry(`/${i.slug}`, 0.8)),
    ...DISTRICTS.map((d) => entry(`/strony-internetowe/${d.slug}`, 0.7)),
    ...WORKS.map((w) => entry(`/realizacje/${w.slug}`, 0.7)),
    ...ARTICLES.map((a) => entry(`/dziennik/${a.slug}`, 0.6)),
  ];
}
