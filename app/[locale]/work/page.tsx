import { setRequestLocale } from "next-intl/server";
import { projects, t } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { MediaBlock } from "@/components/Media";

// Figma "Work": three columns of covers, tall (415×366) and short (415×279)
// alternating so the columns stagger: [tall, short] [short, tall] [tall, tall].
const TALL = "415/366";
const SHORT = "415/279";
const PATTERN = [
  [TALL, SHORT],
  [SHORT, TALL],
  [TALL, TALL],
];

export default async function Work({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ready = projects.filter((p) => p.ready);
  const columns = PATTERN.map((_, c) => ready.filter((_, i) => i % PATTERN.length === c));

  return (
    <div className="grid gap-x-[27px] gap-y-[33px] px-4 pb-4 pt-[34px] sm:px-[71px] md:grid-cols-3">
      {columns.map((col, c) => (
        <div key={c} className="flex flex-col gap-[33px]">
          {col.map((p, r) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group block outline-none">
              <div className="overflow-hidden rounded-[12px]">
                <div className="transition-transform duration-[600ms] ease-[cubic-bezier(0.45,0,0.25,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
                  <MediaBlock
                    media={{ ...p.cover, ratio: PATTERN[c][r % 2] }}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    priority={r === 0}
                  />
                </div>
              </div>
              <h2 className="mt-3 text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1f1f1f]">
                {t(p.title, locale)}
              </h2>
              <p className="font-mono text-[12px] leading-[1.3] text-[#1f1f1f]">
                {t(p.tags[0], locale)}, {p.year}
              </p>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
