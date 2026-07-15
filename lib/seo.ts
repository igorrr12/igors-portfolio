// ─────────────────────────────────────────────────────────────
//  Central SEO helpers: canonical/OG metadata + JSON-LD builders.
//  One source for the base URL and the business @id so every page
//  cross-references the same ProfessionalService node on the home page.
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { CONTACT } from "./config";

export const SITE = {
  baseUrl: "https://getsitelab.pl",
  brand: "Sitelab",
  city: "Warszawa",
  /** @id of the ProfessionalService node declared in app/layout.tsx. */
  businessId: "https://getsitelab.pl/#business",
  author: "Igor",
} as const;

/** Absolute URL for a site-relative path. Home ("/") has no trailing slash. */
export const abs = (path: string): string => `${SITE.baseUrl}${path === "/" ? "" : path}`;

/**
 * Per-page metadata: unique title + description, self-referential canonical,
 * and OpenGraph. `metadataBase` is set once in layout, so canonical/OG can be
 * absolute here without conflict.
 */
export function buildMetadata(o: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = abs(o.path);
  return {
    title: o.title,
    description: o.description,
    ...(o.keywords ? { keywords: o.keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      type: "website",
      locale: "pl_PL",
      siteName: SITE.brand,
    },
    robots: { index: true, follow: true },
  };
}

/** BreadcrumbList from ordered crumbs (root first, current page last). */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/** A local service offered in Warsaw (industry / district pages). */
export function serviceSchema(o: {
  name: string;
  description: string;
  serviceType: string;
  areaServed: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: o.name,
    description: o.description,
    serviceType: o.serviceType,
    url: abs(o.path),
    areaServed: { "@type": "City", name: o.areaServed },
    provider: { "@id": SITE.businessId },
    inLanguage: "pl-PL",
  };
}

/** FAQPage for a list of question/answer pairs. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Editorial article (Dziennik). */
export function articleSchema(o: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: o.title,
    description: o.description,
    url: abs(o.path),
    mainEntityOfPage: abs(o.path),
    datePublished: o.datePublished,
    dateModified: o.dateModified,
    inLanguage: "pl-PL",
    author: { "@type": "Person", name: SITE.author },
    publisher: { "@id": SITE.businessId, name: SITE.brand },
  };
}

/** The fixed-price offer (Cennik). */
export function offerSchema(o: { name: string; price: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: o.name,
    description: o.description,
    url: abs(o.path),
    price: o.price,
    priceCurrency: "PLN",
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "City", name: SITE.city },
    seller: { "@id": SITE.businessId },
  };
}

/** A concept redesign shown as a case study (Realizacje). */
export function creativeWorkSchema(o: {
  name: string;
  description: string;
  image: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: o.name,
    description: o.description,
    image: abs(o.image),
    url: abs(o.path),
    creator: { "@id": SITE.businessId, name: CONTACT.brand },
    inLanguage: "pl-PL",
  };
}
