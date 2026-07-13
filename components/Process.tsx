import { PROCESS } from "@/lib/content";
import { WallLabel } from "./WallLabel";

/** Numbered catalogue entries. The animated rule lives in WallLabel; step separators stay static. */
export function Process() {
  return (
    <section
      id="proces"
      data-gallery-stop="Proces"
      className="gallery-frame pt-[22vh] sm:pt-[30vh]"
    >
      <WallLabel caption={PROCESS.caption} title={PROCESS.title} />
      <ol className="mt-10">
        {PROCESS.steps.map((step) => (
          <li key={step.nr} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[80px_200px_1fr] sm:gap-6 sm:py-8">
            <span className="font-display text-lg font-medium text-accent">{step.nr}</span>
            <h3 className="font-display text-xl font-medium">{step.title}</h3>
            <p className="max-w-prose-narrow text-base leading-relaxed text-stone">{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
