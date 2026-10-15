import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects, t } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import NavToggle from "@/components/NavToggle";
import FolderDesk, { type DeskProject } from "@/components/FolderDesk";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tp = await getTranslations("Project");

  // Short display tags (1–3, one/two words) shown in the project window
  const TAGS: Record<string, string[]> = {
    "synapse-manifestation-event": ["EVENT", "BRANDING"],
    "synapse-motion-identity": ["MOTION", "BRANDING"],
    "synapse-medgpt-branding": ["BRANDING", "MOTION", "VISUAL SYSTEM"],
    "synapse-corporate-refresh": ["BRANDING", "VISUAL SYSTEM"],
    "cuidam-hearts-event": ["EVENT", "BRANDING", "MOTION"],
    "cuidam-corporate-branding": ["BRANDING", "VISUAL SYSTEM"],
  };

  const items: DeskProject[] = projects
    .filter((p) => p.ready)
    .map((p) => ({
      slug: p.slug,
      index: p.index,
      client: p.client,
      title: t(p.title, locale),
      year: p.year,
      role: t(p.role, locale),
      summary: t(p.summary, locale),
      chips: TAGS[p.slug] ?? [],
      cover: p.cover,
      sections: (["overview", "challenge", "approach", "outcome"] as const).flatMap((k) => {
        const body = p[k];
        return body ? [{ label: tp(k), body: t(body, locale) }] : [];
      }),
      stats: (p.stats ?? []).map((s) => ({ value: s.value, label: t(s.label, locale) })),
      gallery: p.gallery,
    }));

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* Top-right — About / Work toggle */}
      <div className="absolute right-5 top-4 z-30 md:right-8 md:top-6">
        <NavToggle />
      </div>

      {/* Centre — the GIF + the folder that opens onto the projects */}
      <FolderDesk items={items} />
    </div>
  );
}
