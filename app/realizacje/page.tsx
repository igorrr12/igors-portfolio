import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WORKS } from "@/lib/works";
import { buildMetadata } from "@/lib/seo";
import { SiteFrame } from "@/components/SiteFrame";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Realizacje — projekty stron dla warszawskich firm | Sitelab",
  description:
    "Projekty koncepcyjne stron internetowych dla warszawskich firm: bar mleczny, salon fryzjerski, kwiaciarnia. Zobacz efekty przed i po.",
  path: "/realizacje",
});

export default function RealizacjePage() {
  return (
    <SiteFrame breadcrumbs={[{ name: "Sitelab", path: "/" }, { name: "Realizacje", path: "/realizacje" }]}>
      <PageHero
        kicker="Realizacje"
        title="Nasze realizacje"
        sub="Projekty koncepcyjne dla prawdziwych warszawskich miejsc. Każdy zaczyna się od charakteru firmy, nie od szablonu."
      />

      <section className="gallery-frame pt-16 sm:pt-24">
        <div className="grid gap-12">
          {WORKS.map((w) => (
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
                Nr {w.nr} — <span className="text-ink">„{w.name}”</span> · {w.sector} · {w.district}
              </p>
              <p className="mt-2 max-w-prose-narrow text-sm leading-relaxed text-stone">{w.note}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
