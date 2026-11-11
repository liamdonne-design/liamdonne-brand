"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState, type MouseEvent, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import LoopVideo from "./LoopVideo";
import WorkPreview from "./WorkPreview";

const MotionLink = motion.create(Link);

// Soft ease-in-out tween (not a spring): slow start, slow landing, no overshoot.
const ease = { duration: 0.6, ease: [0.45, 0, 0.25, 1] } as const;

/**
 * The three polaroid-style cards on the home page (Work, Playground, Info).
 * Sized in em so the whole row scales from one font-size: 17.5px on desktop
 * matches the Figma frame (131px picture, 10px padding, 15px radius).
 * Hover/focus straightens, gently lifts and darkens the card on a soft ease-in-out.
 */
function Card({
  href,
  label,
  tilt,
  caption,
  labelFirst = false,
  onHover,
  onClick,
  children,
}: {
  onHover?: (on: boolean) => void;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  label: string;
  tilt: number;
  /** a short line that appears centred under the card while it's hovered */
  caption: string;
  labelFirst?: boolean;
  children: ReactNode;
}) {
  const text = <span className="font-medium leading-[1.3] text-[var(--ui-fg)]">{label}</span>;
  return (
    <MotionLink
      href={href}
      onClick={onClick}
      data-home-card
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.99 }}
      variants={{ rest: { rotate: tilt, y: 0, scale: 1 }, hover: { rotate: 0, y: -4, scale: 1.03 } }}
      transition={ease}
      onHoverStart={() => onHover?.(true)}
      onHoverEnd={() => onHover?.(false)}
      onFocus={() => onHover?.(true)}
      onBlur={() => onHover?.(false)}
      // theme colours (they turn dark with the page); hover darkens the grey
      className="relative flex shrink-0 flex-col items-center gap-[0.572em] rounded-[0.857em] border border-[var(--ui-card-edge)]! bg-[var(--ui-chip)] p-[0.572em] outline-none transition-colors duration-300 ease-in-out hover:z-10 hover:bg-[var(--ui-chip-hover)] focus-visible:z-10 focus-visible:bg-[var(--ui-chip-hover)]"
    >
      {labelFirst && text}
      <span className="relative block size-[7.5em] overflow-hidden rounded-[0.572em] bg-white">{children}</span>
      {!labelFirst && text}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full mt-[1em] -translate-x-1/2 whitespace-nowrap text-center text-[12px] font-medium leading-[1.3] text-[#999]"
        variants={{ rest: { opacity: 0, y: -4 }, hover: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {caption}
      </motion.span>
    </MotionLink>
  );
}

/** The "Synapse Medicine" tag in the intro: links out; hover only darkens the grey. */
export function CompanyTag() {
  return (
    <a
      href="https://www.synapse-medicine.com/fr"
      target="_blank"
      rel="noopener noreferrer"
      className="ml-[0.1em] inline-block rounded-[6px] bg-[var(--ui-chip)] text-[var(--ui-fg)] pl-[4px] pr-[5px] font-semibold leading-[1.2] tracking-[-0.03em] transition-colors duration-300 ease-in-out hover:bg-[var(--ui-chip-hover)] focus-visible:bg-[var(--ui-chip-hover)]"
    >
      Synapse Medicine
    </a>
  );
}

export default function HomeCards() {
  // hovering Work scatters project visuals around the screen
  const [work, setWork] = useState(false);
  return (
    <nav aria-label="Main" className="flex items-center gap-[0.5em] text-[11.5px] sm:text-[17.5px]">
      <WorkPreview show={work} />
      <Card href="/work" label="Work" tilt={4.1} caption="Discover my latest projects" onHover={setWork}>
        <Image src="/home/work.jpg" alt="" fill sizes="132px" className="scale-[1.06] object-cover object-top" priority />
      </Card>
      <Card href="/playground" label="Playground" tilt={-4.83} caption="Check out my fun experiments" labelFirst>
        <LoopVideo src="/home/playground.mp4" aria-hidden className="absolute inset-0 size-full object-cover" />
      </Card>
      <Card href="/about" label="Info" tilt={4.22} caption="Who am I? Click to know">
        {/* animated GIF: plain img keeps the animation */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/home/info.gif" alt="" className="absolute inset-0 size-full object-cover" />
      </Card>
    </nav>
  );
}
