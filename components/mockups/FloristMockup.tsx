import { lora } from "@/lib/mockup-fonts";
import type { MockupVariant } from "./types";

const PRODUCTS = [
  { name: "Bukiet „Mgła”", price: "120 zł", bg: "radial-gradient(circle at 45% 40%, #C98A7D 0 35%, #E8C4B8 37% 65%, #F6EDE8 67%)" },
  { name: "Bukiet „Łąka”", price: "95 zł", bg: "radial-gradient(circle at 55% 45%, #5F7161 0 30%, #A9BCA0 32% 62%, #F6EDE8 64%)" },
  { name: "Susz „Len”", price: "75 zł", bg: "radial-gradient(circle at 50% 50%, #C7A26B 0 28%, #E4D3B4 30% 60%, #F6EDE8 62%)" },
];

/** Concept work Nr 03 — soft florist shop, blush/sage/rose. */
export function FloristMockup({ variant }: { variant: MockupVariant }) {
  const mobile = variant === "mobile";

  return (
    <div className={`flex h-full w-full flex-col bg-[#F6EDE8] text-[#4A4441] ${lora.className}`}>
      {/* Delivery banner — the shop signal. */}
      <div className={`bg-[#5F7161] text-center text-[#F6EDE8] ${mobile ? "py-1 text-[6px]" : "py-1.5 text-[10px]"}`}>
        Dostawa po Warszawie tego samego dnia
      </div>

      {/* Nav */}
      <div className={`flex items-center justify-between ${mobile ? "px-3 py-1.5" : "px-6 py-3"}`}>
        <span className={`italic ${mobile ? "text-[9px]" : "text-sm"}`}>Pracownia Mila</span>
        <span className={`rounded-full bg-[#C98A7D] text-white ${mobile ? "px-2 py-0.5 text-[7px]" : "px-3 py-1 text-[10px]"}`}>
          Zamów bukiet
        </span>
      </div>

      {/* Product grid: names + prices visible = shop at a glance. */}
      <div className={`grid flex-1 gap-2 ${mobile ? "grid-cols-2 px-3 pb-2" : "grid-cols-3 px-6 pb-3"}`}>
        {PRODUCTS.slice(0, mobile ? 2 : 3).map((p) => (
          <div key={p.name} className="flex flex-col">
            <div aria-hidden className="w-full flex-1 rounded-sm" style={{ background: p.bg, minHeight: mobile ? 44 : 90 }} />
            <p className={`mt-1 ${mobile ? "text-[7px]" : "text-[11px]"}`}>{p.name}</p>
            <p className={`font-medium text-[#5F7161] ${mobile ? "text-[7px]" : "text-[11px]"}`}>{p.price}</p>
          </div>
        ))}
      </div>

      {/* Footer strip */}
      <div className={`flex items-center justify-between border-t border-[#4A4441]/10 italic opacity-70 ${mobile ? "px-3 py-1 text-[6px]" : "px-6 py-2 text-[10px]"}`}>
        <span>Żoliborz · pon–sob</span>
        <span>@pracownia.mila</span>
      </div>
    </div>
  );
}
