"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { iconsaxIcons } from "@/lib/icons-iconsax";
import LoopVideo from "./LoopVideo";

const CloseIcon = iconsaxIcons.x;

/**
 * Off-screen gallery, after Framer's "ImageScroller": one screen of scroll
 * per picture, inside the site margins, rounded like the cards. The picture stays pinned while you scroll and
 * cross-fades to the next one; a dock of thumbnails sits on the right, a
 * white outline gliding to the current one. Clicking a thumbnail scrolls to it.
 * GIFs work as is (plain img keeps the animation). A `video` item loops a
 * muted MP4 excerpt in the frame; if it also has a `youtube` id, the cursor
 * becomes a white play button over it and a click opens the full video.
 */
export type OffScreenItem = {
  src: string; // picture, or the poster / thumbnail for a YouTube item
  alt: string;
  video?: string; // a looping, muted clip shown in the frame
  youtube?: string; // YouTube id: the cursor turns into a play button, a click opens it
  /** half and half: the `video` loops on the left half, this picture fills the right half */
  pair?: string;
};

export default function OffScreenScroller({
  items,
  title,
}: {
  items: OffScreenItem[];
  title?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<OffScreenItem | null>(null);
  const [hoverPlay, setHoverPlay] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const cx = useSpring(px, { stiffness: 500, damping: 40, mass: 0.5 });
  const cy = useSpring(py, { stiffness: 500, damping: 40, mass: 0.5 });
  const current = items[active];
  const video = current?.youtube ? current : null;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(
    () =>
      scrollYProgress.on("change", (p) => {
        setActive(Math.min(Math.floor(p * items.length), items.length - 1));
      }),
    [scrollYProgress, items.length],
  );

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY + i * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    // wider than the page's text column, within the site margins
    <div
      ref={ref}
      className="relative w-[min(1100px,calc(100vw-40px))] shrink-0"
      style={{ height: `${items.length * 100}vh` }}
    >
      {/* the title and the 16:9 frame, held in the middle of the screen together
          while the pictures change (title ~31px + 32px gap above the frame) */}
      <div className="sticky top-[max(20px,calc(50vh-min(1100px,100vw-40px)*9/32-32px))]">
        {title && <div className="mb-8">{title}</div>}
        <div
          className={`relative aspect-video w-full overflow-hidden rounded-[15px] bg-[#ddd] ${video && hoverPlay ? "cursor-none" : ""}`}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            if (!hoverPlay) {
              px.jump(x);
              py.jump(y);
              cx.jump(x);
              cy.jump(y);
            } else {
              px.set(x);
              py.set(y);
            }
            // not over the thumbnail dock
            const overDock = !!(e.target as HTMLElement).closest("[data-dock]");
            setHoverPlay(e.pointerType === "mouse" && !overDock);
          }}
          onPointerLeave={() => setHoverPlay(false)}
          onClick={(e) => {
            if (video && !(e.target as HTMLElement).closest("[data-dock]")) setPlaying(video);
          }}
        >
          {items.map((it, i) => (
            <motion.div
              key={it.src}
              className="absolute inset-0"
              style={{ zIndex: active === i ? 1 : 0 }}
              initial={{ opacity: i === 0 ? 1 : 0 }}
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {it.pair && it.video ? (
                <div className="flex size-full">
                  <LoopVideo src={it.video} preload="metadata" className="h-full w-1/2 object-cover" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.pair} alt={it.alt} draggable={false} className="h-full w-1/2 select-none object-cover" />
                </div>
              ) : it.video ? (
                <LoopVideo src={it.video} poster={it.src} preload="metadata" className="size-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.src} alt={it.alt} draggable={false} className="size-full select-none object-cover" />
              )}
            </motion.div>
          ))}

          {/* over a video, the cursor becomes a white play button */}
          <AnimatePresence>
            {video && hoverPlay && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-20"
                style={{ x: cx, y: cy }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <span className="flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden className="ml-0.5 text-[#1f1f1f]">
                    <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
                  </svg>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* thumbnail dock, on the right so the picture stays clear */}
          <div data-dock className="absolute right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1 rounded-[9px] bg-white p-1 sm:right-4 sm:gap-2 sm:rounded-[12px] sm:p-2 backdrop-blur-[5px]">
            {items.map((it, i) => (
              <button
                key={it.src}
                type="button"
                aria-label={`Show ${it.alt}`}
                aria-current={active === i}
                onClick={() => goTo(i)}
                className="relative flex size-7 cursor-pointer sm:size-16 items-center justify-center"
              >
                {active === i && (
                  <motion.span
                    layoutId="offscreen-outline"
                    className="pointer-events-none absolute -inset-[3px] z-10 rounded-[9px] sm:-inset-1 sm:rounded-[16px] border-2 border-[#1f1f1f]!"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.src}
                  alt=""
                  draggable={false}
                  className="size-full rounded-[6px] object-cover sm:rounded-[12px]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!playing} onOpenChange={(v) => !v && setPlaying(null)}>
        <DialogContent size="xl" showCloseButton={false} className="w-[min(960px,calc(100vw-2rem))] max-w-none">
          {playing?.youtube && (
            <div className="relative">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close"
                  className="absolute -top-12 right-0 text-[#1f1f1f] sm:-right-12 sm:top-0"
                >
                  <CloseIcon />
                </Button>
              </DialogClose>
              <DialogTitle className="sr-only">{playing.alt}</DialogTitle>
              <div className="aspect-video overflow-hidden rounded-[12px] bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${playing.youtube}?autoplay=1&rel=0&playsinline=1`}
                  title={playing.alt}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="size-full"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
