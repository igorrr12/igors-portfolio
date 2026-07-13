"use client";

import { useState } from "react";
import { CONTACT, dmMessage, igDmLink, mailLink } from "@/lib/config";
import { GUESTBOOK } from "@/lib/content";
import { ArrowRight, Check, Instagram } from "./icons";
import { WallLabel } from "./WallLabel";

/**
 * The gallery guest book = the IG-DM capture. Instagram can't pre-fill
 * a DM, so on submit we copy a ready message to the clipboard and open
 * the visitor's thread to paste. Logic ported 1:1 from the old FinalCta.
 */
export function GuestBook() {
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
      id="ksiega-gosci"
      data-gallery-stop="Księga gości"
      className="gallery-frame pb-[16vh] pt-[22vh] sm:pt-[30vh]"
    >
      <WallLabel caption={GUESTBOOK.caption} title={GUESTBOOK.title} />

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <p className="max-w-prose-narrow text-base leading-relaxed text-stone sm:text-lg">{GUESTBOOK.sub}</p>

        <div>
          {!sent ? (
            <form onSubmit={handleSubmit} noValidate className="max-w-md">
              <label htmlFor="business" className="caption block">
                {GUESTBOOK.fieldBusiness} <span className="text-accent">*</span>
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
                placeholder={GUESTBOOK.fieldBusinessPlaceholder}
                aria-invalid={error}
                aria-describedby={error ? "business-error" : undefined}
                className={`mt-1 ${inputClass(error)}`}
              />
              {error && (
                <p id="business-error" role="alert" className="mt-2 text-sm text-red-700">
                  {GUESTBOOK.fieldBusinessError}
                </p>
              )}

              <label htmlFor="link" className="caption mt-8 block">
                {GUESTBOOK.fieldLink}{" "}
                <span className="normal-case tracking-normal text-stone">{GUESTBOOK.fieldLinkOptional}</span>
              </label>
              <input
                id="link"
                name="link"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder={GUESTBOOK.fieldLinkPlaceholder}
                className={`mt-1 ${inputClass(false)}`}
              />

              <button
                type="submit"
                className="mt-10 inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 bg-ink px-8 text-base font-medium text-ivory transition-colors hover:bg-black sm:w-auto"
              >
                {GUESTBOOK.submit}
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-stone">
                <Instagram className="h-4 w-4 text-accent" style={{ width: 16, height: 16 }} />
                {GUESTBOOK.privacy}
              </p>
            </form>
          ) : (
            <div className="max-w-md">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-accent text-accent">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium">{GUESTBOOK.sentTitle(business.trim())}</h3>
              <p className="mt-2 text-base leading-relaxed text-stone">
                {copied ? GUESTBOOK.sentCopied : GUESTBOOK.sentManual}
              </p>

              <div className="mt-5 border border-line bg-white/60 p-4">
                <p className="whitespace-pre-line text-sm">{message}</p>
                <button
                  type="button"
                  onClick={copyMessage}
                  className="link-under mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent"
                >
                  <Check className="h-4 w-4" style={{ width: 16, height: 16 }} />
                  {copied ? GUESTBOOK.copied : GUESTBOOK.copy}
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={igDmLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-ink px-7 text-base font-medium text-ivory transition-colors hover:bg-black"
                >
                  <Instagram className="h-5 w-5" />
                  {GUESTBOOK.openInstagram}
                </a>
                <a
                  href={mailLink}
                  className="inline-flex min-h-[52px] items-center justify-center border border-ink/25 px-7 text-base font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  {GUESTBOOK.preferEmail}
                </a>
              </div>
              <p className="mt-4 text-xs text-stone">{CONTACT.email}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
