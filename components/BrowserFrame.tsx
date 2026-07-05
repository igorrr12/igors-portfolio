import type { ReactNode } from "react";

/** Lightweight browser-window chrome around a screenshot / slider. */
export function BrowserFrame({
  children,
  url = "twojafirma.pl",
}: {
  children: ReactNode;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="flex items-center gap-2 border-b border-line bg-[#f7ede4] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/70" />
        </span>
        <span className="ml-2 hidden truncate rounded-md bg-white px-3 py-1 text-xs font-medium text-muted sm:block">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
