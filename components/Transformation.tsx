"use client";

import { useEffect, useRef, useState } from "react";
import { EXAMPLES } from "@/lib/content";
import { CompareSlider } from "./CompareSlider";
import { Frame } from "./Frame";
import { Reveal } from "./Reveal";

/** Callouts that snap in as the scrub crosses each threshold. */
const CALLOUTS: { at: number; text: string }[] = [
  { at: 0.38, text: "Wyraźny przycisk rezerwacji nad linią zgięcia" },
  { at: 0.62, text: "Cennik widoczny od razu, bez szukania" },
  { at: 0.82, text: "Szybka i czytelna wersja na telefon" },
];

const scrubExample = EXAMPLES[0];
const gridExamples = EXAMPLES.slice(1);

/**
 * The proof moment. On desktop the section pins and scrolling scrubs the
 * before/after wipe (plus callout chips). On mobile / reduced-motion it
 * falls back to stacked draggable sliders.
 */
export function Transformation() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [scrubOn, setScrubOn] = useState(false);
  const raf = useRef<number>();

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setScrubOn(wide.matches && !still.matches);
    update();
    wide.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!scrubOn) return;
    const onScroll = () => {
      cancelAnimationFrame(raf.current!);
      raf.current = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf.current!);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrubOn]);

  // Divider starts far right (old site fills the frame) and sweeps left,
  // so the story ends on the new site.
  const sliderPos = 94 - progress * 88;

  return (
    <section id="metamorfozy" className="relative scroll-mt-16 bg-paper text-ink">
      <div aria-hidden className="bp-grid-paper absolute inset-0" />

      {/* ── Desktop: pinned scroll-scrub ── */}
      {scrubOn ? (
        <div ref={trackRef} className="relative h-[260vh]">
          <div className="sticky top-0 flex h-screen flex-col justify-center">
            <div className="container-tight relative">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="eyebrow !text-flame-deep">Metamorfozy</span>
                  <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold tracking-[-0.015em] sm:text-5xl">
                    Przewiń i zobacz różnicę.
                  </h2>
                </div>
                <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-slate-deep">
                  przed{" "}
                  <span className="mx-2 inline-block h-px w-14 translate-y-[-3px] bg-slate-deep/50 align-middle" />
                  <span className="text-flame-deep">po · {Math.round(progress * 100)}%</span>
                </p>
              </div>

              <div className="relative mt-8">
                <Frame url="fryzjerpulawska.pl">
                  <CompareSlider
                    beforeSrc={scrubExample.beforeSrc}
                    afterSrc={scrubExample.afterSrc}
                    beforeAlt={`${scrubExample.name}, stara strona przed metamorfozą`}
                    afterAlt={`${scrubExample.name}, nowa strona po metamorfozie`}
                    posOverride={sliderPos}
                    priority
                  />
                </Frame>

                {/* Callout chips snap in as the wipe crosses them */}
                <div className="pointer-events-none absolute right-6 top-1/2 z-20 flex w-[300px] -translate-y-1/2 flex-col gap-3">
                  {CALLOUTS.map((c) => {
                    const on = progress >= c.at;
                    return (
                      <div
                        key={c.at}
                        className="flex items-start gap-2.5 rounded-lg bg-ink/90 px-4 py-3 text-sm font-semibold text-white shadow-card-dark backdrop-blur-sm transition-all duration-500 ease-snap"
                        style={{
                          opacity: on ? 1 : 0,
                          transform: on ? "none" : "translateX(26px)",
                        }}
                      >
                        <span className="mt-[3px] h-2 w-2 shrink-0 border border-flame bg-flame/20" />
                        {c.text}
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-slate-deep/70">
                {scrubExample.name} · prawdziwy projekt
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ── Mobile / reduced-motion: stacked draggable sliders ── */
        <div className="container-tight relative py-16">
          <Reveal>
            <span className="eyebrow !text-flame-deep">Metamorfozy</span>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
              Przeciągnij suwak i zobacz różnicę.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-10">
            {EXAMPLES.map((ex, i) => (
              <Reveal key={ex.id} delay={i * 70} guide>
                <Frame url={`${ex.id}.pl`}>
                  <CompareSlider
                    beforeSrc={ex.beforeSrc}
                    afterSrc={ex.afterSrc}
                    beforeAlt={`${ex.name}, stara strona przed metamorfozą`}
                    afterAlt={`${ex.name}, nowa strona po metamorfozie`}
                  />
                </Frame>
                <p className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-semibold">{ex.name}</span>
                  <span className="text-right text-sm text-slate-deep">{ex.label}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* ── Desktop: the other two projects, draggable ── */}
      {scrubOn && (
        <div className="container-tight relative pb-24">
          <div className="grid gap-8 lg:grid-cols-2">
            {gridExamples.map((ex, i) => (
              <Reveal key={ex.id} delay={i * 90} guide>
                <Frame url={`${ex.id}.pl`}>
                  <CompareSlider
                    beforeSrc={ex.beforeSrc}
                    afterSrc={ex.afterSrc}
                    beforeAlt={`${ex.name}, stara strona przed metamorfozą`}
                    afterAlt={`${ex.name}, nowa strona po metamorfozie`}
                  />
                </Frame>
                <p className="mt-3.5 flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg font-semibold">{ex.name}</span>
                  <span className="text-right text-sm text-slate-deep">{ex.label}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
