import type React from "react";
import Image from "next/image";
import type { Media, MediaOverlay } from "@/content/projects";
import LazyVideo from "./LazyVideo";

export function MediaBlock({
  media,
  priority = false,
  sizes = "100vw",
  className = "",
  fill = false,
}: {
  media: Media;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** desktop: fill the parent's height instead of keeping the ratio (mobile keeps it) */
  fill?: boolean;
}) {
  const ratio = media.ratio ?? "4/3";

  // a visual still to come: grey frame describing what goes there
  if (media.type === "placeholder")
    return (
      <div
        className={`flex w-full flex-col items-center justify-center gap-3 overflow-hidden bg-[#ebebeb] px-6 text-center ${className}`}
        style={{ aspectRatio: ratio.replace("/", " / ") }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#999]">Visual to come</span>
        <span className="max-w-md text-[14px] leading-[1.4] text-[#6b6b68]">{media.note}</span>
      </div>
    );

  return (
    <div
      className={`relative w-full overflow-hidden bg-grey-200 ${fill ? "aspect-(--ar) md:aspect-auto md:h-full" : ""} ${className}`}
      style={
        fill
          ? ({ "--ar": ratio.replace("/", " / ") } as React.CSSProperties)
          : { aspectRatio: ratio.replace("/", " / ") }
      }
    >
      {media.type === "video" ? (
        <LazyVideo
          className="absolute inset-0 h-full w-full object-cover"
          src={media.src}
          poster={media.poster}
        />
      ) : (
        <Image
          src={media.src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
      {media.overlays?.map((o) => (
        <Overlay key={o.src} overlay={o} />
      ))}
      {media.struck && (
        // a single diagonal line across the frame: what not to do
        <svg aria-hidden className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <line x1="6" y1="6" x2="94" y2="94" stroke="#e5383b" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      {media.outline && (
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#e5e5e5]!" />
      )}
    </div>
  );
}

/** A clip laid over a board image, positioned in percent so it scales with it. */
function Overlay({ overlay: o }: { overlay: MediaOverlay }) {
  const [W, H] = o.frame ?? [1920, 1080];
  const [cx, cy, cw, ch] = o.clip;
  const [bx, by, bw, bh] = o.box ?? o.clip;
  const pct = (n: number) => `${n * 100}%`;
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: pct(cx / W),
        top: pct(cy / H),
        width: pct(cw / W),
        height: pct(ch / H),
        // the radius scales with the board: a share of its width
        borderRadius: `${((o.radius ?? 16) / cw) * 100}% / ${((o.radius ?? 16) / ch) * 100}%`,
      }}
    >
      <LazyVideo
        className="absolute h-full w-full max-w-none object-cover"
        style={{
          left: pct((bx - cx) / cw),
          top: pct((by - cy) / ch),
          width: pct(bw / cw),
          height: pct(bh / ch),
        }}
        src={o.src}
      />
    </div>
  );
}
