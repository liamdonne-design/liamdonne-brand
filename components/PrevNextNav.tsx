"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Previous / next project at the foot of a case study. When the two don't
 * fit on one line (phones, long titles), only "Next project" stays, on the
 * right. The previous one is kept out of the flow (not removed) so its width
 * can still be measured when the screen grows again.
 */
export default function PrevNextNav({ previous, next }: { previous: ReactNode; next: ReactNode }) {
  const nav = useRef<HTMLElement>(null);
  const prev = useRef<HTMLDivElement>(null);
  const nxt = useRef<HTMLDivElement>(null);
  // null until measured: guess "doesn't fit" on phones, "fits" above
  const [fits, setFits] = useState<boolean | null>(null);

  useEffect(() => {
    const el = nav.current;
    if (!el) return;
    const measure = () => {
      if (!prev.current || !nxt.current) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      setFits(prev.current.offsetWidth + gap + nxt.current.offsetWidth <= el.clientWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prevHidden = fits === null ? "max-sm:invisible max-sm:absolute" : fits ? "" : "invisible absolute";
  return (
    <nav
      ref={nav}
      className="relative flex items-start justify-between gap-6 border-t border-black/10! py-12 text-[11.5px] sm:text-[17.5px] md:py-16"
    >
      <div ref={prev} aria-hidden={fits === false || undefined} className={`flex w-max flex-col items-start gap-4 ${prevHidden}`}>
        {previous}
      </div>
      <div ref={nxt} className="ml-auto flex w-max flex-col items-end gap-4">
        {next}
      </div>
    </nav>
  );
}
