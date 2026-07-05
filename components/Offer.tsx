import { INCLUDED } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowRight, Bolt, Check, Shield } from "./icons";

export function Offer() {
  return (
    <section id="oferta" className="scroll-mt-20 bg-surface py-16 sm:py-20">
      <div className="container-tight">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Oferta</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Co dostajesz i ile to kosztuje
          </h2>
          <p className="mt-4 text-lg text-muted">
            Jedna, konkretna oferta. Bez pakietów, o których nie masz czasu czytać.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
          {/* What's included */}
          <Reveal className="rounded-3xl border border-line bg-bg p-7 sm:p-9">
            <h3 className="font-display text-xl font-bold text-ink">W cenie masz wszystko, co potrzebne</h3>
            <ul className="mt-6 grid gap-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Price + speed */}
          <Reveal className="flex flex-col rounded-3xl border border-primary/25 bg-gradient-to-b from-[#fff3ea] to-surface p-7 shadow-card sm:p-9">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Bolt className="h-4.5 w-4.5" />
              Gotowe w 72 godziny
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-muted">Strona wizytówka / one-page</p>
              <p className="mt-1 font-display text-4xl font-extrabold text-ink">
                od 1200 zł
              </p>
              <p className="mt-1 text-sm text-muted">jednorazowo, bez ukrytych kosztów</p>
            </div>

            <p className="mt-5 rounded-2xl bg-surface/70 px-4 py-3 text-sm leading-relaxed text-muted">
              Strona z rezerwacją online, menu lub sklepem? Wycenę podam po darmowym projekcie,
              zawsze prostym językiem.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-ink">
              <Shield className="h-5 w-5 text-ok" />
              Płacisz dopiero, gdy zaakceptujesz projekt.
            </div>

            <a href="#projekt" className="btn-primary mt-6 w-full">
              Odbierz darmowy projekt
              <ArrowRight className="h-5 w-5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
