import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries";
import { buildMetadata } from "@/lib/seo";
import { SiteFrame } from "@/components/SiteFrame";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Oferta — strony internetowe dla firm w Warszawie | Sitelab",
  description:
    "Strony internetowe dla warszawskich firm: kawiarnie, restauracje, barber, salony, kwiaciarnie i piekarnie. Darmowy projekt w 24 h, gotowa strona od 399 zł.",
  path: "/oferta",
});

export default function OfertaPage() {
  return (
    <SiteFrame breadcrumbs={[{ name: "Sitelab", path: "/" }, { name: "Oferta", path: "/oferta" }]}>
      <PageHero
        kicker="Oferta"
        title="Strony internetowe dla firm w Warszawie"
        sub="Wybierz swoją branżę. Każdą stronę projektuję pod to, jak naprawdę szukają Twoi klienci."
      />

      <section className="gallery-frame pt-16 sm:pt-24">
        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {INDUSTRIES.map((i) => (
            <li key={i.slug} className="bg-ivory">
              <Link
                href={`/${i.slug}`}
                className="group flex h-full flex-col justify-between gap-6 p-7 transition-colors hover:bg-white/60 sm:p-8"
              >
                <div>
                  <h2 className="font-display text-2xl font-medium">{i.navLabel}</h2>
                  <p className="mt-2 max-w-prose-narrow text-base leading-relaxed text-stone">{i.lead}</p>
                </div>
                <span className="caption text-accent">Zobacz →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteFrame>
  );
}
