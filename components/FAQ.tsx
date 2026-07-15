import { faqSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";
import { WallLabel } from "./WallLabel";

/**
 * FAQ as native <details> (accessible, no client JS) plus FAQPage JSON-LD
 * from the same items. Pass `title` to show a WallLabel heading.
 */
export function FAQ({
  items,
  caption = "FAQ",
  title,
}: {
  items: { q: string; a: string }[];
  caption?: string;
  title?: string;
}) {
  return (
    <section className="gallery-frame pt-16 sm:pt-24">
      <JsonLd data={faqSchema(items)} />
      {title && <WallLabel caption={caption} title={title} />}
      <div className={`${title ? "mt-10" : ""} max-w-prose-narrow`}>
        {items.map((it) => (
          <details key={it.q} className="group border-b border-line py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium marker:hidden">
              <span>{it.q}</span>
              <span aria-hidden className="shrink-0 text-xl leading-none text-accent transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-prose-narrow text-base leading-relaxed text-stone">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
