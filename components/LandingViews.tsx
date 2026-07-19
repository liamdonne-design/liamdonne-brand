"use client";

import { useEffect, useRef, useState } from "react";
import LandingProjects, { type LandingItem } from "./LandingProjects";
import SpiralStage from "./SpiralStage";

export default function LandingViews({ items }: { items: LandingItem[] }) {
  const [view, setView] = useState<"spiral" | "list">("spiral");
  const spiralRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLButtonElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  // Position the sliding grey label under the active tab (and on resize).
  useEffect(() => {
    const update = () => {
      const el = view === "spiral" ? spiralRef.current : listRef.current;
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [view]);

  const tabClass = (v: "spiral" | "list") =>
    `relative z-10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
      view === v ? "text-ink" : "text-grey-600 hover:text-ink"
    }`;

  return (
    <>
      {/* View toggle — segmented control with sliding white pill */}
      <div className="absolute left-1/2 top-4 z-30 -translate-x-1/2 md:top-6">
        <div className="relative inline-flex items-center rounded-lg bg-grey-200 p-1">
          <span
            aria-hidden
            className="absolute bottom-1 top-1 rounded-md bg-[#3a3a37] shadow-sm transition-all duration-300 ease-out"
            style={{ left: pill.left, width: pill.width }}
          />
          <button
            ref={spiralRef}
            data-sfx
            onClick={() => setView("spiral")}
            className={tabClass("spiral")}
          >
            HELIX
          </button>
          <button
            ref={listRef}
            data-sfx
            onClick={() => setView("list")}
            className={tabClass("list")}
          >
            LIST
          </button>
        </div>
      </div>

      {view === "spiral" ? (
        <SpiralStage items={items} />
      ) : (
        <LandingProjects items={items} />
      )}
    </>
  );
}
