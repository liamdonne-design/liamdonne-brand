"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import type { LandingItem } from "./LandingProjects";

// Spiral geometry
const STEP = 0.95; // angular gap between cards (radians)
const RADIUS_X = 330; // horizontal spread
const DEPTH = 340; // z depth
const Y_SLOPE = 205; // vertical descent per radian
const ROT = 22; // deg tilt factor

export default function SpiralView({ items }: { items: LandingItem[] }) {
  const router = useRouter();
  const mid = ((items.length - 1) / 2) * STEP;

  const [progress, setProgress] = useState(mid);
  const [vw, setVw] = useState(1200);
  const [hovered, setHovered] = useState<number | null>(null);

  const targetRef = useRef(mid);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const lastYRef = useRef(0);
  const movedRef = useRef(0);

  useEffect(() => {
    setVw(window.innerWidth);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);

    const max = (items.length - 1) * STEP;
    const clamp = (v: number) => Math.max(0, Math.min(max, v));

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current = clamp(targetRef.current + e.deltaY * 0.0022);
    };
    const onDown = (e: PointerEvent) => {
      draggingRef.current = true;
      lastYRef.current = e.clientY;
      movedRef.current = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dy = e.clientY - lastYRef.current;
      movedRef.current += Math.abs(dy);
      targetRef.current = clamp(targetRef.current - dy * 0.004);
      lastYRef.current = e.clientY;
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    const tick = () => {
      setProgress((p) => {
        const next = p + (targetRef.current - p) * 0.12;
        return Math.abs(next - p) < 0.0001 ? p : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [items.length]);

  const scale = Math.max(0.5, Math.min(1, vw / 1200));

  return (
    <div
      className="absolute inset-0 z-10 touch-none select-none"
      style={{ perspective: "1400px" }}
    >
      <div className="relative h-full w-full [transform-style:preserve-3d]">
        {items.map((it, i) => {
          const a = i * STEP - progress;
          const x = Math.sin(a) * RADIUS_X * scale;
          const z = (Math.cos(a) - 1) * DEPTH;
          const y = a * Y_SLOPE * scale;
          const ry = Math.max(-45, Math.min(45, a * ROT));
          const isHover = hovered === i;
          const opacity = Math.max(0.35, 1 - Math.abs(a) * 0.14);
          const zIndex = Math.round(z) + 1000 + (isHover ? 2000 : 0);

          return (
            <button
              key={it.slug}
              data-sfx="project"
              aria-label={it.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (movedRef.current > 8) return; // ignore drags
                router.push(`/work/${it.slug}`);
              }}
              className="absolute left-1/2 top-1/2 w-[min(64vw,300px)]"
              style={{
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${ry}deg) scale(${isHover ? 1.06 : 1})`,
                opacity,
                zIndex,
                transition:
                  "transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
              }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-grey-200 shadow-2xl ring-1 ring-black/5">
                {it.cover?.type === "video" ? (
                  <video
                    className="h-full w-full object-cover"
                    src={it.cover.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : it.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="h-full w-full object-cover"
                    src={it.cover.src}
                    alt=""
                  />
                ) : null}
              </div>
              <span
                className="mono-label mt-2 block text-center transition-opacity"
                style={{ opacity: isHover ? 1 : 0 }}
              >
                {it.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
