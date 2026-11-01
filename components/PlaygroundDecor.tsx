"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { at, u } from "./playground-layout";

// The fixed prop on the Playground (with the toolbar): Liam's multiplayer
// cursor. Pure decoration — no pointer events, never draggable.

function Prop({ x, y, w, z = 0, children }: { x: number; y: number; w: number; z?: number; children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none"
      style={{ ...at(x, y), width: u(w), zIndex: z }}
    >
      {children}
    </div>
  );
}

/** A multiplayer cursor with a name tag, wandering a little. */
function Cursor({ x, y, name, color }: { x: number; y: number; name: string; color: string }) {
  return (
    <Prop x={x} y={y} w={90} z={40}>
      <motion.div
        animate={{ x: [0, 14, 6, 0], y: [0, 8, -6, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <svg viewBox="0 0 24 24" className="size-[22px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          <path d="M3 2l17 8.5-7.5 1.6L9.3 20z" fill={color} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span
          className="ml-4 inline-block rounded-full px-2.5 py-1 text-[12px] font-medium leading-none text-white"
          style={{ background: color }}
        >
          {name}
        </span>
      </motion.div>
    </Prop>
  );
}

/** The fixed props, laid out around the experiments. */
export default function PlaygroundDecor() {
  return (
    <>
      <Cursor x={250} y={-150} name="Liam" color="#FF4C00" />
    </>
  );
}
