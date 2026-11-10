"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * A film with its soundtrack, without the browser's control bar: a big white
 * play button sits in the middle of the poster and invites a click. Clicking
 * the picture pauses (the button comes back) or resumes; at the end it rewinds
 * to the poster.
 */
export default function FilmPlayer({ src, poster, title }: { src: string; poster?: string; title?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className="absolute inset-0 cursor-pointer bg-black" onClick={toggle}>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        src={src}
        poster={poster}
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          const v = ref.current;
          if (v) v.load(); // back to the poster
          setPlaying(false);
        }}
      />
      <AnimatePresence>
        {!playing && (
          <motion.button
            type="button"
            aria-label={title ? `Play ${title}` : "Play the film"}
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] outline-none focus-visible:ring-4 focus-visible:ring-white/50 sm:size-24"
          >
            <svg viewBox="0 0 24 24" className="ml-1 size-8 text-[#1f1f1f] sm:size-9" aria-hidden>
              <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
