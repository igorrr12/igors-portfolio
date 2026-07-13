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
