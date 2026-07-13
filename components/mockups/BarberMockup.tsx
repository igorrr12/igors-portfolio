import { oswald } from "@/lib/mockup-fonts";
import type { MockupVariant } from "./types";

const PRICES = [
  { name: "Strzyżenie klasyczne", price: "70 zł" },
  { name: "Broda + kontur", price: "50 zł" },
  { name: "Combo", price: "100 zł" },
];

/** Concept work Nr 02 — sharp barbershop site, black/bone/gold. */
export function BarberMockup({ variant }: { variant: MockupVariant }) {
  const mobile = variant === "mobile";

  return (
    <div className={`flex h-full w-full flex-col bg-[#121212] text-[#EDEAE4] ${oswald.className}`}>
      {/* Nav */}
      <div className={`flex items-center justify-between border-b border-[#EDEAE4]/15 ${mobile ? "px-3 py-2" : "px-6 py-3"}`}>
        <span className={`font-semibold uppercase tracking-[0.2em] ${mobile ? "text-[8px]" : "text-xs"}`}>
          Antracyt
        </span>
        <span className={`border border-[#C8A24B] uppercase tracking-[0.12em] text-[#C8A24B] ${mobile ? "px-2 py-0.5 text-[7px]" : "px-3 py-1 text-[10px]"}`}>
          Umów wizytę
        </span>
      </div>

      {/* Hero */}
      <div className={`flex flex-1 flex-col justify-center ${mobile ? "px-3" : "px-6"}`}>
        <p className={`uppercase tracking-[0.3em] text-[#C8A24B] ${mobile ? "text-[6px]" : "text-[10px]"}`}>
          Barbershop · Mokotów
        </p>
        <p className={`mt-1 font-semibold uppercase leading-[0.95] ${mobile ? "text-[17px]" : "text-4xl"}`}>
          Ostro.
          <br />
          Bez spóźnień.
        </p>
        <p className={`mt-2 uppercase tracking-[0.14em] opacity-60 ${mobile ? "text-[6px]" : "text-[9px]"}`}>
          wt–sob · 10:00–20:00 · Puławska 12
        </p>
      </div>

      {/* Price list */}
      <div className={`${mobile ? "px-3 pb-3" : "px-6 pb-5"}`}>
        {PRICES.slice(0, mobile ? 2 : 3).map((row) => (
          <div
            key={row.name}
            className={`flex items-baseline justify-between border-t border-[#EDEAE4]/15 uppercase tracking-[0.08em] ${mobile ? "py-1 text-[7px]" : "py-1.5 text-[11px]"}`}
          >
            <span>{row.name}</span>
            <span className="font-semibold text-[#C8A24B]">{row.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
