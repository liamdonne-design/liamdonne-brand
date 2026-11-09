"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { MediaBlock } from "./Media";
import { MediaGrid, StorySections } from "./Story";
import FluidLinkButton from "./FluidLinkButton";
import type { DeskProject } from "./FolderDesk";

/**
 * A project opened as a macOS-style window on top of the desk. It grows out of
 * the window that was clicked and shrinks back into it on close (red light,
 * CLOSE button, backdrop click or Esc).
 */
export default function ProjectModal({
  project,
  fileName,
  origin,
  onClosed,
}: {
  project: DeskProject;
  fileName: string;
  origin: DOMRect | null;
  onClosed: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  // transform that maps the panel onto the source window
  const fromOrigin = useCallback(() => {
    const p = panelRef.current;
    if (!p || !origin) return { x: 0, y: 24, scale: 0.96 };
    const r = p.getBoundingClientRect();
    return {
      x: origin.left + origin.width / 2 - (r.left + r.width / 2),
      y: origin.top + origin.height / 2 - (r.top + r.height / 2),
      scale: Math.max(0.12, origin.width / r.width),
    };
  }, [origin]);

  useLayoutEffect(() => {
    const p = panelRef.current;
    if (!p) return;
    gsap.fromTo(
      p,
      { ...fromOrigin(), opacity: 0 },
      { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.55, ease: "expo.out" }
    );
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    closeRef.current?.focus({ preventScroll: true });
  }, [fromOrigin]);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const p = panelRef.current;
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.35 });
    gsap.to(p, {
      ...fromOrigin(),
      opacity: 0,
      duration: 0.38,
      ease: "power3.in",
      onComplete: onClosed,
    });
  }, [fromOrigin, onClosed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // portalled to <body> so it sits above the logo / nav corners too
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        ref={backdropRef}
        onClick={close}
        className="absolute inset-0 bg-black/15 backdrop-blur-md"
      />

      <div
        ref={panelRef}
        className="relative flex h-[min(92dvh,900px)] w-[min(1080px,100%)] flex-col overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_30px_80px_-20px_rgba(20,30,50,0.35)] md:h-[min(88dvh,900px)]"
      >
        {/* title bar */}
        <div className="relative flex h-10 shrink-0 items-center gap-2 border-b border-black/[0.06] bg-[#F3F3F5] px-3.5">
          <button
            type="button"
            onClick={close}
            aria-label="Close project"
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#FF5F57]"
          >
            <svg viewBox="0 0 8 8" className="h-[7px] w-[7px] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
              <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#7A1C16" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="pointer-events-none absolute inset-x-24 truncate text-center font-sans text-[13px] text-[#3A3D42]">
            {fileName}
          </span>
          <Button ref={closeRef} variant="ghost" size="compact" onClick={close} className="ml-auto">
            Close
          </Button>
        </div>

        {/* content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <header className="px-5 pb-8 pt-8 md:px-10 md:pt-12">
            <div className="mono-label flex flex-wrap items-center gap-3">
              <span>Project {project.index}</span>
              <span className="text-grey-400">/</span>
              <span>{project.client}</span>
              <span className="text-grey-400">/</span>
              <span>{project.year}</span>
            </div>
            <h2 className="display-lg mt-4">{project.title}</h2>
            <p className="mt-4 max-w-xl text-lg text-grey-600 md:text-xl">{project.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-5">
              <div>
                <div className="mono-label">Role</div>
                <div className="mt-1 text-base">{project.role}</div>
              </div>
              {project.chips.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-sm bg-grey-200 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-grey-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="px-5 md:px-10">
            <MediaBlock media={project.cover} sizes="(max-width: 1080px) 100vw, 1000px" className="rounded-[12px]" />
          </div>

          {project.story.length > 0 && (
            <div className="px-5 pt-10 md:px-10">
              <StorySections sections={project.story} />
            </div>
          )}

          {project.stats.length > 0 && (
            <dl className="mx-5 mt-4 grid grid-cols-2 border-y border-hairline md:mx-10 md:grid-cols-4">
              {project.stats.map((s, i) => (
                <div key={i} className="p-5">
                  <dt className="font-display text-4xl md:text-5xl">{s.value}</dt>
                  <dd className="mono-label mt-2">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.gallery.length > 0 && (
            <div className="px-5 py-10 md:px-10">
              <MediaGrid media={project.gallery} />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 border-t border-hairline px-5 py-6 md:px-10">
            <FluidLinkButton href={`/work/${project.slug}`} variant="primary" trailingIcon="arrow-right">
              Full case study
            </FluidLinkButton>
            {project.medium && (
              <FluidLinkButton href={project.medium} variant="ghost">
                Backstage on Medium
              </FluidLinkButton>
            )}
            <Button variant="tertiary" onClick={close} className="ml-auto">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
