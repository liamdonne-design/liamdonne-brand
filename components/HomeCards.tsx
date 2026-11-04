"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import LoopVideo from "./LoopVideo";

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
  labelFirst = false,
  children,
}: {
  href: string;
  label: string;
  tilt: number;
  labelFirst?: boolean;
  children: ReactNode;
}) {
  const text = <span className="font-medium leading-[1.3] text-[#1f1f1f]">{label}</span>;
  return (
    <MotionLink
      href={href}
      initial={{ rotate: tilt, backgroundColor: "#ebebeb" }}
      whileHover={{ rotate: 0, y: -4, scale: 1.03, backgroundColor: "#dcdcdc" }}
      whileFocus={{ rotate: 0, y: -4, scale: 1.03, backgroundColor: "#dcdcdc" }}
      whileTap={{ scale: 0.99 }}
      transition={ease}
      className="relative flex shrink-0 flex-col items-center gap-[0.572em] rounded-[0.857em] border border-white! p-[0.572em] outline-none hover:z-10 focus-visible:z-10"
    >
      {labelFirst && text}
      <span className="relative block size-[7.5em] overflow-hidden rounded-[0.572em] bg-white">{children}</span>
      {!labelFirst && text}
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
      className="ml-[0.1em] inline-block rounded-[6px] bg-[#ebebeb] pl-[4px] pr-[5px] font-semibold leading-[1.2] tracking-[-0.03em] transition-colors duration-300 ease-in-out hover:bg-[#dcdcdc] focus-visible:bg-[#dcdcdc]"
    >
      Synapse Medicine
    </a>
  );
}

export default function HomeCards() {
  return (
    <nav aria-label="Main" className="flex items-center gap-[0.5em] text-[11.5px] sm:text-[17.5px]">
      <Card href="/work" label="Work" tilt={4.1}>
        <Image src="/home/work.jpg" alt="" fill sizes="132px" className="scale-[1.06] object-cover object-top" priority />
      </Card>
      <Card href="/playground" label="Playground" tilt={-4.83} labelFirst>
        <LoopVideo src="/home/playground.mp4" aria-hidden className="absolute inset-0 size-full object-cover" />
      </Card>
      <Card href="/about" label="Info" tilt={4.22}>
        {/* animated GIF: plain img keeps the animation */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/home/info.gif" alt="" className="absolute inset-0 size-full object-cover" />
      </Card>
    </nav>
  );
}
