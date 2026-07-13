"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * The guiding thread: a gentle serpentine that winds down the middle of
 * the page, drawing itself in step with your scroll — the tip leads you
 * through the exhibition, top to bottom. It sits behind the content, so
 * artboards and text pass over it like works hung over a wire.
 *
 * Everything is computed in real pixels: the path is generated from the
 * page's actual size (rebuilt on resize), so getTotalLength() and the
 * dash draw are exact in every browser — no viewBox stretching, no
 * pathLength normalization, none of the quirks those interact with.
 * Decorative; reduced-motion users see it fully drawn.
 */
export function GuideLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current!;
    const path = pathRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let len = 0;

    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      path.setAttribute("stroke-dashoffset", String(len * (1 - p)));
    };

    const build = () => {
      const w = svg.clientWidth;
      const h = svg.clientHeight;
      if (!w || !h) return;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      // Serpentine down the middle: one turn every ~1.7 viewport heights,
      // swinging a modest amplitude either side of center.
      const cx = w / 2;
      const amp = Math.min(w * 0.14, 260);
      const step = Math.max(window.innerHeight * 1.7, 700);
      let d = `M ${cx} 0`;
      let y = 0;
      let side = -1;
      let first = true;
      while (y < h - 1) {
        const yNext = Math.min(y + step, h);
        const x = Math.round(cx + side * amp);
        d += first
          ? ` C ${cx} ${Math.round(y + step / 2)} ${x} ${Math.round(yNext - step / 2)} ${x} ${Math.round(yNext)}`
          : ` S ${x} ${Math.round(yNext - step / 2)} ${x} ${Math.round(yNext)}`;
        first = false;
        side = -side;
        y = yNext;
      }
      path.setAttribute("d", d);
      len = path.getTotalLength();
      if (!reduced) {
        path.setAttribute("stroke-dasharray", String(len));
        update();
      }
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(svg);
    if (!reduced) window.addEventListener("scroll", update, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <svg ref={svgRef} className="h-full w-full" fill="none">
        <path
          ref={pathRef}
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-60"
        />
      </svg>
    </div>
  );
}
