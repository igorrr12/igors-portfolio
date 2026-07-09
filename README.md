# Sitelab Warsaw — landing page

High-conversion, mobile-first landing page for **Sitelab Warsaw** (fast websites for local
Warsaw businesses, delivered in 72h). Built with **Next.js 14 (App Router)**, **TypeScript** and
**Tailwind CSS**. Optimized for one-click deploy on **Vercel**.

## Before you go live — edit ONE file

Open [`lib/config.ts`](lib/config.ts) and set your real details:

```ts
instagram: "warsaw.sitelab",          // without the @ (this is the contact channel)
email: "igor@getsitelab.pl",
weeklySlots: 3,                       // shown in the urgency section
```

**Instagram DM is the single contact channel.** Every CTA (header, form, final section, mobile bar,
footer) opens your Instagram DM (`ig.me/m/<handle>`). Because Instagram can't pre-fill a message,
the lead form copies a ready-made message to the clipboard and opens the thread for the visitor to
paste + send. No backend, no database, zero setup.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub / GitLab / Bitbucket).
2. In Vercel: **New Project → import the repo**. Framework is auto-detected as Next.js.
3. Deploy. No environment variables required.

(Or from this folder: `npx vercel` → follow the prompts.)

## How it converts

| Section | Job |
| --- | --- |
| Hero | Outcome-first headline + live before/after slider as instant proof. One primary CTA. |
| Metamorfozy | Three real drag-to-compare redesigns, each with one improvement label. |
| Oferta | One clear offer, what's included, indicative price (`od 1200 zł`), 72h, "pay after approval". |
| Efekty | Honest Problem → Rozwiązanie → Efekt case studies (labelled as estimates, no fake quotes). |
| Darmowy projekt | The main lead mechanism: business name + optional link → copies a message and opens your Instagram DM. |
| Final CTA | Urgency (weekly slots), 3-step process, CTA repeated. |
| Mobile bar | Sticky Instagram DM + "Darmowy projekt" on phones, where most traffic lands. |

## Swapping the examples

Before/after screenshots live in [`public/examples/`](public/examples). To change them, replace the
`*-before.png` / `*-after.png` pairs (keep them the **same aspect ratio** — the demos are 1440×900)
and update the labels in [`lib/content.ts`](lib/content.ts).

## Structure

```
app/         layout, page, global styles
components/   Hero, CompareSlider, BeforeAfter, Offer, CaseStudies, LeadForm, FinalCta, ...
lib/         config (contact details) + content (all copy & example data)
public/      before/after screenshots
```

The before/after **CompareSlider** ([`components/CompareSlider.tsx`](components/CompareSlider.tsx))
supports mouse, touch and keyboard (focus the handle, use arrow keys / Home / End) and respects
`prefers-reduced-motion`.
