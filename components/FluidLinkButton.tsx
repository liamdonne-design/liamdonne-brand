"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useIcon, type IconName } from "@/lib/icon-context";

/**
 * A Fluid Functionalism button that navigates. Server components can't hand
 * an icon component to the client Button, so icons are passed by name and
 * resolved here from the app's icon set (Untitled UI, via FluidRoot).
 * Internal paths use the localised Link; anything else opens a new tab
 * (mailto: stays in place).
 */
export default function FluidLinkButton({
  href,
  children,
  variant = "tertiary",
  size,
  leadingIcon,
  trailingIcon,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "default" | "compact";
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  className?: string;
}) {
  const Leading = useIcon(leadingIcon ?? "dot");
  const Trailing = useIcon(trailingIcon ?? "dot");
  const internal = href.startsWith("/");
  const external = !internal && !href.startsWith("mailto:");

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={className}
      leadingIcon={leadingIcon ? Leading : undefined}
      trailingIcon={trailingIcon ? Trailing : undefined}
    >
      {internal ? (
        <Link href={href}>{children}</Link>
      ) : (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      )}
    </Button>
  );
}
