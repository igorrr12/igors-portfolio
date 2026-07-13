import { CURATOR } from "@/lib/content";
import { Placard } from "./Placard";
import { WallLabel } from "./WallLabel";

export function CuratorNote() {
  return (
    <section
      id="nota"
      data-gallery-stop="Nota kuratorska"
      className="gallery-frame pt-[22vh] sm:pt-[30vh]"
    >
      <WallLabel caption={CURATOR.caption} title={CURATOR.title} />
      <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div className="max-w-prose-narrow space-y-6 text-base leading-relaxed sm:text-lg">
          {CURATOR.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="md:justify-self-end">
          <Placard />
        </div>
      </div>
    </section>
  );
}
