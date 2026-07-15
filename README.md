# Galeria Sitelab — strona getsitelab.pl

Editorial, gallery-style website for **Sitelab** (strony internetowe dla lokalnych firm w Warszawie).
An ivory "exhibition" homepage with scroll-driven GSAP animation, plus a Warsaw-focused SEO
network of 26 pages generated from typed data. Built with **Next.js 14 (App Router)**,
**TypeScript**, **Tailwind CSS** and **GSAP ScrollTrigger**. Fully static build, no backend.

- Homepage design spec: [`docs/superpowers/specs/2026-07-13-gallery-redesign-design.md`](docs/superpowers/specs/2026-07-13-gallery-redesign-design.md)
- SEO expansion spec: [`docs/superpowers/specs/2026-07-15-seo-warsaw-expansion-design.md`](docs/superpowers/specs/2026-07-15-seo-warsaw-expansion-design.md)

## Before you go live — edit ONE file

Open [`lib/config.ts`](lib/config.ts) and set the real contact details:

```ts
instagram: "warsaw.sitelab",   // without the @ (this is the contact channel)
email: "igor@getsitelab.pl",
weeklySlots: 3,
```

**Instagram DM is the single contact channel.** Every CTA (nav, hero, contact form, footer,
mobile bar) opens the Instagram DM (`ig.me/m/<handle>`). Instagram can't pre-fill a message, so
the contact form copies a ready-made message to the clipboard and opens the thread for the visitor
to paste + send. No backend, no database.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fails if page data is inconsistent)
```

## Deploy

Push to `origin/main` → Vercel redeploys automatically. Framework preset must be **Next.js**.
No environment variables required.

## Pages (26)

| Path | What it is |
| --- | --- |
| `/` | Gallery homepage (scroll exhibition) |
| `/oferta` + `/strony-dla-*` (6) | Industry landing pages — kawiarnie, restauracje, barber, salony, kwiaciarnie, piekarnie |
| `/strony-internetowe` + `/strony-internetowe/<dzielnica>` (6) | Warsaw district pages — Mokotów, Śródmieście, Wola, Praga-Południe, Ochota, Żoliborz |
| `/realizacje` + `/realizacje/<slug>` (3) | Case studies with before/after |
| `/dziennik` + `/dziennik/<slug>` (3) | Journal articles |
| `/cennik`, `/faq`, `/o-mnie` | Pricing, FAQ, About |

## Editing content / adding pages

Everything is data-driven — **pages and the sitemap are generated from the same typed files**, so
they never drift:

| Edit this file | To change |
| --- | --- |
| [`lib/config.ts`](lib/config.ts) | Contact details (one place) |
| [`lib/content.ts`](lib/content.ts) | Homepage copy, contact section, cennik / FAQ / o-mnie copy |
| [`lib/industries.ts`](lib/industries.ts) | Industry pages — add an object → new page + sitemap entry |
| [`lib/districts.ts`](lib/districts.ts) | Warsaw district pages |
| [`lib/journal.ts`](lib/journal.ts) | Journal articles (typed block model, no MDX) |
| [`lib/works.ts`](lib/works.ts) | Exhibition works + case-study detail |

`lib/validate.ts` runs at build time (via `app/sitemap.ts`) and **fails the build** if any
cross-reference is broken (a typo'd slug, a missing example work), so bad data can't ship.

## SEO layer

- Per-page metadata (unique title, description, self-canonical, OpenGraph) via `buildMetadata()` in [`lib/seo.ts`](lib/seo.ts).
- JSON-LD per page type — `Service`, `CreativeWork`, `Article`, `Offer`, `FAQPage`, `BreadcrumbList`, plus the site-wide `ProfessionalService` (in [`app/layout.tsx`](app/layout.tsx)).
- `app/sitemap.ts` → `/sitemap.xml` (all 26 URLs), `app/robots.ts` → `/robots.txt`, `app/manifest.ts` → PWA manifest.
- Footer doubles as a sitemap directory for internal linking / crawl depth.

## Structure

```
app/            layout, homepage, per-route pages, sitemap/robots/manifest, fonts, globals
components/     Nav, SiteFrame, PageHero, Breadcrumbs, FAQ, MobileContactBar, ContactSection,
                Footer, JsonLd, IndustryPage/DistrictPage/WorkDetail/ArticleBody templates,
                Cover/Exhibition/Work/CuratorNote/Placard/Process/WallLabel/ProgressLine (home)
lib/            config, content, seo, validate, industries, districts, journal, works, gsap
public/         before/after screenshots + icons
```

Every subpage is wrapped in `SiteFrame`, which guarantees the two global rules on all pages:
a link home (nav logo, breadcrumb root, footer logo → `/`) and direct contact (nav "Kontakt",
the contact form, footer Instagram/email, and a sticky mobile contact bar).

All copy is Polish, no em-dashes in body prose. Scroll animation is gated behind
`gsap.matchMedia` so `prefers-reduced-motion` users get a fully static page.
