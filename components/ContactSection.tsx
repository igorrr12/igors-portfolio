"use client";

import { useState } from "react";
import { CONTACT, dmMessage, igDmLink, mailLink, telLink } from "@/lib/config";
import { CONTACT_SECTION } from "@/lib/content";
import { ArrowRight, Check, Instagram } from "./icons";
import { Reveal } from "./Reveal";
import { WallLabel } from "./WallLabel";

/**
 * The contact section = the IG-DM capture. Instagram can't pre-fill
 * a DM, so on submit we copy a ready message to the clipboard and open
 * the visitor's thread to paste.
 */
export function ContactSection() {
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

  const inputClass = (invalid: boolean) =>
    `h-[52px] w-full border-0 border-b bg-transparent px-0 text-lg outline-none transition-colors placeholder:text-stone/50 focus:border-accent ${
      invalid ? "border-red-700" : "border-ink/25"
    }`;

  return (
    <section
      id="kontakt"
      data-gallery-stop="Kontakt"
      className="gallery-frame pb-[16vh] pt-[22vh] sm:pt-[30vh]"
    >
      <WallLabel caption={CONTACT_SECTION.caption} title={CONTACT_SECTION.title} />

      <Reveal selector=":scope > *" className="mt-10 grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <p className="max-w-prose-narrow text-base leading-relaxed text-stone sm:text-lg">{CONTACT_SECTION.sub}</p>

        <div>
          {!sent ? (
            <form onSubmit={handleSubmit} noValidate className="max-w-md">
              {/* Requiredness is carried by the word, not by the accent colour:
                  #FF6A2C measures 2.62:1 on ivory, under the AA floor. */}
              <label htmlFor="business" className="caption block">
                {CONTACT_SECTION.fieldBusiness}{" "}
                <span className="normal-case tracking-normal text-stone">(wymagane)</span>
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
                placeholder={CONTACT_SECTION.fieldBusinessPlaceholder}
                aria-invalid={error}
                aria-describedby={error ? "business-error" : undefined}
                className={`mt-1 ${inputClass(error)}`}
              />
              {error && (
                <p id="business-error" role="alert" className="mt-2 text-sm text-red-700">
                  {CONTACT_SECTION.fieldBusinessError}
                </p>
              )}

              <label htmlFor="link" className="caption mt-8 block">
                {CONTACT_SECTION.fieldLink}{" "}
                <span className="normal-case tracking-normal text-stone">{CONTACT_SECTION.fieldLinkOptional}</span>
              </label>
              <input
                id="link"
                name="link"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder={CONTACT_SECTION.fieldLinkPlaceholder}
                className={`mt-1 ${inputClass(false)}`}
              />

              <button
                type="submit"
                className="press group mt-10 inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 bg-ink px-8 text-base font-medium text-ivory hover:bg-black sm:w-auto"
              >
                {CONTACT_SECTION.submit}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1" />
              </button>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-stone">
                <Instagram className="h-4 w-4 text-accent" style={{ width: 16, height: 16 }} />
                {CONTACT_SECTION.privacy}
              </p>
              {/* The email/phone path is load-bearing for the cold-email audience
                  (catering, warsztaty, biura rachunkowe), who often has no
                  Instagram at all. It must be visible without interacting. */}
              <p className="mt-3 text-sm text-stone">
                {CONTACT_SECTION.altContactLead}{" "}
                <a href={mailLink} className="link-under whitespace-nowrap text-ink">
                  {CONTACT.email}
                </a>{" "}
                ·{" "}
                <a href={telLink} className="link-under whitespace-nowrap text-ink">
                  {CONTACT.phone}
                </a>
              </p>
            </form>
          ) : (
            <div className="max-w-md">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-accent text-accent">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium">{CONTACT_SECTION.sentTitle(business.trim())}</h3>
              <p className="mt-2 text-base leading-relaxed text-stone">
                {copied ? CONTACT_SECTION.sentCopied : CONTACT_SECTION.sentManual}
              </p>

              <div className="mt-5 border border-line bg-white/60 p-4">
                <p className="whitespace-pre-line text-sm">{message}</p>
                <button
                  type="button"
                  onClick={copyMessage}
                  className="link-under mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-ink"
                >
                  {/* Ink, not accent: this is an interactive control at 14px and
                      the accent fails AA. The icon stays accent (decorative). */}
                  <Check className="h-4 w-4 text-accent" style={{ width: 16, height: 16 }} />
                  {copied ? CONTACT_SECTION.copied : CONTACT_SECTION.copy}
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={igDmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex min-h-[52px] items-center justify-center gap-2 bg-ink px-7 text-base font-medium text-ivory hover:bg-black"
                >
                  <Instagram className="h-5 w-5" />
                  {CONTACT_SECTION.openInstagram}
                </a>
                <a
                  href={mailLink}
                  className="press inline-flex min-h-[52px] items-center justify-center border border-ink/25 px-7 text-base font-medium hover:border-accent hover:text-accent"
                >
                  {CONTACT_SECTION.preferEmail}
                </a>
              </div>
              <p className="mt-4 text-xs text-stone">
                {CONTACT.email} · {CONTACT.phone}
              </p>

              {/* Way back: the sent state used to be a one-way door, so a typo in
                  the business name could only be fixed by reloading the page. */}
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setCopied(false);
                }}
                className="link-under mt-6 inline-flex min-h-[44px] items-center text-sm text-stone"
              >
                Popraw dane
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
