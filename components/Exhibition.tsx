import { EXHIBITION } from "@/lib/content";
import { WORKS } from "@/lib/works";
import { WallLabel } from "./WallLabel";
import { WorkFrame } from "./Work";

export function Exhibition() {
  return (
    <>
      <div className="gallery-frame pt-[18vh] sm:pt-[24vh]">
        <WallLabel caption={EXHIBITION.caption} title={EXHIBITION.title} id="wystawa" />
      </div>

      {WORKS.map((work) => (
        <WorkFrame key={work.id} work={work} />
      ))}

      <div className="gallery-frame">
        <p className="mx-auto max-w-prose-narrow text-center text-sm leading-relaxed text-stone">
          {EXHIBITION.note}
        </p>
      </div>
    </>
  );
}
