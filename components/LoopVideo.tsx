"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

/**
 * A muted, looping, inline video that really autoplays on iOS. React sets
 * `muted` as a property after hydration but never writes the attribute into
 * the server HTML, so Safari sees an unmuted video and shows its play button
 * instead of starting it. Forcing muted and calling play() on mount fixes it.
 */
export default function LoopVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    v.play().catch(() => {});
  }, [props.src]);

  return <video ref={ref} autoPlay muted loop playsInline {...props} />;
}
