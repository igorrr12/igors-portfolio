import Link from "next/link";

/**
 * Internal-linking block. Feeds the crawl mesh (industry ↔ district ↔
 * realizacja ↔ dziennik) and gives readers a next step.
 */
export function RelatedLinks({
  title = "Zobacz też",
  links,
}: {
  title?: string;
  links: { label: string; href: string }[];
}) {
  if (links.length === 0) return null;
  return (
    <section className="gallery-frame pt-16 sm:pt-24">
      <p className="caption caption-dot">{title}</p>
      <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        {links.map((l) => (
          <li key={`${l.href}-${l.label}`}>
            <Link href={l.href} className="link-under font-display text-lg font-medium">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
