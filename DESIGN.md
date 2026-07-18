---
name: Galeria Sitelab
description: An ivory working gallery for a Warsaw web design studio, where the exhibited work carries all the color.
colors:
  ivory: "#F7F5F0"
  ink: "#141311"
  stone: "#6E6961"
  line: "#1413111F"
  accent: "#FF6A2C"
  surface-veil: "#FFFFFF99"
typography:
  display:
    fontFamily: "Gambetta, Georgia, serif"
    fontSize: "clamp(2.6rem, 9vw, 3.9rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Gambetta, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Gambetta, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  gutter-sm: "20px"
  gutter-lg: "40px"
  section: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "#000000"
    textColor: "{colors.ivory}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "52px"
  button-secondary-hover:
    textColor: "{colors.accent}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0"
    height: "52px"
  placard:
    backgroundColor: "{colors.surface-veil}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "28px"
    width: "448px"
  label-caption:
    textColor: "{colors.stone}"
    typography: "{typography.label}"
---

# Design System: Galeria Sitelab

## 1. Overview

**Creative North Star: "The Working Gallery"**

A gallery that is also a workshop. The walls are ivory, the labels are factual, the hanging is generous, and the work on show is honestly unsold. This distinction matters more than it sounds: a finished gallery implies a career behind it, and there is not one yet. A working gallery implies a practice in motion, which is true and which is the only claim this site is entitled to make.

The system is built so the shell recedes and the exhibited screenshots carry every saturated color on the page. The ivory, the ink, the stone grey and the hairlines are deliberately inert. When a cafe's magenta or a bakery's deep green appears inside a framed work image, it should be the loudest thing on screen by a wide margin. Any decoration added to the shell steals from that contrast, so the shell gets nothing it does not need.

Restraint here is an argument, not a preference. PRODUCT.md is explicit that there are no clients and no testimonials, so the craft of the page a visitor is currently reading is the only evidence available. The system therefore rejects two things by name: the **Wix and template-marketplace** look, because resembling the product being sold against is self-defeating, and the **default SaaS startup landing page**, because its dark hero, gradient text, three equal feature cards and "Trusted by" logo wall would all be borrowed credibility this studio has not earned.

**Key Characteristics:**
- Ivory walls, ink text, stone secondary copy, one warm accent
- Sharp corners everywhere; radius exists only for dots and status circles
- Hairline rules at 12% ink do the structural work that borders and cards do elsewhere
- Editorial serif display against a quiet geometric sans body
- Motion is scroll-driven on the homepage; content pages get one staggered hero entrance plus press feedback, nothing more
- A single deliberate light composition, with dark mode explicitly refused

## 2. Colors

A near-monochrome warm neutral shell with exactly one accent, tuned so the exhibited work is the only saturated thing a visitor sees.

### Primary

- **Kiln Orange** (`#FF6A2C`): Warm, ceramic, hand-made. The one piece of human warmth in an otherwise cool and institutional shell, and the reason the palette does not read as clinical. It appears in only five places: the logo dot, the focus ring, the link underline that draws in on hover, the FAQ expand marker, and the required-field asterisk. It is never a background, never a large fill, and never decorative.

### Neutral

- **Gallery Ivory** (`#F7F5F0`): The wall. Every page background, and the `themeColor` in the manifest.
- **Ink** (`#141311`): All primary text, the primary button fill, and the one dark room in the building (the footer). A warm near-black, never pure `#000000` at rest, though the primary button deepens to true black on hover.
- **Stone** (`#6E6961`): Secondary copy, captions, and supporting paragraphs. This value was deliberately darkened to clear 4.5:1 against ivory. It is a floor, not a starting point.
- **Hairline** (`#1413111F`, ink at 12%): Every rule, divider, border and field underline in the system.
- **Surface Veil** (`#FFFFFF99`, white at 60%): The only surface that sits above the wall. Used for the Placard and the copied-message block, where content needs to read as a separate object without being boxed in a card.

### Named Rules

**The Loudest Thing Rule.** The most saturated color on any screen must belong to an exhibited work, never to the shell. If a shell element is competing with the artwork for attention, the shell element is wrong.

**The Five Places Rule.** Kiln Orange is permitted in exactly five roles: logo dot, focus ring, link underline, expand marker, required marker. Adding a sixth requires removing one. It is never a button fill, never a section background, never a gradient.

**The Committed Light Rule.** This is a single deliberate light composition. `color-scheme: only light` is load-bearing and opts the site out of Chrome and Android auto-dark inversion, which would destroy the ivory. Dark mode is refused, not forgotten. Do not add it.

## 3. Typography

**Display Font:** Gambetta (with Georgia, serif)
**Body Font:** Satoshi (with system-ui, sans-serif)

Both are self-hosted via `next/font/local` with `display: swap`. There is no third family and no mono.

**Character:** A high-contrast editorial serif paired with a quiet geometric sans. The pairing works because it contrasts on axis rather than on degree: Gambetta carries all the personality and Satoshi deliberately has none, so the serif never has to compete for voice. Gambetta appears at every level of heading including small ones, which is what keeps a text-heavy SEO page feeling composed rather than administrative.

### Hierarchy

- **Display** (Gambetta 500, `clamp(2.6rem, 9vw, 3.9rem)`, 1.05, -0.015em): Page H1 only, one per page. The clamp ceiling of 3.9rem sits well under the 6rem shouting threshold, and the tracking sits well inside the -0.04em floor. The floor and coefficient are both load-bearing: they keep the H1 at roughly 1.2x the section H2 through the 640-693px band, where `sm:text-5xl` jumps the H2 to 48px. An earlier `clamp(2.1rem, 5.5vw, 3.9rem)` inverted the hierarchy on every viewport below 872px.
- **Headline** (Gambetta 500, 1.5rem rising to 1.875rem at `sm`, 1.2): Plain section headings, used where a section needs a name but should not spend one of the page's three captions. `WallLabel` is the heavier variant (2.25rem / 3rem) and carries the caption plus the self-drawing rule; reserve it for the two or three sections that genuinely anchor the page.
- **Title** (Gambetta 500, 1.125rem to 1.25rem, 1.4): Sub-item headings, FAQ questions, related links.
- **Body** (Satoshi 400, 1rem rising to 1.125rem at `sm`, 1.625): All prose. Constrained to `max-w-prose-narrow` (65ch), which is enforced in the Tailwind config rather than left to judgement.
- **Label** (Satoshi 500, 0.6875rem, 0.18em, uppercase): Section captions. See the rule below before adding one.

### Named Rules

**The Rationed Caption Rule.** The uppercase tracked caption is the most over-used element in this system and the easiest to add by reflex. It is capped at **one per three sections**, counting the page hero as one. A page with eight sections gets at most three. Two additional constraints apply and both come from real observation:

1. In Polish, the small-caps museum-label register reads stilted where it reads natural in English. Phrases like `CZEGO POTRZEBUJE TAKA STRONA` or `PRZYKŁAD Z NASZEJ GALERII` are wall-label English wearing Polish words. When a caption survives the ration, it should be a short noun, not a sentence fragment: `Oferta`, `FAQ`, `Realizacje`.
2. A caption above every section produces the exact templated rhythm that marks a page as machine-made, which is the one impression this studio cannot afford.

The default when unsure is to delete the caption. The heading below it is almost always sufficient, and the section's position on the page already says what the section is.

**The Serif Everywhere Rule.** Gambetta carries headings at every size, down to 1.125rem. Do not switch small headings to Satoshi for "clarity"; the serif at small sizes is what makes a dense content page feel edited rather than generated.

## 4. Elevation

Depth is expressed through **paper layering**, not lighting. Surfaces separate by tone, the way stacked paper stock of different weights separates, rather than by floating above one another. There are three tonal planes and no more: the ivory wall, the white-at-60% veil for objects that need to read as separate, and ink for the single dark room in the footer. Structure between and inside those planes is drawn with 1px hairlines at 12% ink.

The system contains exactly one shadow, and it is a considered exception rather than a vocabulary. It belongs to the framed work image, because a framed piece genuinely does hang off a wall and casts a real shadow. It is two layers: a 1px contact shadow that seats the frame against the wall, and a wide, heavily offset ambient falloff that reads as depth rather than as a glow.

### Shadow Vocabulary

- **Framed work** (`box-shadow: 0 1px 2px rgba(20,19,17,0.04), 0 24px 60px -30px rgba(20,19,17,0.25)`): The exhibited screenshot only. Note the -30px spread, which keeps the falloff wide and faint instead of tight and dark.

### Named Rules

**The One Shadow Rule.** The system has a single shadow and it is spoken for. Buttons, cards, navigation, dropdowns, the Placard and form fields are all flat, at rest and on hover. A second shadow entering this system is a defect, not an addition.

**The Tonal Separation Rule.** When an element needs to separate from the wall, change its tone or draw a hairline around it. Never lift it. If it looks like a 2014 app, a shadow was used where a hairline belonged.

## 5. Components

### Buttons

- **Shape:** Perfectly sharp (0px radius). No exceptions anywhere in the system.
- **Primary:** Ink fill with ivory text, 52px minimum height, 28px horizontal padding, Satoshi 500 at 1rem. Usually paired with a trailing arrow glyph at 20px. This is the free-mockup CTA and it should look like the only real action on the page.
- **Hover / Focus:** Background deepens from ink to true black over a color transition. No lift, no scale, no shadow on hover. Focus is the global 2px Kiln Orange outline at 3px offset. CTAs carrying an arrow glyph nudge the arrow (never the button) 4px right on hover, as a forward affordance.
- **Press:** Every pressable element carries the `press` class: `scale(0.98)` while held, 160ms on the system curve, gated behind reduced-motion. The press state is feedback, not decoration; it is the one sanctioned scale in the shell.
- **Secondary / Ghost:** Transparent with a 25% ink hairline border; on hover the border and text both shift to Kiln Orange. Used once, for the "prefer email" fallback beside the Instagram CTA.

### Cards / Containers

The system is close to card-free by intent, and that is the correct default. Where an object genuinely needs to separate, it becomes a Placard rather than a card.

- **Corner Style:** Sharp (0px).
- **Background:** Surface Veil (white at 60%) over ivory.
- **Shadow Strategy:** None. See The One Shadow Rule.
- **Border:** 1px hairline at 12% ink.
- **Internal Padding:** 28px rising to 32px at `sm`.

### Inputs / Fields

- **Style:** Underline only. No box, no fill, no radius. Transparent background with a bottom border at 25% ink, 52px tall, and text at 1.125rem which is deliberately larger than body copy so the field feels answerable rather than administrative.
- **Focus:** Bottom border transitions to Kiln Orange.
- **Error:** Border shifts to a deep red, with the message rendered below the field at 0.875rem and wired through `aria-invalid` plus `aria-describedby`.
- **Labels:** Always above the field, never a placeholder standing in for a label. Placeholders sit at 50% stone and are supplementary only.

### Navigation

Satoshi 500 at 0.875rem, sitting in flow with a hairline under-border on content pages and floating transparently over the cover on the homepage. Links use the drawing underline; the Kontakt action is a compact ink button at 40px. Below `sm` the links collapse to a hamburger with a three-hairline glyph that rotates into a cross. Every target clears 44px minimum.

### Signature Component: The Placard

The offer rendered as a museum label: a small bordered rectangle with a definition list of rows, each row separated by a hairline, the label in stone at 0.875rem and the value in Gambetta at 1.125rem. Capped at `max-w-md` so it stays label-sized and never grows into a pricing table. This is the component that carries the 399 zl offer, and its restraint is the point: a comparison matrix with checkmark columns would look exactly like the template marketplaces PRODUCT.md names as an anti-reference.

### Signature Component: The Drawing Underline

Inline links carry a 1px Kiln Orange underline that scales from 0 on the left over 450ms on the system curve (`--ease-out`, ease-out-quart). Hover-triggered draws are gated to hover-capable pointers, so touch devices never show a stuck underline.

### The Motion Vocabulary

The shell speaks exactly four motions, all on the one system curve, all gated behind `prefers-reduced-motion` so the static composed page is the default, never the degraded case:

1. **Rise-in** (450ms, 60ms stagger): the page-hero entrance, kicker to title to sub to CTA. One per page load, content pages only.
2. **Press** (160ms): `scale(0.98)` on `:active` for every button.
3. **Settle-in** (240ms): revealed content (FAQ answers, the mobile menu) drops 4px into place.
4. **The drawing underline** (450ms) plus the CTA arrow nudge (200ms): the only hover motions.

Anything outside these four is a defect on content pages: no infinite loops, no scroll-hijack, no parallax, no entrance animation on anything below the hero.

**The homepage choreography** is a separate, equally closed domain: GSAP ScrollTrigger, everything scrubbed (position-driven and interruptible, never one-shot toggles), everything inside `gsap.matchMedia` reduced-motion gates with initial states set in JS only, so the static composed page ships to reduced-motion visitors and no-JS renderers. Its beats:

- **Cover**: one-time entrance (lines rise from clip boxes, expo.out), then a scrubbed shear-out; each headline line leaves at its own rate, top fastest, and the scroll hint dies within the first 12% of scroll.
- **Work unveil** (the centerpiece, one per exhibited work): an approach (the framed block rises 56px from 30% opacity before the pin), a pinned clip-path wipe whose direction alternates per work, an inner-image settle (artwork starts 8% oversized, at rest one beat after the wipe), catalogue-number parallax drifting against the frame, and a two-line caption stagger at the end.
- **WallLabel**: three beats, caption settle, title rise, rule draw.
- **Room reveals**: section content (curator paragraphs, placard, process rows, contact columns, closing wall text) rises 28px in scrubbed staggers via the `Reveal` component.
- **Wayfinding**: the GuideLine serpentine draws with scroll; the ProgressLine dot mirrors position 1:1 (position feedback, so it also runs under reduced motion).

New homepage beats must be scrubbed, transform/opacity/clip-path only, and inside the same gates; a toggle-fired reveal or a layout-property animation is a defect there too.

## 6. Do's and Don'ts

### Do:

- **Do** let exhibited work be the loudest color on any screen. The shell is inert on purpose.
- **Do** keep every corner sharp (0px). Radius exists only for the logo dot and the success circle.
- **Do** draw structure with 1px hairlines at 12% ink instead of reaching for borders, boxes or cards.
- **Do** keep body copy inside 65ch using `max-w-prose-narrow`.
- **Do** keep `--stone` at `#6E6961` or darker. It is a contrast floor, tuned to clear 4.5:1 on ivory.
- **Do** gate every animation behind `gsap.matchMedia` so reduced-motion visitors get a fully static page rather than a broken one.
- **Do** keep `color-scheme: only light`. It prevents Android and Chrome auto-dark from inverting the ivory.
- **Do** write section captions as short nouns when one survives the ration, and prefer deleting it.

### Don't:

- **Don't** put a caption above every section. The cap is one per three sections including the hero. This is the most violated rule in this system, and in Polish the small-caps register reads stilted where it reads natural in English.
- **Don't** add a second shadow. The framed work image owns the only one.
- **Don't** build anything resembling a **Wix or template marketplace**: no grids of theme thumbnails, no "wybierz szablon", no checkmark comparison columns. PRODUCT.md names this as an anti-reference precisely because it is the thing Sitelab sells against.
- **Don't** build anything resembling the **default SaaS startup landing page**: no dark hero, no gradient text, no three equal feature cards, no fake dashboard screenshot, no "Trusted by" logo wall.
- **Don't** ship a testimonial, a client logo, a client count, or a review. There are none. PRODUCT.md is explicit that speculative work must read as speculative, and the `projekt koncepcyjny` label on work images is doing that job.
- **Don't** invent precise-sounding numbers (satisfaction percentages, project counts, response times) that no real data supports.
- **Don't** use an em-dash anywhere in visible copy. Regular hyphens only, in Polish prose and in labels alike.
- **Don't** add dark mode. The single light composition is a decision, not an omission.
- **Don't** use Kiln Orange as a button fill, a section background, or a gradient. Five roles, no sixth.
- **Don't** lift anything on hover: no scale, no shadow, no translate of the element itself. The sanctioned hover motions are the drawing underline and the CTA arrow nudge (the icon moves, the button does not). Press feedback lives on `:active`, never on hover.
- **Don't** add a fifth motion. The vocabulary is rise-in, press, settle-in, and the underline/arrow pair; a new animation must replace one of these, not join them.
