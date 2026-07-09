import { HERO, STATS } from "@/lib/content";
import { Artboard } from "./Artboard";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./icons";

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-ink">
      {/* Ambient blueprint canvas, faded at the edges */}
      <div
        aria-hidden
        className="bp-grid bp-drift absolute inset-0 [mask-image:radial-gradient(120%_90%_at_60%_10%,black_35%,transparent_78%)]"
      />
      {/* A single soft navy glow behind the artboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-[-10%] h-[560px] w-[560px] rounded-full bg-navy/50 blur-3xl"
      />

      <div className="container-tight relative grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:pb-24 lg:pt-24">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow">{HERO.eyebrow}</span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.1rem]">
              {HERO.titleA}
              <br />
              <span className="text-slate">
                Projekt w <span className="text-white">24h</span>, online w{" "}
                <span className="relative inline-block whitespace-nowrap text-flame">
                  {/* Inline selection box: the one word that matters is "selected" */}
                  <span aria-hidden className="sel-box -inset-x-2 -inset-y-1" />
                  <span aria-hidden className="sel-handle -left-3 -top-2" />
                  <span aria-hidden className="sel-handle -right-3 -top-2" />
                  <span aria-hidden className="sel-handle -bottom-2 -left-3" />
                  <span aria-hidden className="sel-handle -bottom-2 -right-3" />
                  72h
                </span>
                .
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">{HERO.sub}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Magnetic>
                <a href="#projekt" className="btn-flame">
                  {HERO.ctaPrimary}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Magnetic>
              <a href="#metamorfozy" className="btn-line">
                {HERO.ctaSecondary}
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-slate/80">
              0 zł zaliczki · odpowiadam tego samego dnia
            </p>
          </Reveal>
        </div>

        {/* The live canvas */}
        <Reveal delay={200} from="right">
          <Artboard />
        </Reveal>
      </div>

      {/* Trust strip: the offer's spine in four numbers */}
      <div className="relative border-t border-navy-line/40">
        <div className="container-tight grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 70}
              className={`flex flex-col gap-1 border-navy-line/40 py-7 pl-6 ${
                i > 0 ? "md:border-l" : ""
              } ${i % 2 === 1 ? "border-l md:border-l" : ""}`}
            >
              <span className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {s.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
