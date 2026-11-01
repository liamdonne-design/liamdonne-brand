"use client";

import { usePathname } from "@/i18n/navigation";
import FluidLinkButton from "./FluidLinkButton";

/** Top-right CTA: "About" everywhere, becomes "Work" (→ home) on the About page. */
export default function NavToggle() {
  const pathname = usePathname(); // locale-stripped
  const onAbout = pathname === "/about";
  return (
    <FluidLinkButton href={onAbout ? "/" : "/about"} variant="ghost" size="compact">
      {onAbout ? "Work" : "About"}
    </FluidLinkButton>
  );
}
