import type { Locale } from "@/i18n/routing";

export type MediaType = "image" | "video";

export type Media = {
  type: MediaType;
  src: string;
  /** still image for a video (thumbnails) */
  poster?: string;
  /** aspect ratio "w/h" used to reserve layout space */
  ratio?: string;
  caption?: Localized;
  /** layout width on desktop grid: "full" (default) or "half" */
  span?: "full" | "half";
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
    overview: L(
      "MedGPT is an AI assistant designed to support healthcare professionals in clinical decision-making. Developed by Synapse Medicine as a standalone product, it launched in a highly sensitive context where AI, trust and medical rigor intersect.",
      "MedGPT est un assistant d'IA conçu pour accompagner les professionnels de santé dans la décision clinique. Développé par Synapse Medicine comme produit à part entière, il a été lancé dans un contexte sensible, à la croisée de l'IA, de la confiance et de la rigueur médicale."
    ),
    challenge: L(
      "Introduce a tool that clearly differentiates itself from generalist AI solutions, while reassuring physicians about reliability, sovereignty and scientific credibility.",
      "Introduire un outil qui se distingue clairement des solutions d'IA généralistes, tout en rassurant les médecins sur la fiabilité, la souveraineté et la crédibilité scientifique."
    ),
    approach: L(
      "I led the creative direction and visual identity of MedGPT, working closely with product teams to build a coherent brand and product system, and oversaw launch assets across motion, web, social and physical touchpoints. The visual system draws from familiar medical codes — millimeter grids, structured text blocks inspired by healthcare forms and a restrained tricolor gradient — creating an environment that feels professional and reassuring. Typography and motion express the balance between scientific rigor and modern technology.",
      "J'ai dirigé la direction créative et l'identité visuelle de MedGPT, en étroite collaboration avec les équipes produit pour bâtir un système de marque et de produit cohérent, et j'ai supervisé les assets de lancement en motion, web, social et supports physiques. Le système visuel puise dans des codes médicaux familiers — papier millimétré, blocs de texte inspirés des feuilles de soins et un dégradé tricolore mesuré — pour créer un environnement professionnel et rassurant. La typographie et le motion expriment l'équilibre entre rigueur scientifique et modernité technologique."
    ),
    outcome: L(
      "The launch combined digital communication with strong field activation — a product launch video, social templates, newsletters, press visibility and guerilla marketing in medical universities and specialized bookstores.",
      "Le lancement a combiné communication digitale et activation terrain — vidéo de lancement, templates social, newsletters, visibilité presse et marketing guérilla dans les facultés de médecine et les librairies spécialisées."
    ),
    stats: [
      { value: "+20k", label: L("video views", "vues vidéo") },
      { value: "+110k", label: L("social impressions", "impressions social") },
      { value: "25", label: L("press articles", "articles de presse") },
      { value: "+21.5k", label: L("visitors in month one", "visiteurs le premier mois") },
    ],
    cover: { type: "video", src: "/work/medgpt/cover.mp4", ratio: "16/9" },
    gallery: [
      { type: "image", src: "/work/medgpt/01.jpg", ratio: "1080/1373", span: "half" },
      { type: "image", src: "/work/medgpt/02.jpg", ratio: "1080/1373", span: "half" },
      { type: "video", src: "/work/medgpt/03.mp4", ratio: "16/9", span: "full" },
      { type: "image", src: "/work/medgpt/04.jpg", ratio: "4/3", span: "full" },
      { type: "video", src: "/work/medgpt/05.mp4", ratio: "16/9", span: "half" },
      { type: "video", src: "/work/medgpt/06.mp4", ratio: "16/9", span: "half" },
      { type: "image", src: "/work/medgpt/07.jpg", ratio: "2098/1373", span: "full" },
      { type: "image", src: "/work/medgpt/08.jpg", ratio: "4/3", span: "half" },
      { type: "image", src: "/work/medgpt/09.jpg", ratio: "4/3", span: "half" },
      { type: "image", src: "/work/medgpt/10.jpg", ratio: "4/3", span: "full" },
      { type: "image", src: "/work/medgpt/11.jpg", ratio: "4/3", span: "half" },
      { type: "image", src: "/work/medgpt/12.jpg", ratio: "4/3", span: "half" },
      { type: "image", src: "/work/medgpt/13.jpg", ratio: "2000/1029", span: "full" },
      { type: "image", src: "/work/medgpt/14.jpg", ratio: "4/3", span: "half" },
      { type: "image", src: "/work/medgpt/15.jpg", ratio: "4/3", span: "half" },
    ],
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
    cover: { type: "image", src: "/work/synapse-corporate-refresh/cover.jpg", ratio: "1400/720" },
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
    year: "2022",
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

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
