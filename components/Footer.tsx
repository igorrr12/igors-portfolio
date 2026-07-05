import { CONTACT, igDmLink, igLink, mailLink } from "@/lib/config";
import { Logo } from "./Logo";
import { Instagram } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night text-white">
      <div className="container-tight flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Logo tone="light" />
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Szybkie, nowoczesne strony dla lokalnych firm w Warszawie. Gotowe w 72 godziny.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white/40">Kontakt</p>
          <a
            href={igDmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <Instagram className="h-4 w-4" />
            Napisz na Instagramie
          </a>
          <a
            href={igLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <Instagram className="h-4 w-4" />@{CONTACT.instagram}
          </a>
          <a
            href={mailLink}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {CONTACT.email}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tight flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {CONTACT.brand}. Wszystkie prawa zastrzeżone.</p>
          <p>Zrobione w Warszawie.</p>
        </div>
      </div>
    </footer>
  );
}
