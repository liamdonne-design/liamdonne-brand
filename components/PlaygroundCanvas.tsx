"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
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
function Media({ item, big = false }: { item: PlaygroundItem; big?: boolean }) {
  const { media } = item;
  const cls = "block size-full object-cover";
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
  const raise = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: BOARD_W, height: BOARD_H, marginLeft: -BOARD_W / 2, marginTop: -BOARD_H / 2 + 60 }}
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
      </div>

      {/* design-tool toolbar (static), doubling as the hint */}
      <DesignToolbar hint="Drag to have fun, click to know more" />

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
