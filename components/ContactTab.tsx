"use client";

import { useEffect, useState } from "react";
import { contactEmail, socials } from "@/content/about";
import { usePathname } from "@/i18n/navigation";
import FluidLinkButton from "./FluidLinkButton";

const linkedin = socials.find((s) => s.label === "LinkedIn")?.href ?? "https://www.linkedin.com/";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5C11.5 16.9 7.1 12.5 1.5 12 7.1 11.5 11.5 7.1 12 1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Site-wide contact drawer, Heidi-style: a bookmark tab sitting on a hairline
 * along the bottom edge. Clicking it slides the panel up (LinkedIn, email,
 * ©2026 Liam Donne) and dims the page behind. Not on the home page, which has
 * its own chat dock.
 */
export default function ContactTab() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // the home, Work and Playground headers already link to Info and contact
  if (pathname === "/" || pathname === "/work" || pathname === "/playground" || pathname === "/about") return null;

  return (
    <>
      {/* dimmed page behind */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[44] bg-black/35 backdrop-blur-[3px] transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className="fixed inset-x-0 bottom-0 z-[45] transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: open ? "translateY(0)" : "translateY(calc(100% - 2px))" }}
      >
        {/* the bookmark tab */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="contact-panel"
            className="relative flex h-10 items-center gap-2.5 rounded-t-[14px] bg-ink px-5 font-sans text-[15px] font-medium text-paper md:h-11 md:px-7 md:text-base"
          >
            {/* concave feet melting into the hairline */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[-12px] h-3 w-3"
              style={{ background: "radial-gradient(circle at 0 0, transparent 11.5px, var(--ink) 12px)" }}
            />
            <span
              aria-hidden
              className="absolute bottom-0 right-[-12px] h-3 w-3"
              style={{ background: "radial-gradient(circle at 100% 0, transparent 11.5px, var(--ink) 12px)" }}
            />
            <Sparkle
              className={`h-4 w-4 transition-transform duration-500 ${open ? "rotate-90" : ""}`}
            />
            {open ? "Close" : "Info"}
          </button>
        </div>

        {/* the panel */}
        <div
          id="contact-panel"
          inert={!open}
          className="border-t-2 border-ink bg-paper px-5 pb-8 pt-12 text-center md:pb-10 md:pt-16"
        >
          <h2 className="font-display text-[2.6rem] leading-[0.95] md:text-6xl">
            Let&apos;s make
            <br />
            something together.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-grey-600 md:text-lg">
            Brand identities, visual systems and motion. Based in Bordeaux, working everywhere.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <FluidLinkButton href={linkedin} variant="primary" trailingIcon="arrow-right">
              LinkedIn
            </FluidLinkButton>
            <FluidLinkButton href={`mailto:${contactEmail}`} variant="tertiary" leadingIcon="mail">
              {contactEmail}
            </FluidLinkButton>
          </div>

          <p className="mono-label mt-10">©2026 Liam Donne</p>
        </div>
      </div>
    </>
  );
}
