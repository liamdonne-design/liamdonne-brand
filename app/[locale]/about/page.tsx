import { getTranslations, setRequestLocale } from "next-intl/server";
import { bio, experience, skills, tools } from "@/content/about";
import { t } from "@/content/projects";
import Reveal from "@/components/Reveal";
import type { Locale } from "@/i18n/routing";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ta = await getTranslations("About");

  return (
    <div className="px-5 py-14 md:px-10 md:py-20">
      <header className="border-b border-hairline pb-10">
        <div className="mono-label mb-4">{ta("title")}</div>
        <p className="display-lg max-w-4xl font-display">
          {bio.long[0].en && t(bio.long[0], locale)}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-y-14 pt-12 md:grid-cols-[1fr_360px] md:gap-x-16">
        {/* Long bio */}
        <Reveal className="max-w-2xl space-y-6 text-lg leading-relaxed text-grey-900 md:text-xl">
          {bio.long.slice(1).map((p, i) => (
            <p key={i}>{t(p, locale)}</p>
          ))}
          <p className="text-grey-600">{t(bio.short, locale)}</p>
        </Reveal>

        {/* Sidebar: tools + skills */}
        <div className="space-y-12">
          <Reveal>
            <h2 className="mono-label mb-4">{ta("tools")}</h2>
            <ul className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li
                  key={tool}
                  className="border border-hairline px-3 py-1.5 font-mono text-[12px]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2 className="mono-label mb-4">{ta("skills")}</h2>
            <ul className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s.en}
                  className="border border-hairline px-3 py-1.5 font-mono text-[12px]"
                >
                  {t(s, locale)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Experience timeline */}
      <Reveal className="mt-16 border-t border-hairline pt-10">
        <h2 className="mono-label mb-8">{ta("experience")}</h2>
        <ul>
          {experience.map((e) => (
            <li
              key={e.company}
              className="group grid grid-cols-1 items-baseline gap-1 border-b border-hairline py-5 md:grid-cols-[1fr_1fr_auto] md:gap-8"
            >
              <span className="font-display text-2xl md:text-3xl">
                {e.company}
              </span>
              <span className="text-grey-600">{t(e.role, locale)}</span>
              <span className="mono-label md:text-right">
                {e.start} → {e.end ? t(e.end, locale) : ta("present")}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
