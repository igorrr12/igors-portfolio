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
