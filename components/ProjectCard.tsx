import { Link } from "@/i18n/navigation";
import { MediaBlock } from "./Media";
import { t, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative overflow-hidden border border-hairline">
        {project.ready ? (
          <div className="overflow-hidden">
            <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <MediaBlock
                media={project.cover}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ) : (
          <div
            className="mm-grid flex items-center justify-center"
            style={{ aspectRatio: (project.cover.ratio ?? "4/3").replace("/", " / ") }}
          >
            <span className="select-none font-display leading-none text-grey-200 text-[26vw] md:text-[11vw]">
              {project.index}
            </span>
          </div>
        )}
        <span className="mono-label absolute left-3 top-3 bg-paper px-1.5 py-0.5">
          {project.index}
        </span>
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-4">
        <h3 className="grade-hover font-display text-2xl leading-tight md:text-3xl">
          {t(project.title, locale)}
        </h3>
        <span className="mono-label shrink-0 whitespace-nowrap">
          {project.year}
        </span>
      </div>
      <div className="mono-label mt-1 flex items-center gap-2">
        <span>{project.client}</span>
        <span className="text-grey-400">·</span>
        <span>{t(project.tags[0], locale)}</span>
      </div>
    </Link>
  );
}
