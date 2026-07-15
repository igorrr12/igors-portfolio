import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/journal";
import { buildMetadata, articleSchema } from "@/lib/seo";
import { SiteFrame } from "@/components/SiteFrame";
import { PageHero } from "@/components/PageHero";
import { ArticleBody } from "@/components/ArticleBody";
import { RelatedLinks } from "@/components/RelatedLinks";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  return buildMetadata({ title: a.metaTitle, description: a.metaDescription, path: `/dziennik/${a.slug}` });
}

const dateFmt = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  return (
    <SiteFrame
      breadcrumbs={[
        { name: "Sitelab", path: "/" },
        { name: "Dziennik", path: "/dziennik" },
        { name: a.title, path: `/dziennik/${a.slug}` },
      ]}
    >
      <JsonLd
        data={articleSchema({
          title: a.title,
          description: a.metaDescription,
          path: `/dziennik/${a.slug}`,
          datePublished: a.datePublished,
          dateModified: a.dateModified,
        })}
      />

      <PageHero kicker="Dziennik" title={a.title} cta={false} />

      <section className="gallery-frame pt-6">
        <p className="caption">
          {dateFmt.format(new Date(a.datePublished))} · {a.readingMinutes} min czytania
        </p>
        <div className="mt-8">
          <ArticleBody blocks={a.body} />
        </div>
      </section>

      <RelatedLinks links={a.related} />
    </SiteFrame>
  );
}
