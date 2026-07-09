"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "./icons";

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** Load eagerly for above-the-fold instances. */
  priority?: boolean;
  /**
   * Scroll-scrub mode: when set, the slider is driven externally (0-100)
   * and pointer dragging is disabled.
   */
  posOverride?: number;
  className?: string;
};

/**
 * Before/after comparison. Left of the flame handle = old site, right = new.
 * Draggable (pointer + keyboard) unless `posOverride` drives it.
 */
export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  priority = false,
  posOverride,
  className = "",
}: CompareSliderProps) {
  const [dragPos, setDragPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const scrubbed = posOverride !== undefined;
  const pos = scrubbed ? posOverride : dragPos;

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setDragPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (scrubbed) return;
    dragging.current = true;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      /* capture unsupported for this pointer */
    }
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const stopDragging = (e: React.PointerEvent) => {
    dragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (scrubbed) return;
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setDragPos((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setDragPos((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setDragPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setDragPos(100);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={`group relative aspect-[1440/900] w-full select-none overflow-hidden bg-ink ${
        scrubbed ? "" : "cursor-ew-resize touch-none"
      } ${className}`}
    >
      {/* AFTER — full width underneath */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 720px"
        className="pointer-events-none object-cover object-top"
        draggable={false}
      />

      {/* BEFORE — clipped to the left of the handle */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden>
        <Image
          src={beforeSrc}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 720px"
          className="pointer-events-none object-cover object-top"
          draggable={false}
        />
      </div>
      <span className="sr-only">{beforeAlt}</span>

      {/* Mono corner tags, design-tool style */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-sm bg-ink/85 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
        przed
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-sm bg-flame px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
        po
      </span>

      {/* Divider + flame handle */}
      <div
        className="absolute inset-y-0 z-20 -ml-px w-[2px] bg-flame shadow-[0_0_12px_rgba(255,106,44,0.45)]"
        style={{ left: `${pos}%` }}
      >
        {!scrubbed && (
          <button
            type="button"
            role="slider"
            aria-label="Suwak porównania: przeciągnij, aby porównać starą i nową stronę"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] bg-flame text-ink shadow-cta transition-transform duration-150 ease-out group-hover:scale-105 focus-visible:scale-105"
          >
            <ChevronsLeftRight className="h-5 w-5" />
          </button>
        )}
        {scrubbed && (
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] bg-flame text-ink shadow-cta"
          >
            <ChevronsLeftRight className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
          </span>
        )}
      </div>
    </div>
  );
}
