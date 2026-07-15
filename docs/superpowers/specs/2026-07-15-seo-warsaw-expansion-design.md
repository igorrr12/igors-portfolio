# Sitelab — Warsaw SEO expansion

**Date:** 2026-07-15
**Status:** Approved design, ready for implementation plan
**Scope choice:** Focused authority set (26 pages), not a broad programmatic matrix.

## Goal

Today `getsitelab.pl` is a single page. The technical SEO base is good (metadata,
`ProfessionalService` JSON-LD, robots, manifest) but `sitemap.ts` lists exactly one
URL, so there is nothing to rank on specific Warsaw searches. This project turns the
site into a small, genuinely useful set of Warsaw-anchored pages, each targeting a
real search intent from the actual lead pipeline, without diluting quality into thin
content.

Every new page must:
1. Match the existing gallery style exactly (no new visual language).
2. Give the visitor an easy way back to the homepage.
3. Give the visitor an easy, direct way to make contact.
4. Be Warsaw-specific and in natural Polish (no em-dashes, does not read as AI).

## Grounding (why these pages)

Page targets come straight from `leads.csv`:

- **Top business types:** kawiarnia (22), restauracja (11), barber/fryzjer (9),
  kwiaciarnia (4), salon (2), piekarnia. → industry pages.
- **Top districts:** Wola (13), Praga (10), Ochota (7), Mokotów (7), Żoliborz (4),
  Śródmieście (3). → district pages.

So every page maps to something someone in the funnel is actually typing into Google.

## Principles / constraints

- **No thin content.** Each page has differentiated copy: its own angle, its own
  matching gallery example, its own mini-FAQ or local intro. No find-and-replace pages.
- **Single source of truth.** Pages and the sitemap are both generated from typed data
  files, so adding a niche or district later is a one-object edit.
- **Reuse the shell.** No new colors, fonts, or components that break the gallery look.
  New components extend the existing system (`gallery-frame`, `caption`, `caption-dot`,
  `rule`, `link-under`, `bg-ink`, Gambetta + Satoshi, accent `#FF6A2C`).
- **Instagram-DM CTA unchanged.** The `GuestBook` lead form (copies message + opens IG
  thread) is the primary conversion on every page. Email is the secondary channel.
- **Honesty preserved.** Works stay labelled as concept projects ("projekt koncepcyjny")
  for real Warsaw places. No fake testimonials or invented client quotes.

## Sitemap (final URL structure)

```
/                                          Home (gallery, unchanged)

/oferta                                    Offer hub: lists all industries + the offer
/strony-dla-kawiarni                       Industry page (root-level keyword URL)
/strony-dla-restauracji
/strony-dla-barbera
/strony-dla-salonu-kosmetycznego
/strony-dla-kwiaciarni
/strony-dla-piekarni

/realizacje                                Works index (the exhibition, as a page)
/realizacje/bar-bambino                    Case study (before/after + story)
/realizacje/fryzjer-pulawska
/realizacje/kwiaciarnia-julia

/strony-internetowe                        Warsaw hub → links every district
/strony-internetowe/mokotow                District page
/strony-internetowe/srodmiescie
/strony-internetowe/wola
/strony-internetowe/praga-poludnie
/strony-internetowe/ochota
/strony-internetowe/zoliborz

/cennik                                    "ile kosztuje strona internetowa"
/faq                                       FAQ + FAQPage schema
/o-mnie                                    About / trust (E-E-A-T)

/dziennik                                  Journal hub (editorial, gallery tone)
/dziennik/ile-kosztuje-strona-internetowa-dla-firmy
/dziennik/czego-potrzebuje-strona-restauracji
/dziennik/strona-internetowa-czy-instagram
```

Total: 26 indexable pages (home + 25 new: 6 industry, 6 district, 3 realizacje,
3 dziennik, plus the `oferta` / `realizacje` / `strony-internetowe` / `dziennik` hubs
and `cennik` / `faq` / `o-mnie`).

## Routing plan (App Router)

Repetitive sets use nested dynamic routes with `generateStaticParams()` and
`export const dynamicParams = false` (unknown slugs 404). Industry pages stay at the
root as explicit folders to keep the keyword-rich URL and avoid a root-level catch-all.

```
app/
  oferta/page.tsx
  strony-dla-kawiarni/page.tsx            → <IndustryPage industry="kawiarnia" />
  strony-dla-restauracji/page.tsx
  strony-dla-barbera/page.tsx
  strony-dla-salonu-kosmetycznego/page.tsx
  strony-dla-kwiaciarni/page.tsx
  strony-dla-piekarni/page.tsx
  realizacje/page.tsx
  realizacje/[slug]/page.tsx              (from WORKS)
  strony-internetowe/page.tsx
  strony-internetowe/[dzielnica]/page.tsx (from DISTRICTS)
  cennik/page.tsx
  faq/page.tsx
  o-mnie/page.tsx
  dziennik/page.tsx
  dziennik/[slug]/page.tsx                (from ARTICLES)
```

Each `page.tsx` exports `generateMetadata()` (pulling from data) and renders a shared
template. The 6 industry files are ~5 lines each (metadata + `<IndustryPage>`).

## Global access requirements (applies to EVERY page)

These are hard requirements from the user, enforced through shared components used on
all routes including the home:

**Homepage always reachable**
- `Header` logo links to `/`.
- `Breadcrumbs` root crumb ("Sitelab") links to `/`.
- `Footer` logo links to `/`.

**Direct contact always reachable**
- `Header` includes a "Kontakt" link → the page-local lead block (`#ksiega-gosci`),
  which every subpage renders.
- Every page renders the `GuestBook` lead block near the bottom (IG-DM flow).
- `Footer` shows the Instagram DM link and the email link on every page.
- New `MobileContactBar`: sticky bottom bar on small screens, on every page, with
  "Napisz na Instagramie" (`igDmLink`) + email. Hidden on `sm+`. Respects safe-area.

## Navigation ("tabs") + footer

**Header → shared `Nav`** (replaces the current minimal header), used on all pages:
- Left: `Logo` → `/`.
- Links: `Oferta` (`/oferta`), `Realizacje` (`/realizacje`), `Cennik` (`/cennik`),
  `Dziennik` (`/dziennik`), `Kontakt` (`#ksiega-gosci`).
- Mobile: quiet slide-in / disclosure menu, gallery styling, min 44px targets.
- Style: same letterspaced small-caps / `link-under` treatment as today. On the home
  page it can stay `absolute`/overlay as now; on subpages it sits in normal flow above
  `PageHero`. Keep it lightweight; no heavy sticky header that fights the gallery feel.

**Footer → sitemap-style directory** (extends current footer), same `bg-ink` block:
- Columns: **Oferta** (industries), **Dzielnice** (districts), **Realizacje** (works),
  **Więcej** (Cennik, FAQ, Dziennik, O mnie).
- Keeps Logo → `/`, Instagram, email, copyright.
- Doubles as internal-linking + crawl-depth surface.

## Page specifications

### Shared subpage anatomy

Most subpages follow: `Nav` → `Breadcrumbs` → `PageHero` → body sections →
`GuestBook` (`#ksiega-gosci`) → related links → `Footer` → `MobileContactBar`.
`ProgressLine` and `GuideLine` stay home-only (they belong to the scroll exhibition).

### Industry pages (`/strony-dla-*`)  — 6

Data: `lib/industries.ts`. Each renders `<IndustryPage>`.

Sections:
1. **Breadcrumbs:** Sitelab / Oferta / [Branża].
2. **PageHero:** H1 `Strony internetowe dla [branży] w Warszawie`, one-line sub, CTA
   to `#ksiega-gosci`.
3. **Intro** (1–2 short paragraphs): the specific problem this industry has online.
4. **"Czego potrzebuje strona [branży]"**: 3–4 industry-specific needs
   (e.g. gastronomia = menu i ceny od progu; barber = rezerwacja w dwa kliknięcia;
   kwiaciarnia = zamówienie z dostawą tego samego dnia).
5. **Matching example**: the closest `WORKS` piece (framed after-image + link to its
   `/realizacje/...` page), labelled "projekt koncepcyjny".
6. **Offer**: reuse `Placard` (399 zł / darmowy projekt 24 h / realizacja 72 h).
7. **Mini-FAQ**: 3–4 Q&A → renders `FAQPage` JSON-LD.
8. **GuestBook** lead block.
9. **Related links**: relevant districts + a related `dziennik` article + other industries.

Example → work mapping:
- kawiarnia → bar-bambino (gastronomia); restauracja → bar-bambino;
  barber → fryzjer-pulawska; salon-kosmetyczny → fryzjer-pulawska;
  kwiaciarnia → kwiaciarnia-julia; piekarnia → bar-bambino.

Schema: `Service` (serviceType, areaServed = Warszawa, provider = the business) +
`BreadcrumbList` + `FAQPage`.

### District pages (`/strony-internetowe/[dzielnica]`)  — 6

Data: `lib/districts.ts` (Mokotów, Śródmieście, Wola, Praga-Południe, Ochota, Żoliborz).
Each stores display name + Polish locative phrase (na Mokotowie, w Śródmieściu, na Woli,
na Pradze-Południe, na Ochocie, na Żoliborzu) so copy is grammatical.

Sections:
1. **Breadcrumbs:** Sitelab / Strony internetowe / [Dzielnica].
2. **PageHero:** H1 `Strony internetowe dla firm [locative]`, sub, CTA.
3. **Local intro** (genuinely district-specific): character of the area + the kinds of
   local businesses there. Written per district, not templated.
4. **Offer** (`Placard`).
5. **Featured works** (from `WORKS`).
6. **Related industries** (links to the 6 industry pages) + other districts.
7. **GuestBook** lead block.

Hub `/strony-internetowe`: intro targeting Warsaw broadly + a directory of all districts
and links to industries. Written to complement, not duplicate, the home H1 (home =
brand/gallery; hub = the district directory).

Schema: `Service` (areaServed = the district within Warszawa) + `BreadcrumbList`.

### Realizacje (`/realizacje`, `/realizacje/[slug]`)  — 1 + 3

Extend `lib/works.ts` `Work` with detail fields: `problem`, `story` (paragraphs),
`changes` (string[]), before image path (already exist as `*-before.png`).

- **Hub `/realizacje`:** the exhibition as a standalone page — grid of works, each →
  detail page. Reuses `Work`/`WallLabel` styling.
- **Detail `/realizacje/[slug]`:** breadcrumbs → PageHero (name + sector + district) →
  before/after (reuse existing before + after images) → "Co się zmieniło" (changes) →
  short story → honest "projekt koncepcyjny" note → link to the matching industry page →
  GuestBook.

Schema: `CreativeWork` (or `ImageObject`) + `BreadcrumbList`.

### Cennik (`/cennik`)  — 1

Answer-first page for "ile kosztuje strona internetowa (Warszawa)".
Sections: PageHero H1 `Ile kosztuje strona internetowa w Warszawie?` → direct answer
(399 zł stała cena, darmowy projekt w 24 h, realizacja w 72 h, płatność po akceptacji) →
"Co zawiera cena" list → what is not included / honest add-ons → `Process` (reuse) →
pricing FAQ (`FAQPage`) → GuestBook.
Schema: `Offer` + `FAQPage` + `BreadcrumbList`.

### FAQ (`/faq`)  — 1

Aggregated questions across pricing, process, tech, domain, ownership, Google, timeline.
Uses the shared `FAQ` accordion. Schema: `FAQPage` + `BreadcrumbList`.

### O mnie (`/o-mnie`)  — 1

Trust / E-E-A-T: real person (Igor), the concept-first approach, why Warsaw local, what
"projekt koncepcyjny" means, how the process protects the client (no upfront money).
CTA to contact. Schema: `Person` / `AboutPage` + `BreadcrumbList`. No invented facts —
copy stays truthful about being a solo Warsaw studio.

### Dziennik (`/dziennik`, `/dziennik/[slug]`)  — 1 + 3

Data: `lib/journal.ts`. Article body stored as a small typed block model
(`{ type: "p" | "h2" | "ul", ... }`) rendered by a shared `ArticleBody` (no MDX
dependency). Editorial gallery tone.

- **Hub `/dziennik`:** list of articles with excerpts.
- **Articles:**
  1. `ile-kosztuje-strona-internetowa-dla-firmy` → links to `/cennik`.
  2. `czego-potrzebuje-strona-restauracji` → links to `/strony-dla-restauracji`.
  3. `strona-internetowa-czy-instagram` → links to `/oferta` / home.

Each: breadcrumbs → title + published date → body → related links → GuestBook.
Schema: `Article` (headline, datePublished, dateModified, author = Igor,
publisher = Sitelab) + `BreadcrumbList`.

## Technical SEO layer

- **`lib/seo.ts`** — central helpers:
  - `SITE` constants (`baseUrl = https://getsitelab.pl`, brand).
  - `buildMetadata({ title, description, path, ... })` → returns Next `Metadata` with
    unique title, description, `alternates.canonical` (absolute), and OpenGraph. Used by
    every route's `generateMetadata`.
  - Schema builders: `serviceSchema`, `articleSchema`, `faqSchema`, `breadcrumbSchema`,
    `offerSchema`, `creativeWorkSchema`. Return plain objects; injected via a small
    `<JsonLd data={...} />` component (`<script type="application/ld+json">`).
- **Home** keeps its existing `ProfessionalService` JSON-LD (add `@id` cross-refs where
  useful). New page schemas reference the business `@id`.
- **`app/sitemap.ts`** — rewritten to import `industries`, `districts`, `works`,
  `articles` + the static routes and emit every URL with sensible `priority` /
  `changeFrequency` (home 1.0; industry/cennik 0.8; districts/realizacje 0.7; dziennik
  0.6; faq/o-mnie 0.5). `lastModified` from data where available.
- **Canonicals:** every page sets a self-referential absolute canonical.
- **Breadcrumbs:** UI on every subpage (wall-label styling) + matching `BreadcrumbList`
  JSON-LD.
- **Internal linking mesh:** industry ↔ matching realizacja ↔ relevant districts ↔
  dziennik article, plus the footer directory. This is the main ranking lever on a small
  site.
- **`robots.ts`, `manifest.ts`:** unchanged (already correct; sitemap ref stays valid).
- **OpenGraph image:** ship a branded static default OG for now; per-page dynamic OG
  (`opengraph-image.tsx` via `next/og`) is noted as an optional later enhancement, out of
  scope for this build.

## New / changed components

New shared:
- `Nav` (replaces `Header`'s minimal version; logo → `/`, links, mobile menu).
- `MobileContactBar` (sticky, small screens, IG DM + email; all pages).
- `Breadcrumbs` (wall-label style; root → `/`).
- `PageHero` (subpage hero: kicker caption + H1 + sub + CTA).
- `FAQ` (accordion; emits `FAQPage` JSON-LD).
- `JsonLd` (script injector).
- `RelatedLinks` (internal-linking block).
- `IndustryPage`, `DistrictPage`, `WorkDetail`, `ArticleBody` (data-driven templates).

Reused as-is or lightly extended: `Footer` (→ sitemap columns), `GuestBook`, `Placard`,
`WallLabel`, `Work`, `Process`, `Logo`, `icons`. Home-only: `Cover`, `Exhibition`,
`CuratorNote`, `GuestBook` (also on subpages), `GuideLine`, `ProgressLine`.

## New / changed data files

- `lib/industries.ts` (new) — 6 `Industry` objects (slug, key, navLabel, h1, meta,
  intro, needs, exampleWorkId, faq, relatedDistricts, relatedArticle).
- `lib/districts.ts` (new) — 6 `District` objects (slug, name, locative, meta, h1, intro,
  character, typicalBusinesses, featuredWorkIds, relatedIndustries).
- `lib/journal.ts` (new) — 3 `Article` objects (slug, title, meta, excerpt,
  datePublished, dateModified, body blocks, relatedLinks).
- `lib/works.ts` (extend) — add `problem`, `story`, `changes`, before-image ref.
- `lib/seo.ts` (new) — metadata + schema helpers, `SITE` constants.

## Out of scope (YAGNI)

- Broad industry × district programmatic matrix.
- Blog CMS / MDX pipeline (3 hand-written articles are enough).
- Per-page dynamic OG image generation (static default only for now).
- Multi-language (site is Polish-only by design).
- Any backend / analytics changes beyond what exists.

## Success criteria

- `sitemap.xml` lists all 26 URLs; each resolves and returns unique title + meta +
  canonical.
- Every page: logo/breadcrumb/footer link to `/`; header Kontakt + GuestBook + footer
  contact + mobile bar all present.
- Valid JSON-LD per page type (passes Google Rich Results test shape:
  Service/Article/FAQPage/Offer/BreadcrumbList).
- No two pages share body copy; every page names Warszawa (or a specific district).
- Visual parity with the current gallery homepage (fonts, colors, spacing, motion feel);
  no console errors; Lighthouse SEO ~100 and no accessibility regressions.
- `npm run build` passes with all routes statically generated.
```
