"use client";

import { useId, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { signaturePaths } from "./signature-paths";
import { SIGNATURE_PEN_WIDTH, signatureStrokes } from "./signature-strokes";

// The pen follows the signature's centreline (signature-strokes.ts), first
// to rub the signature out, then to write it again: the flat, filled
// signature hides / shows only where it has passed — no outline. One pen
// speed across all strokes, eased in and out over each pass.
const ERASE = 0.6;
const WRITE = 0.8;
const W = 88.5695;
const H = 20.9997;

// Pen progress (0–1 of the total stroke length) → time, ease-in-out (sine).
const TOTAL = signatureStrokes.reduce((n, s) => n + s.length, 0);
const timeAt = (p: number, dur: number) => (Math.acos(1 - 2 * Math.min(1, Math.max(0, p))) / Math.PI) * dur;

/** When each stroke starts and how long it takes, for one pass of the pen. */
function pass(dur: number, offset: number) {
  let done = 0;
  return signatureStrokes.map((s) => {
    const t0 = timeAt(done / TOTAL, dur);
    done += s.length;
    return { d: s.d, delay: offset + t0, duration: Math.max(0.01, timeAt(done / TOTAL, dur) - t0) };
  });
}

// Writing starts while the eraser is still at work, as it reaches the
// second-to-last letter (the first stroke reaching past x ≈ 66).
const SECOND_TO_LAST = (() => {
  let done = 0;
  for (const s of signatureStrokes) {
    const xs = (s.d.match(/-?[\d.]+/g) ?? []).map(Number).filter((_, i) => i % 2 === 0);
    if (Math.max(...xs) > 66) break;
    done += s.length;
  }
  return done / TOTAL;
})();
const ERASER = pass(ERASE, 0);
const PEN = pass(WRITE, timeAt(SECOND_TO_LAST, ERASE));

/** The pen strokes as an animated mask layer (`color` = what they paint). */
function PenMask({ strokes, color }: { strokes: typeof PEN; color: string }) {
  return strokes.map((s, i) => (
    <motion.path
      key={i}
      d={s.d}
      stroke={color}
      strokeWidth={SIGNATURE_PEN_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: s.duration, delay: s.delay, ease: "linear" },
        opacity: { duration: 0.001, delay: s.delay },
      }}
    />
  ));
}

function Signature({ take }: { take: number }) {
  const id = useId().replace(/:/g, "");
  const eraseId = `sig-erase-${id}`;
  const writeId = `sig-write-${id}`;
  const ink = (key: string | number) =>
    signaturePaths.map((d, i) => <path key={`${key}-${i}`} d={d} fill="currentColor" />);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={89} height={21} fill="none" aria-hidden className="block overflow-visible">
      {take === 0 ? (
        ink("still")
      ) : (
        <g key={take}>
          <defs>
            {/* eraser: everything visible, then the pen paints it away */}
            <mask id={eraseId} maskUnits="userSpaceOnUse" x={-W} y={-H} width={W * 3} height={H * 3}>
              <rect x={-W} y={-H} width={W * 3} height={H * 3} fill="#fff" />
              <PenMask strokes={ERASER} color="#000" />
            </mask>
            {/* pen: nothing visible, then the pen paints it in */}
            <mask id={writeId} maskUnits="userSpaceOnUse" x={-W} y={-H} width={W * 3} height={H * 3}>
              <PenMask strokes={PEN} color="#fff" />
            </mask>
          </defs>

          {/* the old signature, rubbed out */}
          <g mask={`url(#${eraseId})`}>{ink("old")}</g>

          {/* the new one, written in along the pen's path */}
          <g mask={`url(#${writeId})`}>{ink("new")}</g>
        </g>
      )}
    </svg>
  );
}

/**
 * Signature + "Bordeaux,FR [EST] ‘97", centred at the top of the new pages;
 * the footer passes its own `line` (©2026) in the same mono style.
 * Hovering the signature rubs it out and writes it again (see Signature);
 * bumping `take` remounts the paths so it replays on every hover.
 */
export default function SiteMark({ line }: { line?: ReactNode }) {
  const [take, setTake] = useState(0);
  return (
    <div className="ui-haze flex flex-col items-center gap-[10px] text-[var(--ui-fg)]">
      <Link
        href="/"
        aria-label="Liam Donne — home"
        onMouseEnter={() => {
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setTake((n) => n + 1);
        }}
      >
        <Signature take={take} />
      </Link>
      <p className="flex items-center gap-[6px] font-mono text-[12px] leading-[1.3]">
        {line ?? (
          <>
            Bordeaux,FR
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home/est.svg" alt="Est." width={23} height={13} className="ml-[2px]" style={{ filter: "invert(var(--ui-invert))" }} />
            <span className="-ml-[5px]">‘97</span>
          </>
        )}
      </p>
    </div>
  );
}
