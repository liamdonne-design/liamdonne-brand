"use client";

import { motion } from "motion/react";

/**
 * Liam's multiplayer cursor, the Playground's one fixed prop: drawn inline
 * right after the intro's closing full stop, its tip on the dot, nudging at it.
 * Pure decoration — no pointer events, never draggable.
 */
export function NameCursor({ name, color }: { name: string; color: string }) {
  return (
    // a zero-width box on the baseline, just after the "."; the arrow's tip
    // (3, 2 in its 24-unit box, drawn at 22px) lands on the dot's centre
    <span aria-hidden className="pointer-events-none relative inline-block h-0 w-0 select-none align-baseline">
      <motion.span
        className="absolute flex items-start whitespace-nowrap"
        style={{ left: "calc(-0.17em - 2.75px)", top: "calc(-0.16em - 1.8px)" }}
        animate={{ x: [0, 3, 0], y: [0, 2, 0] }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
      >
        <svg viewBox="0 0 24 24" className="size-[22px] shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          <path d="M3 2l17 8.5-7.5 1.6L9.3 20z" fill={color} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span
          className="-ml-1 mt-[13px] inline-block rounded-full px-2.5 py-1 font-sans text-[12px] font-medium leading-none tracking-normal text-white"
          style={{ background: color }}
        >
          {name}
        </span>
      </motion.span>
    </span>
  );
}
