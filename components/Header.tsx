import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="gallery-frame flex min-h-[44px] items-center justify-between py-6">
        <a href="#okladka" aria-label="sitelab — do góry" className="inline-flex min-h-[44px] items-center">
          <Logo />
        </a>
        <a href="#ksiega-gosci" className="link-under inline-flex min-h-[44px] items-center text-sm font-medium">
          Kontakt
        </a>
      </div>
    </header>
  );
}
