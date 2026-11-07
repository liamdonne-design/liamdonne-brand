"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Muted looping video that only loads and plays while it's on screen —
 * case studies stack many clips, so off-screen ones stay idle.
 */
export default function LazyVideo({
  src,
  poster,
  className = "",
  style,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // iOS only autoplays a video it knows is muted, and React never writes
    // the muted attribute into the server HTML: set it before any play()
    v.defaultMuted = true;
    v.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    />
  );
}
