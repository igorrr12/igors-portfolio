import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry } from "@/lib/industries";
import { WORKS } from "@/lib/works";
import { getDistrict } from "@/lib/districts";
import { getArticle } from "@/lib/journal";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { SiteFrame } from "./SiteFrame";
import { PageHero } from "./PageHero";
import { Placard } from "./Placard";
import { FAQ } from "./FAQ";
import { RelatedLinks } from "./RelatedLinks";
import { JsonLd } from "./JsonLd";

/** Per-route metadata for an industry page. */
export function industryMetadata(slug: string): Metadata {
  const ind = getIndustry(slug);
  if (!ind) return {};
  return buildMetadata({
    title: ind.metaTitle,
    description: ind.metaDescription,
    path: `/${ind.slug}`,
  });
}

/** Data-driven industry landing page. */
export function IndustryPage({ slug }: { slug: string }) {
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const work = WORKS.find((w) => w.id === ind.exampleWorkId);

  const related: { label: string; href: string }[] = ind.relatedDistricts
    .map((ds) => getDistrict(ds))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .map((d) => ({ label: `Strony ${d.locative}`, href: `/strony-internetowe/${d.slug}` }));
  if (ind.relatedArticleSlug) {
    const art = getArticle(ind.relatedArticleSlug);
    if (art) related.push({ label: art.title, href: `/dziennik/${art.slug}` });
  }
  related.push({ label: "Cała oferta", href: "/oferta" });

  return (
    <SiteFrame
      breadcrumbs={[
        { name: "Sitelab", path: "/" },
        { name: "Oferta", path: "/oferta" },
        { name: ind.navLabel, path: `/${ind.slug}` },
      ]}
    >
      <JsonLd
        data={serviceSchema({
          name: ind.h1,
          description: ind.metaDescription,
          serviceType: `Projektowanie stron internetowych — ${ind.navLabel}`,
          areaServed: "Warszawa",
          path: `/${ind.slug}`,
        })}
      />

      <PageHero kicker={ind.kicker} title={ind.h1} sub={ind.lead} />

      <section className="gallery-frame pt-16 sm:pt-24">
        <div className="max-w-prose-narrow space-y-6 text-base leading-relaxed sm:text-lg">
          {ind.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="gallery-frame pt-16 sm:pt-24">
        <p className="caption caption-dot">Czego potrzebuje taka strona</p>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {ind.needs.map((n) => (
            <div key={n.title} className="border-t border-line pt-4">
              <h2 className="font-display text-xl font-medium">{n.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-stone">{n.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {work && (
        <section className="gallery-frame pt-16 sm:pt-24">
          <p className="caption caption-dot">Przykład z naszej galerii</p>
          <Link href={`/realizacje/${work.slug}`} className="group mt-6 block">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(20,19,17,0.04),0_24px_60px_-30px_rgba(20,19,17,0.25)]">
              <Image
                src={work.image}
                alt={work.alt}
                fill
                sizes="(min-width: 1240px) 1120px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                quality={90}
              />
            </div>
            <p className="caption mt-4">
              <span className="text-ink">„{work.name}”</span> · {work.sector} · {work.district} · projekt koncepcyjny
            </p>
          </Link>
        </section>
      )}

      <section className="gallery-frame pt-16 sm:pt-24">
        <p className="caption caption-dot">Oferta</p>
        <div className="mt-6">
          <Placard />
        </div>
      </section>

      <FAQ items={ind.faq} caption="FAQ" title="Częste pytania" />

      <RelatedLinks links={related} />
    </SiteFrame>
  );
}
