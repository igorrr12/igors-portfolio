"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "./icons";

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** Load eagerly for the first (above-the-fold) instance. */
  priority?: boolean;
  className?: string;
};

/**
 * Draggable before/after comparison.
 * - Left of the handle shows the OLD site, right shows the NEW one.
 * - Works with mouse, touch and pen via Pointer Events.
 * - Keyboard accessible: focus the handle and use arrow keys / Home / End.
 */
export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  priority = false,
  className = "",
}: CompareSliderProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      /* no-op: capture not supported for this pointer */
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
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={`group relative aspect-[1440/900] w-full cursor-ew-resize select-none touch-none overflow-hidden bg-night ${className}`}
    >
      {/* AFTER — full width underneath */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1180px) 90vw, 640px"
        className="pointer-events-none object-cover object-top"
        draggable={false}
      />

      {/* BEFORE — clipped to the left of the handle */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden
      >
        <Image
          src={beforeSrc}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1180px) 90vw, 640px"
          className="pointer-events-none object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Screen-reader alt for the before image (hidden visually) */}
      <span className="sr-only">{beforeAlt}</span>

      {/* Corner tags */}
      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-night/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
        Przed
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-cta">
        Po
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-20 -ml-px w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(15,23,42,0.15)]"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Suwak porównania: przeciągnij, aby porównać starą i nową stronę"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-night shadow-float ring-1 ring-black/5 transition-transform duration-150 group-hover:scale-105 focus-visible:scale-105"
        >
          <ChevronsLeftRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
