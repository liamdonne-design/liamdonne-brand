import { Fragment, type ReactNode } from "react";
import { VISUAL_TO_COME, type Media } from "@/content/projects";
import { MediaBlock } from "./Media";

/** A case-study section with locale already resolved (plain strings). */
export type ResolvedSection = { title: string; paras: string[]; media: Media[]; lead?: boolean; guideline?: string[]; pairs?: boolean };

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
        // one or two thirds on their own sit in the middle of the row
        const centre =
          i === 0 && span === "third" && media.length < 3 && media.every((x) => x.span === "third")
            ? media.length === 1
              ? "md:col-start-5"
              : "md:col-start-3"
            : "";
        return (
          <div key={`${m.src}-${i}`} className={`${SPAN[span]} ${centre}`}>
            <MediaBlock media={m} sizes={SIZES[span]} className="rounded-[12px]" />
            {m.caption && (
              <p className={`ui-haze mt-2 w-fit font-mono text-[11px] uppercase tracking-[0.14em] text-[#999] ${m.struck ? "line-through" : ""}`}>
                {m.caption.en}
              </p>
            )}
            {m.description && (
              <p className="ui-haze mt-1 max-w-[42ch] text-[14px] leading-[1.45] text-[#6b6b68]">{m.description.en}</p>
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
 *   "! text" block       → grey takeaway box
 *   **bold** / *italic*  → inline emphasis
 */
function Block({ text }: { text: string }) {
  if (text.startsWith("> "))
    return (
      <blockquote className="my-2 font-display text-[26px] leading-[1.2] text-[#1f1f1f] md:text-[32px]">
        {inline(text.slice(2))}
      </blockquote>
    );
  // "! text": a takeaway set apart in a grey box, in the body style
  if (text.startsWith("! "))
    return (
      <p className="rounded-[8px] bg-[#ebebeb] px-5 py-4 text-[#1f1f1f]">{inline(text.slice(2))}</p>
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
    <div className={`ui-haze-box max-w-[640px] space-y-5 text-[17px] leading-[1.6] text-[#1f1f1f] ${className}`}>
      {paras.map((para, i) => (
        <Block key={i} text={para} />
      ))}
    </div>
  );
}

const HEADLINE = "block max-w-[320px] text-[22px] font-medium leading-[1.2] tracking-[-0.03em] text-[#1f1f1f]";

/**
 * Section titles read as small headlines (the Medium article's own titles).
 * A "Topic—Line" title puts the topic above as a mono label.
 */
function SectionTitle({ title }: { title: string }) {
  const [topic, line] = title.includes("—") ? title.split("—") : [null, title];
  return (
    <h3 className="ui-haze-box self-start">
      {topic && (
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-[#999]">{topic}</span>
      )}
      <span className={HEADLINE}>{line}</span>
    </h3>
  );
}

/**
 * A guideline board, as in Liam's Figma "Physics" pages: on a light grey
 * board, a white card with the title and text, the "Guideline" at its foot;
 * the clips stacked on the right, each in its own card with a mono label.
 */
function GuidelineBoard({ s }: { s: ResolvedSection }) {
  const single = s.media.length === 1;
  return (
    <div className="rounded-[24px] bg-[#f3f3f3] p-3 md:px-[8%] md:py-[6%]">
      {/* the Figma card ratio (1287×804); it grows if the text needs more room */}
      <div className={`grid grid-cols-1 gap-3 md:aspect-[1287/804] md:gap-5 ${single ? "md:grid-cols-[1.65fr_1fr]" : "md:grid-cols-[2.2fr_1fr]"}`}>
        <div className="ui-haze-box flex flex-col justify-between gap-10 rounded-[12px] border border-[#ebebeb]! bg-white p-6 text-[15px] leading-[1.5] text-[#1f1f1f] md:p-8">
          <div>
            <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">{s.title}</h3>
            {s.paras.map((para, i) => (
              <p key={i} className="mt-3">
                {inline(para)}
              </p>
            ))}
          </div>
          {s.guideline && (
            <div>
              <p className="font-semibold">Guideline:</p>
              {s.guideline.map((g, i) => (
                <p key={i} className="mt-3">
                  {g.split("\n").map((l, k) => (
                    <Fragment key={k}>
                      {k > 0 && <br />}
                      {inline(l)}
                    </Fragment>
                  ))}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 md:gap-5">
          {s.media.map((m, i) => (
            <div key={`${m.src}-${i}`} className="relative md:min-h-0 md:flex-1">
              <MediaBlock fill media={{ ...m, outline: false }} sizes="(max-width: 768px) 100vw, 420px" className="rounded-[12px] border border-[#ebebeb]! bg-white" />
              {m.caption && (
                <span className="absolute left-3 top-3 z-10 rounded-[4px] bg-[#ebebeb] px-1.5 py-0.5 font-mono text-[11px] leading-[1.3] text-[#6b6b68]">
                  {m.caption.en}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Do’s & don’ts, as in the Figma file: each Do and its Don’t side by side on a grey board. */
function PairBoards({ media }: { media: Media[] }) {
  const rows: Media[][] = [];
  for (let i = 0; i < media.length; i += 2) rows.push(media.slice(i, i + 2));
  return (
    <div className="space-y-4 md:space-y-6">
      {rows.map((row, r) => (
        <div key={r} className="rounded-[24px] bg-[#f3f3f3] p-4 md:px-[10%] md:py-[11%]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[4%]">
            {row.map((m, i) => (
              <div key={`${m.src}-${i}`}>
                <MediaBlock media={{ ...m, outline: false }} sizes="(max-width: 768px) 100vw, 560px" className="rounded-[12px] bg-white" />
                {m.verdict && (
                  <p className="ui-haze mt-4 flex w-fit items-center gap-1.5 text-[17px] font-semibold leading-[1.3] text-[#1f1f1f]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/work/medgpt-motion-system/icon-${m.verdict}.svg`} alt="" width={15} height={15} />
                    {m.verdict === "do" ? "Do" : "Don’t"}
                  </p>
                )}
                {m.description && (
                  <p className="ui-haze mt-1 w-fit text-[15px] leading-[1.45] text-[#1f1f1f]">{m.description.en}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Sections as on the case-study page: mono label on the left, text on the right, then the visuals. */
export function StorySections({ sections }: { sections: ResolvedSection[] }) {
  return (
    <>
      {sections.map((s, idx) => {
        // never two blocks of text in a row: a section without visuals gets a
        // grey stand-in, except the last one (the page moves on to other things)
        const media = s.media.length > 0 || s.lead || idx === sections.length - 1 ? s.media : [VISUAL_TO_COME];
        if (s.guideline)
          return (
            <section key={`${s.title}-${idx}`} className="py-6 md:py-8">
              <GuidelineBoard s={s} />
            </section>
          );
        return (
          <section key={`${s.title}-${idx}`} className="py-12 md:py-16">
            {/* a section with neither title nor text is a run of visuals on its own */}
            {(s.title || s.paras.length > 0) && (
              <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr] md:gap-8">
                {s.title ? <SectionTitle title={s.title} /> : <div aria-hidden />}
                {s.paras.length > 0 && <Paragraphs paras={s.paras} />}
              </div>
            )}
            {media.length > 0 && <div>{s.pairs ? <PairBoards media={media} /> : <MediaGrid media={media} />}</div>}
          </section>
        );
      })}
    </>
  );
}
