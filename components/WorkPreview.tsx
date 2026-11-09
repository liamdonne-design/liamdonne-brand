"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import LoopVideo from "./LoopVideo";

/**
 * Hovering the home "Work" card scatters the 7 project covers around the screen
 * (after Telescope's landing): different sizes, some cropped by the edges,
 * rounded and slowly drifting like the "My tools" cards on Info.
 * Kept to a light hand-picked list so the home page doesn't load every case study.
 * Square cards, grouped and overlapping by client. Slots: left / top in %
 * of the viewport, size in vw, tilt.
 */
const PIECES = [
  // Synapse Medicine, top left
  { src: "/work/synapse-corporate-refresh/cover.jpg", x: -4, y: 12, w: 14, rot: -6 },
  { src: "/work/synapse-motion-identity/cover.mp4", x: 6, y: 31, w: 12, rot: 5 },
  // MedGPT, top right and down the right side
  { src: "/work/medgpt/cover-app-icon.jpg", x: 64, y: -5, w: 12, rot: 4 },
  { src: "/work/medgpt-motion-system/scribe-ambiant.mp4", x: 74, y: 8, w: 11, rot: -5 },
  { src: "/work/synapse-manifestation-event/cover.mp4", x: 87, y: 27, w: 12, rot: -4 },
  // Cuidam, bottom left
  { src: "/work/cuidam-corporate-branding/cover.jpg", x: 13, y: 74, w: 13, rot: -5 },
  { src: "/work/cuidam-hearts-event/poster.jpg", x: 22, y: 81, w: 11, rot: 6 },
];

// stills through Next's image optimiser, small enough for a card
const still = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`;

/**
 * Where a card waits before it slides in: pushed out from the middle of the
 * screen, along the line through its slot, far enough to clear the edge.
 */
function offscreen(p: { x: number; y: number; w: number }) {
  const cx = p.x + p.w / 2 - 50;
  const cy = p.y + p.w / 2 - 50; // rough card centre, in % of the screen
  const len = Math.hypot(cx, cy) || 1;
  const d = 70; // % of the screen
  return { x: `${(cx / len) * d}vw`, y: `${(cy / len) * d}vh` };
}

// the deal-out spring of the tools cards
const SPRING = { type: "spring", stiffness: 260, damping: 22, mass: 0.9 } as const;

export default function WorkPreview({ show }: { show: boolean }) {
  const [mounted, setMounted] = useState(false);

  // portal target only exists in the browser; warm the stills so they're there on first hover
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    for (const p of PIECES) if (!p.src.endsWith(".mp4")) new window.Image().src = still(p.src);
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;
  return createPortal(
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        {show &&
          PIECES.map((p, i) => (
            <motion.div
              key={p.src}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}vw`, aspectRatio: "1 / 1" }}
              // slides in from beyond the nearest screen edge, as if peeking in,
              // and slips back out the same way
              initial={{ ...offscreen(p), rotate: p.rot * 2 }}
              animate={{ x: 0, y: 0, rotate: p.rot, transition: { ...SPRING, delay: i * 0.03 } }}
              exit={{ ...offscreen(p), rotate: p.rot * 2, transition: { duration: 0.35, ease: [0.45, 0, 0.75, 0.4], delay: (PIECES.length - i) * 0.01 } }}
            >
              {/* the slow drift of the tools cards, each on its own rhythm */}
              <motion.div
                className="size-full overflow-hidden rounded-[10%] bg-white ring-1 ring-black/8"
                animate={{ x: [0, 4, 0, -4, 0], y: [0, -7, 0, 5, 0] }}
                transition={{ duration: 7 + i * 1.3, ease: "easeInOut", repeat: Infinity, delay: i * 0.4 }}
              >
                {p.src.endsWith(".mp4") ? (
                  <LoopVideo src={p.src} className="size-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={still(p.src)} alt="" draggable={false} className="size-full select-none object-cover" />
                )}
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
