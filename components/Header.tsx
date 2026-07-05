import { igDmLink } from "@/lib/config";
import { Instagram } from "./icons";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="container-tight flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center" aria-label="Sitelab Warsaw, strona główna">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-muted md:flex">
          <a href="#przyklady" className="transition-colors hover:text-ink">
            Metamorfozy
          </a>
          <a href="#oferta" className="transition-colors hover:text-ink">
            Oferta
          </a>
          <a href="#efekty" className="transition-colors hover:text-ink">
            Efekty
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={igDmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ig hidden sm:inline-flex"
          >
            <Instagram className="h-5 w-5" />
            Napisz na IG
          </a>
          <a
            href="#projekt"
            className="btn-primary !min-h-[44px] whitespace-nowrap !px-4 text-sm sm:!px-5"
          >
            Darmowy projekt
          </a>
        </div>
      </div>
    </header>
  );
}
