"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import DotSpinner from "./DotSpinner";

/**
 * "What did you think of this project?" — three reaction pills (🔥 💛 👍)
 * at the end of a project page, after a Dribbble shot of a "Star" button:
 * a white pill, a 3D emoji, a divider, a count. A click makes the emoji jump
 * and throw a few small copies of itself, floats a "+1" and rolls the count;
 * a second click takes the reaction back.
 *
 * Counts are shared (app/api/reactions); which ones this visitor gave is kept
 * in localStorage so the pills stay lit when they come back.
 */
const KINDS = [
  { id: "fire", src: "/reactions/fire.png", label: "Fire", tint: "#FFF1E8", ink: "#E8590C" },
  { id: "heart", src: "/reactions/heart.png", label: "Love", tint: "#FFF8DC", ink: "#C99400" },
  { id: "thumbs", src: "/reactions/thumbs.png", label: "Like", tint: "#FFF8DC", ink: "#C99400" },
] as const;
type Kind = (typeof KINDS)[number]["id"];
type Counts = Record<Kind, number>;

const storeKey = (slug: string) => `ld-reactions:${slug}`;
const spring = { type: "spring", stiffness: 500, damping: 26 } as const;

export default function ProjectReactions({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [mine, setMine] = useState<Kind[]>([]);

  useEffect(() => {
    let live = true;
    const done = (c: Counts | null) => {
      if (!live) return;
      // the pills this visitor lit last time come on with the counts
      try {
        const saved = JSON.parse(localStorage.getItem(storeKey(slug)) ?? "[]");
        if (Array.isArray(saved)) setMine(saved);
      } catch {}
      setCounts(c ?? { fire: 0, heart: 0, thumbs: 0 });
    };
    fetch(`/api/reactions?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(done)
      .catch(() => done(null));
    return () => {
      live = false;
    };
  }, [slug]);

  const toggle = (kind: Kind, on: boolean) => {
    // functional update: two quick clicks on different pills both count
    setMine((cur) => {
      const next = on ? [...cur.filter((k) => k !== kind), kind] : cur.filter((k) => k !== kind);
      try {
        localStorage.setItem(storeKey(slug), JSON.stringify(next));
      } catch {}
      return next;
    });
    // optimistic, then the server's numbers
    setCounts((c) => (c ? { ...c, [kind]: Math.max(0, c[kind] + (on ? 1 : -1)) } : c));
    fetch("/api/reactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, kind, delta: on ? 1 : -1 }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => c && setCounts(c))
      .catch(() => {});
  };

  return (
    <section className="flex flex-col items-center gap-5 border-t border-black/10! py-12 md:flex-row md:justify-between md:py-16">
      <p className="text-center text-[17px] font-medium leading-[1.3] tracking-[-0.02em] text-[#999]">
        What did you think of this project?
      </p>
      <div className="flex items-center gap-3">
        {KINDS.map((k) => (
          <Pill
            key={k.id}
            kind={k}
            count={counts?.[k.id] ?? null}
            on={mine.includes(k.id)}
            onClick={() => toggle(k.id, !mine.includes(k.id))}
          />
        ))}
      </div>
    </section>
  );
}

function Pill({
  kind,
  count,
  on,
  onClick,
}: {
  kind: (typeof KINDS)[number];
  count: number | null;
  on: boolean;
  onClick: () => void;
}) {
  const reduce = useReducedMotion();
  // each click on (not off) replays the jump, the burst and the "+1"
  const [pops, setPops] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  return (
    <motion.button
      type="button"
      aria-pressed={on}
      aria-label={`${kind.label}${count !== null ? `, ${count}` : ""}`}
      onClick={() => {
        setDir(on ? -1 : 1);
        if (!on) setPops((n) => n + 1);
        onClick();
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={spring}
      animate={{ backgroundColor: on ? kind.tint : "#ffffff" }}
      className="relative flex h-[46px] items-center rounded-full border border-black/[0.07]! pl-2.5 pr-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_10px_24px_-14px_rgba(0,0,0,0.35)] outline-none focus-visible:ring-2 focus-visible:ring-black/20"
    >
      {/* the emoji, with its burst */}
      <span className="relative mr-2.5 grid size-[28px] place-items-center">
        <motion.img
          key={`emoji-${pops}`}
          src={kind.src}
          alt=""
          draggable={false}
          className="size-[28px] select-none"
          initial={false}
          animate={
            pops > 0 && !reduce
              ? { scale: [1, 1.45, 0.92, 1], rotate: [0, -14, 10, 0], y: [0, -8, 0, 0] }
              : { scale: 1, rotate: 0, y: 0 }
          }
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
        <AnimatePresence>
          {pops > 0 && !reduce && <Burst key={`burst-${pops}`} src={kind.src} />}
        </AnimatePresence>
      </span>

      <span className="mr-3.5 h-5 w-px bg-black/[0.08]" />

      {/* the count rolls up (or down); a DotSpinner until it's loaded */}
      <span className="relative flex h-5 min-w-[2ch] items-center justify-end overflow-hidden font-mono text-[15px] leading-none">
        {count === null ? (
          <DotSpinner className="h-3 w-3 text-[10px] text-[#bbb]" />
        ) : (
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.span
              key={count}
              custom={dir}
              variants={{
                enter: (d: number) => ({ y: d * 18, opacity: 0 }),
                center: { y: 0, opacity: 1 },
                exit: (d: number) => ({ y: d * -18, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={spring}
              style={{ color: on ? kind.ink : "#9a9a9a" }}
              className="block tabular-nums transition-colors duration-300"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        )}
      </span>

      {/* "+1" floating off the count */}
      <AnimatePresence>
        {pops > 0 && !reduce && (
          <motion.span
            key={`plus-${pops}`}
            aria-hidden
            className="pointer-events-none absolute -top-1 right-3 font-mono text-[12px] font-medium"
            style={{ color: kind.ink }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -22 }}
            transition={{ duration: 0.9, ease: "easeOut", times: [0, 0.15, 0.6, 1] }}
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/** Five small copies of the emoji thrown up and out, then gone. */
function Burst({ src }: { src: string }) {
  const bits = [-70, -35, 0, 35, 70];
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {bits.map((angle, i) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const dist = 30 + (i % 2) * 10;
        return (
          <motion.img
            key={i}
            src={src}
            alt=""
            className="absolute left-1/2 top-1/2 -ml-[7px] -mt-[7px] size-[14px]"
            initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(rad) * dist,
              y: [0, Math.sin(rad) * dist, Math.sin(rad) * dist + 14],
              scale: [0.4, 1, 0.7],
              opacity: [1, 1, 0],
              rotate: angle / 2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        );
      })}
    </span>
  );
}
