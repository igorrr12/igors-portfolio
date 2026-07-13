"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The guiding thread: a vertical accent line at the left margin that
 * grows from the top of the page to the bottom as you scroll — its tip
 * stays just ahead of you, leading the walk. Mirrors the wayfinder line
 * on the right. Decorative; reduced-motion users see it fully drawn.
 */
export function GuideLine() {
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <span
      ref={lineRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-4 -z-10 w-px origin-top bg-accent/50 sm:left-8"
    />
  );
}
