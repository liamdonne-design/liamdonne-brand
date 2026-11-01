"use client";

import { usePathname } from "@/i18n/navigation";

/**
 * Hides the global Nav/Footer on the landing page ("/"), which has its own
 * header and links. Every other page gets both.
 */
export default function ChromeGate({
  nav,
  footer,
  children,
}: {
  nav: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      {!isLanding && nav}
      {children}
      {!isLanding && footer}
    </>
  );
}
