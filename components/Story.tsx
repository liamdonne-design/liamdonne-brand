import { Fragment, type ReactNode } from "react";
import type { Media } from "@/content/projects";
import { MediaBlock } from "./Media";

/** A case-study section with locale already resolved (plain strings). */
export type ResolvedSection = { title: string; paras: string[]; media: Media[] };

const SPAN = {
  full: "md:col-span-6",
  half: "md:col-span-3",
  third: "md:col-span-2",
} as const;

const SIZES = {
  full: "(max-width: 768px) 100vw, 1400px",
  half: "(max-width: 768px) 100vw, 700px",
  third: "(max-width: 768px) 100vw, 470px",
} as const;

/** Visuals on a 6-column grid: full / half / third width on desktop, stacked on mobile. */
export function MediaGrid({ media }: { media: Media[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
      {media.map((m, i) => {
        const span = m.span ?? "full";
        return (
          <div key={`${m.src}-${i}`} className={SPAN[span]}>
            <MediaBlock media={m} sizes={SIZES[span]} className="rounded-lg" />
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
      <blockquote className="my-2 border-l-2 border-ink pl-5 font-display text-2xl leading-snug text-ink md:text-[1.7rem]">
        {inline(text.slice(2))}
      </blockquote>
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

/** Sections as in Liam's layouts: short label on the left, text on the right, then the visuals. */
export function StorySections({ sections }: { sections: ResolvedSection[] }) {
  return (
    <>
      {sections.map((s, idx) => (
        <section key={`${s.title}-${idx}`} className="border-t border-hairline py-10 md:py-14">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[200px_1fr] md:gap-8">
            {s.title ? (
              <h3 className="font-display text-xl leading-tight text-grey-600">{s.title}</h3>
            ) : (
              <div aria-hidden />
            )}
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-grey-900">
              {s.paras.map((para, i) => (
                <Block key={i} text={para} />
              ))}
            </div>
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
