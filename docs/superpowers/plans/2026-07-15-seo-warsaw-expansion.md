# Warsaw SEO Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-page getsitelab.pl into a 26-page, Warsaw-anchored, data-driven site (industry / district / case-study / journal pages + cennik/faq/o-mnie) with a full technical-SEO layer, reusing the existing gallery visual system.

**Architecture:** All new pages are generated from typed data files (`lib/industries.ts`, `lib/districts.ts`, `lib/journal.ts`, extended `lib/works.ts`). A `SiteFrame` wrapper renders shared chrome (Nav, Breadcrumbs slot, an always-present ContactSection, Footer, MobileContactBar) so every route satisfies the "home link + direct contact everywhere" rule structurally. `sitemap.ts` and a build-time `assertData()` invariant read the same data, so the sitemap can never drift from the pages. No test framework exists in this repo; the established verification pattern (from the prior gallery-redesign plan) is `npm run build` + browser checks, which this plan follows.

**Tech Stack:** Next.js 14.2 App Router, TypeScript, Tailwind 3.4, GSAP (home only). No new dependencies.

## Global Constraints

- **Language:** Polish only. Natural, casual-professional tone. **No em-dashes.** Must not read as AI-generated.
- **Locale/city:** Warszawa. Every page names Warszawa or a specific district.
- **Visual system (verbatim):** walls `#F7F5F0` (ivory), ink `#141311`, stone `#6E6961`, line `rgba(20,19,17,0.12)`, accent `#FF6A2C`. Fonts: `font-display` (Gambetta), `font-sans` (Satoshi). Shell classes: `gallery-frame`, `caption`, `caption-dot`, `rule`, `link-under`, `bg-ink`. No new colors/fonts.
- **CTA:** Instagram DM is the primary channel (`igDmLink`), email secondary (`mailLink`), both from `lib/config.ts`. The lead form logic stays identical to today's.
- **Neutral contact naming:** no "guest book / Księga gości / wpis" wording anywhere. The section is "Kontakt", id `#kontakt`, component `ContactSection`, content `CONTACT_SECTION`, title "Napisz do mnie", `data-gallery-stop="Kontakt"`.
- **Honesty:** works stay "projekt koncepcyjny". No fake quotes/testimonials/invented facts.
- **SEO base URL:** `https://getsitelab.pl`. Every page: unique title + meta description + self canonical + OpenGraph + page-appropriate JSON-LD + BreadcrumbList.
- **Routing safety:** dynamic segments use `generateStaticParams()` + `export const dynamicParams = false`; unknown slug → `notFound()`.

---

## File Structure

```
lib/
  config.ts        (untouched)
  content.ts       MODIFY: rename GUESTBOOK → CONTACT_SECTION; add page-hub copy consts
  works.ts         MODIFY: extend Work (slug, before, problem, story, changes, industrySlug) + getWork()
  industries.ts    NEW: Industry[] + getIndustry()
  districts.ts     NEW: District[] + getDistrict()
  journal.ts       NEW: Article[] + getArticle()
  seo.ts           NEW: SITE, abs(), buildMetadata(), schema builders
  validate.ts      NEW: assertData() build-time invariant

components/
  GuestBook.tsx    RENAME → ContactSection.tsx (export ContactSection, id kontakt)
  Header.tsx       REPLACE usage → Nav.tsx
  Nav.tsx          NEW: shared nav (logo→/, links, mobile menu). overlay|solid.
  Breadcrumbs.tsx  NEW: wall-label crumbs (root→/) + BreadcrumbList JSON-LD
  PageHero.tsx     NEW: subpage hero (kicker + H1 + sub + CTA)
  FAQ.tsx          NEW: native <details> accordion + FAQPage JSON-LD
  MobileContactBar.tsx NEW: sticky mobile IG-DM + email bar
  RelatedLinks.tsx NEW: internal-link block
  SiteFrame.tsx    NEW: Nav + (Breadcrumbs) + main + ContactSection + Footer + MobileContactBar
  JsonLd.tsx       NEW: <script type=application/ld+json>
  Footer.tsx       MODIFY: add sitemap link columns
  IndustryPage.tsx NEW: template + industryMetadata()
  DistrictPage.tsx NEW: template + districtMetadata()
  WorkDetail.tsx   NEW: template + workMetadata()
  ArticleBody.tsx  NEW: renders Block[]
  (Cover, Exhibition, Work, CuratorNote, Placard, Process, WallLabel, Logo, icons,
   GuideLine, ProgressLine: reused; home-only ones stay home-only)

app/
  layout.tsx       (untouched except home JSON-LD stays)
  page.tsx         MODIFY: Header→Nav overlay; GuestBook→ContactSection; add MobileContactBar
  sitemap.ts       REWRITE: all 26 URLs from data
  oferta/page.tsx                       NEW hub
  strony-dla-kawiarni/page.tsx          NEW (+5 sibling industry folders)
  strony-dla-restauracji/page.tsx
  strony-dla-barbera/page.tsx
  strony-dla-salonu-kosmetycznego/page.tsx
  strony-dla-kwiaciarni/page.tsx
  strony-dla-piekarni/page.tsx
  realizacje/page.tsx                   NEW hub
  realizacje/[slug]/page.tsx            NEW
  strony-internetowe/page.tsx           NEW hub
  strony-internetowe/[dzielnica]/page.tsx NEW
  cennik/page.tsx                       NEW
  faq/page.tsx                          NEW
  o-mnie/page.tsx                       NEW
  dziennik/page.tsx                     NEW hub
  dziennik/[slug]/page.tsx              NEW
```

---

## Task 0: Neutral contact rename (global)

**Files:** rename `components/GuestBook.tsx`→`components/ContactSection.tsx`; modify `lib/content.ts`, `components/Header.tsx`, `app/page.tsx`.

- [ ] **Step 1:** In `lib/content.ts` rename `export const GUESTBOOK` → `export const CONTACT_SECTION`, set `caption: "Kontakt"`, `title: "Napisz do mnie"`. Leave all other fields (sub, field labels, submit, sent* etc.) unchanged.
- [ ] **Step 2:** `git mv components/GuestBook.tsx components/ContactSection.tsx`. In it: `export function ContactSection()`; import `CONTACT_SECTION` and replace every `GUESTBOOK.` → `CONTACT_SECTION.`; change section `id="ksiega-gosci"`→`id="kontakt"`, `data-gallery-stop="Księga gości"`→`data-gallery-stop="Kontakt"`; update the doc comment (drop "guest book" wording).
- [ ] **Step 3:** `components/Header.tsx`: change `href="#ksiega-gosci"` → `href="#kontakt"` (label already "Kontakt"). (Header is replaced by Nav in Task 3, but keep it valid meanwhile.)
- [ ] **Step 4:** `app/page.tsx`: `import { ContactSection }` and use `<ContactSection />`.
- [ ] **Step 5:** Verify: `git grep -i "guestbook\|ksiega-gosci\|księga gości\|zostaw wpis" -- ':!docs'` returns nothing. `npm run build` compiles.
- [ ] **Step 6:** Commit: `feat: rename guest-book section to neutral Kontakt`.

## Task 1: SEO foundation (`lib/seo.ts`, `JsonLd`)

**Files:** Create `lib/seo.ts`, `components/JsonLd.tsx`.

**Produces:**
```ts
// lib/seo.ts
export const SITE = { baseUrl: "https://getsitelab.pl", brand: "Sitelab", city: "Warszawa" } as const;
export const abs = (path: string) => `${SITE.baseUrl}${path === "/" ? "" : path}`;
export function buildMetadata(o: { title: string; description: string; path: string; keywords?: string[] }): Metadata;
// openGraph { title, description, url: abs(path), type, locale: "pl_PL", siteName: "Sitelab" }; alternates.canonical = abs(path)
export function breadcrumbSchema(items: { name: string; path: string }[]): object; // BreadcrumbList, ItemList position 1..n, item = abs(path)
export function serviceSchema(o: { name: string; description: string; serviceType: string; areaServed: string; path: string }): object; // @type Service, provider @id "https://getsitelab.pl/#business", areaServed City/place
export function faqSchema(items: { q: string; a: string }[]): object; // FAQPage → mainEntity Question/acceptedAnswer
export function articleSchema(o: { title: string; description: string; path: string; datePublished: string; dateModified: string }): object; // Article, author Person "Igor", publisher @id #business
export function offerSchema(o: { name: string; price: string; description: string; path: string }): object;
export function creativeWorkSchema(o: { name: string; description: string; image: string; path: string }): object;
```
```tsx
// components/JsonLd.tsx  (server)
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```
- [ ] Write both files. Build. Commit: `feat: SEO metadata + JSON-LD helpers`.

## Task 2: Data model

**Files:** Create `lib/industries.ts`, `lib/districts.ts`, `lib/journal.ts`, `lib/validate.ts`; modify `lib/works.ts`.

**Types (produces):**
```ts
// works.ts additions to Work: slug, before, problem, story: string[], changes: string[], industrySlug
export function getWork(slug: string): Work | undefined;
// slugs: bar-bambino / fryzjer-pulawska / kwiaciarnia-julia; before: /examples/{bambino,fryzjer,julia}-before.png

// industries.ts
export type Need = { title: string; desc: string };
export type FaqItem = { q: string; a: string };
export type Industry = { slug; key; navLabel; h1; metaTitle; metaDescription; kicker; lead;
  intro: string[]; needs: Need[]; exampleWorkId: string; faq: FaqItem[];
  relatedDistricts: string[]; relatedArticleSlug?: string };
export const INDUSTRIES: Industry[]; export const getIndustry: (slug) => Industry | undefined;

// districts.ts
export type District = { slug; name; locative; h1; metaTitle; metaDescription; kicker; lead;
  intro: string[]; typicalBusinesses: string[]; featuredWorkIds: string[]; relatedIndustrySlugs: string[] };
export const DISTRICTS: District[]; export const getDistrict: (slug) => District | undefined;

// journal.ts
export type Block = { type:"p"; text:string } | { type:"h2"; text:string } | { type:"ul"; items:string[] };
export type Article = { slug; title; metaTitle; metaDescription; excerpt; datePublished; dateModified;
  readingMinutes:number; body: Block[]; related: { label:string; href:string }[] };
export const ARTICLES: Article[]; export const getArticle: (slug) => Article | undefined;

// validate.ts
export function assertData(): void; // throws if: dup slug across sets; industry.exampleWorkId ∉ works;
// relatedDistricts ∉ districts; featuredWorkIds ∉ works; relatedIndustrySlugs ∉ industries; relatedArticleSlug ∉ articles
```
**Content to author (following Global Constraints):**
- 6 industries — keys/slugs: kawiarnia `strony-dla-kawiarni`, restauracja `strony-dla-restauracji`, barber `strony-dla-barbera`, salon-kosmetyczny `strony-dla-salonu-kosmetycznego`, kwiaciarnia `strony-dla-kwiaciarni`, piekarnia `strony-dla-piekarni`. exampleWorkId: kawiarnia/restauracja/piekarnia→bambino, barber/salon→fryzjer, kwiaciarnia→julia. Each: unique `h1` "Strony internetowe dla [branży] w Warszawie", 1-2 intro paras (industry problem online), 3-4 `needs` (industry-specific, e.g. gastronomia: menu i ceny od progu, rezerwacja stolika, aktualne godziny; barber: rezerwacja online, cennik, galeria; kwiaciarnia: zamówienie z dostawą tego samego dnia), 3-4 `faq`.
- 6 districts: mokotow "na Mokotowie", srodmiescie "w Śródmieściu", wola "na Woli", praga-poludnie "na Pradze-Południe", ochota "na Ochocie", zoliborz "na Żoliborzu". Each: unique local intro (area character + typical local businesses there, grounded, NOT templated), 4-6 typicalBusinesses chips, featuredWorkIds (pick 1-2), relatedIndustrySlugs.
- 3 articles: `ile-kosztuje-strona-internetowa-dla-firmy` (→/cennik), `czego-potrzebuje-strona-restauracji` (→/strony-dla-restauracji), `strona-internetowa-czy-instagram` (→/oferta). Real editorial body (5-9 blocks each), datePublished 2026-07-15.
- [ ] Author all data. Build (types enforce shape). Commit: `feat: industries/districts/journal data model + validation`.

## Task 3: Shared UI (Nav, Breadcrumbs, PageHero, FAQ, MobileContactBar, RelatedLinks, SiteFrame, Footer, home)

**Files:** create Nav, Breadcrumbs, PageHero, FAQ, MobileContactBar, RelatedLinks, SiteFrame; modify Footer, app/page.tsx; delete Header.tsx after page.tsx switches to Nav.

**Interfaces (produces):**
```ts
Nav({ overlay?: boolean })            // client; logo→"/"; links Oferta/Realizacje/Cennik/Dziennik + Kontakt(#kontakt); mobile hamburger panel; overlay=absolute top for home else relative w/ border-b
Breadcrumbs({ items: { name: string; path: string }[] }) // UI (links all but last, root Sitelab→"/") + <JsonLd data={breadcrumbSchema(items)} />
PageHero({ kicker, title, sub?, ctaLabel? })  // gallery-frame; caption kicker; font-display H1 clamp(2.2rem,6vw,4rem); sub stone; CTA <a href="#kontakt"> default "Odbierz darmowy projekt"
FAQ({ items, caption?, title? })      // WallLabel(optional) + native <details> list + <JsonLd data={faqSchema(items)} />
MobileContactBar()                    // fixed bottom, sm:hidden, bg-ink; "Napisz na Instagramie"(igDmLink) + mail icon(mailLink); safe-area padding
RelatedLinks({ title?, links: { label, href }[] })  // caption title + link-under list
SiteFrame({ breadcrumbs?, overlayNav?, children })  // <Nav overlay={overlayNav}/> {breadcrumbs && <Breadcrumbs/>} <main>{children}</main> <ContactSection/> <Footer/> <MobileContactBar/>
```
- [ ] Build components (match existing class idioms). Footer: keep logo/contact/copyright, add responsive columns — **Oferta** (INDUSTRIES navLabel→/slug), **Dzielnice** (DISTRICTS name→/strony-internetowe/slug), **Realizacje** (WORKS name→/realizacje/slug), **Więcej** (Cennik/FAQ/Dziennik/O mnie). app/page.tsx: `<Nav overlay/>` replacing `<Header/>`, add `<MobileContactBar/>` before `</>`. Remove Header.tsx import; delete file.
- [ ] Verify build + dev server: home still renders/animates; nav overlays cover; mobile bar shows at 375px; footer columns link out. Commit: `feat: shared nav, breadcrumbs, page hero, faq, mobile bar, site frame`.

## Task 4: Industry pages

**Files:** create `components/IndustryPage.tsx`, `app/oferta/page.tsx`, and 6 `app/strony-dla-*/page.tsx`.

```ts
// IndustryPage.tsx
export function industryMetadata(slug: string): Metadata; // buildMetadata from Industry meta + path "/"+slug
export function IndustryPage({ slug }: { slug: string }); // getIndustry or notFound(); getWork(exampleWorkId)
// composition inside SiteFrame(breadcrumbs=[Sitelab/, Oferta /oferta, industry.navLabel /slug]):
//  JsonLd(serviceSchema) · PageHero · intro · needs grid · example (after-image + link to /realizacje/workSlug, "projekt koncepcyjny") · Placard · FAQ(industry.faq) · RelatedLinks(districts + article + siblings)
```
Each industry route file (example — repeat per slug with its own slug string):
```tsx
import { IndustryPage, industryMetadata } from "@/components/IndustryPage";
export const generateMetadata = () => industryMetadata("strony-dla-kawiarni");
export default function Page() { return <IndustryPage slug="strony-dla-kawiarni" />; }
```
`app/oferta/page.tsx`: hub — PageHero + grid of INDUSTRIES cards (navLabel + one-line + link) inside SiteFrame; buildMetadata; breadcrumbs [Sitelab/, Oferta /oferta].
- [ ] Build. Verify: `/oferta` lists 6; `/strony-dla-kawiarni` renders hero+needs+example+faq+contact; view-source shows unique title + canonical + Service + FAQPage + BreadcrumbList JSON-LD. Commit: `feat: industry landing pages + oferta hub`.

## Task 5: District pages

**Files:** create `components/DistrictPage.tsx`, `app/strony-internetowe/page.tsx`, `app/strony-internetowe/[dzielnica]/page.tsx`.

```ts
export function districtMetadata(slug: string): Metadata;
export function DistrictPage({ slug }): JSX; // getDistrict or notFound()
// SiteFrame(breadcrumbs [Sitelab/, "Strony internetowe" /strony-internetowe, district.name /...]):
//  JsonLd(serviceSchema areaServed=district.name) · PageHero(h1 uses locative) · intro paras · typicalBusinesses chips · featured works (WorkFrame-style static) · Placard · RelatedLinks(industries + other districts)
// [dzielnica]/page.tsx: generateStaticParams from DISTRICTS.map(slug); dynamicParams=false; generateMetadata({params}) → districtMetadata(params.dzielnica); default → <DistrictPage slug={params.dzielnica}/>
```
`app/strony-internetowe/page.tsx`: hub — intro targeting Warszawa broadly + directory of all districts + links to industries; complements (does not duplicate) home H1.
- [ ] Build. Verify a district page: locative grammar correct, unique copy, JSON-LD present; unknown slug 404s. Commit: `feat: district pages + warsaw hub`.

## Task 6: Realizacje (works)

**Files:** create `components/WorkDetail.tsx`, `app/realizacje/page.tsx`, `app/realizacje/[slug]/page.tsx`.
```ts
export function workMetadata(slug): Metadata;
export function WorkDetail({ slug }): JSX; // getWork or notFound()
// SiteFrame(breadcrumbs [Sitelab/, Realizacje /realizacje, work.name /...]):
//  JsonLd(creativeWorkSchema) · PageHero(name; sub sector·district) · before/after (both images, labelled) · "Co się zmieniło" (changes) · story paras · "projekt koncepcyjny" note · link to matching industry page
// hub: grid of WORKS → detail links (reuse Work framing, static)
// [slug]: generateStaticParams from WORKS.map(slug); dynamicParams=false
```
- [ ] Build. Verify `/realizacje` grid + `/realizacje/bar-bambino` before/after + changes + industry link. Commit: `feat: realizacje index + case-study pages`.

## Task 7: Cennik, FAQ, O mnie

**Files:** create `app/cennik/page.tsx`, `app/faq/page.tsx`, `app/o-mnie/page.tsx`. Add copy consts to `lib/content.ts` (CENNIK, FAQ_ITEMS, O_MNIE).
- `/cennik`: PageHero "Ile kosztuje strona internetowa w Warszawie?" → answer-first (399 zł, darmowy projekt 24h, realizacja 72h, płatność po akceptacji) → "Co zawiera cena" list → co poza ceną → `<Process/>` reuse → FAQ(pricing) → JsonLd(offerSchema + faqSchema via FAQ). breadcrumbs [Sitelab/, Cennik /cennik].
- `/faq`: FAQ(FAQ_ITEMS, caption "FAQ", title "Częste pytania"). breadcrumbs.
- `/o-mnie`: PageHero + trust copy (real solo Warsaw studio, concept-first, no upfront money, what "projekt koncepcyjny" means). JsonLd(Person/AboutPage). breadcrumbs. No invented facts.
- [ ] Build + verify all three render with correct schema. Commit: `feat: cennik, faq, o-mnie pages`.

## Task 8: Dziennik (journal)

**Files:** create `components/ArticleBody.tsx`, `app/dziennik/page.tsx`, `app/dziennik/[slug]/page.tsx`.
```ts
ArticleBody({ blocks: Block[] })  // p→<p>, h2→font-display h2, ul→list; prose width max-prose-narrow
// hub: list ARTICLES (title + excerpt + date + link)
// [slug]: generateStaticParams from ARTICLES; dynamicParams=false; generateMetadata → buildMetadata(article meta);
//   SiteFrame(breadcrumbs [Sitelab/, Dziennik /dziennik, title /...]): JsonLd(articleSchema) · PageHero(title; sub date·reading) · ArticleBody · RelatedLinks(article.related)
```
- [ ] Build + verify hub + one article render, Article JSON-LD present. Commit: `feat: dziennik journal + articles`.

## Task 9: Sitemap + robots

**Files:** rewrite `app/sitemap.ts`.
```ts
import { assertData } from "@/lib/validate";
export default function sitemap(): MetadataRoute.Sitemap {
  assertData(); // fail build on broken data references
  // static: "/", "/oferta", "/realizacje", "/strony-internetowe", "/cennik", "/faq", "/o-mnie", "/dziennik"
  // + INDUSTRIES → "/"+slug ; DISTRICTS → "/strony-internetowe/"+slug ; WORKS → "/realizacje/"+slug ; ARTICLES → "/dziennik/"+slug
  // priority: "/"=1.0; industries+cennik=0.8; districts+realizacje detail=0.7; dziennik=0.6; faq+o-mnie=0.5; hubs=0.7
  // changeFrequency monthly (yearly for o-mnie); lastModified new Date("2026-07-15")
}
```
- [ ] Build. Verify `/sitemap.xml` lists all 26 URLs and `/robots.txt` still points to it. Commit: `feat: full sitemap from data`.

## Task 10: Full verification sweep

- [ ] `npm run build` → all 26 routes show in the build output as static (`○`/`●`), 0 errors.
- [ ] Dev server browser sweep (desktop 1280 + mobile 375):
  - Every page: Nav logo → `/`; breadcrumb "Sitelab" → `/`; footer logo → `/`; Nav "Kontakt" scrolls to `#kontakt`; ContactSection form present; footer IG+email present; MobileContactBar visible at 375 with working IG-DM + email links.
  - Home unchanged (cover entrance, 3 pinned works, progress dots, no horizontal scroll).
  - Spot-check 1 industry + 1 district + 1 realizacja + 1 article + cennik + faq: unique H1/title, Warszawa named, no "guest book" wording, no console errors.
  - view-source JSON-LD on each type parses (Service/Offer/Article/FAQPage/CreativeWork/BreadcrumbList).
  - No horizontal scroll on any page at 375; contact bar doesn't cover footer content.
- [ ] Fix anything found, rebuild. Final commit: `feat: warsaw SEO expansion — 26 pages, full technical SEO`.

## Self-Review notes (done)

- Spec coverage: every spec section maps to a task (foundation T1, data T2, chrome/global-access T3, industries T4, districts T5, realizacje T6, cennik/faq/o-mnie T7, dziennik T8, sitemap/schema T9, verification T10, neutral rename T0). ✓
- Type consistency: getter names `getIndustry/getDistrict/getArticle/getWork`, metadata helpers `industryMetadata/districtMetadata/workMetadata`, `SiteFrame` prop `overlayNav`, contact id `kontakt` used verbatim across tasks. ✓
- No unresolved placeholders in interfaces; page copy is authored in-task against the stated per-page content requirements and Global Constraints. ✓
```
