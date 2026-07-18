---
target: IndustryPage
total_score: 29
p0_count: 0
p1_count: 2
timestamp: 2026-07-18T09-51-14Z
slug: components-industrypage-tsx
---
⚠️ DEGRADED: single-context (harness restricts sub-agent spawning to explicit user request)

Target: `components/IndustryPage.tsx`, inspected live at `/strony-dla-kawiarni`.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Breadcrumbs and form states are solid; nav has no active state for the current section |
| 2 | Match System / Real World | 3 | Excellent plain Polish, but the all-caps captions read stilted, and "naszej galerii" contradicts the first-person voice |
| 3 | User Control and Freedom | 2 | The contact form's sent state is irreversible; no way back to edit the business name without a refresh |
| 4 | Consistency and Standards | 3 | Strong system, but section H2s outrank the page H1 below 872px |
| 5 | Error Prevention | 3 | One required field, validated, with a clipboard-failure fallback path |
| 6 | Recognition Rather Than Recall | 3 | Breadcrumbs and labelled fields throughout; the paste step is explained rather than assumed |
| 7 | Flexibility and Efficiency | 3 | Email fallback beside the Instagram CTA; nothing else needed at this surface |
| 8 | Aesthetic and Minimalist Design | 3 | Genuinely restrained, undercut by seven section captions across eight sections |
| 9 | Error Recovery | 3 | role="alert", aria-describedby, input preserved, manual fallback when clipboard is blocked |
| 10 | Help and Documentation | 3 | Per-industry FAQ answers the real objections in context |
| **Total** | | **29/40** | **Good: solid foundation, address the weak areas** |

## Anti-Patterns Verdict

**LLM assessment.** This does not read as AI-generated, and that is a real achievement given how much of the page is data-driven. The gallery concept is committed rather than decorative, the copy is specific to cafes rather than generic to businesses, and the speculative work is honestly labelled `projekt koncepcyjny`. There is no gradient text, no fake dashboard, no logo wall, no card grid.

One tell is present and it is the significant one: **caption inflation**. Seven section captions appear across eight sections (`Oferta · Kawiarnie`, `Czego potrzebuje taka strona`, `Przykład z naszej galerii`, `Oferta`, `FAQ`, `Zobacz też`, `Kontakt`). The documented cap is one per three sections, so three. This is the single most saturated AI-landing-page signature there is, and it produces exactly the templated rhythm the page otherwise avoids.

**Deterministic scan.** `detect.mjs` over `components/` and `app/` returned one advisory: `design-system-font-size` at `components/Logo.tsx:9`, a literal `1.3rem` off the type ramp, inherited by both `Nav.tsx` and `Footer.tsx`. Not a false positive, but genuinely minor.

Notably the detector did **not** flag the caption problem, because it is a rule about frequency across a composed page rather than a property of any one file. The two assessments disagree in a useful direction here: the deterministic scan says this page is nearly clean, and the compositional read says its most-repeated element is its weakest.

**Visual overlays.** Not available. Screenshot capture timed out repeatedly against the preview pane, so findings below rest on rendered page text, computed styles, and measured contrast rather than on visual overlay.

## Overall Impression

This is a well-built page with a real point of view, and it is stronger than most of what ships in this category. The architecture is genuinely good: 12 pages generated from typed data with build-time validation, so content cannot drift from the sitemap.

The biggest opportunity is that **the page does not yet act like the primary entry point it actually is.** PRODUCT.md establishes cold SEO as the primary audience, which makes this template most visitors' first impression of Sitelab. Two things undercut that first impression, and both are verified rather than stylistic: the page title is visually outranked by its own section headings on every viewport below 872px, and the caption scaffolding repeats seven times.

## What's Working

- **The honest labelling of speculative work.** `„Bar Bambino" · Bar mleczny · Śródmieście · projekt koncepcyjny` does exactly what PRODUCT.md demands: it shows the work without claiming a client. This is the constraint most sites in this position get wrong, and it is right here.
- **Reduced-motion handling is correct, not merely present.** `WallLabel` sets its initial animation states in JS inside `gsap.matchMedia` rather than in CSS. Reduced-motion users and headless renderers get the fully composed static state instead of a blank section. This is the failure mode that ships invisible content, and it was avoided deliberately.
- **The contrast floor is real.** `--stone` measures 5.00:1 on ivory, above the 4.5:1 requirement, and the code comments show it was tuned rather than guessed.
- **The FAQ is native `<details>`.** Accessible, zero client JS, and it feeds `FAQPage` JSON-LD from the same data.

## Priority Issues

### [P1] Section headings outrank the page title on every viewport below 872px

**Verified by measurement, not inference.** At 375px: H1 is 33.6px while the `Częste pytania` and `Napisz do mnie` H2s are 36px. At 800px: H1 is 44px, those H2s are 48px. The H1 uses `clamp(2.1rem, 5.5vw, 3.9rem)`; `WallLabel` uses a fixed `text-4xl sm:text-5xl`. The two only cross over at roughly 872px viewport width.

**Why it matters:** PRODUCT.md names a phone-first audience arriving cold from Google. For that visitor, the largest text on the page is "Częste pytania" rather than "Strony internetowe dla kawiarni w Warszawie". The page announces its FAQ more loudly than its subject, on the exact viewport where the first impression is formed, and on the template that is the primary entry point to the whole site.

**Fix:** Raise the H1 clamp floor and preferably its vw coefficient (for example `clamp(2.6rem, 7vw, 3.9rem)`), or step `WallLabel` down to `text-3xl sm:text-4xl`. Adjusting the H1 is preferable, since the display role should dominate by design rather than by the section heading yielding.

**Suggested command:** `/impeccable typeset components/PageHero.tsx components/WallLabel.tsx`

### [P1] Caption inflation: seven eyebrows across eight sections

Every section opens with the same uppercase, 0.18em-tracked, orange-dotted caption. The documented ration is one per three sections, counting the hero: three.

**Why it matters:** Three separate problems converge here. First, it is the most recognisable AI-landing-page signature in existence, on a site whose entire pitch is that a human with taste made it. Second, your own observation during the DESIGN.md interview: the museum-label register translates awkwardly into Polish. `CZEGO POTRZEBUJE TAKA STRONA` is an English wall-label idiom wearing Polish words, and it is a full sentence fragment set in tracked caps, which is the least readable configuration available. Third, when every section is labelled, no label carries information, so the device costs attention and returns nothing.

**Fix:** Keep at most three, and prefer short nouns over sentence fragments. Concretely: keep the hero kicker (`Oferta · Kawiarnie`, it carries breadcrumb-like information), keep `FAQ`, and keep one more if genuinely needed. Delete `Czego potrzebuje taka strona`, `Przykład z naszej galerii`, `Oferta`, and `Zobacz też` outright. Each of those sections is already self-evident from its content, and the `<h2>` beneath does the work.

**Suggested command:** `/impeccable distill components/IndustryPage.tsx`

### [P2] Voice contradiction: "naszej galerii" against a one-person brand

The intro copy is first-person singular (`Robię strony, które...`), matching PRODUCT.md's "one person, not an agency" positioning. The caption directly below it says `Przykład z naszej galerii` (our gallery), and `lib/content.ts` carries the same plural register elsewhere.

**Why it matters:** The single-operator framing is a competitive advantage against the faceless agencies this site is positioned against. Slipping into the agency "we" undercuts it, and does so within one screen of the first-person claim. A reader will not consciously notice, but the two registers cannot both be true.

**Fix:** Pick singular and enforce it across `lib/industries.ts`, `lib/content.ts` and `lib/districts.ts`. `Przykład z galerii` or `Z galerii` avoids the pronoun entirely.

**Suggested command:** `/impeccable clarify lib/industries.ts lib/content.ts`

### [P2] Kiln Orange fails contrast where it carries meaning

Measured: accent `#FF6A2C` on ivory is **2.62:1**, below the 4.5:1 body threshold and below even the 3:1 large-text threshold. Most uses are fine because they are decorative and aria-hidden (the logo dot, the FAQ `+` markers). Two are not:

- The **required-field asterisk** in `ContactSection` renders at 11px in accent. Requiredness is signalled by a colour that fails AA, at the smallest size on the page.
- The **copy-message link** in the sent state uses `text-accent` at 14px. It is a real interactive control below the body-text threshold. Currently latent, since it only renders post-submit.

**Why it matters:** These are the two places where the accent stops being decoration and starts carrying information, which is exactly where contrast becomes non-negotiable. The `*` is also the only visual signal that the field is required.

**Fix:** Do not darken the brand orange globally; it works everywhere else and the identity is committed. Instead, give these two cases ink or stone treatment, and keep accent for the decorative roles. For the required marker, add the word `wymagane` or mark the optional field instead, so requiredness is not colour-dependent.

**Suggested command:** `/impeccable audit components/ContactSection.tsx`

### [P3] The sent state is a one-way door

`ContactSection` sets `sent` to true and never offers a way back. A visitor who typos the business name, or who submits before noticing the optional Instagram field, cannot return to the form without a page refresh.

**Fix:** Add a quiet text link back to the form from the success state. The message body is regenerated from state, so this is close to free.

**Suggested command:** `/impeccable harden components/ContactSection.tsx`

## Persona Red Flags

**Jordan (Confused First-Timer)** is this page's actual primary persona: a cafe owner who has never commissioned a website. The page mostly serves them well, since the FAQ answers real objections and the offer is stated plainly in the Placard. Two failures: the biggest text on their phone is "Częste pytania", so the page's subject is not what dominates; and the required-field asterisk is a convention they may not know, rendered in a low-contrast colour with no accompanying word.

**Casey (Distracted Mobile User)** is the dominant real-world context. Touch targets are correct throughout (44 to 54px minimum, verified in markup). The hierarchy inversion hits Casey hardest, since 375px is the worst case. The contact flow also assumes an app switch to Instagram plus a clipboard paste while walking; the clipboard fallback copy exists, which is the right call, but the flow has more steps than the page admits.

**Riley (Deliberate Stress Tester)** finds the sent state's one-way door immediately. Riley also submits with a one-character business name and correctly gets the inline error, then submits with clipboard permission denied and gets the manual fallback path, which is genuinely well handled.

## Minor Observations

- **Middle-dot pile-up.** The work caption runs `„Bar Bambino" · Bar mleczny · Śródmieście · projekt koncepcyjny`: three separators in one line where the convention is at most one. Consider a line break before `projekt koncepcyjny`, which also gives the honesty label its own weight.
- **Nav is 85px tall**, just over the 80px desktop ceiling. Trimming the 20px vertical padding to 16px would bring it to 77px.
- **`Logo.tsx:9` uses a literal `1.3rem`** off the documented type ramp (detector advisory). Either add the step to DESIGN.md or move it to `text-xl`.
- **No active nav state.** On `/strony-dla-kawiarni` the nav does not indicate that `Oferta` is the current branch. Breadcrumbs cover it, so this is genuinely minor.
- **`caption-dot` fires on every caption.** If the caption count drops to three, the dot becomes a signature again rather than wallpaper. The fix for the P1 resolves this for free.

## Questions to Consider

- If a visitor only read the largest three pieces of text on this page, would they know what is being sold? Right now on a phone those are the H1, "Częste pytania", and "Napisz do mnie".
- The four `needs` items are the most template-shaped block on the page: four equal cells, hairline-topped, title plus description. It survives the identical-card-grid ban because there is no box and no icon, but is a four-up grid the strongest form for content that is really "here is what your specific trade needs"?
- What would this page look like if the section captions did not exist at all? The captions are load-bearing for the museum metaphor, so removing them is a real design question rather than a cleanup, but the metaphor is currently costing more in Polish than it returns.
