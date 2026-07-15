// ─────────────────────────────────────────────────────────────
//  Build-time data invariant. Called from app/sitemap.ts so a broken
//  cross-reference (typo'd slug, missing example work) fails the build
//  instead of shipping a 404 or an empty page.
// ─────────────────────────────────────────────────────────────

import { INDUSTRIES } from "./industries";
import { DISTRICTS } from "./districts";
import { ARTICLES } from "./journal";
import { WORKS } from "./works";

export function assertData(): void {
  const workIds = new Set(WORKS.map((w) => w.id));
  const industrySlugs = new Set(INDUSTRIES.map((i) => i.slug));
  const districtSlugs = new Set(DISTRICTS.map((d) => d.slug));
  const articleSlugs = new Set(ARTICLES.map((a) => a.slug));

  // No duplicate route slugs within any set.
  const dupIn = (name: string, slugs: string[]) => {
    const seen = new Set<string>();
    for (const s of slugs) {
      if (seen.has(s)) throw new Error(`Duplicate ${name} slug: ${s}`);
      seen.add(s);
    }
  };
  dupIn("industry", INDUSTRIES.map((i) => i.slug));
  dupIn("district", DISTRICTS.map((d) => d.slug));
  dupIn("article", ARTICLES.map((a) => a.slug));
  dupIn("work", WORKS.map((w) => w.slug));

  // Industry cross-references resolve.
  for (const ind of INDUSTRIES) {
    if (!workIds.has(ind.exampleWorkId))
      throw new Error(`Industry ${ind.slug}: exampleWorkId "${ind.exampleWorkId}" not in WORKS`);
    for (const d of ind.relatedDistricts)
      if (!districtSlugs.has(d))
        throw new Error(`Industry ${ind.slug}: relatedDistrict "${d}" not in DISTRICTS`);
    if (ind.relatedArticleSlug && !articleSlugs.has(ind.relatedArticleSlug))
      throw new Error(`Industry ${ind.slug}: relatedArticleSlug "${ind.relatedArticleSlug}" not in ARTICLES`);
  }

  // District cross-references resolve.
  for (const dist of DISTRICTS) {
    for (const w of dist.featuredWorkIds)
      if (!workIds.has(w))
        throw new Error(`District ${dist.slug}: featuredWorkId "${w}" not in WORKS`);
    for (const s of dist.relatedIndustrySlugs)
      if (!industrySlugs.has(s))
        throw new Error(`District ${dist.slug}: relatedIndustrySlug "${s}" not in INDUSTRIES`);
  }

  // Work → industry link resolves.
  for (const w of WORKS)
    if (!industrySlugs.has(w.industrySlug))
      throw new Error(`Work ${w.slug}: industrySlug "${w.industrySlug}" not in INDUSTRIES`);
}
