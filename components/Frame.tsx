import type { ReactNode } from "react";

/** Artboard-style browser chrome around a screenshot / slider (light sections). */
export function Frame({ children, url = "twojafirma.pl" }: { children: ReactNode; url?: string }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-ink/10 bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-ink/10 bg-paper px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-flame/70" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-slate-deep">{url}</span>
        <span className="w-8" aria-hidden />
      </div>
      {children}
    </div>
  );
}
