"use client";

import { useState } from "react";
import LandingProjects, { type LandingItem } from "./LandingProjects";
import SpiralView from "./SpiralView";

export default function LandingViews({ items }: { items: LandingItem[] }) {
  const [view, setView] = useState<"spiral" | "list">("spiral");

  const tab = (v: "spiral" | "list") =>
    `font-mono text-[13px] tracking-wide transition-colors ${
      view === v ? "text-ink" : "text-grey-400 hover:text-ink"
    }`;

  return (
    <>
      {/* View toggle — top centre */}
      <div className="absolute left-1/2 top-16 z-30 flex -translate-x-1/2 items-center gap-3 md:top-6">
        <button data-sfx onClick={() => setView("spiral")} className={tab("spiral")}>
          spiral
        </button>
        <span className="text-grey-400" aria-hidden>
          •
        </span>
        <button data-sfx onClick={() => setView("list")} className={tab("list")}>
          list
        </button>
      </div>

      {view === "spiral" ? (
        <SpiralView items={items} />
      ) : (
        <LandingProjects items={items} />
      )}
    </>
  );
}
