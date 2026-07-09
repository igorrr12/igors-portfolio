"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (use ~70ms steps for cascades). */
  delay?: number;
  /** Entry direction: rise (default) or slide from a side. */
  from?: "up" | "left" | "right";
  /** Flash the orange alignment guide under the element as it snaps in. */
  guide?: boolean;
  as?: "div" | "li" | "section" | "article" | "span";
};

/**
 * Snap-reveal: element rises/slides in with a slight overshoot (design-tool
 * "snap into place"), optionally flashing an orange guide line underneath.
 * Fully disabled under prefers-reduced-motion via globals.css.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  guide = false,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as any;
  const dir = from === "left" ? "rv-left" : from === "right" ? "rv-right" : "";

  return (
    <Tag
      ref={ref}
      className={`rv ${dir} ${guide ? "rv-guide" : ""} ${visible ? "in" : ""} ${className}`}
      style={delay ? ({ "--rv-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
