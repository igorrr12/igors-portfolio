import { EXAMPLES } from "@/lib/content";
import { BrowserFrame } from "./BrowserFrame";
import { CompareSlider } from "./CompareSlider";
import { Reveal } from "./Reveal";
import { Check } from "./icons";

export function BeforeAfter() {
  return (
    <section id="przyklady" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-tight">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Metamorfozy</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Zobacz różnicę, którą widzą Twoi klienci
          </h2>
          <p className="mt-4 text-lg text-muted">
            Przeciągnij suwak i porównaj starą stronę z nową. To prawdziwe projekty dla
            warszawskich firm.
          </p>
        </Reveal>

        <div className="mt-12 space-y-14">
          {EXAMPLES.map((ex, i) => (
            <Reveal key={ex.id}>
              <article className="grid items-center gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <BrowserFrame url={`${ex.id}.pl`}>
                    <CompareSlider
                      beforeSrc={ex.beforeSrc}
                      afterSrc={ex.afterSrc}
                      beforeAlt={`${ex.name}, stara strona przed metamorfozą`}
                      afterAlt={`${ex.name}, nowa strona po metamorfozie`}
                    />
                  </BrowserFrame>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    {ex.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-ink">{ex.name}</h3>
                  <div className="mt-4 inline-flex items-start gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3 shadow-soft">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] font-semibold leading-snug text-ink">
                      {ex.label}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    Ten sam biznes, zupełnie inne pierwsze wrażenie. Nowa strona prowadzi klienta
                    prosto do kontaktu, zamiast zostawiać go z pytaniami.
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a href="#projekt" className="btn-primary">
            Chcę taką metamorfozę u siebie
          </a>
        </Reveal>
      </div>
    </section>
  );
}
