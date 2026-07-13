/**
 * Text recreation of the wordmark (lowercase sans + orange dot).
 * The supplied asset is white-on-transparent, so on ivory we draw
 * the same letterforms in ink; the footer uses the white tone.
 */
export function Logo({ tone = "ink" }: { tone?: "ink" | "white" }) {
  return (
    <span
      className={`select-none font-sans text-[1.3rem] font-bold lowercase leading-none tracking-tight ${
        tone === "ink" ? "text-ink" : "text-white"
      }`}
    >
      sitelab<span className="text-accent">.</span>
    </span>
  );
}
