"use client";

import { useEffect, useState } from "react";

/**
 * The site's loading indicator, from Framer's "Arc Spinner" component: a
 * terminal-style braille glyph that cycles through frames. Every loading or
 * progress cue on the site uses it (preloader, slideshows).
 */
const SPINNERS = {
  // a square of dots turning
  box: { frames: ["⣼", "⣹", "⢻", "⠿", "⡟", "⣏", "⣧", "⣶"], interval: 80 },
  // a wave rolling through four cells
  waveRows: {
    frames: ["⠖⠉⠉⠑", "⡠⠖⠉⠉", "⣠⡠⠖⠉", "⣄⣠⡠⠖", "⠢⣄⣠⡠", "⠙⠢⣄⣠", "⠉⠙⠢⣄", "⠊⠉⠙⠢", "⠜⠊⠉⠙", "⡤⠜⠊⠉", "⣀⡤⠜⠊", "⢤⣀⡤⠜", "⠣⢤⣀⡤", "⠑⠣⢤⣀", "⠉⠑⠣⢤", "⠋⠉⠑⠣"],
    interval: 90,
  },
} as const;

export default function DotSpinner({
  type = "box",
  cycle,
  className = "",
}: {
  type?: keyof typeof SPINNERS;
  /** seconds for one full turn (default: the Framer component's own pace) */
  cycle?: number;
  className?: string;
}) {
  const { frames } = SPINNERS[type];
  const interval = cycle ? (cycle * 1000) / frames.length : SPINNERS[type].interval;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), interval);
    return () => clearInterval(id);
  }, [frames.length, interval]);
  return (
    <span aria-hidden className={`inline-flex items-center justify-center whitespace-pre font-mono leading-none ${className}`}>
      {frames[i]}
    </span>
  );
}
