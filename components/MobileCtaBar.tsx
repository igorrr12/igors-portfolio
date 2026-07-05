import { DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";
import { ArrowRight, WhatsApp } from "./icons";

/** Sticky conversion bar, mobile only. Reserves body padding via a spacer. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/95 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={waLink(DEFAULT_WA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Napisz na WhatsApp"
          className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-soft"
        >
          <WhatsApp className="h-6 w-6" />
        </a>
        <a href="#projekt" className="btn-primary h-13 flex-1 whitespace-nowrap">
          Darmowy projekt
          <ArrowRight className="h-5 w-5 shrink-0" />
        </a>
      </div>
    </div>
  );
}
