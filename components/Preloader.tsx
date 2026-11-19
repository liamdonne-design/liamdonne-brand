"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "@/i18n/navigation";
import DotSpinner from "./DotSpinner";

/**
 * Home preloader, after Framer's "Sequential page preloader": project visuals
 * drop in one after another into a loose stack (bare, rounded) over a small
 * Loading line, then everything lifts away and the page fades in, 2s in all;
 * a click or a key skips it.
 * It sits on the site's own white page and dot field, which stay interactive.
 *
 * It plays once per visit (browser session), the first time the home page
 * comes up: on a load of the home (an inline script in the layout's <head>
 * hides the page before the first paint, so nothing flashes) or on the way
 * back to it in the site, like a click on the L.Donne logo.
 */
const CARDS = [
  { src: "/intro/1.jpg", w: 1, h: 1, rotate: -6, x: -16, y: 4 }, // MedGPT brand identity, iPhone
  { src: "/intro/4.jpg", w: 16, h: 9, rotate: 4, x: 10, y: 12 }, // Cuidam Hearts
  { src: "/intro/synapse-profile.jpg", w: 786, h: 614, rotate: -3, x: -8, y: -6 }, // Synapse, clinical profile
  { src: "/intro/synapse-posters.jpg", w: 774, h: 570, rotate: 3, x: 6, y: 6 }, // Synapse, three posters
  // last in, on top: the "Liberté Égalité MedGPT" campaign poster
  { src: "/intro/2.jpg", w: 5, h: 7, rotate: 5, x: 14, y: -10 },
];
const STEP = 0.16; // s between cards
const HOLD = 1550; // ms before the cards lift away (the whole intro runs 2s)
const OUT = 450; // ms for the lift-away and the page fade-in
const spring = { type: "spring", damping: 50, stiffness: 320, mass: 1 } as const;
const SEEN = "ld-intro-seen"; // sessionStorage, also read in app/[locale]/layout.tsx

// before paint on client navigation, after it on the server (never runs there)
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Preloader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"off" | "in" | "out">("off");

  useIsoLayoutEffect(() => {
    if (pathname !== "/") return;
    // once per visit (browser session): the inline script in the layout's
    // <head> reads the same flag on a load or refresh
    try {
      if (sessionStorage.getItem(SEEN)) return;
    } catch {}
    const html = document.documentElement;
    html.classList.add("intro-on"); // hide the page before it paints
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 900 : HOLD;
    const t0 = setTimeout(() => setPhase("in"), 0);
    const t1 = setTimeout(() => setPhase("out"), hold);
    const finish = () => {
      try {
        sessionStorage.setItem(SEEN, "1");
      } catch {}
      html.classList.remove("intro-on"); // the page fades in (layout <style>)
      setPhase("off");
    };
    const t2 = setTimeout(finish, hold + OUT);
    // a click (or a key) skips the intro
    const skip = () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      setPhase("out");
      setTimeout(finish, 250);
    };
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      html.classList.remove("intro-on");
      setTimeout(() => setPhase("off"), 0);
    };
  }, [pathname]);

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

// In mono, no background: the site's DotSpinner
// (Framer "Arc Spinner", box style), then "Loading" with a light sweep
function ArcSpinner() {
  return (
    <span className="flex h-7 items-center gap-2">
      {/* both on the same 12px line box, centred on one line */}
      <DotSpinner className="h-3 w-3 text-[10px] text-[#999]" />
      <motion.span
        className="flex h-3 items-center bg-clip-text font-mono text-[10px] leading-[1.3] text-transparent"
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
