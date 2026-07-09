import { STEPS } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * Real sequence, so the 01/02/03 numbering is earned. A dashed blueprint
 * path connects the steps; each snaps in on scroll.
 */
export function Process() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="bp-grid absolute inset-0 [mask-image:radial-gradient(90%_100%_at_50%_0%,black_30%,transparent_85%)]"
      />
      <div className="container-tight relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Proces</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.015em] sm:text-5xl">
            Od nazwy firmy do gotowej strony.
          </h2>
        </Reveal>

        <div className="relative mt-14">
          {/* Connecting blueprint path (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[22px] hidden border-t border-dashed border-navy-line md:block"
          />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 120} className="relative">
                <span className="relative z-10 inline-flex items-center gap-3 bg-ink pr-4">
                  <span className="grid h-11 w-11 place-items-center border border-flame bg-flame/10 font-mono text-sm font-bold text-flame">
                    0{i + 1}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-slate">{step.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
