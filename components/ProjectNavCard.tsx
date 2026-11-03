import { Link } from "@/i18n/navigation";
import type { Media } from "@/content/projects";
import { MediaBlock } from "./Media";

/**
 * Previous / next project at the foot of a case study: a home card (same
 * padding, radius and label size, see HomeCards.tsx) laid on its side, with a
 * small cover on the left and the title on the right. Sized in em from the
 * parent's font-size. Hover only darkens the grey.
 */
export default function ProjectNavCard({ href, title, cover }: { href: string; title: string; cover: Media }) {
  return (
    <Link
      href={href}
      className="flex max-w-full items-center gap-[0.857em] rounded-[0.857em] border border-white! bg-[#ebebeb] p-[0.572em] pr-[1.143em] outline-none transition-colors duration-300 ease-in-out hover:bg-[#dcdcdc] focus-visible:bg-[#dcdcdc]"
    >
      <span className="relative block size-[3.25em] shrink-0 overflow-hidden rounded-[0.429em] bg-white">
        <MediaBlock media={{ ...cover, ratio: "1/1" }} sizes="60px" />
      </span>
      <span className="min-w-0 font-medium leading-[1.3] text-[#1f1f1f]">{title}</span>
    </Link>
  );
}
