import { CONTACT, igLink, mailLink } from "@/lib/config";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-white">
      <div className="gallery-frame flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Logo tone="white" />
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
    </footer>
  );
}
