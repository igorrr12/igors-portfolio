"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * The guiding thread: a gentle serpentine that winds down the middle of
 * the page, drawing itself in step with your scroll — the tip leads you
 * through the exhibition, top to bottom. It sits behind the content, so
 * artboards and text pass over it like works hung over a wire.
 *
 * pathLength={1} makes dash math proportional on the stretched SVG, and
 * the draw is driven by a plain scroll listener (the same mechanism as
 * the wayfinder dot). Decorative; reduced-motion users see it fully drawn.
 */
export function GuideLine() {
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = pathRef.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    path.setAttribute("stroke-dasharray", "1 1");
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      path.setAttribute("stroke-dashoffset", String(1 - p));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <svg className="h-full w-full" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none">
        <path
          ref={pathRef}
          pathLength={1}
          d="M 50 0 C 50 30 38 50 38 80 S 62 130 62 170 S 36 220 36 265 S 64 315 64 360 S 38 410 38 455 S 62 505 62 550 S 37 600 37 645 S 63 695 63 740 S 38 790 38 835 S 60 885 60 925 S 50 965 50 1000"
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
