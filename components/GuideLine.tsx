"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The guiding thread: a thin accent line meandering from the top of the
 * page to the bottom, drawing itself in as you scroll (scrubbed 1:1 with
 * document progress). It sits behind the content, so artboards and text
 * pass over it like works hung over a wire. Decorative — hidden from
 * assistive tech; reduced-motion users see it fully drawn.
 *
 * pathLength={1} normalizes dash math: the SVG is stretched non-uniformly
 * to page height (preserveAspectRatio="none"), so real px lengths are
 * meaningless — with the declared length, dasharray/dashoffset of 0..1
 * always mean "fraction of the whole path" in every browser.
 */
export function GuideLine() {
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const path = pathRef.current!;
      gsap.set(path, { attr: { "stroke-dasharray": "1 1", "stroke-dashoffset": 1 } });
      gsap.to(path, {
        attr: { "stroke-dashoffset": 0 },
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <svg className="h-full w-full" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none">
        <path
          ref={pathRef}
          pathLength={1}
          d="M 52 0 C 52 40 14 60 14 100 S 88 160 88 210 S 12 270 12 330 S 86 390 86 450 S 14 510 14 570 S 85 630 85 690 S 15 750 15 810 S 50 880 50 930 L 50 1000"
          stroke="var(--accent)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          className="opacity-60"
        />
      </svg>
    </div>
  );
}
