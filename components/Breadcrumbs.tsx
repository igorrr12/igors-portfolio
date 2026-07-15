import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/**
 * Wall-label breadcrumbs. Renders the UI (root "Sitelab" → "/", all crumbs
 * but the last are links) and the matching BreadcrumbList JSON-LD from the
 * same items, so the two never drift.
 */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <div className="gallery-frame pt-6">
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Ścieżka" className="caption flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <span key={it.path} className="inline-flex items-center gap-x-2">
              {last ? (
                <span className="text-ink" aria-current="page">
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="link-under hover:text-ink">
                  {it.name}
                </Link>
              )}
              {!last && <span aria-hidden className="text-stone/50">/</span>}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
