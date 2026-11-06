"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * Counts up from 0 to `end` with a spring once half of it is on screen
 * (after Framer's "AnimatedNumber"), then keeps its value. `suffix` ("+")
 * stays put while the digits run.
 */
export default function AnimatedNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const spring = useSpring(value, { damping: 30, stiffness: 100 });
  const display = useTransform(spring, (n) => Math.round(n).toString());

  useEffect(() => {
    if (inView) value.set(end);
  }, [inView, end, value]);

  return (
    <span ref={ref} className="inline-block tabular-nums" aria-label={`${end}${suffix}`}>
      {/* room for the final digits from the start, so the "+" never shifts */}
      <motion.span aria-hidden className="inline-block text-right" style={{ minWidth: `${String(end).length}ch` }}>
        {display}
      </motion.span>
      <span aria-hidden>{suffix}</span>
    </span>
  );
}
