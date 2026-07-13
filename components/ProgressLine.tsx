"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Stop = { id: string; label: string; ratio: number };

/**
 * The exhibition wayfinder: a 1px line at the right viewport edge with
 * ticks for each [data-gallery-stop] section and the orange logo dot as
 * the "you are here" marker. The dot mirrors scroll position 1:1 (no
 * smoothing), so it is position feedback, not decoration — it also runs
 * under reduced motion, matching the spec's static-progress allowance.
 */
export function ProgressLine() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const [stops, setStops] = useState<Stop[]>([]);

  useLayoutEffect(() => {
    const dot = dotRef.current!;
    const setY = gsap.quickSetter(dot, "top", "%");

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const found = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-stop]")).map((el) => ({
        id: el.id,
        label: el.dataset.galleryStop ?? el.id,
        ratio: Math.min(1, Math.max(0, el.offsetTop / Math.max(1, max))),
      }));
      setStops(found);
    };

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => setY(self.progress * 100),
    });
    measure();
    ScrollTrigger.addEventListener("refreshInit", measure);
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", measure);
      st.kill();
    };
  }, []);

  return (
    <nav
      aria-label="Postęp zwiedzania"
      className="fixed right-3 top-1/2 z-40 h-[38vh] -translate-y-1/2 sm:right-6"
    >
      <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-line" />
      {stops.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          title={s.label}
          aria-label={s.label}
          className="group absolute -right-[5px] grid h-[11px] w-[11px] place-items-center"
          style={{ top: `${s.ratio * 100}%` }}
        >
          <span className="h-[5px] w-[5px] rounded-full bg-stone transition-colors group-hover:bg-accent" />
        </a>
      ))}
      <span
        ref={dotRef}
        aria-hidden
        className="absolute -right-[4px] top-0 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-accent"
      />
    </nav>
  );
}
