import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAdjacentProject,
  getPreviousProject,
  getProject,
  projects,
  resolveStory,
  t,
  type Localized,
} from "@/content/projects";
import { MediaBlock } from "@/components/Media";
import { MediaGrid, Paragraphs, StorySections } from "@/components/Story";
import Reveal from "@/components/Reveal";
import ProjectNavCard from "@/components/ProjectNavCard";
import MediumButton from "@/components/MediumButton";
import { mediumProfile } from "@/content/about";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

// ui-haze: a soft page-colour halo so the dot field never lights up behind small text
const LABEL = "ui-haze w-fit font-mono text-[11px] uppercase tracking-[0.14em] text-[#999]";

/** One header fact: a mono label over a stack of lines. */
function Fact({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div className="ui-haze w-fit">
      <dt className={LABEL}>{label}</dt>
      <dd className="mt-3 text-[15px] leading-[1.45] text-[#1f1f1f]">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </dd>
    </div>
  );
}

/**
 * Case study: title top-left, then Role / Scope / Industry / Type, one big
 * visual that sums the project up, the overview, and the story section by
 * section (mono label left, text right, visuals under it).
 */
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
  const previous = getPreviousProject(slug);
  const story = resolveStory(project, locale);
  const lines = (xs: Localized[]) => xs.map((x) => t(x, locale));

  return (
    <article className="mx-auto w-full max-w-[1376px] px-4 pt-[64px] sm:px-[71px] md:pt-[88px]">
      {/* ---------------- HEADER ---------------- */}
      <header>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <h1 className="text-[40px] font-medium leading-[1.05] tracking-[-0.04em] text-[#1f1f1f] md:text-[52px]">
            {t(project.title, locale)}
          </h1>
          {/* the project's article on Medium; the profile until it has one */}
          <MediumButton href={project.medium ?? mediumProfile} />
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-black/10! pt-8 md:grid-cols-4">
          <Fact label={tp("role")} lines={[t(project.role, locale), project.year]} />
          <Fact label="Scope" lines={lines(project.scope)} />
          <Fact label="Industry" lines={lines(project.industry)} />
          <Fact label="Type" lines={lines(project.kind)} />
        </dl>
      </header>

      {/* ---------------- HERO ---------------- */}
      <div className="mt-10 md:mt-14">
        <MediaBlock
          media={{ ...(project.hero ?? project.cover), ratio: (project.hero ?? project.cover).ratio ?? "16/9" }}
          priority
          sizes="100vw"
          className="rounded-[12px]"
        />
      </div>

      {/* ---------------- OVERVIEW ---------------- */}
      <section className="grid grid-cols-1 gap-4 py-14 md:grid-cols-[1fr_2fr] md:gap-8 md:py-20">
        <h2 className={LABEL}>{tp("overview")}</h2>
        <div className="ui-haze-box max-w-[640px]">
          <p className="text-[28px] font-medium leading-[1.15] tracking-[-0.03em] text-[#1f1f1f] md:text-[36px]">
            {t(project.overview.headline, locale)}
          </p>
          <Paragraphs className="mt-6" paras={project.overview.body.map((b) => t(b, locale))} />
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      {project.stats && (
        <Reveal className="border-t border-black/10! py-12 md:py-16">
          <dl className="ui-haze-box grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {project.stats.map((s, i) => (
              <div key={i}>
                <dt className="text-[40px] font-medium leading-none tracking-[-0.04em] text-[#1f1f1f] md:text-[56px]">
                  {s.value}
                </dt>
                <dd className="mt-3 text-[14px] text-[#999]">{t(s.label, locale)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      {/* ---------------- STORY ---------------- */}
      {story.length > 0 && <StorySections sections={story} />}

      {/* ---------------- GALLERY ---------------- */}
      {project.gallery.length > 0 && (
        <div className="py-16">
          <MediaGrid media={project.gallery} />
        </div>
      )}

      {/* ---------------- PREVIOUS / NEXT ---------------- */}
      <nav className="flex flex-wrap items-start justify-between gap-6 border-t border-black/10! py-12 text-[11.5px] sm:text-[17.5px] md:py-16">
        <div className="flex flex-col items-start gap-4">
          <div className={LABEL}>{tp("previous")}</div>
          <ProjectNavCard href={`/work/${previous.slug}`} title={t(previous.title, locale)} cover={previous.cover} />
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className={LABEL}>{tp("next")}</div>
          <ProjectNavCard href={`/work/${next.slug}`} title={t(next.title, locale)} cover={next.cover} />
        </div>
      </nav>
    </article>
  );
}
