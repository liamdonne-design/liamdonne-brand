"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// seconds for one full turn (Framer "Vinyl" at speed 1)
const TURN = 1.8;

/**
 * A record that plays a track when clicked, after Framer's "Vinyl" (SpinDeck):
 * it spins while the sound plays, eases back to rest on pause, and stops at
 * the end of the track. The disc is drawn in CSS (grooves, sheen) with the
 * campaign artwork on the label and a spindle dot in the middle.
 */
export default function Vinyl({
  src,
  label,
  background,
  title,
}: {
  src: string;
  label?: string;
  background?: string;
  title: string;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const end = () => setPlaying(false);
    a.addEventListener("ended", end);
    a.addEventListener("pause", end);
    return () => {
      a.removeEventListener("ended", end);
      a.removeEventListener("pause", end);
    };
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play().then(() => setPlaying(true)).catch(() => {});
  };

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#1f1f1f] bg-cover bg-center"
      style={background ? { backgroundImage: `url(${background})` } : undefined}
    >
      <audio ref={audio} src={src} preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={playing}
        className="relative aspect-square h-[70%] cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <motion.div
          className="relative size-full"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { repeat: Infinity, duration: TURN, ease: "linear" } : { duration: 0.4 }}
          style={{ willChange: playing ? "transform" : "auto" }}
        >
          {/* the disc: black vinyl, fine grooves, a soft sheen */}
          <div
            className="absolute inset-0 rounded-full shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
            style={{
              background:
                "repeating-radial-gradient(circle at 50% 50%, #111 0 1.5px, #1b1b1b 1.5px 3px), radial-gradient(circle, #222 0%, #0d0d0d 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: "conic-gradient(from 30deg, transparent 0 12%, rgba(255,255,255,0.09) 18%, transparent 26% 62%, rgba(255,255,255,0.07) 68%, transparent 76%)" }}
          />
          {label && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={label}
              alt=""
              draggable={false}
              className="absolute left-1/2 top-1/2 size-[34%] -translate-x-1/2 -translate-y-1/2 select-none rounded-full object-cover"
            />
          )}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)]"
            style={{ background: "radial-gradient(circle, #fff, #bbb, #666)" }}
          />
        </motion.div>
      </button>
      <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${background ? "rounded-[4px] bg-white/85 px-2 py-1 text-[#1f1f1f]/70" : "text-white/50"}`}>
        {playing ? "Playing" : "Click the record to play"} · {title}
      </p>
    </div>
  );
}
