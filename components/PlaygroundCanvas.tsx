"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Heatmap } from "@paper-design/shaders-react";
import { playgroundIntro, type PlaygroundItem } from "@/content/playground";
import { Bezier, Brush2, Grid1, Pointer, Shapes1, Text } from "iconsax-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import LitText from "./LitText";
import PlaygroundDecor from "./PlaygroundDecor";
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
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-center"
      style={{ ...at(0, -50), width: `max(290px, ${u(760)})` }}
    >
      <LitText
        as="h1"
        paragraphs={INTRO}
        base={INTRO_BASE}
        lit={INTRO_LIT}
        className="font-normal leading-[1.25] tracking-[-0.02em]"
        style={{ fontSize: `max(17px, ${u(34)})` }}
      />
    </div>
  );
}

/** The experiment itself: large in the modal, or filling a card's square picture. */
function Media({ item, big = false }: { item: PlaygroundItem; big?: boolean }) {
  const { media } = item;
  const cls = big
    ? "max-h-[60vh] w-auto max-w-full object-contain"
    : item.bg
      ? "block size-full object-contain"
      : "block size-full object-cover";
  if (media.type === "heatmap")
    return (
      <div className="bg-[#05060b]" style={{ width: big ? "min(640px, 80vw)" : "100%" }}>
        <Heat image={media.src} ratio={big ? `${media.width} / ${media.height}` : "1 / 1"} />
      </div>
    );
  return media.type === "video" ? (
    <video src={media.src} autoPlay muted loop playsInline className={cls} draggable={false} />
  ) : (
    // animated GIF/WebP stickers: a plain img keeps the animation
    // eslint-disable-next-line @next/next/no-img-element
    <img src={media.src} alt={big ? item.title : ""} width={media.width} height={media.height} className={cls} draggable={false} />
  );
}

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
  const { x, y, rotate } = item.place;
  const moved = useRef(false);
  return (
    // positioned wrapper (centred on its spot) that drifts gently, as if in
    // orbit around the intro; the button inside drags freely. Experiments
    // sit above every decoration (z ≥ 10) so they always read first.
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ ...at(x, y), width: u(item.size), zIndex: 10 + z }}
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
        {/* card like the home ones: grey (the active-tab grey), square
            picture, the name below — or above, for variety */}
        <div
          className={`flex flex-col items-center gap-[0.572em] rounded-[0.857em] border border-white/15! bg-[var(--ui-chip)] p-[0.572em] ${
            item.labelTop ? "flex-col-reverse" : ""
          }`}
          style={{ fontSize: `max(11px, ${u(item.size * 0.107)})` }}
        >
          <div
            className={`aspect-square w-full overflow-hidden rounded-[0.572em] ${item.bg ? "p-[10%]" : ""}`}
            style={{ background: item.bg }}
          >
            <Media item={item} />
          </div>
          <span className="text-center text-[14px] font-medium leading-[1.3] text-[var(--ui-fg)]">
            {item.title}
          </span>
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
  const raise = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: BOARD_W, height: BOARD_H, marginLeft: -BOARD_W / 2, marginTop: -BOARD_H / 2 + 60 }}
      >
        <PlaygroundDecor />
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
      </div>

      {/* design-tool toolbar (static), doubling as the hint */}
      <div
        className="pointer-events-none absolute bottom-16 left-1/2 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-1 rounded-[14px] border border-white/10 bg-[#2a2a2a]/90 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md"
      >
        {[Pointer, Grid1, Bezier, Text, Shapes1, Brush2].map((Icon, i) => (
          <span
            key={i}
            aria-hidden
            className={`flex size-8 shrink-0 items-center justify-center rounded-[9px] ${
              i === 0 ? "bg-[#0D99FF] text-white" : "text-white/70 max-sm:hidden"
            }`}
          >
            <Icon size={16} color="currentColor" />
          </span>
        ))}
        <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-white/15" />
        <span className="whitespace-nowrap px-2 font-mono text-[10px] text-white/70">Drag to have fun, click to know more</span>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent size="xl">
          {open && (
            <>
              <div className="flex justify-center overflow-hidden rounded-[12px] bg-[#1f1f1f] p-6">
                <Media item={open} big />
              </div>
              <DialogTitle className="mt-5 text-[20px] font-semibold leading-[1.3] tracking-[-0.02em]">
                {open.title}
              </DialogTitle>
              <DialogDescription className="font-mono text-[12px] leading-[1.3]">{open.tag}</DialogDescription>
              {open.text?.map((p, i) => (
                <p key={i} className="mt-3 max-w-prose text-[15px] leading-relaxed text-grey-600">
                  {p}
                </p>
              ))}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
