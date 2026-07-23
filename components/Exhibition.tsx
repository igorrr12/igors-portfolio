import { EXHIBITION } from "@/lib/content";
import { WORKS } from "@/lib/works";
import { Reveal } from "./Reveal";
import { WallLabel } from "./WallLabel";
import { WorkFrame } from "./Work";

export function Exhibition() {
  return (
    <>
      <div className="gallery-frame pt-[18vh] sm:pt-[24vh]">
        <WallLabel caption={EXHIBITION.caption} title={EXHIBITION.title} id="wystawa" />
      </div>

      {/* Unveil direction alternates per work, so the ritual repeats
          without feeling copied. Home shows the curated set; /realizacje
          holds the full gallery. */}
      {WORKS.filter((w) => w.homepage).map((work, i) => (
        <WorkFrame key={work.id} work={work} flip={i % 2 === 1} />
      ))}

      <Reveal className="gallery-frame">
        <p className="mx-auto max-w-prose-narrow text-center text-sm leading-relaxed text-stone">
          {EXHIBITION.note}
        </p>
      </Reveal>
    </>
  );
}
