"use client";

import { contactEmail, mediumProfile, socials } from "@/content/about";
import { usePathname } from "@/i18n/navigation";
import HomeLinks from "./HomeLinks";
import LDMonogram from "./LDMonogram";
import SiteMark from "./SiteMark";

const linkedin = socials.find((s) => s.label === "LinkedIn")?.href ?? "";
const LINKS = [
  { label: "Email", href: `mailto:${contactEmail}` },
  { label: "Linkedin", href: linkedin },
  { label: "Medium", href: mediumProfile },
];

/**
 * The signature and ©2026 over Email · Linkedin · Medium, bottom-centre: a
 * real footer at the end of scrolling pages (Work, Info, case studies). On the
 * Playground, which doesn't scroll, only the links, pinned to the screen.
 */
export default function SiteFooter() {
  const pathname = usePathname();
  const pinned = pathname === "/playground";
  const info = pathname === "/about";
  return (
    <footer
      className={
        pinned
          ? "fixed bottom-8 left-1/2 z-30 -translate-x-1/2"
          : "relative z-30 flex flex-col items-center gap-6 px-4 pb-8 pt-28 md:pt-40"
      }
    >
      {info ? (
        // Info: the L.D hover monogram stands in for the signature
        <div className="ui-haze flex flex-col items-center gap-[10px] text-[var(--ui-fg)]">
          <LDMonogram className="w-[264px]" />
          <p className="font-mono text-[12px] leading-[1.3]">©2026</p>
        </div>
      ) : (
        !pinned && <SiteMark line="©2026" />
      )}
      <HomeLinks links={LINKS} />
    </footer>
  );
}
