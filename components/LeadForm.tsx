"use client";

import { useState } from "react";
import { CONTACT, dmMessage, igDmLink, mailLink } from "@/lib/config";
import { STEPS } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowRight, Check, Instagram } from "./icons";

export function LeadForm() {
  const [business, setBusiness] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = dmMessage(business.trim(), link.trim() || undefined);

  async function copyMessage(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (business.trim().length < 2) {
      setError(true);
      return;
    }
    setError(false);

    // Instagram can't pre-fill a DM, so copy the message and open the thread.
    await copyMessage();
    window.open(igDmLink, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="projekt" className="scroll-mt-20 bg-night py-16 text-white sm:py-24">
      <div className="container-tight">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
          {/* Left: promise + steps */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Darmowy projekt
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Zobacz swoją nową stronę, zanim za nią zapłacisz
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/70">
              Zostaw nazwę firmy. W 24 godziny przygotuję projekt strony głównej dopasowany do
              Twojego biznesu. Bez opłat i bez zobowiązań.
            </p>

            <ol className="mt-8 space-y-5">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-white/60">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Right: the form card */}
          <Reveal delay={100}>
            <div className="rounded-3xl bg-surface p-6 text-ink shadow-float sm:p-8">
              {!sent ? (
                <form onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="business" className="block text-sm font-semibold text-ink">
                      Nazwa Twojej firmy <span className="text-primary">*</span>
                    </label>
                    <input
                      id="business"
                      name="business"
                      type="text"
                      autoComplete="organization"
                      value={business}
                      onChange={(e) => {
                        setBusiness(e.target.value);
                        if (error) setError(false);
                      }}
                      placeholder="np. Barber Mokotów"
                      aria-invalid={error}
                      aria-describedby={error ? "business-error" : undefined}
                      className={`mt-2 h-13 w-full rounded-xl border bg-bg px-4 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/15 ${
                        error ? "border-[#dc2626]" : "border-line"
                      }`}
                    />
                    {error && (
                      <p id="business-error" role="alert" className="mt-1.5 text-sm font-medium text-[#dc2626]">
                        Wpisz nazwę firmy, żebym wiedział dla kogo projektuję.
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label htmlFor="link" className="block text-sm font-semibold text-ink">
                      Instagram lub strona{" "}
                      <span className="font-normal text-muted">(opcjonalnie)</span>
                    </label>
                    <input
                      id="link"
                      name="link"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="@twojafirma lub twojafirma.pl"
                      className="mt-2 h-13 w-full rounded-xl border border-line bg-bg px-4 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/15"
                    />
                    <p className="mt-1.5 text-sm text-muted">
                      Pomaga mi dopasować projekt do Twojego stylu i oferty.
                    </p>
                  </div>

                  <button type="submit" className="btn-primary mt-6 w-full">
                    Odbierz darmowy projekt
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-muted">
                    <Instagram className="h-4 w-4 text-primary" />
                    Otworzę Twój czat na Instagramie z gotową wiadomością. Zero spamu.
                  </p>
                </form>
              ) : (
                <div className="py-2 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ok/10 text-ok">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">
                    Świetnie, {business.trim()}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
                    {copied
                      ? "Skopiowałem gotową wiadomość i otwieram Twój czat na Instagramie. Wklej ją i wyślij, a projekt wróci w 24h."
                      : "Otwieram Twój czat na Instagramie. Skopiuj wiadomość poniżej, wyślij ją, a projekt wróci w 24h."}
                  </p>

                  {/* The message, ready to copy/paste */}
                  <div className="mt-4 rounded-2xl border border-line bg-bg p-3 text-left">
                    <p className="whitespace-pre-line text-sm text-ink">{message}</p>
                    <button
                      type="button"
                      onClick={copyMessage}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
                    >
                      <Check className="h-4 w-4" />
                      {copied ? "Skopiowano" : "Kopiuj wiadomość"}
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <a
                      href={igDmLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ig !min-h-[52px]"
                    >
                      <Instagram className="h-5 w-5" />
                      Otwórz Instagram
                    </a>
                    <a href={mailLink} className="btn-secondary">
                      Wolisz e-mail?
                    </a>
                  </div>
                  <p className="mt-4 text-xs text-muted">
                    Wolisz mail? Napisz na {CONTACT.email}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
