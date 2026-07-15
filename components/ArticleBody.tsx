import type { Block } from "@/lib/journal";

/** Renders a journal article's typed block model. No MDX. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-prose-narrow">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2 key={i} className="mt-10 font-display text-2xl font-medium first:mt-0">
              {b.text}
            </h2>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="mt-5 space-y-2.5">
              {b.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-base leading-relaxed sm:text-lg">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mt-5 text-base leading-relaxed first:mt-0 sm:text-lg">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
