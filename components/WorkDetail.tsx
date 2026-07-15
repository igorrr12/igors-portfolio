import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWork, WORKS } from "@/lib/works";
import { getIndustry } from "@/lib/industries";
import { buildMetadata, creativeWorkSchema } from "@/lib/seo";
import { SiteFrame } from "./SiteFrame";
import { PageHero } from "./PageHero";
import { RelatedLinks } from "./RelatedLinks";
import { JsonLd } from "./JsonLd";

/** Per-route metadata for a case-study page. */
export function workMetadata(slug: string): Metadata {
  const w = getWork(slug);
  if (!w) return {};
  return buildMetadata({
    title: `${w.name} — projekt strony (${w.sector}, ${w.district}) | Sitelab`,
    description: `Projekt koncepcyjny strony dla „${w.name}” (${w.sector}, ${w.district}). ${w.problem}`,
    path: `/realizacje/${w.slug}`,
  });
}

/** Data-driven case-study page: before/after + what changed + story. */
export function WorkDetail({ slug }: { slug: string }) {
  const w = getWork(slug);
  if (!w) notFound();
  const industry = getIndustry(w.industrySlug);

  const related: { label: string; href: string }[] = [];
  if (industry) related.push({ label: `Strony dla: ${industry.navLabel}`, href: `/${industry.slug}` });
  for (const o of WORKS) if (o.slug !== w.slug) related.push({ label: `„${o.name}”`, href: `/realizacje/${o.slug}` });

  return (
    <SiteFrame
      breadcrumbs={[
        { name: "Sitelab", path: "/" },
        { name: "Realizacje", path: "/realizacje" },
        { name: w.name, path: `/realizacje/${w.slug}` },
      ]}
    >
      <JsonLd
        data={creativeWorkSchema({
          name: `Projekt strony — ${w.name}`,
          description: w.problem,
          image: w.image,
          path: `/realizacje/${w.slug}`,
        })}
      />

      <PageHero kicker={`Realizacja · ${w.district}`} title={w.name} sub={`${w.sector}. ${w.problem}`} />

      <section className="gallery-frame pt-16 sm:pt-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <figure>
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-white">
              <Image
                src={w.before}
                alt={`Strona „${w.name}” przed zmianą`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
                quality={85}
              />
            </div>
            <figcaption className="caption mt-3">Przed</figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(20,19,17,0.04),0_24px_60px_-30px_rgba(20,19,17,0.25)]">
              <Image
                src={w.image}
                alt={w.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
                quality={90}
              />
            </div>
            <figcaption className="caption mt-3">
              <span className="text-accent">Po</span> · projekt koncepcyjny
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="gallery-frame pt-16 sm:pt-24">
        <p className="caption caption-dot">Co się zmieniło</p>
        <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {w.changes.map((c) => (
            <li key={c} className="flex items-start gap-3 border-t border-line pt-4 text-base leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="gallery-frame pt-16 sm:pt-24">
        <div className="max-w-prose-narrow space-y-6 text-base leading-relaxed sm:text-lg">
          {w.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <p className="caption mt-8 max-w-prose-narrow normal-case tracking-normal text-stone">
          To projekt koncepcyjny, przygotowany dla prawdziwego warszawskiego miejsca. Twoja strona powstaje tak samo: od charakteru firmy, nie od szablonu.
        </p>
      </section>

      <RelatedLinks links={related} />
    </SiteFrame>
  );
}
