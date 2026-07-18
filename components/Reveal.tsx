"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Scrubbed reveal for room content on the homepage: the block (or, with
 * `selector`, its matched children in a stagger) rises 28px and fades in,
 * driven by scroll position — the same language as WallLabel, never a
 * one-shot toggle, so the reveal is interruptible and always matches
 * where the visitor stands.
 *
 * Initial states are set in JS only, inside the reduced-motion gate:
 * reduced-motion visitors and no-JS renderers get the static composed
 * state, never a blank block.
 */
export function Reveal({
  children,
  selector,
  className,
}: {
  children: ReactNode;
  /** Optional child selector to stagger (e.g. "li", ":scope > *"). */
  selector?: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current!;
      const targets: gsap.TweenTarget = selector ? root.querySelectorAll(selector) : root;
      gsap.fromTo(
        targets,
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          stagger: selector ? 0.12 : 0,
          scrollTrigger: { trigger: root, start: "top 92%", end: "top 58%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, [selector]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
