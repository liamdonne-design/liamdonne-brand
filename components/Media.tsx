import Image from "next/image";
import type { Media } from "@/content/projects";

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

  return (
    <div
      className={`relative w-full overflow-hidden bg-grey-200 ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      {media.type === "video" ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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
