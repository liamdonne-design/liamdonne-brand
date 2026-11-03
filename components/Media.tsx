import Image from "next/image";
import type { Media } from "@/content/projects";
import LazyVideo from "./LazyVideo";

export function MediaBlock({
  media,
  priority = false,
  sizes = "100vw",
  className = "",
}: {
  media: Media;
  priority?: boolean;
  sizes?: string;
  className?: string;
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
      className={`relative w-full overflow-hidden bg-grey-200 ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
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
    </div>
  );
}
