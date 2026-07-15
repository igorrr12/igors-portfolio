import { CONTACT, igDmLink, mailLink } from "@/lib/config";
import { Instagram, Mail } from "./icons";

/**
 * Sticky bottom contact bar, phones only. Keeps direct contact (Instagram DM
 * + email) one tap away on every page, where most traffic lands. Hidden on
 * sm+ where the nav "Kontakt" button and footer already cover it.
 */
export function MobileContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-ivory/95 px-4 py-2.5 backdrop-blur sm:hidden"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={igDmLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[46px] flex-1 items-center justify-center gap-2 bg-ink text-sm font-medium text-ivory"
      >
        <Instagram className="h-4 w-4" style={{ width: 16, height: 16 }} />
        Napisz na Instagramie
      </a>
      <a
        href={mailLink}
        aria-label={`Napisz e-mail: ${CONTACT.email}`}
        className="flex min-h-[46px] w-[46px] items-center justify-center border border-ink/25 text-ink transition-colors hover:border-accent hover:text-accent"
      >
        <Mail className="h-5 w-5" />
      </a>
    </div>
  );
}
