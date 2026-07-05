export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={`flex shrink-0 items-center gap-2 whitespace-nowrap font-display text-lg font-extrabold tracking-tight ${text}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white shadow-cta">
        <span className="text-base font-black leading-none">S</span>
      </span>
      <span>
        Sitelab<span className="text-primary"> Warsaw</span>
      </span>
    </span>
  );
}
