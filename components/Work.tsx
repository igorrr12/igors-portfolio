"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import type { Work } from "@/lib/works";
import { gsap } from "@/lib/gsap";

/**
 * One exhibited work: pinned viewing moment. While pinned, the frame
 * unveils via a scrubbed clip-path wipe (cloth off the artwork) and
 * settles 0.97→1; the caption rises a beat later. Pin distance is
 * halved on mobile. Reduced motion: static, fully visible.
 */
export function WorkFrame({ work, desktop, mobile }: { work: Work; desktop: ReactNode; mobile: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef);
    const build = (pinDistance: string) => () => {
      const root = rootRef.current!;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${pinDistance}`,
          pin: true,
          scrub: true,
        },
      });
      tl.fromTo(
        root.querySelector("[data-frame]"),
        { clipPath: "inset(0% 100% 0% 0%)", scale: 0.97 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none", duration: 0.75 }
      ).fromTo(
        root.querySelector("[data-work-caption]"),
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: "none", duration: 0.25 },
        0.65
      );
    };
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", build("80%"));
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", build("40%"));
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id={work.anchor}
      data-gallery-stop={`Nr ${work.nr} — ${work.name}`}
      className="relative flex min-h-[100svh] items-center overflow-hidden py-16"
    >
      {/* Huge catalogue number on the wall behind the work. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-8 select-none font-display text-[clamp(6rem,22vw,17rem)] font-medium leading-none text-ink/[0.05]"
      >
        {work.nr}
      </span>

      <div className="gallery-frame relative">
        <div data-frame className="relative md:pr-[22%]">
          {/* Desktop artboard */}
          <div className="aspect-[16/10] w-full overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(20,19,17,0.04),0_24px_60px_-30px_rgba(20,19,17,0.25)]">
            {desktop}
          </div>
          {/* Mobile artboard, overlapping the desktop frame on md+ */}
          <div className="mx-auto -mt-10 w-[46%] max-w-[220px] overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(20,19,17,0.04),0_24px_60px_-30px_rgba(20,19,17,0.3)] md:absolute md:-bottom-10 md:right-0 md:mx-0 md:mt-0 md:w-[26%]">
            <div className="aspect-[9/19] w-full overflow-hidden">{mobile}</div>
          </div>
        </div>

        <figcaption data-work-caption className="mt-12 md:mt-16 md:max-w-[70%]">
          <p className="caption">
            Nr {work.nr} — <span className="text-ink">„{work.name}”</span> · {work.sector} · {work.district}
          </p>
          <p className="mt-2 max-w-prose-narrow text-sm leading-relaxed text-stone">{work.note}</p>
        </figcaption>
      </div>
    </section>
  );
}
