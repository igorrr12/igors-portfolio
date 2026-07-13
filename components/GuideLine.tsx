"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The guiding thread: a vertical accent line at the left margin that
 * grows from the top of the page to the bottom as you scroll — its tip
 * stays just ahead of you, leading the walk. Mirrors the wayfinder line
 * on the right.
 *
 * Driven by a plain scroll listener (same proven mechanism as the
 * wayfinder dot) — no ScrollTrigger, so pin-refresh ordering can never
 * skew its range. Decorative; reduced-motion users see it fully drawn.
 */
export function GuideLine() {
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const line = lineRef.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setScale = gsap.quickSetter(line, "scaleY");
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScale(Math.min(1, Math.max(0, window.scrollY / max)));
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
    <span
      ref={lineRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-4 -z-10 w-px origin-top bg-accent/60 sm:left-8"
    />
  );
}
