"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { projects, t } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

/**
 * Terminal-style command menu.
 * Desktop: press "/" to open, digits 1-6 jump to a project, Esc closes.
 * Mobile: acts as the full-screen menu (opened from the bar button).
 */
export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale() as Locale;
  const tNav = useTranslations("Nav");

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing =
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.isContentEditable;
      if (typing) return;

      if (e.key === "/") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") setOpen(false);

      if (open) {
        const n = Number(e.key);
        if (n >= 1 && n <= projects.length) {
          go(`/work/${projects[n - 1].slug}`);
        }
        if (e.key.toLowerCase() === "w") go("/work");
        if (e.key.toLowerCase() === "a") go("/about");
        if (e.key.toLowerCase() === "c") go("/contact");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Trigger: hint on desktop, "Menu" on mobile */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="mono-label transition-colors hover:text-ink"
        aria-label={tNav("menu")}
      >
        <span className="md:hidden">{open ? tNav("close") : tNav("menu")}</span>
        <span className="hidden md:inline">[ {tNav("hint")} ]</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-paper/98 backdrop-blur-sm">
          <div className="mm-grid absolute inset-0 opacity-60" aria-hidden />
          <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pt-24 pb-10 md:px-10">
            <div className="mono-label mb-8 flex items-center justify-between">
              <span>~/liam-donne — navigate</span>
              <button onClick={() => setOpen(false)} className="hover:text-ink">
                [ esc ]
              </button>
            </div>

            <nav className="flex flex-col">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => go(`/work/${p.slug}`)}
                  data-sfx="project"
                  className="group flex items-baseline gap-4 border-b border-hairline py-4 text-left md:py-5"
                >
                  <span className="mono-label w-6 shrink-0">{`0${i + 1}`.slice(-2)}</span>
                  <span className="font-display text-3xl leading-none transition-opacity group-hover:opacity-40 md:text-5xl">
                    {t(p.title, locale)}
                  </span>
                  <span className="mono-label ml-auto hidden shrink-0 self-center sm:block">
                    {p.client}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mono-label mt-auto flex flex-wrap gap-x-8 gap-y-2 pt-10">
              <button onClick={() => go("/work")} className="hover:text-ink">
                [W] {tNav("work")}
              </button>
              <button onClick={() => go("/about")} className="hover:text-ink">
                [A] {tNav("about")}
              </button>
              <button onClick={() => go("/contact")} className="hover:text-ink">
                [C] {tNav("contact")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
