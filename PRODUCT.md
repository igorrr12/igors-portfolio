# Product

## Register

brand

## Platform

web

## Users

Owners of small local businesses in Warsaw: cafés, restaurants, barbers, beauty salons, florists, bakeries. One person who runs the place, handles their own marketing between shifts, and is usually reading on a phone. They are not buying "a website" as a considered purchase; they are deciding whether the person on the other end is worth one message.

Two entry points, and the **cold one is primary**. Most first impressions happen on a district or industry page (`/strony-dla-kawiarni`, `/strony-internetowe/mokotow`) arriving from Google, not on the gallery homepage. A stranger who has never heard of Sitelab meets a template page first and the exhibition second. The warm reader (someone who already received a mockup by Instagram DM) is the secondary audience, and for them the site is a credibility check rather than a discovery channel.

> **Addendum 2026-07-21 (business audit):** the paragraph above describes the *eventual* state. The domain is weeks old, so SEO traffic will be negligible until roughly 2026-11; until then the primary real reader is an **outreach recipient doing a credibility check** after a cold email from igor@getsitelab.pl or a DM — typically a catering/services owner, often older and not on Instagram. Judge conversion changes against that reader first (visible email + phone matter more than the DM CTA for them). Business plan of record: `../STRATEGY.md`.

## Product Purpose

Turn a stranger's search for a local web designer into one Instagram DM. The site sells a specific offer: a free, custom-designed mockup of the visitor's own business, made before any money changes hands. Success is a DM, not a form fill, not a phone call, not time on page.

## Positioning

You see your own site designed before you pay anything, and it is designed for your business rather than picked from a catalogue. The free mockup is the offer; being custom rather than templated is what makes the mockup worth looking at.

## Conversion & proof

- Primary CTA: open an Instagram DM (`ig.me/m/warsaw.sitelab`). Every surface routes here. The contact form copies a ready-made Polish message to the clipboard and opens the thread, because Instagram cannot pre-fill.
- Secondary CTA: email `igor@getsitelab.pl`, for visitors who do not use Instagram or want a paper trail.
- The line a visitor remembers after 10 seconds: someone will design my site for free, and I only pay if I like it.
- Belief ladder, in order: (1) this person can genuinely design, and the page I am reading proves it; (2) they understand my kind of business specifically; (3) I risk nothing, because I see the design before paying; (4) the price is real, flat, and within reach; (5) getting started is one message, not a sales process.
- Proof on hand: **none that is real.** Every case study and before/after in `public/` is a self-made speculative mockup produced for outreach. No client has paid, and no client has given a quotable testimonial. The site must therefore never present borrowed credibility: no testimonials, no "zaufali nam" logo wall, no client counts, no invented brand names or fabricated metrics. Speculative work must read honestly as a demonstration of what Sitelab makes, never as a delivered engagement.

## Brand Personality

Spokojny, konkretny, bez ściemy. Calm, concrete, no inflation. Plain Polish, short sentences, no agency vocabulary and no marketing superlatives. First person singular, because it is genuinely one person. No em-dashes anywhere in visible copy.

The feeling to produce in the first seconds is quiet confidence: *this person has real taste.* Not reassurance, not spectacle, not urgency. The restraint is the argument. Because there is no client proof to lean on, the visitor's judgement of the design in front of them is the only evidence available, which makes the site's own craft a load-bearing part of the pitch rather than decoration.

## Anti-references

- **Wix and template-marketplace sites.** Grids of identical theme thumbnails, "wybierz szablon", checkmark comparison tables. This is the thing Sitelab sells against, so resembling it is self-defeating.
- **The default SaaS startup landing page.** Dark hero, gradient text, three equal feature cards, a fake dashboard screenshot, a "Trusted by" logo wall. Also the default AI-generated landing page, and the fake logo wall is doubly banned here because there are no clients to put in it.

## Design Principles

1. **The mockup is the pitch.** Every page exists to make one free custom mockup feel worth requesting. Anything that does not move a reader toward that request is a candidate for deletion.
2. **Taste is the only credential.** With no paying clients, the site cannot cite proof, so it must demonstrate it. Craft in the page the visitor is currently reading does the work a testimonial would normally do.
3. **Never borrow credibility.** No fabricated clients, quotes, logos, counts, or precision numbers. Speculative work is labelled as speculative. An honest empty space beats a convincing fake.
4. **Design the entry page, not the homepage.** District and industry templates are where strangers land, so they get the strategic attention usually reserved for `/`. The gallery homepage is the second impression.
5. **Restraint over spectacle.** The audience is a bakery owner on a phone between shifts, not a design juror. Ambition should register as calm confidence, never as something to decode.

## Accessibility & Inclusion

WCAG AA as the working floor, already reflected in the code rather than aspirational. `--stone` (`#6E6961`) was deliberately darkened to clear 4.5:1 on ivory for body copy. All scroll animation is gated behind `gsap.matchMedia`, so `prefers-reduced-motion` visitors get a fully static page rather than a degraded one. Focus is always visible via a 2px accent outline with offset. The site opts out of Chrome Auto Dark Mode with `color-scheme: only light`, because the ivory gallery composition is a single deliberate light design.

Practical constraint that outranks aesthetics: the primary reader is on a mid-range phone on mobile data. Mobile rendering and load are accessibility concerns here, not just performance ones.

---

*Written in English deliberately, against the workspace's Polish default: this file is agent context read alongside the English impeccable references, not client-facing output. All visible site copy stays Polish.*
