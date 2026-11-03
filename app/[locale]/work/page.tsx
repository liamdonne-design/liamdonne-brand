import { setRequestLocale } from "next-intl/server";
import { companies, getProject, t, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { MediaBlock } from "@/components/Media";
import CursorTooltip from "@/components/CursorTooltip";

// Covers alternate tall (415×366) and short (415×279) so the two columns stagger.
const TALL = "415/366";
const SHORT = "415/279";

/**
 * Work, grouped by company as on aaronpoeandco.com/projects: on the left the
 * company, my role and a few lines on what I did there (sticky on desktop);
 * on the right its projects in two staggered columns.
 */
export default async function Work({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <CursorTooltip>
      <div className="mx-auto w-full max-w-[1376px] px-4 pb-4 pt-[34px] sm:px-[71px]">
        {companies.map((co, g) => {
          const items = co.slugs
            .map(getProject)
            .filter((p): p is Project => !!p && p.ready);
          const columns = [0, 1].map((c) =>
            items.filter((_, i) => i % 2 === c),
          );
          return (
            <section
              key={co.name}
              className={`grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:gap-[27px] ${
                g > 0
                  ? "mt-16 border-t border-black/10! pt-10 md:mt-24 md:pt-12"
                  : ""
              }`}
            >
              <header className="ui-haze-box md:sticky md:top-8 md:self-start md:pr-8">
                <h2 className="text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1f1f1f]">
                  {co.name}
                </h2>
                <p className="font-mono text-[12px] leading-[1.3] text-[#999]">
                  {t(co.role, locale)}, {co.years}
                </p>
                <p className="mt-4 max-w-[340px] text-[15px] leading-[1.5] text-[#6b6b68]">
                  {t(co.about, locale)}
                </p>
              </header>

              <div className="grid grid-cols-1 gap-x-[27px] gap-y-[33px] sm:grid-cols-2">
                {columns.map((col, c) => (
                  <div key={c} className="flex flex-col gap-[33px]">
                    {col.map((p, r) => (
                      <Link
                        key={p.slug}
                        href={`/work/${p.slug}`}
                        data-cursor-tooltip="See project"
                        className="group block outline-none"
                      >
                        <div className="overflow-hidden rounded-[12px]">
                          <div className="transition-transform duration-[600ms] ease-[cubic-bezier(0.45,0,0.25,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
                            <MediaBlock
                              media={{
                                ...p.cover,
                                ratio: (c + r) % 2 === 0 ? TALL : SHORT,
                              }}
                              sizes="(min-width: 768px) 30vw, 100vw"
                              priority={g === 0 && r === 0}
                            />
                          </div>
                        </div>
                        <div className="ui-haze mt-3 w-fit">
                          <h3 className="text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1f1f1f]">
                            {t(p.title, locale)}
                          </h3>
                          <p className="font-mono text-[12px] leading-[1.3] text-[#1f1f1f]">
                            {t(p.tags[0], locale)}, {p.year}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </CursorTooltip>
  );
}
