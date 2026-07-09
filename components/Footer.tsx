import { CONTACT, igDmLink, igLink, mailLink } from "@/lib/config";
import { Logo } from "./Logo";
import { Instagram } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-navy-line/40 bg-ink text-white">
      <div className="container-tight flex flex-col gap-10 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-slate">
            Szybkie, dopracowane strony dla lokalnych firm w Warszawie. Gotowe w 72 godziny.
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate/60">
            kontakt
          </p>
          <a
            href={igDmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-wipe inline-flex w-fit items-center gap-2 text-sm font-medium text-white/85 hover:text-white"
          >
            <Instagram className="h-4 w-4 text-flame" style={{ width: 16, height: 16 }} />
            Napisz na Instagramie
          </a>
          <a
            href={igLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-wipe inline-flex w-fit items-center gap-2 text-sm font-medium text-white/85 hover:text-white"
          >
            @{CONTACT.instagram}
          </a>
          <a href={mailLink} className="link-wipe inline-flex w-fit text-sm font-medium text-white/85 hover:text-white">
            {CONTACT.email}
          </a>
        </div>
      </div>

      <div className="border-t border-navy-line/40">
        <div className="container-tight flex flex-col items-center justify-between gap-2 py-5 text-center font-mono text-[11px] tracking-[0.08em] text-slate/60 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {CONTACT.brand}
          </p>
          <p>52.2297° N, 21.0122° E · zrobione w Warszawie</p>
        </div>
      </div>
    </footer>
  );
}
