"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Media } from "@/content/projects";
import ProjectModal from "./ProjectModal";
import Logo from "./Logo";

/** Serializable project data, resolved server-side for the current locale. */
export type DeskProject = {
  slug: string;
  index: string;
  client: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  chips: string[];
  cover: Media;
  sections: { label: string; body: string }[];
  stats: { value: string; label: string }[];
  gallery: Media[];
};

/* Where each window lands when the folder opens. fx/fy are offsets from the
   centre (fractions of the viewport), fw the width (fraction of a base size),
   ratio the media aspect ratio (covers are cropped to it). */
type Slot = { fx: number; fy: number; fw: number; ratio: number };

const DESKTOP: Slot[] = [
  { fx: -0.33, fy: -0.16, fw: 0.17, ratio: 4 / 5 },
  { fx: 0.0, fy: -0.27, fw: 0.2, ratio: 16 / 10 },
  { fx: 0.32, fy: -0.16, fw: 0.16, ratio: 3 / 4 },
  { fx: -0.3, fy: 0.25, fw: 0.19, ratio: 16 / 10 },
  { fx: 0.04, fy: 0.3, fw: 0.15, ratio: 1 },
  { fx: 0.3, fy: 0.26, fw: 0.2, ratio: 16 / 9 },
];

const MOBILE: Slot[] = [
  { fx: -0.25, fy: -0.23, fw: 0.4, ratio: 4 / 5 },
  { fx: 0.25, fy: -0.28, fw: 0.44, ratio: 16 / 10 },
  { fx: 0.27, fy: -0.17, fw: 0.37, ratio: 1 },
  { fx: -0.25, fy: 0.19, fw: 0.43, ratio: 16 / 10 },
  { fx: 0.26, fy: 0.22, fw: 0.4, ratio: 1 },
  { fx: -0.21, fy: 0.34, fw: 0.45, ratio: 16 / 9 },
];

const TOP_SAFE = 112; // keep clear of logo / nav
const BOTTOM_SAFE = 72; // keep clear of "2026 · Linkedin" / sound / contact tab
const HOLD_MS = 380; // touch: long-press before a window lifts (iPhone-style)

type Geo = {
  x: number;
  y: number;
  w: number;
  h: number;
  ratio: number;
  bar: number;
};

function computeLayout(vw: number, vh: number, n: number): Geo[] {
  const mobile = vw < 768;
  const slots = mobile ? MOBILE : DESKTOP;
  const bar = mobile ? 22 : 26;
  const base = mobile ? Math.min(vw, 430) : Math.min(vw, vh * 1.7);
  const spanX = mobile ? vw : Math.min(vw, vh * 1.75);
  return Array.from({ length: n }, (_, i) => {
    const s = slots[i % slots.length];
    const w = mobile ? s.fw * base : Math.max(150, Math.min(360, s.fw * base));
    const h = w / s.ratio + bar;
    // keep the landing spot fully on screen and clear of the corners' UI
    const minX = -vw / 2 + w / 2 + 10;
    const maxX = vw / 2 - w / 2 - 10;
    const minY = -vh / 2 + h / 2 + TOP_SAFE;
    const maxY = vh / 2 - h / 2 - BOTTOM_SAFE;
    const x = Math.max(minX, Math.min(maxX, s.fx * spanX));
    const y =
      minY > maxY
        ? (minY + maxY) / 2
        : Math.max(minY, Math.min(maxY, s.fy * vh));
    return { x, y, w, h, ratio: s.ratio, bar };
  });
}

function fileName(p: DeskProject) {
  return `${p.title}.${p.cover.type === "video" ? "mp4" : "jpg"}`;
}

function CoverMedia({
  media,
  sizes,
  still = false,
}: {
  media: Media;
  sizes: string;
  still?: boolean;
}) {
  // thumbnails of a video: use its poster image when there is one
  if (still && media.type === "video" && media.poster) {
    return (
      <Image
        src={media.poster}
        alt=""
        fill
        sizes={sizes}
        draggable={false}
        className="pointer-events-none object-cover"
      />
    );
  }
  if (media.type === "video") {
    return (
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={still ? `${media.src}#t=1` : media.src}
        autoPlay={!still}
        muted
        loop
        playsInline
        preload={still ? "metadata" : "auto"}
        draggable={false}
      />
    );
  }
  return (
    <Image
      src={media.src}
      alt=""
      fill
      sizes={sizes}
      draggable={false}
      className="pointer-events-none object-cover"
    />
  );
}

/* ------------------------------------------------------------- the folder */
// covers peeking out of the closed folder — picked for colour (some videos open on white)
const PEEK_SLUGS = [
  "synapse-corporate-refresh",
  "cuidam-hearts-event",
  "cuidam-corporate-branding",
];

function Folder({ items, size }: { items: DeskProject[]; size: number }) {
  const picked = PEEK_SLUGS.map((s) => items.find((p) => p.slug === s)).filter(
    (p): p is DeskProject => !!p,
  );
  const peeks = (picked.length === 3 ? picked : items).slice(0, 3);
  const rot = [-16, -3, 13];
  const left = [22, 38, 54]; // % of folder width
  return (
    <div className="relative" style={{ width: size, height: size * 0.71 }}>
      {/* back plate with tab */}
      <svg
        viewBox="0 0 152 108"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="fd-back" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3FA0F9" />
            <stop offset="1" stopColor="#2766C0" />
          </linearGradient>
        </defs>
        <path
          d="M12 0h38c4 0 6 1.5 8.5 4.5L62 9h76c6.6 0 10 3.4 10 10v60H4V8C4 3 7 0 12 0z"
          fill="url(#fd-back)"
        />
      </svg>

      {/* covers tucked inside — they rise and fan out when the folder is hovered */}
      <div className="fd-peeks absolute inset-0">
        {peeks.map((p, i) => (
          <div
            key={p.slug}
            className="absolute transition-transform duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)] [transform:translateY(var(--down))_rotate(0deg)] group-hover:[transform:translateY(0)_rotate(var(--rot))] group-focus-visible:[transform:translateY(0)_rotate(var(--rot))]"
            style={
              {
                left: `${left[i]}%`,
                top: -size * 0.26 + (i === 1 ? -size * 0.05 : 0),
                width: size * 0.24,
                height: size * 0.3,
                "--rot": `${rot[i]}deg`,
                "--down": `${size * 0.55}px`,
                transitionDelay: `${i * 45}ms`,
              } as React.CSSProperties
            }
          >
            <div className="h-full w-full overflow-hidden rounded-[4px] bg-white p-[1.5px] shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
              <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-grey-200">
                <CoverMedia media={p.cover} sizes="48px" still />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* front plate — tips forward on hover, opening the folder */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-[12px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:perspective(420px)_rotateX(-26deg)] group-focus-visible:[transform:perspective(420px)_rotateX(-26deg)]"
        style={{
          top: "20.5%",
          transformOrigin: "50% 100%",
          background:
            "linear-gradient(135deg, #B9DAFF 0%, #7DB9FF 45%, #3F98FA 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.55), 0 1px 2px rgba(30,80,150,0.18)",
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- the desk */
export default function FolderDesk({
  items,
  label = "My Work",
}: {
  items: DeskProject[];
  label?: string;
}) {
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const [geo, setGeo] = useState<Geo[] | null>(null);
  const [folderSize, setFolderSize] = useState(150);
  const headSize = Math.round(folderSize * 0.93); // the GIF, left of the folder
  const [modal, setModal] = useState<{
    i: number;
    origin: DOMRect | null;
  } | null>(null);

  const geoRef = useRef<Geo[] | null>(null);
  const winRefs = useRef<(HTMLDivElement | null)[]>([]);
  const folderRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // where the windows fly out of / back into: the folder icon, relative to the viewport centre
  const burstOrigin = useCallback(() => {
    const r = iconRef.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return {
      x: r.left + r.width / 2 - window.innerWidth / 2,
      y: r.top + r.height * 0.4 - window.innerHeight / 2,
    };
  }, []);
  const pos = useRef<{ x: number; y: number }[]>([]);
  const moved = useRef<boolean[]>([]);
  const zTop = useRef(items.length + 1);

  /* ---- layout (and re-layout on resize) ---- */
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const g = computeLayout(vw, vh, items.length);
      geoRef.current = g;
      setGeo(g);
      setFolderSize(vw < 768 ? 116 : 150);
      // windows already out: unmoved ones snap to their new slot, moved ones stay on screen
      winRefs.current.forEach((el, i) => {
        if (!el || !pos.current[i]) return;
        if (!moved.current[i]) pos.current[i] = { x: g[i].x, y: g[i].y };
        else
          pos.current[i] = clampDrag(pos.current[i].x, pos.current[i].y, g[i]);
        gsap.set(el, { x: pos.current[i].x, y: pos.current[i].y });
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items.length]);

  /* ---- open: windows burst out of the folder ---- */
  useLayoutEffect(() => {
    if (phase !== "open") return;
    const g = geoRef.current;
    if (!g) return;
    pos.current = g.map((s) => ({ x: s.x, y: s.y }));
    moved.current = g.map(() => false);
    const o = burstOrigin();
    const tl = gsap.timeline();
    winRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.zIndex = String(i + 1);
      gsap.set(el, { xPercent: -50, yPercent: -50 });
      tl.fromTo(
        el,
        {
          x: o.x,
          y: o.y,
          scale: 0.16,
          opacity: 0,
          rotate: (i % 2 ? 1 : -1) * (6 + i * 2),
        },
        {
          x: g[i].x,
          y: g[i].y,
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.15)",
        },
        i * 0.045,
      );
    });
    tl.to(
      ".fd-peeks",
      { opacity: 0, duration: 0.2, ease: "power2.in" },
      0,
    );
    return () => {
      tl.kill();
    };
    // only re-run when the phase changes (not on resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const closeAll = useCallback(() => {
    setPhase("closing");
    const els = winRefs.current.filter(Boolean) as HTMLDivElement[];
    const o = burstOrigin();
    const tl = gsap.timeline({ onComplete: () => setPhase("closed") });
    els.forEach((el, i) => {
      tl.to(
        el,
        {
          x: o.x,
          y: o.y,
          scale: 0.16,
          opacity: 0,
          rotate: (i % 2 ? -1 : 1) * 6,
          duration: 0.42,
          ease: "power3.in",
        },
        (els.length - 1 - i) * 0.03,
      );
    });
    tl.to(
      ".fd-peeks",
      { opacity: 1, duration: 0.3 },
      ">-0.1",
    );
  }, [burstOrigin]);

  const toggle = () => {
    if (phase === "closed") setPhase("open");
    else if (phase === "open") closeAll();
  };

  /* ---- drag & drop (mouse: drag; touch: long-press then drag) ---- */
  const drag = useRef<{
    i: number;
    id: number;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    mode: "pending" | "hold" | "drag" | "cancel";
    touch: boolean;
    timer: ReturnType<typeof setTimeout> | null;
  } | null>(null);

  const lift = (el: HTMLDivElement, touch: boolean) => {
    el.classList.add("is-lifted");
    if (touch) el.classList.add("is-jiggle");
    gsap.to(el, { scale: 1.04, duration: 0.18, ease: "power2.out" });
    if (touch && "vibrate" in navigator) navigator.vibrate?.(8);
  };
  const drop = (el: HTMLDivElement) => {
    el.classList.remove("is-lifted", "is-jiggle");
    gsap.to(el, { scale: 1, duration: 0.3, ease: "back.out(2)" });
  };

  const onPointerDown =
    (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      if (phase !== "open") return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const el = winRefs.current[i];
      if (!el) return;
      el.setPointerCapture(e.pointerId);
      // keep windows stacked below the corner UI (z-30): re-pack z-indexes when they climb
      if (zTop.current >= 25) {
        const els = winRefs.current.filter(Boolean) as HTMLDivElement[];
        els
          .sort((a, b) => Number(a.style.zIndex) - Number(b.style.zIndex))
          .forEach((w, k) => (w.style.zIndex = String(k + 1)));
        zTop.current = els.length;
      }
      el.style.zIndex = String(++zTop.current);
      const touch = e.pointerType !== "mouse";
      const d: NonNullable<typeof drag.current> = {
        i,
        id: e.pointerId,
        sx: e.clientX,
        sy: e.clientY,
        ox: pos.current[i]?.x ?? 0,
        oy: pos.current[i]?.y ?? 0,
        mode: touch ? "hold" : "pending",
        touch,
        timer: null,
      };
      if (touch) {
        d.timer = setTimeout(() => {
          if (drag.current === d && d.mode === "hold") {
            d.mode = "drag";
            lift(el, true);
          }
        }, HOLD_MS);
      }
      drag.current = d;
    };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const el = winRefs.current[d.i];
    const g = geoRef.current?.[d.i];
    if (!el || !g) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    const dist = Math.hypot(dx, dy);
    if (d.mode === "pending" && dist > 4) {
      d.mode = "drag";
      lift(el, false);
    } else if (d.mode === "hold" && dist > 10) {
      // moved before the long-press fired → not a drag, not a tap
      if (d.timer) clearTimeout(d.timer);
      d.mode = "cancel";
    }
    if (d.mode === "drag") {
      const p = clampDrag(d.ox + dx, d.oy + dy, g);
      pos.current[d.i] = p;
      moved.current[d.i] = true;
      gsap.set(el, { x: p.x, y: p.y });
    }
  };

  const endPointer =
    (cancelled: boolean) => (e: React.PointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      if (d.timer) clearTimeout(d.timer);
      const el = winRefs.current[d.i];
      if (d.mode === "drag" && el) drop(el);
      else if (
        !cancelled &&
        (d.mode === "pending" || d.mode === "hold") &&
        el
      ) {
        setModal({ i: d.i, origin: el.getBoundingClientRect() });
      }
      drag.current = null;
    };

  const openFromKey =
    (i: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      const el = winRefs.current[i];
      setModal({ i, origin: el ? el.getBoundingClientRect() : null });
    };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* GIF + folder, centred together as one group (flex, no transform, so the
          GIF's multiply blend still reaches the dot field behind) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto flex items-start gap-3 md:gap-5">
          <div
              className="shrink-0"
              // align the GIF's centre with the folder icon's centre
              style={{ marginTop: 14 + (folderSize * 0.71 - headSize) / 2 }}
            >
              <Logo size={headSize} link={false} />
            </div>
          <button
            ref={folderRef}
            type="button"
            onClick={toggle}
            aria-expanded={phase === "open"}
            aria-label={phase === "open" ? `Close ${label}` : `Open ${label}`}
            className="group flex flex-col items-center px-3 pb-2 pt-3.5 transition-transform duration-200 active:scale-[0.97]"
          >
            <div ref={iconRef}>
              <Folder items={items} size={folderSize} />
            </div>
            <span className="mt-2 font-sans text-[13px] font-medium tracking-[-0.01em] text-ink md:text-sm">
              {label}
            </span>
          </button>
        </div>
      </div>

      {/* the project windows */}
      {phase !== "closed" &&
        geo &&
        items.map((p, i) => {
          const g = geo[i];
          return (
            <div
              key={p.slug}
              ref={(el) => {
                winRefs.current[i] = el;
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${p.title}`}
              onPointerDown={onPointerDown(i)}
              onPointerMove={onPointerMove}
              onPointerUp={endPointer(false)}
              onPointerCancel={endPointer(true)}
              onKeyDown={openFromKey(i)}
              onContextMenu={(e) => e.preventDefault()}
              className="desk-win absolute left-1/2 top-1/2 touch-none opacity-0 outline-none"
              style={{ width: g.w, willChange: "transform" }}
            >
              <div className="desk-win-inner overflow-hidden rounded-[10px] bg-white">
                <div
                  className="flex items-center gap-[5px] border-b border-black/[0.06] bg-[#F3F3F5] px-2.5 md:gap-1.5"
                  style={{ height: g.bar }}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF5F57] md:h-2.5 md:w-2.5" />
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#FEBC2E] md:h-2.5 md:w-2.5" />
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#28C840] md:h-2.5 md:w-2.5" />
                  <span className="ml-1.5 truncate font-sans text-[10.5px] text-[#3A3D42] md:text-xs">
                    {fileName(p)}
                  </span>
                </div>
                <div
                  className="relative bg-grey-200"
                  style={{ height: g.w / g.ratio }}
                >
                  <CoverMedia media={p.cover} sizes={`${Math.round(g.w)}px`} />
                </div>
              </div>
            </div>
          );
        })}

      {modal && (
        <ProjectModal
          project={items[modal.i]}
          fileName={fileName(items[modal.i])}
          origin={modal.origin}
          onClosed={() => setModal(null)}
        />
      )}
    </div>
  );
}

/** While dragging, a window may leave the screen partially but never entirely. */
function clampDrag(x: number, y: number, g: Geo) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const keep = 56;
  return {
    x: Math.max(-vw / 2 - g.w / 2 + keep, Math.min(vw / 2 + g.w / 2 - keep, x)),
    y: Math.max(-vh / 2 + g.h / 2, Math.min(vh / 2 + g.h / 2 - keep, y)),
  };
}
