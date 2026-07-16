"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-grey-400">/</span>}
          <button
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={l === locale}
            className={
              l === locale
                ? "text-ink"
                : "text-grey-400 transition-colors hover:text-ink"
            }
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
