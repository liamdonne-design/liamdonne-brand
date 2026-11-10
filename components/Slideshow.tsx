"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/**
 * Auto-advancing photo panel, after Framer's "Showcase Slideshow" (hero
 * slideshow): slides cross-fade (0.9s), a bottom scrim, the slide's label on
 * the left, and on the right a thin ring that fills over each slide's time
 * next to an "n / total" counter. Advances only while it's on screen.
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
    const id = setInterval(() => setCurrent((c) => (c + 1) % len), intervalSec * 1000);
    return () => clearInterval(id);
  }, [visible, len, intervalSec]);

  // ring geometry: a 38px viewBox, r = 16
  const R = 16;
  const CIRCUM = 2 * Math.PI * R;
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
      {label && (
        <div className="absolute bottom-[22px] left-5 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[1.8px] text-white/60">
          {label}
        </div>
      )}
      {len > 1 && (
        <div className="absolute bottom-4 right-5 flex items-center gap-2.5">
          <svg width={38} height={38} viewBox="0 0 38 38" className="-rotate-90 shrink-0" aria-hidden>
            <circle cx="19" cy="19" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
            <motion.circle
              key={`${current}-${visible}`}
              cx="19"
              cy="19"
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray={CIRCUM}
              initial={{ strokeDashoffset: CIRCUM }}
              animate={{ strokeDashoffset: visible ? 0 : CIRCUM }}
              transition={{ duration: intervalSec, ease: "linear" }}
            />
          </svg>
          <div className="text-[12px] font-semibold leading-none tracking-[0.3px] text-white/50" aria-live="off">
            <strong className="font-semibold text-white/90">{current + 1}</strong> / {len}
          </div>
        </div>
      )}
    </div>
  );
}
