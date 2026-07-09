import { CASE_STUDIES } from "@/lib/content";
import { Reveal } from "./Reveal";

export function CaseStudies() {
  return (
    <section id="efekty" className="relative scroll-mt-16 bg-paper py-20 text-ink sm:py-28">
      <div aria-hidden className="bp-grid-paper absolute inset-0" />
      <div className="container-tight relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow !text-flame-deep">Efekty</span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.015em] sm:text-5xl">
            Jak dobra strona zmienia wynik.
          </h2>
          <p className="mt-4 text-lg text-slate-deep">
            Typowe scenariusze dla lokalnych firm w Warszawie. Problem, rozwiązanie i efekt.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.tag} delay={i * 90} guide className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-7">
                <span className="self-start border border-ink/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink/70">
                  {cs.tag}
                </span>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-flame-deep">
                      problem
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-snug">{cs.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-flame-deep">
                      rozwiązanie
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-snug">{cs.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-flame-deep">
                      efekt
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-snug">{cs.outcome}</dd>
                  </div>
                </dl>

                <p className="mt-6 border-t border-ink/10 pt-4 font-mono text-[13px] font-bold text-flame-deep">
                  {cs.metric}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-9 max-w-2xl text-center text-sm text-slate-deep">
            Uczciwie: to szacunkowe scenariusze na bazie typowych lokalnych firm, a nie zmyślone
            cytaty. Realne liczby zależą od Twojej branży i lokalizacji.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
