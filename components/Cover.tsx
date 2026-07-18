"use client";

import { useLayoutEffect, useRef } from "react";
import { COVER } from "@/lib/content";
import { gsap } from "@/lib/gsap";

/**
 * The exhibition cover. The type is the art: two rising serif lines and
 * the oversized italic accent that overlaps the block (the page's single
 * breath of drama). Entrance plays once on load; scrolling shears the
 * composition apart (scrubbed) — each line leaves at its own rate, top
 * line fastest, like depth revealing itself as you step past the title
 * wall. The scroll hint dies the moment scrolling starts.
 *
 * Scroll-out transforms target the overflow wrappers, not the inner
 * lines: the inners sit in overflow-hidden clip boxes for the entrance
 * rise, and translating them would clip the type mid-fade.
 */
export function Cover() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current!;
      const lines = root.querySelectorAll("[data-cover-line]");
      const wraps = root.querySelectorAll("[data-cover-wrap]");
      const meta = root.querySelectorAll("[data-cover-meta]");

      gsap.timeline({ defaults: { ease: "expo.out" } })
        .fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.15)
        .fromTo(meta, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.55);

      // Shear-out: per-line rates (top fastest) + a uniform meta drift,
      // while the whole block fades. One trigger drives all of it. The
      // scrubbed tweens touch only properties the entrance never wrote
      // (yPercent on wraps/meta, autoAlpha on block and hint wrapper), so
      // no tween captures another's mid-flight value as its start state.
      const out = { trigger: root, start: "top top", end: "bottom 35%", scrub: true } as const;
      gsap.to(wraps, { yPercent: (i: number) => [-16, -11, -6][i] ?? -6, ease: "none", scrollTrigger: out });
      gsap.to(root.querySelectorAll("[data-cover-block] [data-cover-meta]"), { yPercent: -8, ease: "none", scrollTrigger: out });
      gsap.to(root.querySelector("[data-cover-block]"), { autoAlpha: 0.25, ease: "none", scrollTrigger: out });
      gsap.to(root.querySelector("[data-cover-hint]"), {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "12% top", scrub: true },
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
            <span key={line} data-cover-wrap className="block overflow-hidden pb-[0.08em]">
              <span data-cover-line className="block">
                {line}
              </span>
            </span>
          ))}
          {/* The overlapping-type moment: oversized italic tucked up against the
              block. Pull is capped at 0.08em: at 0.18em the ascender of the "k"
              in "sztukę" collided with the ogonek of the "ą" in "ogląda" (both
              Polish descender glyphs g/ą/ę hang into this zone). Em-based, so
              the clearance holds at every viewport. */}
          <span data-cover-wrap className="block overflow-visible">
            <span
              data-cover-line
              className="relative -mt-[0.08em] block font-display italic text-[1.28em] leading-[1] text-ink sm:-ml-[0.06em]"
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

      {/* Outer p: scrubbed scroll-fade only. Inner span: entrance only.
          Two nodes so the two tweens never share a property. */}
      <p
        data-cover-hint
        className="caption absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
        aria-hidden
      >
        <span data-cover-meta className="inline-block">
          {COVER.hint} ↓
        </span>
      </p>
    </section>
  );
}
