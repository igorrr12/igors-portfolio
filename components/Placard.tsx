import { PLACARD } from "@/lib/content";

/** The offer as a museum placard: small, bordered, matter-of-fact. */
export function Placard() {
  return (
    <div className="max-w-md border border-line bg-white/60 p-7 sm:p-8">
      <dl>
        {PLACARD.rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-baseline justify-between gap-6 py-3 ${i > 0 ? "border-t border-line" : ""}`}
          >
            <dt className="text-sm text-stone">{row.label}</dt>
            <dd className="whitespace-nowrap font-display text-lg font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="caption mt-5 normal-case tracking-normal">{PLACARD.note}</p>
    </div>
  );
}
