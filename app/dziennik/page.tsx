import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/journal";
import { buildMetadata } from "@/lib/seo";
import { SiteFrame } from "@/components/SiteFrame";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Dziennik — o stronach dla lokalnych firm | Sitelab",
  description:
    "Krótkie, konkretne teksty o stronach internetowych dla lokalnych firm w Warszawie: ceny, treści, Instagram kontra strona.",
  path: "/dziennik",
});

const dateFmt = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });

export default function DziennikPage() {
  return (
    <SiteFrame breadcrumbs={[{ name: "Sitelab", path: "/" }, { name: "Dziennik", path: "/dziennik" }]}>
      <PageHero
        kicker="Dziennik"
        title="Dziennik"
        sub="Krótkie, konkretne teksty o stronach dla lokalnych firm. Bez lania wody."
      />

      <section className="gallery-frame pt-16 sm:pt-24">
        <ul>
          {ARTICLES.map((a) => (
            <li key={a.slug} className="border-t border-line first:border-t-0">
              <Link href={`/dziennik/${a.slug}`} className="group block py-8 sm:py-10">
                <p className="caption">
                  {dateFmt.format(new Date(a.datePublished))} · {a.readingMinutes} min czytania
                </p>
                <h2 className="mt-3 max-w-[24ch] font-display text-2xl font-medium tracking-[-0.01em] group-hover:text-accent sm:text-3xl">
                  {a.title}
                </h2>
                <p className="mt-3 max-w-prose-narrow text-base leading-relaxed text-stone">{a.excerpt}</p>
                <span className="caption mt-4 inline-block text-accent">Czytaj →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteFrame>
  );
}
