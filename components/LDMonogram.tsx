"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "L.D" monogram from the Portfolio Figma file (frames LD-début-fin, L-1…7,
 * D-1…7). Hovering a letter loops through every version of that letter until
 * the pointer leaves, then the monogram snaps back to its resting frame.
 * In Figma the D variants sit in the L-x frames and the L variants in the D-x
 * frames, so the hovered side maps to the other series.
 */
const BASE = "/playground/ld";
const SERIES = {
  L: Array.from({ length: 7 }, (_, i) => `${BASE}/D${i + 1}.jpg`), // the L changes
  D: Array.from({ length: 7 }, (_, i) => `${BASE}/L${i + 1}.jpg`), // the D changes
};
const REST = `${BASE}/base.jpg`;
const FRAME_MS = 160;

export default function LDMonogram({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<"L" | "D" | null>(null);
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // preload every frame so the loop never flashes
  useEffect(() => {
    [...SERIES.L, ...SERIES.D].forEach((src) => {
      const im = new Image();
      im.src = src;
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    timer.current = setInterval(() => setI((n) => (n + 1) % 7), FRAME_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [active]);

  const src = active ? SERIES[active][i] : REST;

  return (
    <div className={`relative aspect-[660/340] select-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="L.D" draggable={false} className="block size-full mix-blend-multiply" />
      {(["L", "D"] as const).map((side) => (
        <span
          key={side}
          aria-hidden
          className={`absolute inset-y-0 ${side === "L" ? "left-0 w-[54%]" : "right-0 w-[46%]"} cursor-pointer`}
          onPointerEnter={() => {
            setI(0);
            setActive(side);
          }}
          onPointerLeave={() => setActive((a) => (a === side ? null : a))}
        />
      ))}
    </div>
  );
}
