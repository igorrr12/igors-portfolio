import { CONTACT, igDmLink } from "@/lib/config";
import { Reveal } from "./Reveal";
import { ArrowRight, Bolt, Check, Instagram } from "./icons";

const flow = [
  { title: "Piszesz do mnie", desc: "Zostawiasz nazwę firmy i link." },
  { title: "Akceptujesz projekt", desc: "Dostajesz go w 24h, bez opłat." },
  { title: "Publikujemy", desc: "Strona jest gotowa w 72 godziny." },
];

export function FinalCta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-tight">
        <Reveal className="overflow-hidden rounded-4xl border border-line bg-gradient-to-br from-[#fff3ea] via-surface to-[#fdeee2] px-6 py-12 text-center shadow-card sm:px-10 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
            <Bolt className="h-4 w-4" />
            W tym tygodniu przyjmuję {CONTACT.weeklySlots} nowe projekty
          </span>

          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-[2.6rem]">
            Twoja konkurencja już jest w internecie. Ty możesz tam być za 72 godziny.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Darmowy projekt na start, płatność dopiero po akceptacji, gotowa strona w trzy dni.
            Prościej się nie da.
          </p>

          <div className="mx-auto mt-9 grid max-w-2xl gap-4 sm:grid-cols-3">
            {flow.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-line bg-surface/70 p-4 text-left">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <p className="mt-3 font-semibold text-ink">{s.title}</p>
                <p className="mt-0.5 text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#projekt" className="btn-primary">
              Odbierz darmowy projekt
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={igDmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ig !min-h-[52px]"
            >
              <Instagram className="h-5 w-5" />
              Napisz na Instagramie
            </a>
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium text-muted">
            <Check className="h-4 w-4 text-ok" />
            Bez zobowiązań. Odpowiadam tego samego dnia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
