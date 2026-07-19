"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ/·—<>+#";

/**
 * On hover, scrambles through random characters (coordinate-style) and
 * resolves left-to-right to the real text over ~0.5s. Use inside a mono
 * font so the width doesn't jitter.
 */
export default function GlitchText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number | null>(null);

  // Keep in sync if the label changes (e.g. ABOUT ↔ WORK on navigation)
  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const run = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const duration = 500;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const reveal = p * text.length;
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") out += " ";
        else if (i < reveal) out += ch;
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  };

  return (
    <span className={className} onMouseEnter={run}>
      {display}
    </span>
  );
}
