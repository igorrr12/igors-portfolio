import type { Metadata } from "next";
import { CENNIK } from "@/lib/content";
import { buildMetadata, offerSchema } from "@/lib/seo";
import { SiteFrame } from "@/components/SiteFrame";
import { PageHero } from "@/components/PageHero";
import { Placard } from "@/components/Placard";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { Check } from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Ile kosztuje strona internetowa w Warszawie? Cennik | Sitelab",
  description:
    "Strona internetowa dla firmy w Warszawie w stałej cenie 399 zł. Darmowy projekt w 24 h, płatność po akceptacji. Zobacz dokładnie, co zawiera cena.",
  path: "/cennik",
});

export default function CennikPage() {
  return (
    <SiteFrame breadcrumbs={[{ name: "Sitelab", path: "/" }, { name: "Cennik", path: "/cennik" }]}>
      <JsonLd
        data={offerSchema({
          name: "Strona internetowa dla lokalnej firmy",
          price: "399",
          description:
            "Gotowa strona wizytówka dla lokalnej firmy w Warszawie. Darmowy projekt w 24 h, realizacja w 72 h, płatność po akceptacji.",
          path: "/cennik",
        })}
      />

      <PageHero
        kicker="Cennik"
        title="Ile kosztuje strona internetowa w Warszawie?"
        sub={CENNIK.intro}
      />

      <section className="gallery-frame pt-16 sm:pt-24">
        <Placard />
      </section>

      <section className="gallery-frame pt-16 sm:pt-24">
        <p className="caption caption-dot">Co zawiera cena</p>
        <ul className="mt-6 grid max-w-2xl gap-x-10 gap-y-4 sm:grid-cols-2">
          {CENNIK.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 border-t border-line pt-4 text-base leading-relaxed">
              <Check className="mt-1 h-4 w-4 shrink-0 text-accent" style={{ width: 16, height: 16 }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="gallery-frame pt-16 sm:pt-24">
        <p className="caption caption-dot">Czego cena nie obejmuje</p>
        <ul className="mt-6 max-w-2xl space-y-4">
          {CENNIK.excludes.map((item) => (
            <li key={item} className="flex items-start gap-3 border-t border-line pt-4 text-base leading-relaxed text-stone">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="caption mt-6 max-w-prose-narrow normal-case tracking-normal text-stone">{CENNIK.excludesNote}</p>
      </section>

      <Process />

      <FAQ items={CENNIK.faq} caption="FAQ" title="Pytania o cenę" />
    </SiteFrame>
  );
}
