import { notFound } from "next/navigation";
import { ArrowRight, ExportSquare } from "iconsax-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAdjacentProject,
  getProject,
  projects,
  resolveStory,
  t,
} from "@/content/projects";
import { MediaBlock } from "@/components/Media";
import { MediaGrid, StorySections } from "@/components/Story";
import Reveal from "@/components/Reveal";
import FluidLinkButton from "@/components/FluidLinkButton";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const tp = await getTranslations("Project");
  const next = getAdjacentProject(slug);

  const story = resolveStory(project, locale, (k) => tp(k));

  return (
    <article>
      {/* ---------------- HEADER ---------------- */}
      <header className="px-5 pt-10 pb-8 md:px-10 md:pt-14 md:pb-10">
        <FluidLinkButton href="/" variant="ghost" size="compact" leadingIcon="arrow-left" className="-ml-2">
          {tp("back")}
        </FluidLinkButton>

        <div className="mono-label mt-10 flex items-center gap-3">
          <span>
            {tp("index")} {project.index}
          </span>
          <span className="text-grey-400">/</span>
          <span>{project.client}</span>
        </div>

        <h1 className="display-lg mt-4">{t(project.title, locale)}</h1>
        <p className="mt-5 max-w-xl text-lg text-grey-600 md:text-xl">
          {t(project.summary, locale)}
        </p>

        <dl className="mt-10 flex flex-wrap gap-x-14 gap-y-6 border-t border-hairline pt-6">
          <div>
            <dt className="mono-label">{tp("client")}</dt>
            <dd className="mt-1.5 text-base">{project.client}</dd>
          </div>
          <div>
            <dt className="mono-label">{tp("role")}</dt>
            <dd className="mt-1.5 max-w-[16rem] text-base">
              {t(project.role, locale)}
            </dd>
          </div>
          <div>
            <dt className="mono-label">{tp("year")}</dt>
            <dd className="mt-1.5 text-base">{project.year}</dd>
          </div>
          <div className="min-w-0">
            <dt className="mono-label">Tags</dt>
            <dd className="mt-1.5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.en}
                  className="rounded-sm bg-grey-200 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide"
                >
                  {t(tag, locale)}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </header>

      {/* ---------------- COVER ---------------- */}
      <div className="px-5 md:px-10">
        {project.ready ? (
          <MediaBlock media={project.cover} priority sizes="100vw" />
        ) : (
          <div
            className="mm-grid flex items-center justify-center border border-hairline"
            style={{ aspectRatio: "16 / 9" }}
          >
            <span className="select-none font-display text-[28vw] leading-none text-grey-200 md:text-[16vw]">
              {project.index}
            </span>
          </div>
        )}
      </div>

      {/* ---------------- STORY ---------------- */}
      {story.length > 0 && (
        <div className="px-5 pt-12 md:px-10 md:pt-16">
          <StorySections sections={story} />
        </div>
      )}

      {/* ---------------- STATS ---------------- */}
      {project.stats && (
        <Reveal className="mx-5 mt-6 border-y border-hairline md:mx-10">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {project.stats.map((s, i) => (
              <div
                key={i}
                className="border-hairline p-6 [&:nth-child(odd)]:border-r md:border-r md:last:border-r-0 md:[&:nth-child(2)]:border-r"
              >
                <dt className="font-display text-4xl md:text-6xl">{s.value}</dt>
                <dd className="mono-label mt-2">{t(s.label, locale)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      {/* ---------------- GALLERY ---------------- */}
      {project.gallery.length > 0 && (
        <div className="px-5 py-16 md:px-10 md:py-24">
          <MediaGrid media={project.gallery} />
        </div>
      )}

      {/* ---------------- BACKSTAGE (long read on Medium) ---------------- */}
      {project.medium && (
        <div className="px-5 pb-16 md:px-10">
          <a
            href={project.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-6 rounded-xl border border-hairline px-6 py-5 transition-colors duration-80 hover:bg-hover active:bg-active md:px-8 md:py-6"
          >
            <span>
              <span className="mono-label block">The backstage</span>
              <span className="mt-1 block font-display text-2xl md:text-3xl">
                The full story, on Medium
              </span>
            </span>
            <ExportSquare aria-hidden color="currentColor" className="size-7 shrink-0 md:size-8" />
          </a>
        </div>
      )}

      {/* ---------------- NEXT ---------------- */}
      <Link
        href={`/work/${next.slug}`}
        className="group flex items-center justify-between border-t border-hairline px-5 py-10 md:px-10 md:py-16"
      >
        <div>
          <div className="mono-label">{tp("next")}</div>
          <div className="font-display text-3xl transition-opacity group-hover:opacity-50 md:text-5xl">
            {t(next.title, locale)}
          </div>
        </div>
        <ArrowRight aria-hidden color="currentColor" className="size-8 shrink-0 md:size-12" />
      </Link>
    </article>
  );
}
