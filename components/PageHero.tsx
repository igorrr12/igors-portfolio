import { ArrowRight } from "./icons";

/**
 * Subpage hero: kicker caption, rising-scale display H1, optional sub, and
 * the primary CTA to the page-local #kontakt block. Static (no GSAP) to keep
 * content pages fast; echoes the Cover type treatment at a smaller scale.
 */
export function PageHero({
  kicker,
  title,
  sub,
  cta = true,
  ctaLabel = "Odbierz darmowy projekt",
}: {
  kicker: string;
  title: string;
  sub?: string;
  cta?: boolean;
  ctaLabel?: string;
}) {
  return (
    <section className="gallery-frame pt-10 sm:pt-14">
      <p className="caption caption-dot rise-in">{kicker}</p>
      {/* Floor + coefficient keep the H1 clearly above the section H2s
          (WallLabel: 36/48px) at every viewport, not just barely above. The old
          clamp(2.1rem,5.5vw,3.9rem) let section headings outrank the page title
          on everything below ~872px, which is most phones and tablets. 9vw holds
          a ~1.2x step through the tight 640-693px band where sm:text-5xl lands. */}
      <h1 className="rise-in-2 mt-5 max-w-[20ch] font-display font-medium leading-[1.05] tracking-[-0.015em] text-[clamp(2.6rem,9vw,3.9rem)]">
        {title}
      </h1>
      {sub && (
        <p className="rise-in-3 mt-6 max-w-prose-narrow text-base leading-relaxed text-stone sm:text-lg">{sub}</p>
      )}
      {cta && (
        <a
          href="#kontakt"
          className="press rise-in-4 group mt-8 inline-flex min-h-[52px] items-center gap-2.5 bg-ink px-7 text-base font-medium text-ivory hover:bg-black"
        >
          {ctaLabel}
          {/* Affordance nudge: the arrow (not the button) slides 4px on hover. */}
          <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1" />
        </a>
      )}
    </section>
  );
}
