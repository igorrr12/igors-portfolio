import Link from "next/link";
import { CONTACT, igLink, mailLink } from "@/lib/config";
import { INDUSTRIES } from "@/lib/industries";
import { DISTRICTS } from "@/lib/districts";
import { WORKS } from "@/lib/works";
import { Logo } from "./Logo";

const MORE = [
  { href: "/cennik", label: "Cennik" },
  { href: "/faq", label: "FAQ" },
  { href: "/dziennik", label: "Dziennik" },
  { href: "/o-mnie", label: "O mnie" },
];

/**
 * The dark room. Doubles as a sitemap directory (internal links + crawl
 * depth). Extra bottom padding on phones so the fixed MobileContactBar never
 * covers the last line.
 */
export function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-16 text-white sm:pb-14">
      <div className="gallery-frame">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterCol
            title="Oferta"
            links={[
              { href: "/oferta", label: "Wszystkie branże" },
              ...INDUSTRIES.map((i) => ({ href: `/${i.slug}`, label: i.navLabel })),
            ]}
          />
          <FooterCol
            title="Dzielnice"
            links={[
              { href: "/strony-internetowe", label: "Cała Warszawa" },
              ...DISTRICTS.map((d) => ({ href: `/strony-internetowe/${d.slug}`, label: d.name })),
            ]}
          />
          <FooterCol
            title="Realizacje"
            links={[
              { href: "/realizacje", label: "Wszystkie realizacje" },
              ...WORKS.map((w) => ({ href: `/realizacje/${w.slug}`, label: w.name })),
            ]}
          />
          <FooterCol title="Więcej" links={MORE} />
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-white/15 pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" aria-label="Sitelab — strona główna">
              <Logo tone="white" />
            </Link>
            <p className="caption mt-3 !text-white/50">Pracownia stron internetowych · {CONTACT.city}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/80 sm:items-end">
            <a href={igLink} target="_blank" rel="noopener noreferrer" className="link-under flex w-fit min-h-[44px] items-center">
              @{CONTACT.instagram}
            </a>
            <a href={mailLink} className="link-under flex w-fit min-h-[44px] items-center">
              {CONTACT.email}
            </a>
            <p className="mt-2 text-xs text-white/40">© {new Date().getFullYear()} Sitelab — Warszawa</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="caption !text-white/40">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-under text-sm text-white/80 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
