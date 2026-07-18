"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/oferta", label: "Oferta" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/cennik", label: "Cennik" },
  { href: "/dziennik", label: "Dziennik" },
];

/**
 * Shared site nav. `overlay` (home) floats transparently over the cover;
 * otherwise it sits in flow with a hairline under-border. Logo → "/".
 * "Kontakt" targets the page-local #kontakt block that every page renders.
 */
export function Nav({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-40" : "relative z-40 border-b border-line bg-ivory"}>
      {/* py-4 keeps the bar under the 80px desktop ceiling (was 85px at py-5). */}
      <div className="gallery-frame flex min-h-[44px] items-center justify-between py-4">
        <Link href="/" aria-label="Sitelab — strona główna" className="inline-flex min-h-[44px] items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="link-under text-sm font-medium">
              {l.label}
            </Link>
          ))}
          <a
            href="#kontakt"
            className="press inline-flex min-h-[40px] items-center bg-ink px-4 text-sm font-medium text-ivory hover:bg-black"
          >
            Kontakt
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-mobile"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          className="inline-flex h-11 w-11 items-center justify-center sm:hidden"
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-ink motion-safe:transition-transform motion-safe:duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[6px] h-px w-5 bg-ink motion-safe:transition-opacity motion-safe:duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[12px] h-px w-5 bg-ink motion-safe:transition-transform motion-safe:duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="nav-mobile" className="menu-in gallery-frame flex flex-col gap-1 border-t border-line bg-ivory pb-6 pt-2 sm:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex min-h-[44px] items-center text-base font-medium">
              {l.label}
            </Link>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="press mt-2 inline-flex min-h-[48px] items-center justify-center bg-ink px-5 text-base font-medium text-ivory"
          >
            Kontakt
          </a>
        </nav>
      )}
    </header>
  );
}
