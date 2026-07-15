import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { SiteFrame } from "@/components/SiteFrame";
import { PageHero } from "@/components/PageHero";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = buildMetadata({
  title: "Najczęstsze pytania (FAQ) | Sitelab",
  description:
    "Odpowiedzi na najczęstsze pytania o strony internetowe dla firm w Warszawie: cena, czas realizacji, domena, Google i płatność.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <SiteFrame breadcrumbs={[{ name: "Sitelab", path: "/" }, { name: "FAQ", path: "/faq" }]}>
      <PageHero
        kicker="FAQ"
        title="Najczęstsze pytania"
        sub="Krótkie, konkretne odpowiedzi. Jeśli czegoś tu brakuje, napisz do mnie, chętnie wyjaśnię."
      />

      <FAQ items={FAQ_ITEMS} />
    </SiteFrame>
  );
}
