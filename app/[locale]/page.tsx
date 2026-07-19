import { setRequestLocale } from "next-intl/server";
import { projects, t } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import Logo from "@/components/Logo";
import NavToggle from "@/components/NavToggle";
import GlitchText from "@/components/GlitchText";
import { type LandingItem } from "@/components/LandingProjects";
import LandingViews from "@/components/LandingViews";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Short display tags (1–3, one/two words) shown on the spiral hover card
  const SPIRAL_TAGS: Record<string, string[]> = {
    "synapse-manifestation-event": ["EVENT", "BRANDING"],
    "synapse-motion-identity": ["MOTION", "BRANDING"],
    "synapse-medgpt-branding": ["BRANDING", "MOTION", "VISUAL SYSTEM"],
    "synapse-corporate-refresh": ["BRANDING", "VISUAL SYSTEM"],
    "cuidam-hearts-event": ["EVENT", "BRANDING", "MOTION"],
    "cuidam-corporate-branding": ["BRANDING", "VISUAL SYSTEM"],
  };

  const items: LandingItem[] = projects.map((p) => ({
    slug: p.slug,
    index: p.index,
    client: p.client,
    title: t(p.title, locale),
    cover: p.ready ? p.cover : null,
    chips: SPIRAL_TAGS[p.slug] ?? [],
  }));

  return (
    <div className="mm-grid relative h-[100dvh] w-full overflow-hidden">
      {/* Top-left — logo (hover toggles variant) */}
      <div className="absolute left-5 top-4 z-30 md:left-8 md:top-6">
        <Logo />
      </div>

      {/* Top-right — About / Work toggle */}
      <div className="absolute right-5 top-4 z-30 md:right-8 md:top-6">
        <NavToggle />
      </div>

      {/* Centre — projects: spiral (default) or list view */}
      <LandingViews items={items} />

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
          className="mono-label transition-colors hover:text-ink"
        >
          <GlitchText text="Linkedin" />
        </a>
      </div>

      {/* Bottom-right — sound toggle is rendered globally in the layout */}
    </div>
  );
}
