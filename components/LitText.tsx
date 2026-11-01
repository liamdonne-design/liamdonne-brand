"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/** A run of text; `strong` runs keep their own colour and don't light up. */
export type LitRun = { text: string; strong?: boolean };

type RGB = [number, number, number];

/**
 * Text whose letters light up near the cursor and fade back once it has
 * passed (the CSS transition gives the trail): `base` at rest, `lit` right
 * under the pointer. Each paragraph is a list of runs. Skipped on touch
 * screens, where there is no cursor.
 */
export default function LitText({
  paragraphs,
  base,
  lit,
  strongColor,
  radius = 46,
  as: Tag = "div",
  className,
  paragraphClassName,
  style,
}: {
  paragraphs: LitRun[][];
  base: RGB;
  lit: RGB;
  /** colour of `strong` runs (they stay that colour) */
  strongColor?: string;
  /** px around the pointer that lights up */
  radius?: number;
  as?: "div" | "h1";
  className?: string;
  paragraphClassName?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(hover: none)").matches) return;
    const chars = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-ch]"));
    let raf = 0;
    let pt = { x: -1e4, y: -1e4 };
    let wasNear = false;
    const paint = () => {
      raf = 0;
      // skip the per-letter work while the pointer is nowhere near the block
      const box = root.getBoundingClientRect();
      const near =
        pt.x > box.left - radius && pt.x < box.right + radius && pt.y > box.top - radius && pt.y < box.bottom + radius;
      if (!near && !wasNear) return;
      wasNear = near;
      for (const el of chars) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - pt.x, r.top + r.height / 2 - pt.y);
        const k = Math.max(0, 1 - d / radius);
        const c = base.map((b, i) => Math.round(b + (lit[i] - b) * k));
        el.style.color = `rgb(${c[0]} ${c[1]} ${c[2]})`;
      }
    };
    const onMove = (e: PointerEvent) => {
      pt = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(paint);
    };
    // text moves under a still pointer when the page scrolls
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [base, lit, radius]);

  const label = paragraphs.map((p) => p.map((r) => r.text).join("")).join(" ");

  return (
    <Tag
      ref={ref as never}
      aria-label={label}
      className={className}
      style={{ color: `rgb(${base.join(" ")})`, ...style }}
    >
      {paragraphs.map((runs, i) => (
        <span key={i} aria-hidden className={`block ${paragraphClassName ?? ""}`}>
          {runs.map((run, j) =>
            run.strong ? (
              <span key={j} style={{ color: strongColor }}>
                {run.text}
              </span>
            ) : (
              Array.from(run.text).map((ch, k) => (
                <span key={`${j}-${k}`} data-ch className="transition-colors duration-[600ms] ease-out">
                  {ch}
                </span>
              ))
            )
          )}
        </span>
      ))}
    </Tag>
  );
}
