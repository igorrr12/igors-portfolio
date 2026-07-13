# Galeria Sitelab Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild getsitelab.pl as „Galeria Sitelab" — a gallery-white, serif-editorial, scroll-driven exhibition page per the approved spec (`docs/superpowers/specs/2026-07-13-gallery-redesign-design.md`).

**Architecture:** Same Next.js 14 App Router + Tailwind project. The old "Live Design Canvas" component set is deleted and replaced with a new set (Cover, Exhibition/Work, CuratorNote, Placard, Process, GuestBook, ProgressLine). All scroll animation via GSAP ScrollTrigger, gated behind `gsap.matchMedia` so `prefers-reduced-motion` users get a fully static page. Mockups are pure HTML/CSS components, data-driven from `lib/works.ts`.

**Tech Stack:** Next.js 14.2, React 18, Tailwind 3.4, GSAP 3 (+ScrollTrigger), self-hosted fonts (Gambetta via Fontshare, Satoshi existing, mockup accents via `next/font/google`).

## Global Constraints

- Language: Polish, locale pl_PL. All UI copy in this plan is final copy — use verbatim.
- Palette (shell): ivory `#F7F5F0`, ink `#141311`, stone `#8A857C` (captions), hairlines `rgba(20,19,17,0.12)`, accent `#FF6A2C`. Works bring their own scoped palettes.
- `color-scheme: only light` stays (single deliberate composition).
- Only new npm dependency allowed: `gsap`.
- Animations: transform/opacity/clip-path only; no long-lived `will-change`; easing `power2.out`/`expo.out`/`none` (scrubs); nothing bounces or autoplays except the cover entrance and micro-hovers.
- Every GSAP scroll effect lives inside `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` — reduced-motion users must see a complete static page (initial hidden states must be set from JS, never plain CSS).
- Mobile-first at 375px; tap targets ≥ 44px; pins/scrub distances roughly halved on mobile.
- Do NOT touch: `lib/config.ts`, `public/examples/`, anything outside `sitelab-warsaw/`.
- No test framework exists and none is added (visual landing page, YAGNI). Every task verifies via `npm run build` (expect "Compiled successfully") + dev-server browser checks with the specific observations listed. Run the dev server via the Browser pane preview (`npm run dev`, port 3000).
- Commit after every task. Repo root is `sitelab-warsaw/`.

## File Structure (end state)

```
app/
  fonts/            Satoshi-{400,500,700}.woff2, Gambetta-{Regular,Medium,Italic}.woff2  (Clash Display deleted)
  globals.css       gallery system (rewritten)
  layout.tsx        fonts + metadata (rewritten)
  page.tsx          new composition
components/
  Cover.tsx         hero: entrance animation, overlapping type
  Exhibition.tsx    maps WORKS → Work, closing wall text
  Work.tsx          pinned scrubbed unveil, frames, museum caption
  mockups/RestaurantMockup.tsx | BarberMockup.tsx | FloristMockup.tsx
  CuratorNote.tsx   wall text + Placard
  Placard.tsx       offer placard
  Process.tsx       numbered catalogue entries
  GuestBook.tsx     IG-DM contact flow (logic ported from old FinalCta)
  Header.tsx        absolute minimal header (rewritten)
  Footer.tsx        dark colophon (rewritten)
  Logo.tsx          text wordmark, ink/white tones (rewritten)
  ProgressLine.tsx  scroll progress line + traveling orange dot
  WallLabel.tsx     shared caption+title+rule with scrubbed rise/draw
  icons.tsx         kept, trimmed in final task
lib/
  config.ts         UNTOUCHED
  content.ts        all page copy (rewritten)
  works.ts          exhibition data (new)
  gsap.ts           gsap + ScrollTrigger registration (new)
  mockup-fonts.ts   next/font/google accents for mockups (new)
DELETED: components/{Artboard,CaseStudies,CompareSlider,FinalCta,Frame,Hero,Magnetic,MobileCtaBar,Offer,Transformation,Reveal}.tsx
```

---

### Task 1: Foundation & demolition

**Files:**
- Modify: `package.json` (add gsap), `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Create: `app/fonts/Gambetta-Regular.woff2`, `app/fonts/Gambetta-Medium.woff2`, `app/fonts/Gambetta-Italic.woff2`
- Delete: `components/{Artboard,CaseStudies,CompareSlider,FinalCta,Frame,Hero,Magnetic,MobileCtaBar,Offer,Transformation,Reveal,Header,Footer,Logo}.tsx`, `app/fonts/ClashDisplay-*.woff2`, `lib/content.ts` old exports (emptied to placeholder module in this task, rewritten in Task 2)

**Interfaces:**
- Produces: Tailwind tokens `ivory ink stone line accent`, `font-display` (Gambetta) / `font-sans` (Satoshi), `max-w-content` (1200px) / `max-w-prose-narrow` (65ch), `tracking-caption`; CSS classes `.gallery-frame .caption .caption-dot .rule .link-under`; CSS var `--accent` etc. All later tasks rely on these exact names.

- [ ] **Step 1: Install gsap**

```bash
cd "sitelab-warsaw" && npm install gsap@^3
```
Expected: `added 1 package`.

- [ ] **Step 2: Download Gambetta from Fontshare**

```bash
cd /tmp && curl -L "https://api.fontshare.com/v2/fonts/download/gambetta" -o gambetta.zip && unzip -o gambetta.zip -d gambetta && find gambetta -name "*.woff2" | grep -iE "regular|medium|italic"
```
Copy exactly these three into `app/fonts/`: `Gambetta-Regular.woff2` (400), `Gambetta-Medium.woff2` (500), `Gambetta-Italic.woff2` (400 italic). If the API shape changed, download the family manually from https://www.fontshare.com/fonts/gambetta and take the same three WEB woff2 files.

```bash
cp gambetta/**/fonts/WEB/fonts/Gambetta-Regular.woff2 gambetta/**/fonts/WEB/fonts/Gambetta-Medium.woff2 gambetta/**/fonts/WEB/fonts/Gambetta-Italic.woff2 "<repo>/app/fonts/"
```

- [ ] **Step 3: Delete old components and fonts**

```bash
cd "sitelab-warsaw"
rm components/Artboard.tsx components/CaseStudies.tsx components/CompareSlider.tsx components/FinalCta.tsx components/Frame.tsx components/Hero.tsx components/Magnetic.tsx components/MobileCtaBar.tsx components/Offer.tsx components/Transformation.tsx components/Reveal.tsx components/Header.tsx components/Footer.tsx components/Logo.tsx
rm app/fonts/ClashDisplay-500.woff2 app/fonts/ClashDisplay-600.woff2 app/fonts/ClashDisplay-700.woff2
```

- [ ] **Step 4: Replace `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

/**
 * "Galeria Sitelab" system.
 * The shell is a neutral gallery: ivory walls, ink text, stone captions.
 * The only shell accent is the logo's orange dot. Exhibited works bring
 * their own palettes, which pop against the neutral walls.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F5F0", // gallery walls
        ink: "#141311", // text + the one dark room (footer)
        stone: "#8A857C", // museum captions
        line: "rgba(20,19,17,0.12)", // hairline rules
        accent: "#FF6A2C", // the logo dot
      },
      fontFamily: {
        display: ["var(--font-gambetta)", "Georgia", "serif"],
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
        "prose-narrow": "65ch",
      },
      letterSpacing: {
        caption: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ────────────────────────────────────────────────────────────
   Galeria Sitelab — global system
   Walls #F7F5F0 · ink #141311 · stone #8A857C · accent #FF6A2C
   Scroll animation lives in components via GSAP matchMedia;
   this file only holds the static gallery shell.
   ──────────────────────────────────────────────────────────── */

:root {
  /* Single deliberate light composition; opts out of Chrome Auto Dark Mode. */
  color-scheme: only light;

  --ivory: #f7f5f0;
  --ink: #141311;
  --stone: #8a857c;
  --line: rgba(20, 19, 17, 0.12);
  --accent: #ff6a2c;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--ivory);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  ::selection {
    background: var(--ink);
    color: var(--ivory);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
}

@layer components {
  .gallery-frame {
    @apply mx-auto w-full max-w-content px-5 sm:px-10;
  }

  /* Museum caption: letterspaced small caps in stone. */
  .caption {
    @apply font-sans text-[0.6875rem] font-medium uppercase tracking-caption text-stone;
  }

  /* Caption signed with the logo dot. */
  .caption-dot::after {
    content: "";
    @apply ml-2 inline-block h-[5px] w-[5px] rounded-full bg-accent align-middle;
  }

  /* Hairline rule; WallLabel scrubs scaleX from 0. */
  .rule {
    @apply block h-px w-full origin-left bg-line;
  }

  /* Inline link: hairline underline that inks in accent on hover. */
  .link-under {
    background-image: linear-gradient(var(--accent), var(--accent));
    background-size: 0% 1px;
    background-position: left calc(100% + 2px);
    background-repeat: no-repeat;
    transition: background-size 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .link-under:hover {
    background-size: 100% 1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 6: Replace `app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/** Display — Gambetta (Fontshare, self-hosted). High-contrast editorial serif. */
const gambetta = localFont({
  src: [
    { path: "./fonts/Gambetta-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gambetta-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Gambetta-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-gambetta",
  display: "swap",
});

/** Body — Satoshi (Fontshare, self-hosted). Quiet, very legible. */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getsitelab.pl"),
  title: "Sitelab — pracownia stron internetowych · Warszawa",
  description:
    "Galeria Sitelab: strony internetowe dla lokalnych firm w Warszawie. Darmowy projekt strony głównej w 24 h, gotowa strona w 72 h za 399 zł.",
  keywords: [
    "strony internetowe Warszawa",
    "strona dla firmy",
    "strona dla restauracji",
    "strona dla barbera",
    "strona dla salonu",
    "projekt strony internetowej",
  ],
  openGraph: {
    title: "Sitelab — galeria stron dla warszawskich firm",
    description:
      "Strony dla firm, które ogląda się jak sztukę. Darmowy projekt w 24 godziny, bez zobowiązań.",
    type: "website",
    locale: "pl_PL",
    siteName: "Sitelab",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${gambetta.variable} ${satoshi.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Empty `lib/content.ts` and stub `app/page.tsx`**

`lib/content.ts` (temporary, rewritten in Task 2):

```ts
// Rewritten in the next task: „Galeria Sitelab" copy lives here.
export {};
```

`app/page.tsx` (temporary diacritics proof, replaced as sections land):

```tsx
export default function Home() {
  return (
    <main className="gallery-frame flex min-h-screen flex-col justify-center gap-6">
      <p className="caption caption-dot">Wystawa stała · Warszawa 2026</p>
      <h1 className="font-display text-6xl font-medium">
        Zażółć gęślą jaźń — <em>zażółć gęślą jaźń</em>
      </h1>
      <span className="rule" />
    </main>
  );
}
```

- [ ] **Step 8: Build**

Run: `npm run build` — Expected: `Compiled successfully`.

- [ ] **Step 9: Browser verify**

Dev server at `localhost:3000`, check at 375px and 1280px: ivory background, ink serif headline, **all Polish diacritics render in Gambetta regular and italic with no fallback glyph mismatch** (ą ę ó ś ż ź ł ć ń — compare stems/weight consistency). Caption shows the orange dot. If Gambetta diacritics fail, swap to Sentient (same Fontshare download flow, adjust font file names in layout.tsx) before proceeding.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: gallery foundation - tokens, Gambetta, demolition of canvas design"
```

---

### Task 2: Content & works data

**Files:**
- Create: `lib/works.ts`
- Modify: `lib/content.ts` (full rewrite)

**Interfaces:**
- Produces (works.ts): `type WorkId = "restauracja" | "barber" | "kwiaciarnia"`, `type Work = { id: WorkId; anchor: string; nr: string; name: string; sector: string; district: string; note: string }`, `const WORKS: Work[]`.
- Produces (content.ts): `COVER`, `EXHIBITION`, `CURATOR`, `PLACARD`, `PROCESS`, `GUESTBOOK` — exact shapes below. Later tasks import these names verbatim.

- [ ] **Step 1: Write `lib/works.ts`**

```ts
// ─────────────────────────────────────────────────────────────
//  The exhibition. Each entry is one framed work; the matching
//  mockup component is registered in components/Exhibition.tsx.
// ─────────────────────────────────────────────────────────────

export type WorkId = "restauracja" | "barber" | "kwiaciarnia";

export type Work = {
  id: WorkId;
  /** Section anchor + ProgressLine tick target. */
  anchor: string;
  nr: string;
  name: string;
  sector: string;
  district: string;
  /** One-line curatorial note under the caption. */
  note: string;
};

export const WORKS: Work[] = [
  {
    id: "restauracja",
    anchor: "praca-01",
    nr: "01",
    name: "Złoty Widelec",
    sector: "Restauracja",
    district: "Śródmieście",
    note: "Ciepło, apetyt i rezerwacja w zasięgu kciuka.",
  },
  {
    id: "barber",
    anchor: "praca-02",
    nr: "02",
    name: "Antracyt",
    sector: "Barbershop",
    district: "Mokotów",
    note: "Ostry kontrast, cennik bez owijania, wizyta w dwa kliknięcia.",
  },
  {
    id: "kwiaciarnia",
    anchor: "praca-03",
    nr: "03",
    name: "Pracownia Mila",
    sector: "Kwiaciarnia",
    district: "Żoliborz",
    note: "Sklep od pierwszego spojrzenia: bukiety, ceny, dostawa tego samego dnia.",
  },
];
```

- [ ] **Step 2: Write `lib/content.ts`**

```ts
// ─────────────────────────────────────────────────────────────
//  All page copy for „Galeria Sitelab". Polish, editorial tone.
// ─────────────────────────────────────────────────────────────

export const COVER = {
  kicker: "Wystawa stała · Warszawa 2026",
  /** Headline lines; `accent` overlaps the block as the oversized italic moment. */
  lines: ["Strony dla firm,", "które ogląda się"],
  accent: "jak sztukę",
  sub: "Sitelab. Pracownia stron internetowych dla lokalnych firm w Warszawie.",
  hint: "Przewiń, żeby zwiedzać",
};

export const EXHIBITION = {
  caption: "Wystawa",
  title: "Trzy prace",
  /** Honest closing wall text. */
  note: "Prace na tej wystawie to projekty koncepcyjne. Twoja strona powstaje tak samo: od charakteru Twojej firmy, nie od szablonu.",
};

export const CURATOR = {
  caption: "Nota kuratorska",
  title: "O podejściu",
  paragraphs: [
    "Dobra strona lokalnej firmy nie musi krzyczeć. Ma działać jak dobrze urządzone wnętrze: od progu wiadomo, gdzie jesteś, co dostaniesz i dlaczego warto zostać.",
    "Każdy projekt zaczynam od tego, co odróżnia Twoją firmę od sąsiada z tej samej ulicy. Potem dobieram typografię, kolor i rytm, aż strona wygląda jak Wasza, a nie jak szablon.",
  ],
};

export const PLACARD = {
  rows: [
    { label: "Projekt koncepcyjny", value: "darmowy, w 24 h" },
    { label: "Strona gotowa do publikacji", value: "399 zł" },
    { label: "Realizacja", value: "72 h" },
  ],
  note: "Cena stała. Na etapie projektu bez żadnych zobowiązań.",
};

export const PROCESS = {
  caption: "Proces",
  title: "Od rozmowy do wernisażu",
  steps: [
    {
      nr: "01",
      title: "Rozmowa",
      desc: "Piszesz do mnie na Instagramie. Kilka pytań o firmę, klientów i to, co strona ma robić.",
    },
    {
      nr: "02",
      title: "Projekt",
      desc: "W 24 godziny dostajesz darmowy projekt strony głównej. Oceniasz bez zobowiązań.",
    },
    {
      nr: "03",
      title: "Realizacja",
      desc: "Jeśli projekt się podoba, w 72 godziny powstaje całość: treści, wersja mobilna, szybkość.",
    },
    {
      nr: "04",
      title: "Publikacja",
      desc: "Strona trafia na Twoją domenę. Pomagam z Google i całą stroną techniczną.",
    },
  ],
};

export const GUESTBOOK = {
  caption: "Księga gości",
  title: "Zostaw wpis",
  sub: "Otworzę Twój czat na Instagramie z gotową wiadomością. Projekt strony głównej wraca do Ciebie w 24 godziny, za darmo.",
  fieldBusiness: "Nazwa Twojej firmy",
  fieldBusinessPlaceholder: "np. Barber Mokotów",
  fieldBusinessError: "Wpisz nazwę firmy, żebym wiedział, dla kogo projektuję.",
  fieldLink: "Instagram lub strona",
  fieldLinkOptional: "(opcjonalnie)",
  fieldLinkPlaceholder: "@twojafirma lub twojafirma.pl",
  submit: "Odbierz darmowy projekt",
  privacy: "Zero spamu. Jedna wiadomość, konkretna propozycja.",
  sentTitle: (business: string) => `Świetnie, ${business}!`,
  sentCopied:
    "Skopiowałem gotową wiadomość i otwieram Twój czat na Instagramie. Wklej ją i wyślij, a projekt wróci w 24 h.",
  sentManual:
    "Otwieram Twój czat na Instagramie. Skopiuj wiadomość poniżej i wyślij, a projekt wróci w 24 h.",
  copy: "Kopiuj wiadomość",
  copied: "Skopiowano",
  openInstagram: "Otwórz Instagram",
  preferEmail: "Wolisz e-mail?",
};
```

- [ ] **Step 3: Build**

Run: `npm run build` — Expected: `Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add lib/works.ts lib/content.ts && git commit -m "feat: gallery copy and exhibition data"
```

---

### Task 3: Logo, Header, Footer

**Files:**
- Create: `components/Logo.tsx`, `components/Header.tsx`, `components/Footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CONTACT`, `igLink`, `mailLink` from `lib/config.ts`.
- Produces: `Logo({ tone?: "ink" | "white" })`, `Header()`, `Footer()`.

- [ ] **Step 1: Write `components/Logo.tsx`**

```tsx
/**
 * Text recreation of the wordmark (lowercase sans + orange dot).
 * The supplied asset is white-on-transparent, so on ivory we draw
 * the same letterforms in ink; the footer uses the white tone.
 */
export function Logo({ tone = "ink" }: { tone?: "ink" | "white" }) {
  return (
    <span
      className={`select-none font-sans text-[1.3rem] font-bold lowercase leading-none tracking-tight ${
        tone === "ink" ? "text-ink" : "text-white"
      }`}
    >
      sitelab<span className="text-accent">.</span>
    </span>
  );
}
```

- [ ] **Step 2: Write `components/Header.tsx`**

Absolute (not fixed) so the ink wordmark never sits over the dark footer; the ProgressLine handles wayfinding.

```tsx
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="gallery-frame flex min-h-[44px] items-center justify-between py-6">
        <a href="#" aria-label="Sitelab — do góry" className="inline-flex min-h-[44px] items-center">
          <Logo />
        </a>
        <a href="#ksiega-gosci" className="link-under inline-flex min-h-[44px] items-center text-sm font-medium">
          Księga gości
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Write `components/Footer.tsx`**

```tsx
import { CONTACT, igLink, mailLink } from "@/lib/config";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-white">
      <div className="gallery-frame flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Logo tone="white" />
          <p className="caption mt-3 !text-white/50">Pracownia stron internetowych · {CONTACT.city}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/80 sm:items-end">
          <a href={igLink} target="_blank" rel="noopener noreferrer" className="link-under inline-flex min-h-[44px] items-center">
            @{CONTACT.instagram}
          </a>
          <a href={mailLink} className="link-under inline-flex min-h-[44px] items-center">
            {CONTACT.email}
          </a>
          <p className="mt-2 text-xs text-white/40">© 2026 Sitelab — Warszawa</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx`**

```tsx
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="gallery-frame flex min-h-screen flex-col justify-center gap-6">
        <p className="caption caption-dot">Wystawa stała · Warszawa 2026</p>
        <h1 className="font-display text-6xl font-medium">
          Zażółć gęślą jaźń — <em>zażółć gęślą jaźń</em>
        </h1>
        <span className="rule" />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Build + browser verify**

`npm run build` → `Compiled successfully`. Browser at 375/1280: ink wordmark with orange dot top-left; dark footer with white wordmark, IG handle and email links underline in accent on hover; all tap areas ≥44px.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: gallery logo, header, footer"
```

---

### Task 4: GSAP core, WallLabel, ProgressLine

**Files:**
- Create: `lib/gsap.ts`, `components/WallLabel.tsx`, `components/ProgressLine.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `import { gsap, ScrollTrigger } from "@/lib/gsap"` (registered, SSR-safe); `WallLabel({ caption, title, id? })` — scrubbed rising title + self-drawing rule, used by every section; `ProgressLine()` — reads all `[data-gallery-stop]` elements (attribute value = visible label) and builds ticks.
- Later tasks mark sections with `id` + `data-gallery-stop="Label"`.

- [ ] **Step 1: Write `lib/gsap.ts`**

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, client-side only (module is imported by client components).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Write `components/WallLabel.tsx`**

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Section signage: caption (signed with the dot), rising serif title,
 * self-drawing hairline. Rise + draw scrub with scroll; reduced-motion
 * users see the static composed state (initial states set in JS only).
 */
export function WallLabel({ caption, title, id }: { caption: string; title: string; id?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current!;
      const titleEl = root.querySelector("[data-rise]");
      const ruleEl = root.querySelector("[data-rule]");
      gsap.fromTo(
        titleEl,
        { yPercent: 70, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 88%", end: "top 55%", scrub: true },
        }
      );
      gsap.fromTo(
        ruleEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 85%", end: "top 50%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} id={id} className="scroll-mt-24">
      <p className="caption caption-dot">{caption}</p>
      <div className="overflow-hidden pb-1">
        <h2 data-rise className="mt-3 font-display text-4xl font-medium tracking-[-0.01em] sm:text-5xl">
          {title}
        </h2>
      </div>
      <span data-rule className="rule mt-6" />
    </div>
  );
}
```

- [ ] **Step 3: Write `components/ProgressLine.tsx`**

```tsx
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Stop = { id: string; label: string; ratio: number };

/**
 * The exhibition wayfinder: a 1px line at the right viewport edge with
 * ticks for each [data-gallery-stop] section and the orange logo dot as
 * the "you are here" marker. The dot mirrors scroll position 1:1 (no
 * smoothing), so it is position feedback, not decoration — it also runs
 * under reduced motion, matching the spec's static-progress allowance.
 */
export function ProgressLine() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const [stops, setStops] = useState<Stop[]>([]);

  useLayoutEffect(() => {
    const dot = dotRef.current!;
    const setY = gsap.quickSetter(dot, "top", "%");

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const found = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-stop]")).map((el) => ({
        id: el.id,
        label: el.dataset.galleryStop ?? el.id,
        ratio: Math.min(1, Math.max(0, el.offsetTop / Math.max(1, max))),
      }));
      setStops(found);
    };

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => setY(self.progress * 100),
    });
    measure();
    ScrollTrigger.addEventListener("refreshInit", measure);
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", measure);
      st.kill();
    };
  }, []);

  return (
    <nav
      aria-label="Postęp zwiedzania"
      className="fixed right-3 top-1/2 z-40 h-[38vh] -translate-y-1/2 sm:right-6"
    >
      <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-line" />
      {stops.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          title={s.label}
          aria-label={s.label}
          className="group absolute -right-[5px] grid h-[11px] w-[11px] place-items-center"
          style={{ top: `${s.ratio * 100}%` }}
        >
          <span className="h-[5px] w-[5px] rounded-full bg-stone transition-colors group-hover:bg-accent" />
        </a>
      ))}
      <span
        ref={dotRef}
        aria-hidden
        className="absolute -right-[4px] top-0 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-accent"
      />
    </nav>
  );
}
```

- [ ] **Step 4: Mount in `app/page.tsx`** — add `<ProgressLine />` after `<Header />`, and give the stub `<main>` two tall test sections with `id` + `data-gallery-stop` to verify ticks (removed in later tasks as real sections land):

```tsx
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProgressLine } from "@/components/ProgressLine";
import { WallLabel } from "@/components/WallLabel";

export default function Home() {
  return (
    <>
      <Header />
      <ProgressLine />
      <main>
        <section id="test-a" data-gallery-stop="Test A" className="gallery-frame flex min-h-screen flex-col justify-center">
          <WallLabel caption="Sekcja testowa" title="Zażółć gęślą jaźń" />
        </section>
        <section id="test-b" data-gallery-stop="Test B" className="gallery-frame min-h-screen pt-24">
          <WallLabel caption="Druga sekcja" title="Rytm i linia" />
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Build + browser verify**

`npm run build` → `Compiled successfully`. Browser: orange dot travels down the right-edge line exactly with scroll; two stone ticks sit at section positions and scroll on click; WallLabel titles rise and rules draw as they enter, scrubbing back when you scroll up. Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering): titles/rules fully visible with no animation; dot still reflects position.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: gsap core, wall labels, progress line with traveling dot"
```

---

### Task 5: Cover

**Files:**
- Create: `components/Cover.tsx`
- Modify: `app/page.tsx` (replace test section A with Cover)

**Interfaces:**
- Consumes: `COVER` from `lib/content.ts`.
- Produces: `Cover()` — section `id="okladka"`, `data-gallery-stop="Okładka"`.

- [ ] **Step 1: Write `components/Cover.tsx`**

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { COVER } from "@/lib/content";
import { gsap } from "@/lib/gsap";

/**
 * The exhibition cover. The type is the art: two rising serif lines and
 * the oversized italic accent that overlaps the block (the page's single
 * breath of drama). Entrance plays once on load; scrolling gently lifts
 * the whole composition away (scrubbed), like stepping past the title wall.
 */
export function Cover() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current!;
      const lines = root.querySelectorAll("[data-cover-line]");
      const meta = root.querySelectorAll("[data-cover-meta]");

      gsap.timeline({ defaults: { ease: "expo.out" } })
        .fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.15)
        .fromTo(meta, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.55);

      gsap.to(root.querySelector("[data-cover-block]"), {
        yPercent: -8,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom 35%", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="okladka"
      data-gallery-stop="Okładka"
      className="relative flex min-h-[92svh] items-center"
    >
      <div className="gallery-frame" data-cover-block>
        <p data-cover-meta className="caption caption-dot">
          {COVER.kicker}
        </p>

        <h1 className="mt-8 font-display font-medium leading-[1.04] tracking-[-0.015em] text-[clamp(2.6rem,9.5vw,7rem)]">
          {COVER.lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-cover-line className="block">
                {line}
              </span>
            </span>
          ))}
          {/* The overlapping-type moment: oversized italic crossing the block. */}
          <span className="block overflow-visible">
            <span
              data-cover-line
              className="relative -mt-[0.18em] block font-display italic text-[1.28em] leading-[1] text-ink sm:-ml-[0.06em]"
            >
              {COVER.accent}
              <span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        <p data-cover-meta className="mt-10 max-w-prose-narrow text-base leading-relaxed text-stone sm:text-lg">
          {COVER.sub}
        </p>
      </div>

      <p
        data-cover-meta
        className="caption absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
        aria-hidden
      >
        {COVER.hint} ↓
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/page.tsx`** — replace test section A with `<Cover />` (keep test section B until Exhibition lands):

```tsx
import { Cover } from "@/components/Cover";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProgressLine } from "@/components/ProgressLine";
import { WallLabel } from "@/components/WallLabel";

export default function Home() {
  return (
    <>
      <Header />
      <ProgressLine />
      <main>
        <Cover />
        <section id="test-b" data-gallery-stop="Test B" className="gallery-frame min-h-screen pt-24">
          <WallLabel caption="Druga sekcja" title="Rytm i linia" />
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Build + browser verify**

`npm run build` → `Compiled successfully`. Browser at 375 + 1280: lines rise from behind baselines on load, italic „jak sztukę." overlaps the block above it, kicker/sub/hint fade in, cover lifts + fades as you scroll away, headline never wraps mid-word at 375. Reduced-motion: everything visible immediately, no movement. No horizontal scrollbar at any width.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: cover with rising headline and overlapping italic"
```

---

### Task 6: Exhibition & Work frame (placeholder artboards)

**Files:**
- Create: `components/Work.tsx`, `components/Exhibition.tsx`, `components/mockups/PlaceholderMockup.tsx`
- Modify: `app/page.tsx` (replace test section B with Exhibition)

**Interfaces:**
- Consumes: `WORKS`, `Work`, `WorkId` from `lib/works.ts`; `EXHIBITION` from `lib/content.ts`; `WallLabel`.
- Produces: `WorkFrame({ work, desktop, mobile })` (client) — pinned scrubbed unveil; `Exhibition()` (server) — registry `MOCKUPS: Record<WorkId, { desktop: ReactNode; mobile: ReactNode }>`; mockup components receive `variant: "desktop" | "mobile"` — type `MockupVariant` exported from `PlaceholderMockup.tsx` and reused by Tasks 7–9.

- [ ] **Step 1: Write `components/mockups/PlaceholderMockup.tsx`**

```tsx
export type MockupVariant = "desktop" | "mobile";

/** Temporary artboard content; replaced per-work in the mockup tasks. */
export function PlaceholderMockup({ variant, name }: { variant: MockupVariant; name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <p className="caption">
        {name} · {variant}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/Work.tsx`**

```tsx
"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import type { Work } from "@/lib/works";
import { gsap } from "@/lib/gsap";

/**
 * One exhibited work: pinned viewing moment. While pinned, the frame
 * unveils via a scrubbed clip-path wipe (cloth off the artwork) and
 * settles 0.97→1; the caption rises a beat later. Pin distance is
 * halved on mobile. Reduced motion: static, fully visible.
 */
export function WorkFrame({ work, desktop, mobile }: { work: Work; desktop: ReactNode; mobile: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef);
    const build = (pinDistance: string) => () => {
      const root = rootRef.current!;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${pinDistance}`,
          pin: true,
          scrub: true,
        },
      });
      tl.fromTo(
        root.querySelector("[data-frame]"),
        { clipPath: "inset(0% 100% 0% 0%)", scale: 0.97 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none", duration: 0.75 }
      ).fromTo(
        root.querySelector("[data-work-caption]"),
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: "none", duration: 0.25 },
        0.65
      );
    };
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", build("80%"));
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", build("40%"));
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={work.anchor}
      data-gallery-stop={`Nr ${work.nr} — ${work.name}`}
      className="relative flex min-h-[100svh] items-center overflow-hidden py-16"
    >
      {/* Huge catalogue number on the wall behind the work. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-8 select-none font-display text-[clamp(6rem,22vw,17rem)] font-medium leading-none text-ink/[0.05]"
      >
        {work.nr}
      </span>

      <div className="gallery-frame relative">
        <div data-frame className="relative md:pr-[22%]">
          {/* Desktop artboard */}
          <div className="aspect-[16/10] w-full overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(20,19,17,0.04),0_24px_60px_-30px_rgba(20,19,17,0.25)]">
            {desktop}
          </div>
          {/* Mobile artboard, overlapping the desktop frame on md+ */}
          <div className="mx-auto -mt-10 w-[46%] max-w-[220px] overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(20,19,17,0.04),0_24px_60px_-30px_rgba(20,19,17,0.3)] md:absolute md:-bottom-10 md:right-0 md:mx-0 md:mt-0 md:w-[26%]">
            <div className="aspect-[9/19] w-full overflow-hidden">{mobile}</div>
          </div>
        </div>

        <figcaption data-work-caption className="mt-12 md:mt-16 md:max-w-[70%]">
          <p className="caption">
            Nr {work.nr} — <span className="text-ink">„{work.name}"</span> · {work.sector} · {work.district}
          </p>
          <p className="mt-2 max-w-prose-narrow text-sm leading-relaxed text-stone">{work.note}</p>
        </figcaption>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `components/Exhibition.tsx`**

```tsx
import type { ReactNode } from "react";
import { EXHIBITION } from "@/lib/content";
import { WORKS, type WorkId } from "@/lib/works";
import { PlaceholderMockup } from "./mockups/PlaceholderMockup";
import { WallLabel } from "./WallLabel";
import { WorkFrame } from "./Work";

/** Registry: each work's artboard content. Replaced per-work in Tasks 7–9. */
const MOCKUPS: Record<WorkId, { desktop: ReactNode; mobile: ReactNode }> = {
  restauracja: {
    desktop: <PlaceholderMockup variant="desktop" name="Złoty Widelec" />,
    mobile: <PlaceholderMockup variant="mobile" name="Złoty Widelec" />,
  },
  barber: {
    desktop: <PlaceholderMockup variant="desktop" name="Antracyt" />,
    mobile: <PlaceholderMockup variant="mobile" name="Antracyt" />,
  },
  kwiaciarnia: {
    desktop: <PlaceholderMockup variant="desktop" name="Pracownia Mila" />,
    mobile: <PlaceholderMockup variant="mobile" name="Pracownia Mila" />,
  },
};

export function Exhibition() {
  return (
    <>
      <div className="gallery-frame pt-[18vh] sm:pt-[24vh]">
        <WallLabel caption={EXHIBITION.caption} title={EXHIBITION.title} id="wystawa" />
      </div>

      {WORKS.map((work) => (
        <WorkFrame key={work.id} work={work} desktop={MOCKUPS[work.id].desktop} mobile={MOCKUPS[work.id].mobile} />
      ))}

      <div className="gallery-frame">
        <p className="mx-auto max-w-prose-narrow text-center text-sm leading-relaxed text-stone">
          {EXHIBITION.note}
        </p>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx`** — replace test section B with `<Exhibition />` and drop the now-unused `WallLabel` import:

```tsx
import { Cover } from "@/components/Cover";
import { Exhibition } from "@/components/Exhibition";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProgressLine } from "@/components/ProgressLine";

export default function Home() {
  return (
    <>
      <Header />
      <ProgressLine />
      <main>
        <Cover />
        <Exhibition />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Build + browser verify**

`npm run build` → `Compiled successfully`. Browser 1280: each work pins at top, wipes open left→right while settling to full scale, caption rises near the end, then releases; big ghost numbers 01/02/03 behind; mobile artboard overlaps desktop frame bottom-right. Browser 375: artboards stacked (mobile frame centered below), pin noticeably shorter. ProgressLine now shows ticks for Okładka + 3 works. Reduced-motion: all three works fully visible, no pinning (page scrolls plainly).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: exhibition frames with pinned scrubbed unveils"
```

---

### Task 7: Restaurant mockup — „Złoty Widelec"

**Files:**
- Create: `lib/mockup-fonts.ts`, `components/mockups/RestaurantMockup.tsx`
- Modify: `components/Exhibition.tsx` (registry entry)

**Interfaces:**
- Consumes: `MockupVariant` from `./PlaceholderMockup`.
- Produces (mockup-fonts.ts): `playfair`, `oswald`, `lora` — `next/font/google` instances with `.className`; Tasks 8–9 reuse `oswald`/`lora`.
- Produces: `RestaurantMockup({ variant }: { variant: MockupVariant })`.

- [ ] **Step 1: Write `lib/mockup-fonts.ts`**

```ts
// ─────────────────────────────────────────────────────────────
//  Accent fonts for the exhibited works only (next/font/google
//  self-hosts at build time — no runtime requests). The gallery
//  shell itself uses only Gambetta + Satoshi.
// ─────────────────────────────────────────────────────────────
import { Lora, Oswald, Playfair_Display } from "next/font/google";

/** Złoty Widelec — warm, appetizing serif. */
export const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

/** Antracyt — bold condensed grotesque. */
export const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

/** Pracownia Mila — soft literary serif. */
export const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
```

- [ ] **Step 2: Write `components/mockups/RestaurantMockup.tsx`**

Scoped palette: green `#1E3A2F`, cream `#F2EAD9`, gold `#C7A26B`. Must read "restaurant site" at a glance: nav, appetizing hero, menu rows with prices, reservation CTA.

```tsx
import { playfair } from "@/lib/mockup-fonts";
import type { MockupVariant } from "./PlaceholderMockup";

const MENU = [
  { name: "Tatar z polędwicy", price: "48 zł" },
  { name: "Pierogi z kaczką", price: "39 zł" },
  { name: "Sandacz na maśle", price: "62 zł" },
];

/** Concept work Nr 01 — warm restaurant site, green/cream/gold. */
export function RestaurantMockup({ variant }: { variant: MockupVariant }) {
  const mobile = variant === "mobile";

  return (
    <div className={`flex h-full w-full flex-col bg-[#F2EAD9] text-[#1E3A2F] ${playfair.className}`}>
      {/* Nav */}
      <div className={`flex items-center justify-between border-b border-[#1E3A2F]/15 ${mobile ? "px-3 py-2" : "px-6 py-3"}`}>
        <span className={`font-semibold ${mobile ? "text-[9px]" : "text-sm"}`}>Złoty Widelec</span>
        {!mobile && (
          <span className="flex gap-4 text-[10px] uppercase tracking-[0.14em] opacity-70">
            <span>Menu</span>
            <span>Rezerwacje</span>
            <span>Kontakt</span>
          </span>
        )}
        <span className={`bg-[#1E3A2F] text-[#F2EAD9] ${mobile ? "px-2 py-1 text-[7px]" : "px-3 py-1.5 text-[10px]"}`}>
          Zarezerwuj stolik
        </span>
      </div>

      {/* Hero: dish "photo" as CSS plate + claim */}
      <div className={`flex flex-1 items-center gap-4 ${mobile ? "flex-col px-3 pt-4 text-center" : "px-6"}`}>
        <div className={mobile ? "" : "flex-1"}>
          <p className={`uppercase tracking-[0.2em] text-[#C7A26B] ${mobile ? "text-[7px]" : "text-[10px]"}`}>
            Kuchnia polska · Śródmieście
          </p>
          <p className={`mt-1 font-semibold leading-tight ${mobile ? "text-[13px]" : "text-2xl"}`}>
            Kolacja, którą się pamięta.
          </p>
          <p className={`mt-1 opacity-70 ${mobile ? "text-[7px]" : "text-[11px]"}`}>
            Sezonowe menu, lokalni dostawcy, stolik w 30 sekund.
          </p>
        </div>
        <div
          aria-hidden
          className={`shrink-0 rounded-full border-[6px] border-white shadow-inner ${mobile ? "h-16 w-16" : "h-32 w-32"}`}
          style={{
            background:
              "radial-gradient(circle at 38% 35%, #C7A26B 0 28%, #7A4A2B 30% 55%, #1E3A2F 57% 100%)",
          }}
        />
      </div>

      {/* Menu rows with prices */}
      <div className={`${mobile ? "px-3 pb-3 pt-2" : "px-6 pb-5 pt-3"}`}>
        {MENU.slice(0, mobile ? 2 : 3).map((item) => (
          <div
            key={item.name}
            className={`flex items-baseline justify-between border-t border-dotted border-[#1E3A2F]/25 ${mobile ? "py-1 text-[8px]" : "py-1.5 text-xs"}`}
          >
            <span>{item.name}</span>
            <span className="font-semibold text-[#C7A26B]">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update registry in `components/Exhibition.tsx`**

```tsx
import { RestaurantMockup } from "./mockups/RestaurantMockup";
// ...
  restauracja: {
    desktop: <RestaurantMockup variant="desktop" />,
    mobile: <RestaurantMockup variant="mobile" />,
  },
```

- [ ] **Step 4: Build + browser verify**

`npm run build` → `Compiled successfully`. Browser: work Nr 01 instantly reads as a restaurant site (nav + reserve button, dish plate, menu with zł prices) in both artboards; colors are its own (green/cream/gold), not gallery colors; text legible in both artboard sizes at 375 and 1280.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Zloty Widelec restaurant mockup"
```

---

### Task 8: Barber mockup — „Antracyt"

**Files:**
- Create: `components/mockups/BarberMockup.tsx`
- Modify: `components/Exhibition.tsx` (registry entry)

**Interfaces:**
- Consumes: `oswald` from `lib/mockup-fonts.ts`, `MockupVariant`.
- Produces: `BarberMockup({ variant })`.

- [ ] **Step 1: Write `components/mockups/BarberMockup.tsx`**

Scoped palette: black `#121212`, bone `#EDEAE4`, gold `#C8A24B`. Must read "barbershop": bold condensed type, price list rows, booking CTA, hours.

```tsx
import { oswald } from "@/lib/mockup-fonts";
import type { MockupVariant } from "./PlaceholderMockup";

const PRICES = [
  { name: "Strzyżenie klasyczne", price: "70 zł" },
  { name: "Broda + kontur", price: "50 zł" },
  { name: "Combo", price: "100 zł" },
];

/** Concept work Nr 02 — sharp barbershop site, black/bone/gold. */
export function BarberMockup({ variant }: { variant: MockupVariant }) {
  const mobile = variant === "mobile";

  return (
    <div className={`flex h-full w-full flex-col bg-[#121212] text-[#EDEAE4] ${oswald.className}`}>
      {/* Nav */}
      <div className={`flex items-center justify-between border-b border-[#EDEAE4]/15 ${mobile ? "px-3 py-2" : "px-6 py-3"}`}>
        <span className={`font-semibold uppercase tracking-[0.2em] ${mobile ? "text-[8px]" : "text-xs"}`}>
          Antracyt
        </span>
        <span className={`border border-[#C8A24B] uppercase tracking-[0.12em] text-[#C8A24B] ${mobile ? "px-2 py-0.5 text-[7px]" : "px-3 py-1 text-[10px]"}`}>
          Umów wizytę
        </span>
      </div>

      {/* Hero */}
      <div className={`flex flex-1 flex-col justify-center ${mobile ? "px-3" : "px-6"}`}>
        <p className={`uppercase tracking-[0.3em] text-[#C8A24B] ${mobile ? "text-[6px]" : "text-[10px]"}`}>
          Barbershop · Mokotów
        </p>
        <p className={`mt-1 font-semibold uppercase leading-[0.95] ${mobile ? "text-[17px]" : "text-4xl"}`}>
          Ostro.
          <br />
          Bez spóźnień.
        </p>
        <p className={`mt-2 uppercase tracking-[0.14em] opacity-60 ${mobile ? "text-[6px]" : "text-[9px]"}`}>
          wt–sob · 10:00–20:00 · Puławska 12
        </p>
      </div>

      {/* Price list */}
      <div className={`${mobile ? "px-3 pb-3" : "px-6 pb-5"}`}>
        {PRICES.slice(0, mobile ? 2 : 3).map((row) => (
          <div
            key={row.name}
            className={`flex items-baseline justify-between border-t border-[#EDEAE4]/15 uppercase tracking-[0.08em] ${mobile ? "py-1 text-[7px]" : "py-1.5 text-[11px]"}`}
          >
            <span>{row.name}</span>
            <span className="font-semibold text-[#C8A24B]">{row.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update registry in `components/Exhibition.tsx`**

```tsx
import { BarberMockup } from "./mockups/BarberMockup";
// ...
  barber: {
    desktop: <BarberMockup variant="desktop" />,
    mobile: <BarberMockup variant="mobile" />,
  },
```

- [ ] **Step 3: Build + browser verify**

`npm run build` → `Compiled successfully`. Browser: Nr 02 reads "barbershop" at a glance (black/gold, condensed caps, price list in zł, booking CTA, hours); strong contrast against the ivory wall.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Antracyt barbershop mockup"
```

---

### Task 9: Florist mockup — „Pracownia Mila"

**Files:**
- Create: `components/mockups/FloristMockup.tsx`
- Modify: `components/Exhibition.tsx` (registry entry; remove `PlaceholderMockup` import — keep the file for its `MockupVariant` type export)

**Interfaces:**
- Consumes: `lora` from `lib/mockup-fonts.ts`, `MockupVariant`.
- Produces: `FloristMockup({ variant })`.

- [ ] **Step 1: Write `components/mockups/FloristMockup.tsx`**

Scoped palette: blush `#F6EDE8`, sage `#5F7161`, rose `#C98A7D`. Glance test (shop, not blog): product grid with names + prices + same-day delivery banner.

```tsx
import { lora } from "@/lib/mockup-fonts";
import type { MockupVariant } from "./PlaceholderMockup";

const PRODUCTS = [
  { name: "Bukiet „Mgła”", price: "120 zł", bg: "radial-gradient(circle at 45% 40%, #C98A7D 0 35%, #E8C4B8 37% 65%, #F6EDE8 67%)" },
  { name: "Bukiet „Łąka”", price: "95 zł", bg: "radial-gradient(circle at 55% 45%, #5F7161 0 30%, #A9BCA0 32% 62%, #F6EDE8 64%)" },
  { name: "Susz „Len”", price: "75 zł", bg: "radial-gradient(circle at 50% 50%, #C7A26B 0 28%, #E4D3B4 30% 60%, #F6EDE8 62%)" },
];

/** Concept work Nr 03 — soft florist shop, blush/sage/rose. */
export function FloristMockup({ variant }: { variant: MockupVariant }) {
  const mobile = variant === "mobile";

  return (
    <div className={`flex h-full w-full flex-col bg-[#F6EDE8] text-[#4A4441] ${lora.className}`}>
      {/* Delivery banner — the shop signal. */}
      <div className={`bg-[#5F7161] text-center text-[#F6EDE8] ${mobile ? "py-1 text-[6px]" : "py-1.5 text-[10px]"}`}>
        Dostawa po Warszawie tego samego dnia
      </div>

      {/* Nav */}
      <div className={`flex items-center justify-between ${mobile ? "px-3 py-1.5" : "px-6 py-3"}`}>
        <span className={`italic ${mobile ? "text-[9px]" : "text-sm"}`}>Pracownia Mila</span>
        <span className={`rounded-full bg-[#C98A7D] text-white ${mobile ? "px-2 py-0.5 text-[7px]" : "px-3 py-1 text-[10px]"}`}>
          Zamów bukiet
        </span>
      </div>

      {/* Product grid: names + prices visible = shop at a glance. */}
      <div className={`grid flex-1 gap-2 ${mobile ? "grid-cols-2 px-3 pb-2" : "grid-cols-3 px-6 pb-3"}`}>
        {PRODUCTS.slice(0, mobile ? 2 : 3).map((p) => (
          <div key={p.name} className="flex flex-col">
            <div aria-hidden className="w-full flex-1 rounded-sm" style={{ background: p.bg, minHeight: mobile ? 44 : 90 }} />
            <p className={`mt-1 ${mobile ? "text-[7px]" : "text-[11px]"}`}>{p.name}</p>
            <p className={`font-medium text-[#5F7161] ${mobile ? "text-[7px]" : "text-[11px]"}`}>{p.price}</p>
          </div>
        ))}
      </div>

      {/* Footer strip */}
      <div className={`flex items-center justify-between border-t border-[#4A4441]/10 italic opacity-70 ${mobile ? "px-3 py-1 text-[6px]" : "px-6 py-2 text-[10px]"}`}>
        <span>Żoliborz · pon–sob</span>
        <span>@pracownia.mila</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update registry in `components/Exhibition.tsx`**

```tsx
import { FloristMockup } from "./mockups/FloristMockup";
// ...
  kwiaciarnia: {
    desktop: <FloristMockup variant="desktop" />,
    mobile: <FloristMockup variant="mobile" />,
  },
```
Remove the `PlaceholderMockup` component import (type imports of `MockupVariant` stay in mockup files).

- [ ] **Step 3: Build + browser verify**

`npm run build` → `Compiled successfully`. Browser: Nr 03 passes the glance test — products with prices + delivery banner read "shop" within a second; soft palette clearly distinct from works 01/02. All three works now bespoke; no placeholder rendering anywhere.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Pracownia Mila florist mockup"
```

---

### Task 10: Curator note, placard, process

**Files:**
- Create: `components/Placard.tsx`, `components/CuratorNote.tsx`, `components/Process.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CURATOR`, `PLACARD`, `PROCESS` from `lib/content.ts`; `WallLabel`.
- Produces: `CuratorNote()` (includes `<Placard />`), `Process()` — sections `id="nota"` / `id="proces"` with `data-gallery-stop`.

- [ ] **Step 1: Write `components/Placard.tsx`**

```tsx
import { PLACARD } from "@/lib/content";

/** The offer as a museum placard: small, bordered, matter-of-fact. */
export function Placard() {
  return (
    <div className="max-w-md border border-line bg-white/60 p-7 sm:p-8">
      <dl>
        {PLACARD.rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-baseline justify-between gap-6 py-3 ${i > 0 ? "border-t border-line" : ""}`}
          >
            <dt className="text-sm text-stone">{row.label}</dt>
            <dd className="whitespace-nowrap font-display text-lg font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="caption mt-5 normal-case tracking-normal">{PLACARD.note}</p>
    </div>
  );
}
```

- [ ] **Step 2: Write `components/CuratorNote.tsx`**

```tsx
import { CURATOR } from "@/lib/content";
import { Placard } from "./Placard";
import { WallLabel } from "./WallLabel";

export function CuratorNote() {
  return (
    <section
      id="nota"
      data-gallery-stop="Nota kuratorska"
      className="gallery-frame pt-[22vh] sm:pt-[30vh]"
    >
      <WallLabel caption={CURATOR.caption} title={CURATOR.title} />
      <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div className="max-w-prose-narrow space-y-6 text-base leading-relaxed sm:text-lg">
          {CURATOR.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="md:justify-self-end">
          <Placard />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `components/Process.tsx`**

```tsx
import { PROCESS } from "@/lib/content";
import { WallLabel } from "./WallLabel";

/** Numbered catalogue entries. The animated rule lives in WallLabel; step separators stay static. */
export function Process() {
  return (
    <section
      id="proces"
      data-gallery-stop="Proces"
      className="gallery-frame pt-[22vh] sm:pt-[30vh]"
    >
      <WallLabel caption={PROCESS.caption} title={PROCESS.title} />
      <ol className="mt-10">
        {PROCESS.steps.map((step) => (
          <li key={step.nr} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[80px_200px_1fr] sm:gap-6 sm:py-8">
            <span className="font-display text-lg font-medium text-accent">{step.nr}</span>
            <h3 className="font-display text-xl font-medium">{step.title}</h3>
            <p className="max-w-prose-narrow text-base leading-relaxed text-stone">{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx`** — add after `<Exhibition />`:

```tsx
import { CuratorNote } from "@/components/CuratorNote";
import { Process } from "@/components/Process";
// ... inside <main>:
        <Cover />
        <Exhibition />
        <CuratorNote />
        <Process />
```

- [ ] **Step 5: Build + browser verify**

`npm run build` → `Compiled successfully`. Browser: curator wall text ≤65ch; placard shows „darmowy, w 24 h / 399 zł / 72 h" quietly (no button styling, no scarcity); process rows aligned on the 3-column grid at ≥640px, stacked at 375; ProgressLine gains Nota + Proces ticks; WallLabel rise/draw works on both new sections.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: curator note, offer placard, process catalogue"
```

---

### Task 11: Guest book (contact)

**Files:**
- Create: `components/GuestBook.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CONTACT`, `dmMessage`, `igDmLink`, `mailLink` from `lib/config.ts` (UNTOUCHED); `GUESTBOOK` from `lib/content.ts`; `Instagram`, `Check`, `ArrowRight` from `components/icons.tsx`; `WallLabel`.
- Produces: `GuestBook()` — section `id="ksiega-gosci"` (Header links here), `data-gallery-stop="Księga gości"`. DM logic identical to old FinalCta: validate name ≥2 chars → copy `dmMessage()` to clipboard → `window.open(igDmLink)` → success state.

- [ ] **Step 1: Write `components/GuestBook.tsx`**

```tsx
"use client";

import { useState } from "react";
import { CONTACT, dmMessage, igDmLink, mailLink } from "@/lib/config";
import { GUESTBOOK } from "@/lib/content";
import { ArrowRight, Check, Instagram } from "./icons";
import { WallLabel } from "./WallLabel";

/**
 * The gallery guest book = the IG-DM capture. Instagram can't pre-fill
 * a DM, so on submit we copy a ready message to the clipboard and open
 * the visitor's thread to paste. Logic ported 1:1 from the old FinalCta.
 */
export function GuestBook() {
  const [business, setBusiness] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = dmMessage(business.trim(), link.trim() || undefined);

  async function copyMessage(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (business.trim().length < 2) {
      setError(true);
      return;
    }
    setError(false);
    await copyMessage();
    window.open(igDmLink, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const inputClass = (invalid: boolean) =>
    `h-[52px] w-full border-0 border-b bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-stone/50 focus:border-accent ${
      invalid ? "border-red-700" : "border-ink/25"
    }`;

  return (
    <section
      id="ksiega-gosci"
      data-gallery-stop="Księga gości"
      className="gallery-frame pb-[16vh] pt-[22vh] sm:pt-[30vh]"
    >
      <WallLabel caption={GUESTBOOK.caption} title={GUESTBOOK.title} />

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <p className="max-w-prose-narrow text-base leading-relaxed text-stone sm:text-lg">{GUESTBOOK.sub}</p>

        <div>
          {!sent ? (
            <form onSubmit={handleSubmit} noValidate className="max-w-md">
              <label htmlFor="business" className="caption block">
                {GUESTBOOK.fieldBusiness} <span className="text-accent">*</span>
              </label>
              <input
                id="business"
                name="business"
                type="text"
                autoComplete="organization"
                value={business}
                onChange={(e) => {
                  setBusiness(e.target.value);
                  if (error) setError(false);
                }}
                placeholder={GUESTBOOK.fieldBusinessPlaceholder}
                aria-invalid={error}
                aria-describedby={error ? "business-error" : undefined}
                className={`mt-1 ${inputClass(error)}`}
              />
              {error && (
                <p id="business-error" role="alert" className="mt-2 text-sm text-red-700">
                  {GUESTBOOK.fieldBusinessError}
                </p>
              )}

              <label htmlFor="link" className="caption mt-8 block">
                {GUESTBOOK.fieldLink} <span className="normal-case tracking-normal text-stone">{GUESTBOOK.fieldLinkOptional}</span>
              </label>
              <input
                id="link"
                name="link"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder={GUESTBOOK.fieldLinkPlaceholder}
                className={`mt-1 ${inputClass(false)}`}
              />

              <button
                type="submit"
                className="mt-10 inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 bg-ink px-8 text-base font-medium text-ivory transition-colors hover:bg-black sm:w-auto"
              >
                {GUESTBOOK.submit}
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-stone">
                <Instagram className="h-4 w-4 text-accent" style={{ width: 16, height: 16 }} />
                {GUESTBOOK.privacy}
              </p>
            </form>
          ) : (
            <div className="max-w-md">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-accent text-accent">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium">{GUESTBOOK.sentTitle(business.trim())}</h3>
              <p className="mt-2 text-base leading-relaxed text-stone">
                {copied ? GUESTBOOK.sentCopied : GUESTBOOK.sentManual}
              </p>

              <div className="mt-5 border border-line bg-white/60 p-4">
                <p className="whitespace-pre-line text-sm">{message}</p>
                <button
                  type="button"
                  onClick={copyMessage}
                  className="link-under mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent"
                >
                  <Check className="h-4 w-4" style={{ width: 16, height: 16 }} />
                  {copied ? GUESTBOOK.copied : GUESTBOOK.copy}
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={igDmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-ink px-7 text-base font-medium text-ivory transition-colors hover:bg-black"
                >
                  <Instagram className="h-5 w-5" />
                  {GUESTBOOK.openInstagram}
                </a>
                <a
                  href={mailLink}
                  className="inline-flex min-h-[52px] items-center justify-center border border-ink/25 px-7 text-base font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  {GUESTBOOK.preferEmail}
                </a>
              </div>
              <p className="mt-4 text-xs text-stone">{CONTACT.email}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/page.tsx`** — final composition:

```tsx
import { Cover } from "@/components/Cover";
import { CuratorNote } from "@/components/CuratorNote";
import { Exhibition } from "@/components/Exhibition";
import { Footer } from "@/components/Footer";
import { GuestBook } from "@/components/GuestBook";
import { Header } from "@/components/Header";
import { Process } from "@/components/Process";
import { ProgressLine } from "@/components/ProgressLine";

export default function Home() {
  return (
    <>
      <Header />
      <ProgressLine />
      <main>
        <Cover />
        <Exhibition />
        <CuratorNote />
        <Process />
        <GuestBook />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Build + browser verify (full DM flow)**

`npm run build` → `Compiled successfully`. Browser: submit empty → Polish error under the name field; fill „Testowa Firma" + submit → success state shows, message preview contains „Firma: Testowa Firma", „Kopiuj wiadomość" toggles to „Skopiowano", a new tab targets `ig.me/m/warsaw.sitelab` (may be blocked headless — verify the window.open URL via console/network). Header „Księga gości" link scrolls to the section.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: guest book contact with IG DM flow"
```

---

### Task 12: Final audit & polish

**Files:**
- Modify: `components/icons.tsx` (trim), `README.md` (description paragraph), `package.json` (description)

**Interfaces:** none new.

- [ ] **Step 1: Trim dead code**

```bash
grep -rn "from \"./icons\"\|from \"@/components/icons\"" components app
```
Keep only icon components that appear in the grep results (expected: `ArrowRight`, `Check`, `Instagram`); delete the rest from `components/icons.tsx`. Then:

```bash
grep -rn "PlaceholderMockup" components app
```
Expected: only `MockupVariant` type imports. Delete the `PlaceholderMockup` component from the file, keep the exported `MockupVariant` type.

- [ ] **Step 2: Update descriptions**

`package.json` description: `"Galeria Sitelab — editorial gallery landing page for Sitelab, a Warsaw web design studio."` README: replace any "Live Design Canvas" description with two sentences describing the gallery concept and pointing at the spec path.

- [ ] **Step 3: Full verification pass**

1. `npm run build` → `Compiled successfully`, no type errors, no unused-import lint warnings.
2. Browser 375 (mobile): walk the whole page — cover entrance, three pinned unveils (short pins), placard, process, guest book flow, footer; no horizontal scroll anywhere; dot + ticks track all 7 stops (Okładka, 3 works, Nota, Proces, Księga gości).
3. Browser 1280: same walk; mobile artboards overlap desktop frames; ghost numbers visible.
4. Reduced-motion emulation: entire page static and complete; forms work.
5. Console: zero errors/warnings from GSAP (no duplicate registrations, no pin-spacer complaints).
6. Screenshot cover + one work at both widths as proof.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: trim dead code, update project descriptions"
```
