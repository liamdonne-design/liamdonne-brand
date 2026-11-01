"use client";

import { contactEmail, mediumProfile, socials } from "@/content/about";
import { usePathname } from "@/i18n/navigation";
import HomeLinks from "./HomeLinks";

const linkedin = socials.find((s) => s.label === "LinkedIn")?.href ?? "";
const LINKS = [
  { label: "Email", href: `mailto:${contactEmail}` },
  { label: "Linkedin", href: linkedin },
  { label: "Medium", href: mediumProfile },
];

/**
 * Email · Linkedin · Medium, bottom-centre. A real footer at the end of
 * scrolling pages (Work, Info, case studies); pinned to the screen on the
 * Playground, which doesn't scroll.
 */
export default function SiteFooter() {
  const pinned = usePathname() === "/playground";
  return (
    <footer
      className={
        pinned ? "fixed bottom-8 left-1/2 z-30 -translate-x-1/2" : "relative z-30 flex justify-center px-4 pb-8 pt-16"
      }
    >
      <HomeLinks links={LINKS} />
    </footer>
  );
}
