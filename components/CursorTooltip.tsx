"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/springs";
import { fontWeights } from "@/lib/font-weight";
import { useShape } from "@/lib/shape-context";

// Offset from the pointer tip, so the label sits beside the cursor, not under it.
const OFFSET = { x: 14, y: 18 };
// Trailing spring: a touch of lag and weight, settles without wobble.
const FOLLOW = { stiffness: 380, damping: 32, mass: 0.6 };

/**
 * A Fluid-style tooltip that trails the cursor while it is over any
 * `[data-cursor-tooltip]` element inside `children`, showing that element's
 * attribute value as its label. Same look and enter/exit as the Fluid Tooltip
 * (components/ui/tooltip.tsx); it leans a little into fast horizontal moves.
 * Mouse and pen only: touch screens have no hover.
 */
export default function CursorTooltip({ children }: { children: ReactNode }) {
  const shape = useShape();
  const [label, setLabel] = useState<string | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, FOLLOW);
  const y = useSpring(my, FOLLOW);
  // tilt with horizontal speed, clamped, then eased back to level
  const vx = useVelocity(x);
  const rotate = useSpring(useTransform(vx, [-2000, 2000], [-8, 8], { clamp: true }), {
    stiffness: 200,
    damping: 20,
  });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-tooltip]");
    const next = target?.dataset.cursorTooltip ?? null;
    const px = e.clientX + OFFSET.x;
    const py = e.clientY + OFFSET.y;
    if (next && !label) {
      // appearing: start right at the pointer instead of flying in from afar
      mx.jump(px);
      my.jump(py);
      x.jump(px);
      y.jump(py);
    } else {
      mx.set(px);
      my.set(py);
    }
    if (next !== label) setLabel(next);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setLabel(null)}>
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{ x, y, rotate, transformOrigin: "0% 0%" }}
      >
        <AnimatePresence>
          {label && (
            <motion.div
              key="tip"
              className={cn(
                "whitespace-nowrap bg-foreground text-background text-[length:var(--fs-caption,12px)] leading-[var(--lh-caption,16px)] px-2 py-1",
                "[text-box:trim-both_cap_alphabetic] supports-[text-box:trim-both]:py-2",
                shape.bg
              )}
              style={{ fontVariationSettings: fontWeights.normal }}
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: spring.fast }}
              exit={{ opacity: 0, scale: 0.96, transition: spring.fast.exit }}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
