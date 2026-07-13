import type { ReactNode } from "react";
import { EXHIBITION } from "@/lib/content";
import { WORKS, type WorkId } from "@/lib/works";
import { BarberMockup } from "./mockups/BarberMockup";
import { FloristMockup } from "./mockups/FloristMockup";
import { RestaurantMockup } from "./mockups/RestaurantMockup";
import { WallLabel } from "./WallLabel";
import { WorkFrame } from "./Work";

/** Registry: each work's artboard content. */
const MOCKUPS: Record<WorkId, { desktop: ReactNode; mobile: ReactNode }> = {
  restauracja: {
    desktop: <RestaurantMockup variant="desktop" />,
    mobile: <RestaurantMockup variant="mobile" />,
  },
  barber: {
    desktop: <BarberMockup variant="desktop" />,
    mobile: <BarberMockup variant="mobile" />,
  },
  kwiaciarnia: {
    desktop: <FloristMockup variant="desktop" />,
    mobile: <FloristMockup variant="mobile" />,
  },
};

export function Exhibition() {
  return (
    <>
      <div className="gallery-frame pt-[18vh] sm:pt-[24vh]">
        <WallLabel caption={EXHIBITION.caption} title={EXHIBITION.title} id="wystawa" />
      </div>

      {WORKS.map((work) => (
        <WorkFrame key={work.id} work={work} desktop={MOCKUPS[work.id].desktop} mobile={MOCKUPS[work.id].mobile} />
      ))}

      <div className="gallery-frame">
        <p className="mx-auto max-w-prose-narrow text-center text-sm leading-relaxed text-stone">
          {EXHIBITION.note}
        </p>
      </div>
    </>
  );
}
