import type { Metadata } from "next";
import Link from "next/link";
import { DISTRICTS } from "@/lib/districts";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { SiteFrame } from "@/components/SiteFrame";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Strony internetowe dla firm w Warszawie | Sitelab",
  description:
    "Strony internetowe dla firm w Warszawie i dzielnicach: Mokotów, Śródmieście, Wola, Praga-Południe, Ochota, Żoliborz. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
  path: "/strony-internetowe",
});

export default function WarszawaHub() {
  return (
    <SiteFrame
      breadcrumbs={[
        { name: "Sitelab", path: "/" },
        { name: "Strony internetowe", path: "/strony-internetowe" },
      ]}
    >
      <JsonLd
        data={serviceSchema({
          name: "Strony internetowe dla firm w Warszawie",
          description:
            "Projektowanie stron internetowych dla lokalnych firm w Warszawie i jej dzielnicach.",
          serviceType: "Projektowanie stron internetowych",
          areaServed: "Warszawa",
          path: "/strony-internetowe",
        })}
      />

      <PageHero
        kicker="Warszawa"
        title="Strony internetowe dla firm w Warszawie"
        sub="Działam w całym mieście. Wybierz swoją dzielnicę, żeby zobaczyć, jak pomagam lokalnym firmom w Twojej okolicy."
      />

      <section className="gallery-frame pt-16 sm:pt-24">
        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {DISTRICTS.map((d) => (
            <li key={d.slug} className="bg-ivory">
              <Link
                href={`/strony-internetowe/${d.slug}`}
                className="group flex h-full flex-col justify-between gap-6 p-7 transition-colors hover:bg-white/60 sm:p-8"
              >
                <div>
                  <h2 className="font-display text-2xl font-medium">{d.name}</h2>
                  <p className="mt-2 text-base leading-relaxed text-stone">{d.lead}</p>
                </div>
                <span className="caption text-accent">Zobacz →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RelatedLinks title="Szukasz czegoś konkretnego?" links={[{ label: "Cała oferta", href: "/oferta" }]} />
    </SiteFrame>
  );
}
