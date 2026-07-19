"use client";

import { Link, usePathname } from "@/i18n/navigation";
import GlitchText from "./GlitchText";

/** Top-right CTA: "ABOUT" everywhere, becomes "WORK" (→ home) on the About page. */
export default function NavToggle() {
  const pathname = usePathname(); // locale-stripped
  const onAbout = pathname === "/about";
  return (
    <Link
      href={onAbout ? "/" : "/about"}
      data-sfx
      className="mono-label transition-colors hover:text-ink"
    >
      <GlitchText text={onAbout ? "WORK" : "ABOUT"} />
    </Link>
  );
}
