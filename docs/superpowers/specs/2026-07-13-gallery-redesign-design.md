# Galeria Sitelab — redesign getsitelab.pl

**Date:** 2026-07-13
**Status:** Approved direction, awaiting spec review
**Replaces:** the current "Live Design Canvas" design (dark ink/navy, blueprint grids, selection boxes, design-tool metaphor)

## 1. Goal

Rebuild the getsitelab.pl landing page so it feels like walking through a contemporary
art gallery / luxury fashion exhibition: minimal, editorial, typography-driven, huge
whitespace, refined scroll-driven animation. Every element curated, not commercial.
Mobile-first, excellent on desktop. Polish language throughout, same conversion goal
(Instagram DM via existing `lib/config.ts` logic), same stack (Next.js + Tailwind).

The current site reads as an AI/tech-startup page. That entire visual language goes away.

## 2. Concept

**„Galeria Sitelab"** — the site is a one-page exhibition of what Sitelab makes.
Scrolling is walking through the gallery. The shell is an editorial exhibition
catalogue (ivory walls, serif display type, museum captions). The exhibited works are
true-to-business mockups of fictional Warsaw businesses, each rendered in that
business's own aesthetic — the works bring the color, the gallery stays neutral.
Offer, process, and contact appear as quiet gallery apparatus: placards, wall text,
a guest book.

## 3. Page structure

Single page, in this order:

1. **Okładka (cover / hero).** Near-full-viewport. Enormous serif Polish headline
   about designing sites for Warsaw businesses, with one oversized overlapping-type
   moment (type crossing over type — the page's single breath of drama). Small caption
   „Wystawa stała — Warszawa 2026". Scroll hint. No mockup graphic: the type is the art.
2. **Wystawa (the works).** 3 exhibited works, each a full-width framed mockup of a
   fictional Warsaw business, shown in desktop + mobile variants, with a museum
   caption line: `Nr 01 — „Nazwa" · Branża · Dzielnica`. See §5.
3. **Nota kuratorska (about + offer).** Wall-text paragraph on the approach (short,
   editorial, honest). Below it, the offer as a gallery placard:
   „Projekt strony — 399 zł · Realizacja 72 h". Matter-of-fact, small, elegant.
   No scarcity counter, no feature checklists.
4. **Proces.** 3–4 numbered catalogue entries (krótko: rozmowa → projekt → realizacja
   → publikacja), typography only, connected by the walk-through motion.
5. **Księga gości (contact).** The Instagram DM flow styled as a guest-book
   invitation. Reuses `dmMessage()` / copy-to-clipboard / `igDmLink` from
   `lib/config.ts` unchanged. Email as secondary line.
6. **Stopka.** Dark ink colophon strip — the one dark surface on the page. White
   original logo lives here. Minimal: brand, IG handle, email, rok.

**Removed entirely:** sticky MobileCtaBar, before/after CompareSlider, hypothetical
case-study cards, blueprint grids, selection-box motif, cursor animation, flame CTAs
repeated through the page. One primary contact invitation (guest book) plus a small
quiet header link.

## 4. Visual system

- **Walls:** ivory `#F7F5F0`. **Ink:** near-black `#141311` for text. Warm grey
  (`~#8A857C`) for captions. Hairline rules at `ink/12`.
- **Accent:** the logo orange (`#FF6A2C` — the dot). Gallery restraint: work numbers,
  the progress dot, caption end-marks, link hover underlines. Never large surfaces,
  never buttons-everywhere.
- **Logo:** ink version of the wordmark + orange dot in the header (small, top-left,
  fixed, drawn as text/SVG — the supplied asset is white-on-transparent and invisible
  on ivory). White original on the dark footer. The **orange dot alone** recurs as a
  mark: section captions end with it, like the logo signing each wall text.
- **Type:**
  - Display: high-contrast editorial serif, self-hosted from Fontshare — candidate
    **Gambetta** (fallback candidate: Sentient). Final pick verified against Polish
    diacritics (ą ę ó ś ż ź ł ć ń) at display sizes before committing.
  - Body/captions: **Satoshi** (already self-hosted). Museum labels: Satoshi in
    letterspaced uppercase, small sizes.
  - Removed: Clash Display, JetBrains Mono.
- **Spacing:** massive. Desktop sections separated by ~30–40vh; mobile generous but
  tighter. Text measure ≤ 65ch. Asymmetric offsets allowed, chaos not.
- **Color scheme:** stays `only light` (single deliberate composition, as today).

## 5. The works (exhibition content)

Three fictional Warsaw businesses, each mockup built as real HTML/CSS composition
(no sourced images; crisp at any size) with its own scoped palette + font pairing,
**styled to fit the business, not the gallery** — a visitor should instantly read
"restaurant site", "barber site", "florist site":

1. **Nr 01 — „Złoty Widelec" · Restauracja · Śródmieście.** Warm, appetizing,
   photography-led layout language, deep green + cream, menu/reservation UI cues.
2. **Nr 02 — „Antracyt" · Barbershop · Mokotów.** Sharp, high-contrast black + gold,
   bold condensed type, booking CTA, price list rows.
3. **Nr 03 — „Pracownia Mila" · Kwiaciarnia · Żoliborz.** Soft botanical pastels,
   airy, product-grid cues (glance test: reads as a shop — products + prices +
   delivery).

Names above are final for this design (changeable later by editing `lib/works.ts`).

Each work = framed desktop artboard + smaller framed mobile artboard + caption.
Content data-driven from a new `lib/works.ts`. Mockups are labeled honestly as
concept projects („projekty koncepcyjne") in the section's closing wall text.

## 6. Motion system — „spacer po galerii"

One rule: **scroll position = position in the gallery.** All section animation is
scroll-driven (scrubbed or scroll-triggered); the only time-based animations are the
cover's entrance on load and micro-hovers. **No multi-layer depth parallax** —
explicitly dropped.

Implemented with **GSAP + ScrollTrigger** (only new dependency).

- **The dot walks with you (signature).** A 1px vertical ink line at the viewport
  edge shows exhibition progress; the orange logo dot travels along it as the
  "you are here" marker, with small ticks at each work. The logo's dot is literally
  the visitor. Doubles as section navigation (ticks clickable/tappable).
- **Works unveil on arrival.** Each mockup reveals with a scroll-scrubbed mask wipe
  (clean edge sweeping across, cloth-off-the-artwork), then settles `scale 0.97→1.0`.
  Caption rises one beat later.
- **Pinned viewing moments.** Each work pins briefly while its unveil scrubs — stop,
  unveil, walk on. Pin durations roughly halved on mobile.
- **Headlines rise from behind baselines** — section titles scrubbed with scroll;
  cover headline animates once on load (line-by-line rise).
- **Hairline rules draw themselves** across as they enter — the catalogue assembling.
- **Micro:** self-drawing link underlines, slow `1.03` image zoom on hover; easing
  `power2.out`/`expo.out`, 600–900ms; nothing bounces, spins, or autoplays.
- **`prefers-reduced-motion`:** fully legible static page — no pins, no scrubs, no
  travel dot animation (line may show static progress), reveals replaced by visible
  state.

## 7. Mobile-first

Designed at 375px first: single column, works stacked (mobile artboard above desktop
artboard or mobile-only where space demands), pin durations halved, scrub distances
shortened, tap targets ≥ 44px, headline sizes fluid via `clamp()`. Desktop (≥768px,
≥1200px) adds asymmetric offsets, larger frames, longer viewing pins. Performance
budget: transform/opacity-only animation, no long-lived `will-change`, Lighthouse
mobile perf not visibly degraded vs current site.

## 8. Tech plan

- Same project (`sitelab-warsaw/`), same Next.js + Tailwind setup.
- New dependency: `gsap` (ScrollTrigger ships inside it).
- New/rebuilt components: `Cover`, `Exhibition` + `Work`, `CuratorNote`, `Placard`,
  `Process`, `GuestBook`, `Footer`, `ProgressLine`, `Header` (rebuilt minimal).
- New data module: `lib/works.ts`. `lib/config.ts` untouched.
- `lib/content.ts` rewritten for the new copy (old case-study/offer data removed).
- Old components deleted (not left dead): Artboard, CaseStudies, CompareSlider,
  FinalCta, Frame, Hero, Magnetic, MobileCtaBar, Offer, Transformation, Reveal,
  old Header/Footer as replaced. `globals.css` rewritten (old canvas/blueprint/
  selection/reveal system removed).
- Fonts: add Gambetta woff2s to `app/fonts/`, drop Clash Display files and the
  JetBrains Mono import.
- Metadata/OG copy in `app/layout.tsx` updated to match the new positioning (same
  keywords/locale, tone shifted from "72h fast" pitch to curated studio voice while
  keeping the concrete promise in the description).

## 9. Out of scope

- No CMS, no additional pages/routes, no blog.
- No real client portfolio (works are labeled concept projects).
- No analytics/tracking changes, no domain/email changes.
- The outreach mockup pipeline (`build_mockups.py` etc.) is unaffected.

## 10. Success criteria

- At a 1-second glance the page reads "gallery / editorial studio", not "tech startup".
- Each work reads as its business type at a glance (shop looks like a shop).
- The traveling-dot + unveiling motion feels like one continuous system on both a
  375px phone and a 1440px desktop.
- `prefers-reduced-motion` users get a complete, static, legible page.
- IG DM contact flow works exactly as before.
