"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Desktop-only trailing pixel cursor. No-ops on touch / reduced-motion. */
export default function PixelCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const noHover = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduce) return;

    el.style.opacity = "1";
    const xTo = gsap.quickTo(el, "x", { duration: 0.22, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.22, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      el.dataset.active = target.closest("a,button") ? "true" : "false";
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return <div ref={ref} aria-hidden className="pixel-cursor" />;
}
