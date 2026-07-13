import { playfair } from "@/lib/mockup-fonts";
import type { MockupVariant } from "./types";

const MENU = [
  { name: "Tatar z polędwicy", price: "48 zł" },
  { name: "Pierogi z kaczką", price: "39 zł" },
  { name: "Sandacz na maśle", price: "62 zł" },
];

/** Concept work Nr 01 — warm restaurant site, green/cream/gold. */
export function RestaurantMockup({ variant }: { variant: MockupVariant }) {
  const mobile = variant === "mobile";

  return (
    <div className={`flex h-full w-full flex-col bg-[#F2EAD9] text-[#1E3A2F] ${playfair.className}`}>
      {/* Nav */}
      <div className={`flex items-center justify-between border-b border-[#1E3A2F]/15 ${mobile ? "px-3 py-2" : "px-6 py-3"}`}>
        <span className={`font-semibold ${mobile ? "text-[9px]" : "text-sm"}`}>Złoty Widelec</span>
        {!mobile && (
          <span className="flex gap-4 text-[10px] uppercase tracking-[0.14em] opacity-70">
            <span>Menu</span>
            <span>Rezerwacje</span>
            <span>Kontakt</span>
          </span>
        )}
        <span className={`bg-[#1E3A2F] text-[#F2EAD9] ${mobile ? "px-2 py-1 text-[7px]" : "px-3 py-1.5 text-[10px]"}`}>
          Zarezerwuj stolik
        </span>
      </div>

      {/* Hero: dish "photo" as CSS plate + claim */}
      <div className={`flex flex-1 items-center gap-4 ${mobile ? "flex-col px-3 pt-4 text-center" : "px-6"}`}>
        <div className={mobile ? "" : "flex-1"}>
          <p className={`uppercase tracking-[0.2em] text-[#C7A26B] ${mobile ? "text-[7px]" : "text-[10px]"}`}>
            Kuchnia polska · Śródmieście
          </p>
          <p className={`mt-1 font-semibold leading-tight ${mobile ? "text-[13px]" : "text-2xl"}`}>
            Kolacja, którą się pamięta.
          </p>
          <p className={`mt-1 opacity-70 ${mobile ? "text-[7px]" : "text-[11px]"}`}>
            Sezonowe menu, lokalni dostawcy, stolik w 30 sekund.
          </p>
        </div>
        <div
          aria-hidden
          className={`shrink-0 rounded-full border-[6px] border-white shadow-inner ${mobile ? "h-16 w-16" : "h-32 w-32"}`}
          style={{
            background:
              "radial-gradient(circle at 38% 35%, #C7A26B 0 28%, #7A4A2B 30% 55%, #1E3A2F 57% 100%)",
          }}
        />
      </div>

      {/* Menu rows with prices */}
      <div className={`${mobile ? "px-3 pb-3 pt-2" : "px-6 pb-5 pt-3"}`}>
        {MENU.slice(0, mobile ? 2 : 3).map((item) => (
          <div
            key={item.name}
            className={`flex items-baseline justify-between border-t border-dotted border-[#1E3A2F]/25 ${mobile ? "py-1 text-[8px]" : "py-1.5 text-xs"}`}
          >
            <span>{item.name}</span>
            <span className="font-semibold text-[#C7A26B]">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
