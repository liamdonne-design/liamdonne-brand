import type { ReactNode } from "react";

/**
 * The Playground's static toolbar, drawn after Figma's: a few tools (move
 * active), each with its menu caret, then the mode switch (design active),
 * then the hint. Decoration only; nothing here is clickable.
 */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      {children}
    </svg>
  );
}

const TOOLS: { name: string; icon: ReactNode; caret?: boolean }[] = [
  { name: "Move", caret: true, icon: <path {...S} d="M5.5 4l12.5 6.1-5.4 1.5-2.4 5.3z" /> },
  { name: "Frame", caret: true, icon: <path {...S} d="M8.5 4v16M15.5 4v16M4 8.5h16M4 15.5h16" /> },
  { name: "Rectangle", caret: true, icon: <rect {...S} x="5" y="5" width="14" height="14" rx="1.5" /> },
  {
    name: "Pen",
    caret: true,
    icon: (
      <>
        <path {...S} d="M5 19.5l2.2-8.4L13.6 5l5.4 5.4-6.1 6.4z" />
        <path {...S} d="M5 19.5l5.3-5.3" />
        <circle {...S} cx="11.4" cy="12.6" r="1.4" />
      </>
    ),
  },
  { name: "Text", caret: true, icon: <path {...S} d="M5.5 6.5V5h13v1.5M12 5v14M9.5 19h5" /> },
];

const MODES: { name: string; icon: ReactNode; on?: boolean }[] = [
  { name: "Draw", icon: <path {...S} d="M4.5 15.5c3-4.6 5.4-6.4 6.2-5.4.9 1.2-3.5 5.9-2.2 6.8 1.2.9 4.9-6.5 6.4-5.5 1.3.9-1.6 4.3-.4 5 .9.6 2.5-1 4-2.6" /> },
  {
    name: "Design",
    on: true,
    icon: (
      <>
        <rect {...S} x="5" y="5" width="14" height="14" rx="2" />
        <path {...S} d="M5 10h14M10 10v9" />
      </>
    ),
  },
  { name: "Prototype", icon: <path {...S} d="M12 4.5l7.5 7.5-7.5 7.5L4.5 12z M12 9l3 3-3 3-3-3z" /> },
  { name: "Dev Mode", icon: <path {...S} d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5M13.5 5.5l-3 13" /> },
];

function Caret() {
  return (
    <svg viewBox="0 0 8 8" width="7" height="7" aria-hidden className="text-white/55">
      <path d="M1.5 3l2.5 2.5L6.5 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DesignToolbar({ hint }: { hint: string }) {
  return (
    <div className="pointer-events-none absolute bottom-16 left-1/2 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-1 rounded-[14px] border border-white/10 bg-[#2c2c2c]/95 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md">
      {TOOLS.map((t, i) => (
        <span key={t.name} aria-hidden className={`flex shrink-0 items-center gap-0.5 ${i > 0 ? "max-sm:hidden" : ""}`}>
          <span
            className={`flex size-8 items-center justify-center rounded-[8px] ${
              i === 0 ? "bg-[#0D99FF] text-white" : "text-white/85"
            }`}
          >
            <Glyph>{t.icon}</Glyph>
          </span>
          {t.caret && <Caret />}
        </span>
      ))}

      {/* mode switch: its own darker well, design selected */}
      <span aria-hidden className="ml-1 flex shrink-0 items-center gap-0.5 rounded-[10px] bg-[#1e1e1e] p-1 max-md:hidden">
        {MODES.map((m) => (
          <span
            key={m.name}
            className={`flex size-7 items-center justify-center rounded-[7px] ${
              m.on ? "bg-[#383838] text-[#0D99FF]" : "text-white/55"
            }`}
          >
            <Glyph>{m.icon}</Glyph>
          </span>
        ))}
      </span>

      <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-white/15" />
      <span className="whitespace-nowrap px-2 font-mono text-[10px] text-white/70">{hint}</span>
    </div>
  );
}
