import { CASE_STUDIES } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./icons";

export function CaseStudies() {
  return (
    <section id="efekty" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-tight">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Przykładowe efekty</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Jak dobra strona zmienia wynik
          </h2>
          <p className="mt-4 text-lg text-muted">
            Typowe scenariusze dla lokalnych firm w Warszawie. Problem, rozwiązanie i efekt,
            którego możesz się spodziewać.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.tag} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 shadow-soft">
                <span className="self-start rounded-full bg-ink/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                  {cs.tag}
                </span>

                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary">Problem</dt>
                    <dd className="mt-1 text-[15px] leading-snug text-ink">{cs.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary">Rozwiązanie</dt>
                    <dd className="mt-1 text-[15px] leading-snug text-ink">{cs.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-primary">Efekt</dt>
                    <dd className="mt-1 text-[15px] leading-snug text-ink">{cs.outcome}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
                  <ArrowRight className="h-4 w-4 text-ok" />
                  <span className="text-sm font-bold text-ok">{cs.metric}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
            Uczciwie: to szacunkowe scenariusze na bazie typowych lokalnych firm, a nie zmyślone
            cytaty. Realne liczby zależą od Twojej branży i lokalizacji.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
