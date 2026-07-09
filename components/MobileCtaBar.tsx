import { igDmLink } from "@/lib/config";
import { ArrowRight, Instagram } from "./icons";

/** Sticky conversion bar, mobile only. The page reserves clearance via a spacer. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-line/50 bg-ink/95 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={igDmLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Napisz na Instagramie"
          className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl border border-navy-line text-flame transition-colors hover:border-flame"
        >
          <Instagram className="h-6 w-6" />
        </a>
        <a href="#projekt" className="btn-flame min-h-[52px] flex-1 whitespace-nowrap">
          Darmowy projekt
          <ArrowRight className="h-5 w-5 shrink-0" />
        </a>
      </div>
    </div>
  );
}
