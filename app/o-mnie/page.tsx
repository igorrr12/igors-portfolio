import type { Metadata } from "next";
import { O_MNIE } from "@/lib/content";
import { SITE, abs, buildMetadata } from "@/lib/seo";
import { SiteFrame } from "@/components/SiteFrame";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "O mnie — Sitelab, strony dla firm w Warszawie",
  description:
    "Igor z Sitelab. Projektuję strony dla lokalnych firm w Warszawie. Darmowy projekt na start, płatność po akceptacji, bezpośredni kontakt.",
  path: "/o-mnie",
});

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: abs("/o-mnie"),
  mainEntity: {
    "@type": "Person",
    name: SITE.author,
    jobTitle: "Projektant stron internetowych",
    worksFor: { "@id": SITE.businessId, name: SITE.brand },
    areaServed: { "@type": "City", name: SITE.city },
  },
};

export default function OMniePage() {
  return (
    <SiteFrame breadcrumbs={[{ name: "Sitelab", path: "/" }, { name: "O mnie", path: "/o-mnie" }]}>
      <JsonLd data={aboutSchema} />

      <PageHero kicker="O mnie" title="Cześć, tu Igor" sub={O_MNIE.lead} />

      <section className="gallery-frame pt-16 sm:pt-24">
        <div className="max-w-prose-narrow space-y-6 text-base leading-relaxed sm:text-lg">
          {O_MNIE.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <RelatedLinks
        links={[
          { label: "Zobacz ofertę", href: "/oferta" },
          { label: "Realizacje", href: "/realizacje" },
          { label: "Cennik", href: "/cennik" },
        ]}
      />
    </SiteFrame>
  );
}
