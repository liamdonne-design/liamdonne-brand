import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import type { Locale } from "@/i18n/routing";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Work");

  return (
    <div className="px-5 py-14 md:px-10 md:py-20">
      <header className="mb-12 border-b border-hairline pb-8 md:mb-16">
        <div className="mono-label mb-4">{t("count", { count: projects.length })}</div>
        <h1 className="display-lg">{t("title")}</h1>
        <p className="mt-5 max-w-md text-lg text-grey-600">{t("subtitle")}</p>
      </header>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-20">
        {projects.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={(i % 2) * 0.08}
            className={i % 2 === 1 ? "md:mt-24" : ""}
          >
            <ProjectCard project={p} locale={locale} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
