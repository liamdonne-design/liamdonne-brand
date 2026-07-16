"use client";

import { usePathname } from "@/i18n/navigation";

/**
 * Hides the global Nav/Footer on the landing page ("/"), which provides its
 * own fixed corner chrome. All other routes keep the standard chrome.
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
