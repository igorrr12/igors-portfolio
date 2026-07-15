import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDistrict, DISTRICTS } from "@/lib/districts";
import { getIndustry } from "@/lib/industries";
import { WORKS, type Work } from "@/lib/works";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { SiteFrame } from "./SiteFrame";
import { PageHero } from "./PageHero";
import { Placard } from "./Placard";
import { RelatedLinks } from "./RelatedLinks";
import { JsonLd } from "./JsonLd";

/** Per-route metadata for a district page. */
export function districtMetadata(slug: string): Metadata {
  const d = getDistrict(slug);
  if (!d) return {};
  return buildMetadata({
    title: d.metaTitle,
    description: d.metaDescription,
    path: `/strony-internetowe/${d.slug}`,
  });
}

/** Data-driven Warsaw district landing page. */
export function DistrictPage({ slug }: { slug: string }) {
  const d = getDistrict(slug);
  if (!d) notFound();

  const works: Work[] = d.featuredWorkIds
    .map((id) => WORKS.find((w) => w.id === id))
    .filter((w): w is Work => Boolean(w));

  const related: { label: string; href: string }[] = [
    ...d.relatedIndustrySlugs
      .map((s) => getIndustry(s))
      .filter((i): i is NonNullable<typeof i> => Boolean(i))
      .map((i) => ({ label: i.navLabel, href: `/${i.slug}` })),
    ...DISTRICTS.filter((o) => o.slug !== d.slug).map((o) => ({
      label: `Strony ${o.locative}`,
      href: `/strony-internetowe/${o.slug}`,
    })),
  ];

  return (
    <SiteFrame
      breadcrumbs={[
        { name: "Sitelab", path: "/" },
        { name: "Strony internetowe", path: "/strony-internetowe" },
        { name: d.name, path: `/strony-internetowe/${d.slug}` },
      ]}
    >
      <JsonLd
        data={serviceSchema({
          name: d.h1,
          description: d.metaDescription,
          serviceType: "Projektowanie stron internetowych",
          areaServed: `${d.name}, Warszawa`,
          path: `/strony-internetowe/${d.slug}`,
        })}
      />

      <PageHero kicker={d.kicker} title={d.h1} sub={d.lead} />

      <section className="gallery-frame pt-16 sm:pt-24">
        <div className="max-w-prose-narrow space-y-6 text-base leading-relaxed sm:text-lg">
          {d.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="gallery-frame pt-16 sm:pt-24">
        <p className="caption caption-dot">Dla kogo pracuję {d.locative}</p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {d.typicalBusinesses.map((b) => (
            <li key={b} className="border border-line bg-white/60 px-4 py-2 text-sm text-stone">
              {b}
            </li>
          ))}
        </ul>
      </section>

      {works.length > 0 && (
        <section className="gallery-frame pt-16 sm:pt-24">
          <p className="caption caption-dot">Z naszej galerii</p>
          <div className="mt-6 grid gap-8">
            {works.map((w) => (
              <Link key={w.id} href={`/realizacje/${w.slug}`} className="group block">
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(20,19,17,0.04),0_24px_60px_-30px_rgba(20,19,17,0.25)]">
                  <Image
                    src={w.image}
                    alt={w.alt}
                    fill
                    sizes="(min-width: 1240px) 1120px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    quality={90}
                  />
                </div>
                <p className="caption mt-4">
                  <span className="text-ink">„{w.name}”</span> · {w.sector} · projekt koncepcyjny
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="gallery-frame pt-16 sm:pt-24">
        <p className="caption caption-dot">Oferta</p>
        <div className="mt-6">
          <Placard />
        </div>
      </section>

      <RelatedLinks links={related} />
    </SiteFrame>
  );
}
