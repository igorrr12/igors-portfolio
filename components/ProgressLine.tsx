"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Stop = { id: string; label: string; ratio: number; target: number };

/**
 * The exhibition wayfinder: a 1px line at the right viewport edge with
 * ticks for each [data-gallery-stop] section and the orange logo dot as
 * the "you are here" marker. The dot mirrors scroll position 1:1 (no
 * smoothing), so it is position feedback, not decoration — it also runs
 * under reduced motion, matching the spec's static-progress allowance.
 *
 * Ticks are placed on the same scale the dot moves on (scrollY / max),
 * measured AFTER ScrollTrigger refresh so pin-spacer heights count. For
 * pinned works the tick/click target is the pin's end — the moment the
 * unveil is complete — so clicking a tick always lands on the fully
 * visible work and the dot settles exactly on the tick.
 */
export function ProgressLine() {
  const navRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [stops, setStops] = useState<Stop[]>([]);

  useLayoutEffect(() => {
    const nav = navRef.current!;
    const dot = dotRef.current!;
    // Transform, not `top`: keeps the dot compositor-driven and jitter-free.
    const setY = gsap.quickSetter(dot, "y", "px");
    let navH = nav.offsetHeight;

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => setY(self.progress * navH - 4.5),
    });

    const measure = () => {
      navH = nav.offsetHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const found = Array.from(document.querySelectorAll<HTMLElement>("[data-gallery-stop]")).map((el) => {
        const pin = ScrollTrigger.getAll().find((t) => t.trigger === el && t.vars.pin);
        const raw = pin ? pin.end : window.scrollY + el.getBoundingClientRect().top;
        const target = Math.min(max, Math.max(0, Math.round(raw)));
        return {
          id: el.id,
          label: el.dataset.galleryStop ?? el.id,
          ratio: target / max,
          target,
        };
      });
      setStops(found);
      setY(st.progress * navH - 4.5);
    };

    // Measure after every refresh (pins laid out, spacers in the DOM) and
    // force one refresh now — this component mounts before the works
    // create their pin triggers, so the first natural refresh may predate
    // them. setTimeout (not rAF): rAF never fires in background tabs.
    ScrollTrigger.addEventListener("refresh", measure);
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 0);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.removeEventListener("refresh", measure);
      st.kill();
    };
  }, []);

  return (
    <nav
      ref={navRef}
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
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: s.target });
            history.replaceState(null, "", `#${s.id}`);
          }}
          className="group absolute -right-[5px] grid h-[11px] w-[11px] -translate-y-1/2 place-items-center"
          style={{ top: `${s.ratio * 100}%` }}
        >
          <span className="h-[5px] w-[5px] rounded-full bg-stone transition-colors group-hover:bg-accent" />
        </a>
      ))}
      {/* GSAP owns this element's transform (set on mount via measure). */}
      <span
        ref={dotRef}
        aria-hidden
        className="absolute -right-[4px] top-0 h-[9px] w-[9px] rounded-full bg-accent"
      />
    </nav>
  );
}
