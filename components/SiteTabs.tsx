"use client";

import { useRef } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { FluidHoverHighlight } from "@/components/fluid-hover-highlight";
import { useFluidHover, useRegisterFluidHoverItem } from "@/hooks/use-fluid-hover";

const TABS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Playground", href: "/playground" },
  { label: "Info", href: "/about" },
];

function Tab({
  index,
  registerItem,
  href,
  label,
  active,
}: {
  index: number;
  registerItem: (index: number, el: HTMLElement | null) => void;
  href: string;
  label: string;
  active: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useRegisterFluidHoverItem(registerItem, index, ref);
  return (
    <Link
      ref={ref}
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative rounded-[6px] px-[6px] py-[2px] text-[14px] leading-[1.3] text-[var(--ui-fg)] ${
        active ? "bg-[var(--ui-chip)]" : ""
      }`}
    >
      <span className="relative z-[1]">{label}</span>
    </Link>
  );
}

/**
 * Home / Work / Playground / Info tabs (Figma "Work" page). The current section sits
 * on a grey pill; a Fluid hover highlight glides between tabs under the cursor.
 */
export default function SiteTabs() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const hover = useFluidHover(ref, { axis: "x" });
  return (
    <nav aria-label="Sections" className="ui-haze">
      <div ref={ref} {...hover.handlers} className="relative flex gap-[2px]">
        <FluidHoverHighlight hover={hover} className="rounded-[6px] bg-[var(--ui-hl)]" />
        {TABS.map((t, i) => (
          <Tab
            key={t.href}
            index={i}
            registerItem={hover.registerItem}
            href={t.href}
            label={t.label}
            active={t.href === "/" ? pathname === "/" : pathname === t.href || pathname.startsWith(`${t.href}/`)}
          />
        ))}
      </div>
    </nav>
  );
}
