"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heatmap } from "@paper-design/shaders-react";
import { playgroundIntro, type PlaygroundItem } from "@/content/playground";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import LitText from "./LitText";
import LoopVideo from "./LoopVideo";
import { NameCursor } from "./PlaygroundDecor";
import DesignToolbar from "./DesignToolbar";
import { Button } from "@/components/ui/button";
import { iconsaxIcons } from "@/lib/icons-iconsax";

const CloseIcon = iconsaxIcons.x;
import { BOARD_H, BOARD_W, at, u } from "./playground-layout";

// Same soft ease-in-out as the home cards.
const ease = { duration: 0.6, ease: [0.45, 0, 0.25, 1] } as const;

// Paper Design heatmap, default preset (what Framer's Heatmap Effect ships):
// heat waves fill the shape and drain away, inside a blue halo.
// Colours coolest → hottest; `noise` adds the film grain.
const HEAT = ["#11206A", "#1F3BA2", "#2F63E7", "#6BD7FF", "#FFE679", "#FF991E", "#FF4C00"];
// the halo fades into the page: no visible frame edge
const FADE = "radial-gradient(closest-side, #000 70%, transparent 100%)";

/** A black-on-transparent image run through the heatmap shader. */
function Heat({
  image,
  ratio,
  outerGlow = 0.5,
  scale = 0.75,
  style,
}: {
  image: string;
  ratio: string;
  outerGlow?: number;
  scale?: number;
  style?: CSSProperties;
}) {
  return (
    <Heatmap
      image={image}
      colors={HEAT}
      colorBack="rgba(0,0,0,0)"
      speed={1}
      contour={0.5}
      angle={0}
      noise={0.45}
      innerGlow={0.5}
      outerGlow={outerGlow}
      scale={scale}
      style={{ width: "100%", aspectRatio: ratio, maskImage: FADE, WebkitMaskImage: FADE, ...style }}
    />
  );
}

// Intro: grey letters that light up white near the cursor (see LitText).
const INTRO_BASE: [number, number, number] = [92, 92, 90];
const INTRO_LIT: [number, number, number] = [255, 255, 255];
const INTRO = playgroundIntro.map((line) => [{ text: line }]);

function Intro() {
  return (
    <div
      className="pg-intro pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-center"
      style={{ ...at(0, -50) }}
    >
      <LitText
        as="h1"
        paragraphs={INTRO}
        base={INTRO_BASE}
        lit={INTRO_LIT}
        className="font-normal leading-[1.25] tracking-[-0.02em]"
        trail={<NameCursor name="Liam" color="#0D99FF" />}
      />
    </div>
  );
}

/** The experiment itself: large in the modal, or filling a card's picture. */
function Media({ item, big = false, lite = false }: { item: PlaygroundItem; big?: boolean; lite?: boolean }) {
  const { media } = item;
  const cls = "block size-full object-cover";
  // the canvas explorer repeats cards dozens of times, more than the browser
  // allows WebGL shaders: there the shape glows with a moving CSS heat gradient
  if (media.type === "heatmap" && lite)
    return (
      <div className="flex size-full items-center justify-center bg-[#05060b]">
        <motion.div
          className="w-[75%]"
          style={{
            aspectRatio: `${media.width} / ${media.height}`,
            maskImage: `url(${media.src})`,
            WebkitMaskImage: `url(${media.src})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            backgroundImage: `linear-gradient(120deg, ${[...HEAT, ...[...HEAT].reverse()].join(", ")})`,
            backgroundSize: "300% 300%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    );
  if (media.type === "heatmap")
    return (
      <div className="size-full bg-[#05060b]">
        <Heat image={media.src} ratio={`${media.width} / ${media.height}`} />
      </div>
    );
  if (media.type === "story")
    // the photo, with the animated stickers laid over it as posted
    return (
      <div className="relative size-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.src} alt={big ? item.title : ""} className={cls} draggable={false} />
        {media.layers?.map((l) => (
          <div
            key={l.src}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`, rotate: `${l.rotate}deg` }}
          >
            {/* animated GIF/WebP: a plain img keeps the animation; a still one can spin */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={l.src}
              alt=""
              draggable={false}
              className="block w-full"
              style={l.spin ? { animation: `ui-spin ${l.spin}s linear infinite` } : undefined}
            />
          </div>
        ))}
      </div>
    );
  return media.type === "video" ? (
    <LoopVideo src={media.src} className={cls} draggable={false} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={media.src} alt={big ? item.title : ""} width={media.width} height={media.height} className={cls} draggable={false} />
  );
}

/** The modal's width for a visual: as big as fits the screen, at the visual's own proportions. */
const modalWidth = ({ width, height }: PlaygroundItem["media"]) =>
  `min(720px, calc(100vw - 5rem), calc(68dvh * ${width} / ${height}))`;

function Sticker({
  item,
  index,
  z,
  onRaise,
  onOpen,
}: {
  item: PlaygroundItem;
  index: number;
  z: number;
  onRaise: () => void;
  onOpen: () => void;
}) {
  const { rotate } = item.place;
  const m = item.mobile ?? { ...item.place, size: item.size };
  const moved = useRef(false);
  return (
    // positioned wrapper (centred on its spot) that drifts gently, as if in
    // orbit around the intro; the button inside drags freely. Experiments
    // sit above every decoration (z ≥ 10) so they always read first.
    <motion.div
      className="pg-place absolute -translate-x-1/2 -translate-y-1/2"
      style={
        {
          "--x": item.place.x,
          "--y": item.place.y,
          "--w": item.size,
          "--mx": m.x,
          "--my": m.y,
          "--mw": m.size,
          zIndex: 10 + z,
        } as CSSProperties
      }
      animate={{ x: [0, 4, 0, -4, 0], y: [0, -7, 0, 5, 0] }}
      transition={{ duration: 7 + index * 1.3, ease: "easeInOut", repeat: Infinity, delay: index * 0.4 }}
    >
      <motion.button
        type="button"
        aria-label={`Open ${item.title}`}
        drag
        dragMomentum={false}
        onPointerDown={() => {
          moved.current = false;
          onRaise();
        }}
        onDragStart={() => (moved.current = true)}
        onClick={() => !moved.current && onOpen()}
        initial={{ opacity: 0, scale: 0.9, rotate }}
        animate={{ opacity: 1, scale: 1, rotate }}
        whileHover={{ scale: 1.04, rotate: rotate * 0.5 }}
        whileDrag={{ scale: 1.06, rotate: 0, cursor: "grabbing" }}
        transition={{ ...ease, delay: index * 0.05 }}
        className="group relative block w-full cursor-pointer touch-none text-left outline-none"
      >
        {/* card like the home ones: grey (the active-tab grey), the picture
            alone at the visual's own proportions; the title shows in the modal */}
        <div
          className="rounded-[0.857em] border border-white/15! bg-[var(--ui-chip)] p-[0.572em]"
          // one size for every card, so the frame (padding, radii) is the same
          // around every picture, whatever the card's width
          style={{ fontSize: `max(11px, ${u(19)})` }}
        >
          <div
            className="w-full overflow-hidden rounded-[0.572em]"
            style={{ aspectRatio: `${item.media.width} / ${item.media.height}` }}
          >
            <Media item={item} />
          </div>
        </div>

        {/* selection frame on hover / focus */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 border border-[#0D99FF] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos) => (
            <span key={pos} className={`absolute size-[7px] border border-[#0D99FF] bg-white ${pos}`} />
          ))}
        </span>
      </motion.button>
    </motion.div>
  );
}

/**
 * Playground: experiment cards around the intro on a fixed board. Only the
 * cards move: drag one to rearrange it, click it to open it larger.
 */
export default function PlaygroundCanvas({ items }: { items: PlaygroundItem[] }) {
  const [order, setOrder] = useState(items.map((it) => it.id));
  const [open, setOpen] = useState<PlaygroundItem | null>(null);
  // "Tidy up": the scattered cards become a canvas explorer
  const [tidy, setTidy] = useState(false);
  const raise = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {tidy ? (
          <TidyCanvas key="tidy" items={items} onOpen={setOpen} />
        ) : (
          <motion.div
            key="free"
            className="absolute left-1/2 top-1/2"
            style={{ width: BOARD_W, height: BOARD_H, marginLeft: -BOARD_W / 2, marginTop: -BOARD_H / 2 + 60 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Intro />
            {items.map((item, i) => (
              <Sticker
                key={item.id}
                item={item}
                index={i}
                z={order.indexOf(item.id) + 1}
                onRaise={() => raise(item.id)}
                onOpen={() => setOpen(item)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <DesignToolbar tidy={tidy} onTidy={setTidy} />

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        {/* hugs the visual: the content sets the width, not a size step */}
        <DialogContent size="xl" showCloseButton={false} className="w-fit max-w-[calc(100vw-2rem)]">
          {open && (
            <div style={{ width: modalWidth(open.media) }}>
              {/* Fluid ghost icon button, outside the modal's top-right corner (above it on narrow screens) */}
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close"
                  className="absolute -top-12 right-0 text-white/80 hover:text-white sm:-right-12 sm:top-0 [&>span:first-child]:group-hover:bg-white/12! [&>span:first-child]:group-hover:shadow-none!"
                >
                  <CloseIcon />
                </Button>
              </DialogClose>
              <div
                className="overflow-hidden rounded-[12px]"
                style={{ aspectRatio: `${open.media.width} / ${open.media.height}` }}
              >
                <Media item={open} big />
              </div>
              <DialogTitle className="mt-5 text-[20px] font-semibold leading-[1.3] tracking-[-0.02em]">
                {open.title}
              </DialogTitle>
              {/* the tag stays for screen readers only: title and tools say enough */}
              <DialogDescription className="sr-only">{open.tag}</DialogDescription>
              <ul aria-label="Tools" className="mt-2 flex flex-wrap gap-1.5">
                {open.tools.map((tool) => (
                  <li key={tool} className="rounded-[6px] bg-[#ebebeb] px-2 py-0.5 font-mono text-[12px] leading-[1.4] text-[#1f1f1f]">
                    {tool}
                  </li>
                ))}
              </ul>
              {open.text?.map((p, i) => (
                <p key={i} className="mt-3 max-w-prose text-[15px] leading-relaxed text-grey-600">
                  {p}
                </p>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ───────────────────────── Tidy up: canvas explorer ───────────────────────── */

// After Framer's "Infinite Card Canvas": the cards, straightened, laid out in
// staggered columns that repeat forever in every direction; drag (or scroll)
// to travel, with a little inertia; pinch / ctrl + wheel to zoom.
const COL_W = 260; // card width, world px
const GAP = 44; // between cards and columns
const STAGGER = 150; // every other column starts lower
const CARD_FONT = 16; // the card frame (padding, radii) in em of this

const mod = (n: number, d: number) => ((n % d) + d) % d;
const clampN = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

function TidyCanvas({ items, onOpen }: { items: PlaygroundItem[]; onOpen: (it: PlaygroundItem) => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ w: 1400, h: 900 });
  const [range, setRange] = useState({ c0: -2, c1: 4, y0: -1000, y1: 2000 });
  const cam = useRef({ x: 0, y: 0, z: 0.9 });
  const vel = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const drag = useRef({ id: -1, x: 0, y: 0, sx: 0, sy: 0, t: 0, moved: false });
  const pinch = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchDist = useRef(0);

  // each card's height at the column width, frame included (padding 0.572em × 2 + border)
  const pad = 0.572 * CARD_FONT * 2 + 2;
  const heights = items.map((it) => Math.round(((COL_W - pad) * it.media.height) / it.media.width + pad));
  // every column holds every card once per period, in its own order
  const period = heights.reduce((a, h) => a + h + GAP, 0);
  const column = (c: number) => {
    const start = mod(c * 2, items.length);
    let y = 0;
    return items.map((_, k) => {
      const i = (start + k) % items.length;
      const at = { i, y };
      y += heights[i] + GAP;
      return at;
    });
  };
  const colX = (c: number) => c * (COL_W + GAP);
  const colY = (c: number) => (mod(c, 2) === 1 ? STAGGER : 0);

  const apply = () => {
    const c = cam.current;
    if (world.current) world.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) scale(${c.z})`;
    // world coordinates on screen, with a margin of one card
    const x0 = -c.x / c.z - COL_W;
    const x1 = (view.w - c.x) / c.z + COL_W;
    const next = {
      c0: Math.floor(x0 / (COL_W + GAP)),
      c1: Math.ceil(x1 / (COL_W + GAP)),
      y0: Math.floor((-c.y / c.z - 600) / 200) * 200,
      y1: Math.ceil(((view.h - c.y) / c.z + 600) / 200) * 200,
    };
    setRange((r) => (r.c0 === next.c0 && r.c1 === next.c1 && r.y0 === next.y0 && r.y1 === next.y1 ? r : next));
  };

  const tick = () => {
    raf.current = 0;
    const v = vel.current;
    if (drag.current.id !== -1 || (Math.abs(v.x) < 0.1 && Math.abs(v.y) < 0.1)) return;
    cam.current.x += v.x;
    cam.current.y += v.y;
    v.x *= 0.92;
    v.y *= 0.92;
    apply();
    raf.current = requestAnimationFrame(tick);
  };
  const glide = () => {
    if (!raf.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      raf.current = requestAnimationFrame(tick);
  };

  // size, first framing (the middle of the canvas), and wheel / trackpad
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => setView({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const c = cam.current;
      if (e.ctrlKey || e.metaKey) {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        const z = clampN(c.z * Math.exp(-e.deltaY * 0.008), 0.45, 1.6);
        c.x = mx - ((mx - c.x) * z) / c.z;
        c.y = my - ((my - c.y) * z) / c.z;
        c.z = z;
      } else {
        c.x -= e.deltaX;
        c.y -= e.deltaY;
      }
      apply();
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", wheel);
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const framed = useRef(false);
  useEffect(() => {
    if (!framed.current) {
      framed.current = true;
      const z = view.w < 640 ? 0.62 : 0.9;
      // centre on the seam between columns 0 and 1
      cam.current = { x: view.w / 2 - (COL_W + GAP / 2) * z, y: 110, z };
    }
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const down = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    pinch.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.current.size === 2) {
      const [a, b] = [...pinch.current.values()];
      pinchDist.current = Math.hypot(a.x - b.x, a.y - b.y);
      drag.current.moved = true;
      return;
    }
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now(), moved: false };
    vel.current = { x: 0, y: 0 };
  };
  const move = (e: React.PointerEvent) => {
    if (!pinch.current.has(e.pointerId)) return;
    pinch.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const c = cam.current;
    if (pinch.current.size >= 2) {
      const [a, b] = [...pinch.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = stage.current!.getBoundingClientRect();
      const mx = (a.x + b.x) / 2 - r.left;
      const my = (a.y + b.y) / 2 - r.top;
      const z = clampN((c.z * d) / Math.max(1, pinchDist.current), 0.45, 1.6);
      c.x = mx - ((mx - c.x) * z) / c.z;
      c.y = my - ((my - c.y) * z) / c.z;
      c.z = z;
      pinchDist.current = d;
      apply();
      return;
    }
    const g = drag.current;
    if (g.id !== e.pointerId) return;
    if (!g.moved && Math.hypot(e.clientX - g.sx, e.clientY - g.sy) < 5) return;
    if (!g.moved) {
      g.moved = true;
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {}
    }
    const now = performance.now();
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    const dt = Math.max(8, now - g.t);
    c.x += dx;
    c.y += dy;
    vel.current = { x: clampN((dx * 16.67) / dt, -60, 60), y: clampN((dy * 16.67) / dt, -60, 60) };
    g.x = e.clientX;
    g.y = e.clientY;
    g.t = now;
    apply();
  };
  const up = (e: React.PointerEvent) => {
    pinch.current.delete(e.pointerId);
    const g = drag.current;
    if (g.id !== e.pointerId) return;
    g.id = -1;
    if (performance.now() - g.t > 90) vel.current = { x: 0, y: 0 };
    if (g.moved) glide();
  };

  // the cards in view
  const cells: { key: string; i: number; x: number; y: number }[] = [];
  for (let c = range.c0; c <= range.c1; c++) {
    const seq = column(c);
    const off = colY(c);
    for (let r = Math.floor((range.y0 - off) / period) - 1; r * period + off <= range.y1; r++) {
      for (const s of seq) {
        const y = r * period + off + s.y;
        if (y + heights[s.i] < range.y0 || y > range.y1) continue;
        cells.push({ key: `${c}:${r}:${s.i}`, i: s.i, x: colX(c), y });
      }
    }
  }

  return (
    <motion.div
      ref={stage}
      className="absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div ref={world} className="absolute left-0 top-0 origin-top-left will-change-transform">
        {cells.map(({ key, i, x, y }) => {
          const item = items[i];
          return (
            <button
              key={key}
              type="button"
              aria-label={`Open ${item.title}`}
              tabIndex={-1}
              onClick={() => !drag.current.moved && onOpen(item)}
              className="group absolute block cursor-pointer text-left outline-none"
              style={{ left: x, top: y, width: COL_W, fontSize: CARD_FONT }}
            >
              <div className="rounded-[0.857em] border border-white/15! bg-[var(--ui-chip)] p-[0.572em] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-1">
                <div
                  className="w-full overflow-hidden rounded-[0.572em]"
                  style={{ aspectRatio: `${item.media.width} / ${item.media.height}` }}
                >
                  <Media item={item} lite />
                </div>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-2 border border-[#0D99FF] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
