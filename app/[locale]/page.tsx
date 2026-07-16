import { setRequestLocale } from "next-intl/server";
import { projects, t } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import Logo from "@/components/Logo";
import CommandMenu from "@/components/CommandMenu";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import LandingProjects, { type LandingItem } from "@/components/LandingProjects";
import { LinkedInIcon } from "@/components/icons";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const items: LandingItem[] = projects.map((p) => ({
    slug: p.slug,
    index: p.index,
    client: p.client,
    title: t(p.title, locale),
    cover: p.ready ? p.cover : null,
  }));

  return (
    <div className="mm-grid relative h-[100dvh] w-full overflow-hidden">
      {/* Top-left — logo (hover toggles variant) */}
      <div className="absolute left-5 top-4 z-30 md:left-8 md:top-6">
        <Logo />
      </div>

      {/* Top-right — menu + language */}
      <div className="absolute right-5 top-4 z-30 flex items-center gap-4 md:right-8 md:top-6 md:gap-6">
        <CommandMenu />
        <LocaleSwitcher />
      </div>

      {/* Centre — projects, the star element */}
      <LandingProjects items={items} />

      {/* Bottom-left — year + LinkedIn */}
      <div className="absolute bottom-4 left-5 z-30 flex items-center gap-3 md:bottom-6 md:left-8">
        <span className="mono-label">2026</span>
        <span className="text-grey-400">·</span>
        <a
          href="https://www.linkedin.com/in/liam-donne/"
          target="_blank"
          rel="noopener noreferrer"
          data-sfx
          aria-label="LinkedIn — Liam Donne"
          className="text-ink transition-opacity hover:opacity-50"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>
      </div>

      {/* Bottom-right — sound toggle is rendered globally in the layout */}
    </div>
  );
}
