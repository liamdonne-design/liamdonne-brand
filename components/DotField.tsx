"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";

const GAP = 15; // grid spacing (px)
const BASE_R = 0.6; // resting dot radius
const BASE_A = 0.38; // resting dot opacity
const PEAK_A = 0.6; // opacity of a dot right under the cursor
const DOT = "#9a9a95"; // fallback; the live colour is --dot-color (dark on Playground)
const REACH = 170; // cursor influence radius (px)
const PULL = 7; // max drift of a dot toward the cursor (px)

/**
 * Site-wide background: a grid of faint grey dots on white. Dots near the
 * cursor (or finger) light up, swell and lean toward it, trailing it softly.
 * Sits behind all content (z -1) and never takes pointer events.
 */
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const redraw = useRef<() => void>(() => {});
  const pathname = usePathname();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    // smoothed cursor + its "energy" (fades the glow out when the cursor stops / leaves)
    const target = { x: -9999, y: -9999 };
    const cur = { x: -9999, y: -9999 };
    let energy = 0;
    let energyTarget = 0;
    let raf: number | null = null;
    let idle: ReturnType<typeof setTimeout> | null = null;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      draw();
    };

    let dot = DOT;
    const readColor = () => {
      dot = getComputedStyle(document.documentElement).getPropertyValue("--dot-color").trim() || DOT;
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const ox = (w % GAP) / 2;
      const oy = (h % GAP) / 2;
      for (let y = oy; y <= h; y += GAP) {
        for (let x = ox; x <= w; x += GAP) {
          const dx = cur.x - x;
          const dy = cur.y - y;
          const d = Math.sqrt(dx * dx + dy * dy);
          let k = d < REACH ? 1 - d / REACH : 0;
          k = k * k * energy; // eased falloff
          const px = d > 0 ? x + (dx / d) * PULL * k : x;
          const py = d > 0 ? y + (dy / d) * PULL * k : y;
          ctx.globalAlpha = BASE_A + (PEAK_A - BASE_A) * k;
          ctx.fillStyle = dot;
          ctx.beginPath();
          ctx.arc(px, py, BASE_R + 0.8 * k, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.14;
      cur.y += (target.y - cur.y) * 0.14;
      energy += (energyTarget - energy) * 0.08;
      draw();
      const settled =
        Math.abs(target.x - cur.x) < 0.3 &&
        Math.abs(target.y - cur.y) < 0.3 &&
        Math.abs(energyTarget - energy) < 0.004;
      raf = settled ? null : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (cur.x < -9000) {
        cur.x = e.clientX;
        cur.y = e.clientY;
      }
      target.x = e.clientX;
      target.y = e.clientY;
      energyTarget = 1;
      // a finger lifts away: let the glow fade after a moment
      if (idle) clearTimeout(idle);
      if (e.pointerType !== "mouse") {
        idle = setTimeout(() => {
          energyTarget = 0;
          kick();
        }, 900);
      }
      kick();
    };
    const onLeave = () => {
      energyTarget = 0;
      kick();
    };

    readColor();
    resize();
    redraw.current = () => {
      readColor();
      draw();
    };
    window.addEventListener("resize", resize);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf != null) cancelAnimationFrame(raf);
      if (idle) clearTimeout(idle);
    };
  }, []);

  // the page theme (and so --dot-color) can change on navigation
  useEffect(() => {
    redraw.current();
  }, [pathname]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
