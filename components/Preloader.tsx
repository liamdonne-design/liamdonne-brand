"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * First-visit preloader, after Framer's "Sequential page preloader": project
 * cards drop in one after another into a loose stack (
 * the bare visuals, rounded) over a small Loading pill, then everything lifts away
 * and the page fades in, 2s in all. It sits on the site's own white page and dot
 * field, which stay interactive the whole time.
 *
 * Shown once per browser: an inline script in the layout's <head> adds
 * `intro-on` to <html> (hiding the page) only on a first visit, so returning
 * visitors never see a flash.
 */
const CARDS = [
  { src: "/intro/1.jpg", w: 1, h: 1, rotate: -6, x: -14, y: 6 },
  { src: "/intro/2.jpg", w: 5, h: 7, rotate: 5, x: 16, y: -8 },
  { src: "/intro/3.jpg", w: 1400, h: 720, rotate: -3, x: -6, y: -4 },
  { src: "/intro/4.jpg", w: 16, h: 9, rotate: 4, x: 8, y: 10 },
];
const STEP = 0.18; // s between cards
const HOLD = 1550; // ms before the cards lift away (the whole intro runs 2s)
const OUT = 450; // ms for the lift-away and the page fade-in
const spring = { type: "spring", damping: 50, stiffness: 320, mass: 1 } as const;
// also read by the inline script in app/[locale]/layout.tsx
const INTRO_KEY = "ld-intro-seen";

export default function Preloader() {
  const [phase, setPhase] = useState<"off" | "in" | "out">("off");

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro-on")) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = setTimeout(() => setPhase("in"), 0);
    const hold = reduce ? 900 : HOLD;
    const t1 = setTimeout(() => setPhase("out"), hold);
    const t2 = setTimeout(() => {
      try {
        localStorage.setItem(INTRO_KEY, "1");
      } catch {}
      html.classList.remove("intro-on"); // the page fades in (layout <style>)
      setPhase("off");
    }, hold + OUT);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      html.classList.remove("intro-on");
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "off" && (
        <motion.div
          key="preloader"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative aspect-[3/4] w-[min(46vw,210px)]">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.src}
                className="absolute left-1/2 top-1/2 w-full overflow-hidden rounded-[12px] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]"
                style={{ zIndex: i, marginLeft: "-50%", marginTop: `calc(-50% * ${c.h / c.w})` }}
                initial={{ opacity: 0, y: 60, scale: 0.85, rotate: c.rotate * 2, x: c.x }}
                animate={
                  phase === "out"
                    ? { opacity: 0, y: -80 - i * 20, scale: 0.9, rotate: c.rotate * 1.5, x: c.x }
                    : { opacity: 1, y: c.y, scale: 1, rotate: c.rotate, x: c.x }
                }
                transition={phase === "out" ? { ...spring, delay: (CARDS.length - 1 - i) * 0.04 } : { ...spring, delay: i * STEP }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt=""
                  draggable={false}
                  className="block w-full object-cover"
                  style={{ aspectRatio: `${c.w} / ${c.h}` }}
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "out" ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <ArcSpinner />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// A small grey pill (the home cards' grey), in mono: Framer's "Arc Spinner" component in its "box" style (a square
// of braille dots turning, one frame every 80ms), then "Loading" with a light
// sweep across the letters
const BOX = ["⣼", "⣹", "⢻", "⠿", "⡟", "⣏", "⣧", "⣶"];
function ArcSpinner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => n + 1), 80);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="flex h-7 items-center gap-2 rounded-[8px] bg-[#ebebeb] px-2.5">
      {/* both on the same 12px line box, centred on the pill's middle */}
      <span className="flex h-3 w-3 items-center justify-center font-mono text-[12px] leading-none text-[#999]">
        {BOX[i % BOX.length]}
      </span>
      <motion.span
        className="flex h-3 items-center bg-clip-text font-mono text-[12px] font-medium leading-none text-transparent"
        style={{
          backgroundImage: "linear-gradient(90deg, #999 0%, #999 35%, #d6d6d6 50%, #999 65%, #999 100%)",
          backgroundSize: "250% 100%",
        }}
        animate={{ backgroundPosition: ["100% 0%", "0% 0%"] }}
        transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
      >
        Loading
      </motion.span>
    </span>
  );
}
