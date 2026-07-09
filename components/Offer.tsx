import { INCLUDED } from "@/lib/content";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { ArrowRight, Check } from "./icons";

export function Offer() {
  return (
    <section id="oferta" className="relative scroll-mt-16 bg-paper pb-20 pt-4 text-ink sm:pb-28">
      <div className="container-tight">
        <Reveal className="max-w-2xl">
          <span className="eyebrow !text-flame-deep">Oferta</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.015em] sm:text-5xl">
            Jedna oferta. Wszystko w cenie.
          </h2>
          <p className="mt-4 text-lg text-slate-deep">
            Bez pakietów, o których nie masz czasu czytać. Konkretna strona, która ma przynosić
            klientów.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
          {/* Spec sheet: what's included */}
          <Reveal guide className="rounded-2xl border border-ink/10 bg-white p-7 shadow-card sm:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-deep">
              specyfikacja · w cenie
            </p>
            <ul className="mt-6 grid gap-4">
              {INCLUDED.map((item, i) => (
                <Reveal key={item} as="li" delay={i * 60} className="flex items-start gap-3.5">
                  <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center border border-flame bg-flame/10 text-flame-deep">
                    <Check className="h-3.5 w-3.5" style={{ width: 14, height: 14 }} />
                  </span>
                  <span className="text-[15px] leading-snug">{item}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* Price panel, ink card */}
          <Reveal delay={120} guide className="relative overflow-hidden rounded-2xl bg-ink p-7 text-white shadow-card-dark sm:p-9">
            <div aria-hidden className="bp-grid-fine absolute inset-0 opacity-60" />
            <div className="relative flex h-full flex-col">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
                wycena · strona wizytówka
              </p>

              <p className="mt-6 font-display text-5xl font-semibold tracking-tight">
                399 <span className="text-3xl">zł</span>
              </p>
              <p className="mt-2 text-sm text-slate">jednorazowo, bez ukrytych kosztów</p>

              <p className="mt-6 rounded-xl border border-navy-line/60 bg-white/[0.03] px-4 py-3.5 text-sm leading-relaxed text-slate">
                Strona z rezerwacją online, menu lub sklepem? Wycenę podam po darmowym projekcie,
                zawsze prostym językiem.
              </p>

              <p className="mt-6 flex items-center gap-2.5 text-sm font-semibold text-white">
                <span className="grid h-5 w-5 place-items-center border border-flame bg-flame/15 text-flame">
                  <Check className="h-3.5 w-3.5" style={{ width: 14, height: 14 }} />
                </span>
                Płacisz dopiero, gdy zaakceptujesz projekt.
              </p>

              <Magnetic className="mt-8 w-full">
                <a href="#projekt" className="btn-flame w-full">
                  Odbierz darmowy projekt
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
