"use client";

import { useEffect, useRef, useState } from "react";
import DotSpinner from "./DotSpinner";

/**
 * Auto-advancing photo panel, after Framer's "Showcase Slideshow" (hero
 * slideshow): slides cross-fade (0.9s), a bottom scrim, small thumbnails on
 * the left (the current one outlined, a click jumps to it), and on the right the site's dot spinner next to an "n / total" counter in mono. Advances only while it's on screen.
 */
export default function Slideshow({
  slides,
  intervalSec = 4,
  className = "",
}: {
  slides: { src: string; label?: string }[];
  intervalSec?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const len = slides.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || len < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // one timer per slide: a click on a thumbnail starts the count again
    const id = setTimeout(() => setCurrent((c) => (c + 1) % len), intervalSec * 1000);
    return () => clearTimeout(id);
  }, [visible, len, intervalSec, current]);

  const label = slides[current]?.label;

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden bg-[#1a1a1a] ${className}`}>
      {slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.src}
          src={s.src}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          draggable={false}
          className="absolute inset-0 size-full select-none object-cover"
          style={{ opacity: i === current ? 1 : 0, transition: "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      ))}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_50%)]" />
      {/* thumbnails, bottom left: where you are, and a click to jump */}
      {len > 1 && (
        <div className="absolute bottom-3 left-3 z-10 flex gap-1 sm:bottom-4 sm:left-4 sm:gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${len}`}
              aria-current={i === current}
              onClick={() => setCurrent(i)}
              className={`relative h-6 w-9 cursor-pointer overflow-hidden rounded-[4px] outline-none transition-[opacity,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-white sm:h-9 sm:w-14 sm:rounded-[6px] ${
                i === current ? "opacity-100 ring-[1.5px] ring-white" : "opacity-55 hover:opacity-90"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt="" loading="lazy" draggable={false} className="size-full select-none object-cover" />
            </button>
          ))}
        </div>
      )}
      {label && len < 2 && (
        <div className="absolute bottom-[22px] left-5 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[1.8px] text-white/60">
          {label}
        </div>
      )}
      {len > 1 && (
        <div className="absolute bottom-4 right-5 flex items-center gap-2">
          {/* one full turn per slide, starting over with each new picture */}
          <DotSpinner key={`${current}-${visible}`} cycle={intervalSec} className="text-[15px] text-white/85" />
          <div className="font-mono text-[12px] leading-none text-white/50" aria-live="off">
            <strong className="font-medium text-white/90">{current + 1}</strong> / {len}
          </div>
        </div>
      )}
    </div>
  );
}
