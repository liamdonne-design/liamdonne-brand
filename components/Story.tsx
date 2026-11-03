import { Fragment, type ReactNode } from "react";
import type { Media } from "@/content/projects";
import { MediaBlock } from "./Media";

/** A case-study section with locale already resolved (plain strings). */
export type ResolvedSection = { title: string; paras: string[]; media: Media[] };

const SPAN = {
  full: "md:col-span-12",
  half: "md:col-span-6",
  third: "md:col-span-4",
  quarter: "md:col-span-3",
} as const;

const SIZES = {
  full: "(max-width: 768px) 100vw, 1400px",
  half: "(max-width: 768px) 100vw, 700px",
  third: "(max-width: 768px) 100vw, 470px",
  quarter: "(max-width: 768px) 100vw, 350px",
} as const;

/** Visuals on a 12-column grid: full / half / third / quarter width on desktop, stacked on mobile. */
export function MediaGrid({ media }: { media: Media[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
      {media.map((m, i) => {
        const span = m.span ?? "full";
        return (
          <div key={`${m.src}-${i}`} className={SPAN[span]}>
            <MediaBlock media={m} sizes={SIZES[span]} className="rounded-lg" />
            {m.caption && (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#999]">{m.caption.en}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Inline markdown-ish emphasis: **bold** and *italic*. */
function inline(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2)
      return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * Story content conventions — one string per block (blocks are spaced apart):
 *   "\n" inside a block   → line break, no gap (as in Liam's layouts)
 *   lines starting "- "  → bulleted list, attached to the line above
 *   "> text" block       → pull quote
 *   **bold** / *italic*  → inline emphasis
 */
function Block({ text }: { text: string }) {
  if (text.startsWith("> "))
    return (
      <blockquote className="my-2 font-display text-[26px] leading-[1.2] text-[#1f1f1f] md:text-[32px]">
        {inline(text.slice(2))}
      </blockquote>
    );
  // "[Liam — …]": copy still to write, shown as a note until it is
  if (text.startsWith("[") && text.endsWith("]"))
    return (
      <p className="rounded-[8px] bg-[#ebebeb] px-4 py-3 font-mono text-[12px] leading-[1.5] text-[#6b6b68]">
        {text.slice(1, -1)}
      </p>
    );
  const lines = text.split("\n");
  const parts: ReactNode[] = [];
  let prose: string[] = [];
  let list: string[] = [];
  const flushProse = () => {
    if (!prose.length) return;
    const ls = prose;
    parts.push(
      <p key={`p${parts.length}`}>
        {ls.map((l, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {inline(l)}
          </Fragment>
        ))}
      </p>
    );
    prose = [];
  };
  const flushList = () => {
    if (!list.length) return;
    parts.push(
      <ul key={`u${parts.length}`} className="list-disc space-y-0.5 pl-5 marker:text-grey-400">
        {list.map((it, k) => (
          <li key={k}>{inline(it)}</li>
        ))}
      </ul>
    );
    list = [];
  };
  for (const l of lines) {
    if (l.startsWith("- ")) {
      flushProse();
      list.push(l.slice(2));
    } else {
      flushList();
      prose.push(l);
    }
  }
  flushProse();
  flushList();
  return <div>{parts}</div>;
}

/** A run of story blocks in the case-study body style. */
export function Paragraphs({ paras, className = "" }: { paras: string[]; className?: string }) {
  return (
    <div className={`max-w-[640px] space-y-5 text-[17px] leading-[1.6] text-[#1f1f1f] ${className}`}>
      {paras.map((para, i) => (
        <Block key={i} text={para} />
      ))}
    </div>
  );
}

/** Sections as on the case-study page: mono label on the left, text on the right, then the visuals. */
export function StorySections({ sections }: { sections: ResolvedSection[] }) {
  return (
    <>
      {sections.map((s, idx) => (
        <section key={`${s.title}-${idx}`} className="border-t border-black/10! py-12 md:py-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr] md:gap-8">
            {s.title ? (
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#999]">{s.title}</h3>
            ) : (
              <div aria-hidden />
            )}
            {s.paras.length > 0 && <Paragraphs paras={s.paras} />}
          </div>
          {s.media.length > 0 && (
            <div className="mt-10">
              <MediaGrid media={s.media} />
            </div>
          )}
        </section>
      ))}
    </>
  );
}
