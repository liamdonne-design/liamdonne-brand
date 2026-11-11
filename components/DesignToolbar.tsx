import type { ReactNode } from "react";

/**
 * The Playground's toolbar, after Figma's, cut down to the essentials: the
 * move tool (active), the hand tool, then one real control: the "Tidy up"
 * switch that turns the scattered cards into a canvas explorer.
 */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      {children}
    </svg>
  );
}

export default function DesignToolbar({ tidy, onTidy }: { tidy: boolean; onTidy: (on: boolean) => void }) {
  return (
    <div className="absolute bottom-16 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-[14px] border border-white/10 bg-[#2c2c2c]/95 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md">
      {/* tools: decoration, the active one tells which mode you're in */}
      <span
        aria-hidden
        className={`flex size-8 items-center justify-center rounded-[8px] transition-colors ${tidy ? "text-white/85" : "bg-[#0D99FF] text-white"}`}
      >
        <Glyph>
          <path {...S} d="M5.5 4l12.5 6.1-5.4 1.5-2.4 5.3z" />
        </Glyph>
      </span>
      <span
        aria-hidden
        className={`flex size-8 items-center justify-center rounded-[8px] transition-colors ${tidy ? "bg-[#0D99FF] text-white" : "text-white/85"}`}
      >
        <Glyph>
          <path {...S} d="M8 12V6.5a1.5 1.5 0 013 0V11m0-5.5V5a1.5 1.5 0 013 0v6m0-5a1.5 1.5 0 013 0v7.5a6 6 0 01-6 6h-.6a6 6 0 01-4.7-2.3L4.6 14a1.5 1.5 0 012.3-1.9L8 13.5" />
        </Glyph>
      </span>

      <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-white/15" />

      <button
        type="button"
        role="switch"
        aria-checked={tidy}
        onClick={() => onTidy(!tidy)}
        className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-[8px] px-2 py-1.5 font-mono text-[11px] text-white/80 outline-none transition-colors hover:bg-white/8 focus-visible:ring-2 focus-visible:ring-[#0D99FF]"
      >
        Tidy up
        <span className={`relative h-4 w-7 rounded-full transition-colors ${tidy ? "bg-[#0D99FF]" : "bg-white/20"}`}>
          <span
            className={`absolute top-0.5 left-0.5 size-3 rounded-full bg-white shadow transition-transform duration-200 ${tidy ? "translate-x-3" : ""}`}
          />
        </span>
      </button>
    </div>
  );
}
