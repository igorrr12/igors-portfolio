"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { Work } from "@/lib/works";
import { gsap } from "@/lib/gsap";

/**
 * One exhibited work: a four-layer pinned viewing moment.
 *
 * 1. Approach: walking up to the piece. Before the pin engages, the framed
 *    block rises 56px from 30% opacity, scrubbed, so the work "arrives".
 * 2. Unveil: while pinned, a scrubbed clip-path wipe pulls the cloth off.
 *    Direction alternates per work (`flip`), so the ritual repeats without
 *    feeling copied.
 * 3. Settle: the artwork inside the frame starts 8% oversized and eases to
 *    rest a beat slower than the wipe, like a print settling under glass.
 *    The huge catalogue number drifts against the frame for depth.
 * 4. Caption: the label and curatorial note rise in sequence at the end.
 *
 * All scrubbed (position-driven, interruptible, no toggles). Pin distance
 * is halved on mobile. Reduced motion: static, fully visible.
 */
export function WorkFrame({ work, flip = false }: { work: Work; flip?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(rootRef);
    const build = (pinDistance: string) => () => {
      const root = rootRef.current!;

      // 1. Approach — targets the inner block, never the section itself,
      //    because the pin owns the section's transform.
      gsap.fromTo(
        root.querySelector("[data-work-inner]"),
        { y: 56, autoAlpha: 0.3 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 95%", end: "top top", scrub: true },
        }
      );

      // 2-4. The pinned unveil timeline.
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
        { clipPath: flip ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)", scale: 0.97 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none", duration: 0.75 }
      )
        .fromTo(
          root.querySelector("[data-frame-img]"),
          { scale: 1.08, yPercent: 5 },
          { scale: 1, yPercent: 0, ease: "none", duration: 0.9 },
          0
        )
        .fromTo(
          root.querySelector("[data-work-nr]"),
          { yPercent: 26 },
          { yPercent: -14, ease: "none", duration: 1 },
          0
        )
        .fromTo(
          root.querySelectorAll("[data-work-caption] > *"),
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "none", duration: 0.25, stagger: 0.07 },
          0.62
        );
    };
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", build("80%"));
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", build("40%"));
    return () => mm.revert();
  }, [flip]);

  return (
    <section
      ref={rootRef}
      id={work.anchor}
      data-gallery-stop={`Nr ${work.nr} — ${work.name}`}
      className="relative flex min-h-[100svh] items-center overflow-hidden py-16"
    >
      {/* Huge catalogue number on the wall behind the work; drifts against
          the frame while pinned (parallax depth). */}
      <span
        aria-hidden
        data-work-nr
        className="pointer-events-none absolute right-[4%] top-8 select-none font-display text-[clamp(6rem,22vw,17rem)] font-medium leading-none text-ink/[0.05]"
      >
        {work.nr}
      </span>

      <div data-work-inner className="gallery-frame relative">
        <div data-frame className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-white shadow-[0_1px_2px_rgba(20,19,17,0.04),0_24px_60px_-30px_rgba(20,19,17,0.25)]">
            {/* Settle layer: oversized at the start of the unveil, at rest
                by the end, one beat behind the wipe. */}
            <div data-frame-img className="absolute inset-0">
              <Image
                src={work.image}
                alt={work.alt}
                fill
                sizes="(min-width: 1240px) 1120px, 100vw"
                className="object-cover"
                quality={90}
              />
            </div>
          </div>
        </div>

        <figcaption data-work-caption className="mt-10 md:mt-12">
          <p className="caption">
            Nr {work.nr} — <span className="text-ink">„{work.name}”</span> · {work.sector} · {work.district}
          </p>
          <p className="mt-2 max-w-prose-narrow text-sm leading-relaxed text-stone">{work.note}</p>
        </figcaption>
      </div>
    </section>
  );
}
