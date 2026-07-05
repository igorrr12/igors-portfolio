import { EXAMPLES } from "@/lib/content";
import { BrowserFrame } from "./BrowserFrame";
import { CompareSlider } from "./CompareSlider";
import { ArrowRight, Bolt, Check, MapPin, Star } from "./icons";

const hero = EXAMPLES[0];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft decorative glow, purely aesthetic */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container-tight relative grid items-center gap-12 pb-8 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-16 lg:pt-20">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="eyebrow">
            <MapPin className="h-3.5 w-3.5" />
            Strony dla lokalnych firm w Warszawie
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Więcej rezerwacji, telefonów i{" "}
            <span className="relative whitespace-nowrap text-primary">
              klientów
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-primary/40"
                preserveAspectRatio="none"
              >
                <path d="M2 8c40-6 156-6 196 0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{" "}
            z Twojej okolicy.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Nowoczesna strona dla Twojej firmy, gotowa w 72 godziny. Zaprojektowana tak, żeby
            zamieniać osoby, które Cię znajdą, w realne rezerwacje i telefony.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#projekt" className="btn-primary">
              Odbierz darmowy projekt
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#przyklady" className="btn-secondary">
              Zobacz przykłady
            </a>
          </div>

          <p className="mt-3.5 text-sm font-medium text-muted">
            Darmowy projekt, bez zobowiązań, gotowy w 24 godziny.
          </p>

          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-ink">
            <li className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" /> Płacisz po akceptacji
            </li>
            <li className="flex items-center gap-1.5">
              <Bolt className="h-4 w-4 text-primary" /> Gotowe w 72h
            </li>
            <li className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-primary" /> Realne metamorfozy niżej
            </li>
          </ul>
        </div>

        {/* Interactive proof, right in the hero */}
        <div className="animate-fade-up lg:pl-4" style={{ animationDelay: "120ms" }}>
          <BrowserFrame url="fryzjerpulawska.pl">
            <CompareSlider
              beforeSrc={hero.beforeSrc}
              afterSrc={hero.afterSrc}
              beforeAlt={`${hero.name}, stara strona przed metamorfozą`}
              afterAlt={`${hero.name}, nowa strona po metamorfozie`}
              priority
            />
          </BrowserFrame>
          <p className="mt-3 text-center text-sm font-medium text-muted">
            <span className="font-semibold text-ink">Przeciągnij suwak</span> i zobacz różnicę.
            Prawdziwa metamorfoza, {hero.name}.
          </p>
        </div>
      </div>
    </section>
  );
}
