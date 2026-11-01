import type { Locale } from "@/i18n/routing";
import { medgptStory } from "./stories/medgpt";
import { motionStory } from "./stories/motion";
import { refreshStory } from "./stories/refresh";

export type MediaType = "image" | "video";

export type Media = {
  type: MediaType;
  src: string;
  /** still image for a video (thumbnails) */
  poster?: string;
  /** aspect ratio "w/h" used to reserve layout space */
  ratio?: string;
  caption?: Localized;
  /** layout width on desktop grid: "full" (default), "half" or "third" */
  span?: "full" | "half" | "third";
};

/** One titled part of a long-form case study, with the visuals that follow it. */
export type StorySection = {
  title: Localized;
  body: Localized[]; // paragraphs
  media?: Media[];
};

/** A string available in both languages. */
export type Localized = { en: string; fr: string };

export type Project = {
  slug: string;
  index: string; // "01".."06"
  client: string;
  title: Localized;
  role: Localized;
  year: string;
  tags: Localized[];
  summary: Localized; // the one-line hook
  overview?: Localized;
  challenge?: Localized;
  approach?: Localized;
  outcome?: Localized;
  stats?: { value: string; label: Localized }[];
  /** long-form case study; when set it replaces overview/challenge/approach/outcome + gallery */
  story?: StorySection[];
  /** link to the long-form "backstage" article on Medium (shown when set) */
  medium?: string;
  cover: Media;
  gallery: Media[];
  /** true when real assets are wired up; false = placeholder */
  ready: boolean;
};

export function t(value: Localized, locale: Locale): string {
  return value[locale] ?? value.en;
}

// Helper for placeholder localized strings
const L = (en: string, fr?: string): Localized => ({ en, fr: fr ?? en });

const rawProjects: Project[] = [
  {
    slug: "synapse-motion-identity",
    index: "01",
    client: "Synapse Medicine",
    title: L("Synapse in Motion"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2025",
    tags: [L("Motion design"), L("Brand system", "Système de marque"), L("Visual identity", "Identité visuelle")],
    summary: L(
      "A living motion language for a medical AI platform.",
      "Un langage de motion vivant pour une plateforme d'IA médicale."
    ),
    cover: { type: "video", src: "/work/synapse-motion-identity/cover.mp4", ratio: "1440/852" },
    story: motionStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-medgpt-branding",
    index: "02",
    client: "Synapse Medicine",
    title: L("MedGPT"),
    role: L("Creative Direction & Visual Identity", "Direction créative & identité visuelle"),
    year: "2025",
    tags: [
      L("Creative direction", "Direction créative"),
      L("Visual identity", "Identité visuelle"),
      L("Brand system", "Système de marque"),
      L("Motion"),
    ],
    summary: L(
      "Branding a medical AI assistant to feel rigorous, sovereign and trustworthy.",
      "Une identité pour un assistant d'IA médicale : rigueur, souveraineté et confiance."
    ),
    stats: [
      { value: "+20k", label: L("video views", "vues vidéo") },
      { value: "+108k", label: L("social impressions", "impressions social") },
      { value: "25", label: L("press articles", "articles de presse") },
      { value: "+21.5k", label: L("visitors in month one", "visiteurs le premier mois") },
    ],
    cover: { type: "video", src: "/work/medgpt/cover.mp4", ratio: "16/9" },
    story: medgptStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-corporate-refresh",
    index: "03",
    client: "Synapse Medicine",
    title: L("Synapse Medicine"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2024",
    tags: [L("Brand refresh", "Refonte de marque"), L("Visual identity", "Identité visuelle"), L("Design system", "Design system")],
    summary: L(
      "Modernizing a health-tech brand for clarity and trust at scale.",
      "Moderniser une marque health-tech pour la clarté et la confiance à grande échelle."
    ),
    stats: [
      { value: "40+", label: L("colleagues surveyed in 2 days", "collègues interrogés en 2 jours") },
      { value: "6/7", label: L("votes for the chosen route", "votes pour la piste retenue") },
      { value: "3", label: L("product suites, one colour each", "suites produit, une couleur chacune") },
      { value: "50–100", label: L("people using the self-service tools", "personnes utilisant les outils self-service") },
    ],
    cover: { type: "image", src: "/work/synapse-corporate-refresh/cover.jpg", ratio: "1400/720" },
    story: refreshStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "cuidam-corporate-branding",
    index: "04",
    client: "Cuidam",
    title: L("Cuidam"),
    role: L("Founding Designer", "Designer fondateur"),
    year: "2021",
    tags: [L("Brand identity", "Identité de marque"), L("Visual system", "Système visuel"), L("Creative direction", "Direction créative")],
    summary: L(
      "Founding the visual identity of a healthcare startup from zero.",
      "Fonder l'identité visuelle d'une startup santé à partir de zéro."
    ),
    cover: { type: "image", src: "/work/cuidam-corporate-branding/cover.jpg", ratio: "1400/720" },
    gallery: [],
    ready: true,
  },
  {
    slug: "cuidam-hearts-event",
    index: "05",
    client: "Cuidam",
    title: L("Cuidam Hearts"),
    role: L("Founding Designer", "Designer fondateur"),
    year: "2023",
    tags: [L("Event branding", "Identité d'événement"), L("Visual identity", "Identité visuelle"), L("Campaign", "Campagne")],
    summary: L(
      "An event identity with heart, from invite to stage.",
      "Une identité d'événement avec du cœur, de l'invitation à la scène."
    ),
    cover: {
      type: "video",
      src: "/work/cuidam-hearts-event/cover.mp4",
      poster: "/work/cuidam-hearts-event/poster.jpg",
      ratio: "16/9",
    },
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-manifestation-event",
    index: "06",
    client: "Synapse Medicine",
    title: L("Liberté, Egalité, MedGPT"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2026",
    tags: [L("Event branding", "Identité d'événement"), L("Visual identity", "Identité visuelle"), L("Campaign", "Campagne")],
    summary: L(
      "A bold event identity for a health-tech gathering.",
      "Une identité d'événement affirmée pour un rassemblement health-tech."
    ),
    cover: { type: "video", src: "/work/synapse-manifestation-event/cover.mp4", ratio: "16/9" },
    gallery: [],
    ready: true,
  },
];

// Sorted most-recent-first (by year, descending). Ties keep source order.
// Display numbers (01, 02…) follow this chronological order top-to-bottom.
export const projects: Project[] = [...rawProjects]
  .sort((a, b) => Number(b.year) - Number(a.year))
  .map((p, i) => ({ ...p, index: String(i + 1).padStart(2, "0") }));

/**
 * A project's case study as plain, locale-resolved sections: the long-form
 * `story` when there is one, otherwise the short overview/challenge/approach/
 * outcome blocks (labels come from the caller's translations).
 */
export function resolveStory(
  p: Project,
  locale: Locale,
  label: (k: "overview" | "challenge" | "approach" | "outcome") => string
): { title: string; paras: string[]; media: Media[] }[] {
  if (p.story)
    return p.story.map((s) => ({
      title: t(s.title, locale),
      paras: s.body.map((b) => t(b, locale)),
      media: s.media ?? [],
    }));
  return (["overview", "challenge", "approach", "outcome"] as const).flatMap((k) => {
    const body = p[k];
    return body ? [{ title: label(k), paras: [t(body, locale)], media: [] }] : [];
  });
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
