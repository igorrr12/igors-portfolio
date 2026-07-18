"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Section signage in three scrubbed beats: caption settles first, the
 * serif title rises out of its clip, the hairline draws itself last.
 * Reduced-motion users see the static composed state (initial states
 * set in JS only).
 */
export function WallLabel({ caption, title, id }: { caption: string; title: string; id?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current!;
      gsap.fromTo(
        root.querySelector("[data-wl-caption]"),
        { y: 12, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 92%", end: "top 74%", scrub: true },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-rise]"),
        { yPercent: 70, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 88%", end: "top 55%", scrub: true },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-rule]"),
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
      <p data-wl-caption className="caption caption-dot">{caption}</p>
      <div className="overflow-hidden pb-1">
        <h2 data-rise className="mt-3 font-display text-4xl font-medium tracking-[-0.01em] sm:text-5xl">
          {title}
        </h2>
      </div>
      <span data-rule className="rule mt-6" />
    </div>
  );
}
