export function Logo({ tone = "light" }: { tone?: "dark" | "light" }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <span
      className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-lg font-bold tracking-tight ${text}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-flame text-ink">
        <span className="text-base font-bold leading-none">S</span>
      </span>
      <span className="leading-none">
        sitelab
        <span className="ml-1.5 align-middle font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-slate">
          warsaw
        </span>
      </span>
    </span>
  );
}
