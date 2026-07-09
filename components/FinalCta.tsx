"use client";

import { useState } from "react";
import { CONTACT, dmMessage, igDmLink, mailLink } from "@/lib/config";
import { FINAL, STEPS } from "@/lib/content";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { ArrowRight, Check, Instagram } from "./icons";

/**
 * The close. Big type, one glow, and the IG-DM capture: Instagram can't
 * pre-fill a DM, so we copy a ready message to the clipboard and open the
 * thread for the visitor to paste.
 */
export function FinalCta() {
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
    await copyMessage();
    window.open(igDmLink, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="projekt" className="grain relative scroll-mt-16 overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="bp-grid bp-drift absolute inset-0 [mask-image:radial-gradient(100%_90%_at_50%_100%,black_25%,transparent_80%)]"
      />
      {/* One ambient flame glow, pulsing slowly */}
      <div
        aria-hidden
        className="glow-pulse pointer-events-none absolute bottom-[-30%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-flame/15 blur-3xl"
      />

      <div className="container-tight relative">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Left: the close + the 3 steps */}
          <div>
            <Reveal>
              <span className="eyebrow">Darmowy projekt</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
                {FINAL.title}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate">{FINAL.sub}</p>
            </Reveal>

            <ol className="mt-10 space-y-6">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} as="li" delay={220 + i * 90} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-flame bg-flame/10 font-mono text-xs font-bold text-flame">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-slate">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Right: form card */}
          <Reveal delay={200} from="right" guide>
            <div className="rounded-2xl bg-white p-6 text-ink shadow-card-dark sm:p-8">
              {!sent ? (
                <form onSubmit={handleSubmit} noValidate>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-deep">
                    zapytanie · 1 minuta
                  </p>

                  <div className="mt-5">
                    <label htmlFor="business" className="block text-sm font-bold">
                      Nazwa Twojej firmy <span className="text-flame-deep">*</span>
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
                      className={`mt-2 h-[52px] w-full rounded-xl border bg-paper px-4 text-base outline-none transition-colors placeholder:text-slate-deep/60 focus:border-flame focus:ring-4 focus:ring-flame/15 ${
                        error ? "border-[#dc2626]" : "border-ink/15"
                      }`}
                    />
                    {error && (
                      <p id="business-error" role="alert" className="mt-1.5 text-sm font-medium text-[#dc2626]">
                        Wpisz nazwę firmy, żebym wiedział dla kogo projektuję.
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label htmlFor="link" className="block text-sm font-bold">
                      Instagram lub strona <span className="font-normal text-slate-deep">(opcjonalnie)</span>
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
                      className="mt-2 h-[52px] w-full rounded-xl border border-ink/15 bg-paper px-4 text-base outline-none transition-colors placeholder:text-slate-deep/60 focus:border-flame focus:ring-4 focus:ring-flame/15"
                    />
                  </div>

                  <Magnetic className="mt-6 w-full">
                    <button type="submit" className="btn-flame w-full">
                      Odbierz darmowy projekt
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </Magnetic>

                  <p className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-sm text-slate-deep">
                    <Instagram className="h-4 w-4 text-flame-deep" style={{ width: 16, height: 16 }} />
                    Otworzę Twój czat na Instagramie z gotową wiadomością. Zero spamu.
                  </p>
                </form>
              ) : (
                <div className="py-2 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center border border-flame bg-flame/10 text-flame-deep">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">
                    Świetnie, {business.trim()}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slate-deep">
                    {copied
                      ? "Skopiowałem gotową wiadomość i otwieram Twój czat na Instagramie. Wklej ją i wyślij, a projekt wróci w 24h."
                      : "Otwieram Twój czat na Instagramie. Skopiuj wiadomość poniżej, wyślij ją, a projekt wróci w 24h."}
                  </p>

                  <div className="mt-4 rounded-xl border border-ink/10 bg-paper p-3.5 text-left">
                    <p className="whitespace-pre-line text-sm">{message}</p>
                    <button
                      type="button"
                      onClick={copyMessage}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-flame-deep hover:text-flame"
                    >
                      <Check className="h-4 w-4" style={{ width: 16, height: 16 }} />
                      {copied ? "Skopiowano" : "Kopiuj wiadomość"}
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                    <a
                      href={igDmLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-flame !min-h-[52px]"
                    >
                      <Instagram className="h-5 w-5" />
                      Otwórz Instagram
                    </a>
                    <a href={mailLink} className="btn-line-light">
                      Wolisz e-mail?
                    </a>
                  </div>
                  <p className="mt-4 text-xs text-slate-deep">Wolisz mail? Napisz na {CONTACT.email}</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
