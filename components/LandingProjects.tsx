"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "@/i18n/navigation";
import type { Media } from "@/content/projects";

export type LandingItem = {
  slug: string;
  index: string;
  client: string;
  title: string;
  cover: Media | null;
};

export default function LandingProjects({ items }: { items: LandingItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Smoothly track the cursor with the floating preview card (desktop only).
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(hover: none)").matches) return;

    // Anchor so the cursor sits at the card's bottom-left corner.
    gsap.set(card, { xPercent: 0, yPercent: -100 });
    const xTo = gsap.quickTo(card, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(card, "y", { duration: 0.55, ease: "power3" });

    // Offset so the cursor sits well INSIDE the card's bottom-left corner.
    const PAD = 40;
    const move = (e: PointerEvent) => {
      xTo(e.clientX - PAD);
      yTo(e.clientY + PAD);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Hide the pixel cursor while previewing a project — it looks bad over the card.
  useEffect(() => {
    const root = document.documentElement;
    if (active !== null) root.classList.add("hide-pixel-cursor");
    else root.classList.remove("hide-pixel-cursor");
    return () => root.classList.remove("hide-pixel-cursor");
  }, [active]);

  const activeHasCover = active !== null && !!items[active]?.cover;

  return (
    <>
      {/* Floating preview card — follows the cursor, shows the hovered cover.
          pointer-events-none so hovering "through" it still targets the list. */}
      <div
        ref={cardRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 hidden w-[18rem] overflow-hidden rounded-xl shadow-2xl md:block"
        style={{
          opacity: activeHasCover ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        <div className="relative aspect-[16/9] w-full bg-grey-200">
          {items.map((it, i) =>
            it.cover ? (
              <div
                key={it.slug}
                className="absolute inset-0 transition-opacity duration-300"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                {it.cover.type === "video" ? (
                  <video
                    className="h-full w-full object-cover"
                    src={it.cover.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="h-full w-full object-cover"
                    src={it.cover.src}
                    alt=""
                  />
                )}
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Centred project list */}
      <nav className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4 md:gap-5">
        {items.map((it, i) => (
          <Link
            key={it.slug}
            href={`/work/${it.slug}`}
            data-sfx="project"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className="group relative flex items-baseline justify-center text-center"
            style={{
              opacity: active === null || active === i ? 1 : 0.12,
              transition: "opacity 0.3s ease",
            }}
          >
            <span className="mono-label absolute right-full mr-3 hidden self-center sm:inline md:mr-5">
              {it.index}
            </span>
            <span className="grade-hover font-display leading-[1.05] text-[7.5vw] md:text-[4.4vw]">
              {it.title}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}
