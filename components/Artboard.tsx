"use client";

import { useRef } from "react";

/**
 * The hero signature: a design-tool artboard where a local-business site
 * assembles itself. Wireframe blocks snap in, get selected (flame box +
 * handles + measurements), then "render" into a finished mini-site while
 * the sitelab cursor travels across the canvas.
 *
 * Pure CSS keyframes (see globals.css) + pointer-parallax on desktop.
 */
export function Artboard() {
  const gridRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>();

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    cancelAnimationFrame(raf.current!);
    raf.current = requestAnimationFrame(() => {
      // Three depths: grid (far), site (mid), cursor (near).
      if (gridRef.current) gridRef.current.style.transform = `translate(${nx * -5}px, ${ny * -5}px)`;
      if (siteRef.current) siteRef.current.style.transform = `translate(${nx * -10}px, ${ny * -10}px)`;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${nx * -16}px, ${ny * -16}px)`;
    });
  }

  function onLeave() {
    cancelAnimationFrame(raf.current!);
    for (const r of [gridRef, siteRef, cursorRef]) {
      if (r.current) r.current.style.transform = "";
    }
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative aspect-[4/3.1] w-full select-none overflow-hidden rounded-[14px] border border-navy-line/60 bg-ink-soft shadow-card-dark"
      aria-label="Animacja: strona internetowa składa się na kanwie projektowej"
      role="img"
    >
      {/* Depth 1: drifting blueprint grid */}
      <div ref={gridRef} className="bp-grid-fine bp-drift absolute -inset-6 transition-transform duration-300 ease-out" />

      {/* Artboard chrome */}
      <div className="relative flex h-9 items-center justify-between border-b border-navy-line/40 px-3.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-navy-line" />
          <span className="h-2 w-2 rounded-full bg-navy-line" />
          <span className="h-2 w-2 rounded-full bg-flame/70" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-slate">
          getsitelab.pl · artboard 01
        </span>
        <span className="font-mono text-[10px] text-slate/70">100%</span>
      </div>

      {/* Depth 2: the mini-site being built */}
      <div
        ref={siteRef}
        className="absolute inset-x-0 bottom-0 top-9 px-[7%] py-[6%] transition-transform duration-300 ease-out"
      >
        <div className="relative mx-auto flex h-full flex-col gap-[4.5%]">
          {/* ── navbar ── */}
          <div className="blk relative h-[11%]" style={{ animationDelay: "0.15s" }}>
            <div className="wf absolute inset-0 rounded-md border border-dashed border-navy-line" style={{ animationDelay: "1.5s" }}>
              <div className="flex h-full items-center gap-2 px-2.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-navy-line/50" />
                <span className="h-1.5 w-12 rounded-full bg-navy-line/40" />
                <span className="ml-auto h-1.5 w-6 rounded-full bg-navy-line/40" />
                <span className="h-1.5 w-6 rounded-full bg-navy-line/40" />
                <span className="h-4 w-10 rounded border border-navy-line/50" />
              </div>
            </div>
            <div className="rd absolute inset-0 rounded-md border border-white/10 bg-white/[0.04]" style={{ animationDelay: "1.55s" }}>
              <div className="flex h-full items-center gap-2 px-2.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-flame" />
                <span className="font-mono text-[8px] font-bold tracking-[0.16em] text-white">BARBER STUDIO</span>
                <span className="ml-auto h-1 w-6 rounded-full bg-white/25" />
                <span className="h-1 w-6 rounded-full bg-white/25" />
                <span className="grid h-4 place-items-center rounded bg-flame px-1.5 font-sans text-[7.5px] font-bold text-ink">
                  Umów
                </span>
              </div>
            </div>
          </div>

          {/* ── hero block (the selected one) ── */}
          <div className="blk relative h-[42%]" style={{ animationDelay: "0.32s" }}>
            <div className="wf absolute inset-0 rounded-md border border-dashed border-navy-line" style={{ animationDelay: "1.7s" }}>
              <div className="grid h-full grid-cols-[1.25fr_1fr] gap-2 p-2.5">
                <div className="flex flex-col justify-center gap-2">
                  <span className="h-2.5 w-[85%] rounded-full bg-navy-line/50" />
                  <span className="h-2.5 w-[60%] rounded-full bg-navy-line/50" />
                  <span className="h-1.5 w-[70%] rounded-full bg-navy-line/35" />
                  <span className="mt-1 h-5 w-16 rounded border border-navy-line/50" />
                </div>
                <div className="rounded border border-dashed border-navy-line/60" />
              </div>
            </div>
            <div className="rd absolute inset-0 rounded-md border border-white/10 bg-gradient-to-br from-navy/70 to-ink" style={{ animationDelay: "1.75s" }}>
              <div className="grid h-full grid-cols-[1.25fr_1fr] gap-2 p-2.5">
                <div className="flex flex-col justify-center">
                  <p className="font-display text-[11px] font-bold leading-tight text-white sm:text-[13px]">
                    Klasyczne cięcie
                    <br />
                    na Mokotowie
                  </p>
                  <p className="mt-1 text-[7.5px] leading-snug text-slate">
                    Bez czekania. Rezerwacja online w 30 sekund.
                  </p>
                  <span className="mt-1.5 grid h-5 w-fit place-items-center rounded bg-flame px-2 font-sans text-[8px] font-bold text-ink">
                    Umów wizytę
                  </span>
                </div>
                <div className="relative overflow-hidden rounded bg-gradient-to-br from-navy-line/80 to-navy">
                  <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(255,255,255,0.08)_6px,rgba(255,255,255,0.08)_7px)]" />
                </div>
              </div>
            </div>

            {/* Selection box + handles + measurements (persists: the signature) */}
            <div className="sel-anim absolute -inset-[7px]" style={{ animationDelay: "1.05s" }} aria-hidden>
              <div className="sel-box inset-0" />
              <span className="sel-handle -left-1 -top-1" />
              <span className="sel-handle -right-1 -top-1" />
              <span className="sel-handle -bottom-1 -left-1" />
              <span className="sel-handle -bottom-1 -right-1" />
              <span className="absolute -top-[18px] left-0 bg-flame px-1.5 py-px font-mono text-[8px] font-bold lowercase text-ink">
                hero
              </span>
              <span className="absolute -bottom-[18px] right-0 font-mono text-[8px] tracking-wider text-slate">
                1440 × 560
              </span>
            </div>
          </div>

          {/* ── services row with prices ── */}
          <div className="blk relative flex-1" style={{ animationDelay: "0.5s" }}>
            <div className="wf absolute inset-0" style={{ animationDelay: "1.9s" }}>
              <div className="grid h-full grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-md border border-dashed border-navy-line p-2">
                    <div className="h-[45%] rounded border border-dashed border-navy-line/60" />
                    <span className="mt-1.5 block h-1.5 w-[70%] rounded-full bg-navy-line/40" />
                    <span className="mt-1 block h-1.5 w-[35%] rounded-full bg-navy-line/40" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rd absolute inset-0" style={{ animationDelay: "1.95s" }}>
              <div className="grid h-full grid-cols-3 gap-2">
                {[
                  { name: "Strzyżenie", price: "80 zł" },
                  { name: "Broda", price: "60 zł" },
                  { name: "Combo", price: "120 zł" },
                ].map((s) => (
                  <div key={s.name} className="flex flex-col rounded-md border border-white/10 bg-white/[0.04] p-2">
                    <div className="h-[45%] rounded bg-gradient-to-br from-navy-line/70 to-navy" />
                    <span className="mt-1.5 font-sans text-[8px] font-semibold text-white">{s.name}</span>
                    <span className="mt-auto w-fit rounded border border-flame/60 px-1 py-px font-mono text-[7.5px] font-medium text-flame">
                      {s.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Depth 3: the sitelab cursor (desktop only — its path is tuned for the wide artboard) */}
      <div
        ref={cursorRef}
        className="absolute left-6 top-10 z-10 hidden transition-transform duration-300 ease-out sm:block"
        aria-hidden
      >
        <div className="cursor-anim">
          <svg width="15" height="15" viewBox="0 0 24 24" className="drop-shadow-md">
            <path d="M5 3l14 8-6.5 1.5L9 19 5 3Z" fill="#fff" stroke="#080B12" strokeWidth="1.4" />
          </svg>
          <span className="ml-3 -mt-0.5 block w-fit rounded-sm bg-flame px-1.5 py-px font-mono text-[8.5px] font-bold text-ink shadow-md">
            sitelab
          </span>
        </div>
      </div>
    </div>
  );
}
