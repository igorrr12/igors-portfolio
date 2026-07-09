import { CONTACT, igDmLink } from "@/lib/config";
import { Instagram } from "./icons";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-line/40 bg-ink/85 backdrop-blur-md">
      <div className="container-tight flex h-[68px] items-center justify-between gap-4">
        <a href="#top" className="flex items-center" aria-label="Sitelab Warsaw, strona główna">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 text-[15px] font-semibold text-slate md:flex">
          <a href="#metamorfozy" className="link-wipe transition-colors hover:text-white">
            Metamorfozy
          </a>
          <a href="#oferta" className="link-wipe transition-colors hover:text-white">
            Oferta
          </a>
          <a href="#efekty" className="link-wipe transition-colors hover:text-white">
            Efekty
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate lg:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-flame/60" />
              <span className="relative h-2 w-2 rounded-full bg-flame" />
            </span>
            wolne miejsca: {CONTACT.weeklySlots}
          </span>
          <a
            href={igDmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-flame !min-h-[44px] whitespace-nowrap !px-5 text-sm"
          >
            <Instagram className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
            Napisz na IG
          </a>
        </div>
      </div>
    </header>
  );
}
