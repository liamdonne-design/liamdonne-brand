"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import CursorTooltip from "./CursorTooltip";

/**
 * Info "My job as a designer." cluster (Figma frames 1321316230 / 31): a
 * tools card that, on click, deals out the cards of the tools I use every
 * day, and gathers them back under itself on the next click.
 * Positions are the Figma centres relative to the tools card, in Figma px;
 * `size` is the exported (rotation-included) bounding box.
 */
const TOOLS = [
  { name: "ElevenLabs", src: "elevenlabs", dx: 198, dy: 28, size: 128, rot: -12.2 },
  { name: "Suno", src: "suno", dx: 129, dy: 86, size: 136, rot: -18.6 },
  { name: "Claude", src: "claude", dx: 133, dy: -142, size: 177, rot: -11.7 },
  { name: "Adobe Creative Suite", src: "adobe", dx: -1, dy: -217, size: 157, rot: -2.9 },
  { name: "Jitter", src: "jitter", dx: -137, dy: -134, size: 167, rot: 7 },
  { name: "Figma", src: "figma", dx: -186, dy: 48, size: 179, rot: 12.6 },
  { name: "Midjourney", src: "midjourney", dx: 74, dy: 195, size: 154, rot: -1.5 },
  { name: "Webflow", src: "webflow", dx: -75, dy: 195, size: 170, rot: 8.4 },
];
const CARD = 170; // the tools card
// cluster box in Figma px, the tools card's centre at (CX, CY)
const BOX_W = 560;
const BOX_H = 600;
const CX = 290;
const CY = 304;

const SPRING = { type: "spring", stiffness: 260, damping: 22, mass: 0.9 } as const;

export default function ToolsDeck() {
  const [open, setOpen] = useState(true); // dealt out by default
  const [s, setS] = useState(0.7);
  const ref = useRef<HTMLDivElement>(null);

  // scale the Figma layout to the column
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setS(Math.min(1, e.contentRect.width / BOX_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <CursorTooltip>
    <div ref={ref} className="relative mx-auto w-full max-w-[560px]" style={{ height: BOX_H * s }}>
      {TOOLS.map((t, i) => (
        <motion.div
          key={t.src}
          className="absolute"
          // the tool's name trails the cursor, as "See project" on Work
          data-cursor-tooltip={open ? t.name : undefined}
          style={{
            left: (CX - t.size / 2) * s,
            top: (CY - t.size / 2) * s,
            width: t.size * s,
            height: t.size * s,
            zIndex: 10,
          }}
          initial={false}
          animate={
            open
              ? { x: t.dx * s, y: t.dy * s, scale: 1, rotate: 0 }
              : { x: 0, y: 0, scale: 0.55, rotate: -t.rot * 0.6 }
          }
          transition={{ ...SPRING, delay: open ? i * 0.025 : (TOOLS.length - i) * 0.015 }}
        >
          {/* the slow drift of the Playground cards, each on its own rhythm */}
          <motion.div
            className="size-full"
            animate={{ x: [0, 4, 0, -4, 0], y: [0, -7, 0, 5, 0] }}
            transition={{ duration: 7 + i * 1.3, ease: "easeInOut", repeat: Infinity, delay: i * 0.4 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/info/tools/${t.src}.png`}
              alt={open ? t.name : ""}
              draggable={false}
              className="block size-full select-none"
            />
          </motion.div>
        </motion.div>
      ))}

      <motion.p
        aria-hidden
        className="absolute -translate-x-1/2 whitespace-nowrap text-center font-mono text-[12px] leading-[1.2] text-[#c6c6c6]"
        style={{ left: CX * s, top: (CY - CARD / 2) * s - 40 }}
        animate={{ opacity: open ? 0 : 1, y: open ? 6 : 0 }}
        transition={{ duration: 0.2 }}
      >
        Click to see
        <br />
        my everyday tools
      </motion.p>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Hide my everyday tools" : "Show my everyday tools"}
        onClick={() => setOpen((o) => !o)}
        className="absolute cursor-pointer rounded-[15px] outline-offset-4"
        // on top while the cards hide under it; underneath once dealt (Figma order)
        style={{
          left: (CX - CARD / 2) * s,
          top: (CY - CARD / 2) * s,
          width: CARD * s,
          height: CARD * s,
          zIndex: open ? 0 : 20,
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        transition={SPRING}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/info/tools/center.png" alt="" draggable={false} className="block size-full select-none" />
      </motion.button>
    </div>
    </CursorTooltip>
  );
}
