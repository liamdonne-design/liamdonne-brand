import type { Locale } from "@/i18n/routing";
import { cuidamStory } from "./stories/cuidam";
import { heartsStory } from "./stories/hearts";
import { libertyStory } from "./stories/liberty";
import { medgptStory } from "./stories/medgpt";
import { medgptMotionStory } from "./stories/medgpt-motion";
import { motionStory } from "./stories/motion";
import { refreshStory } from "./stories/refresh";

/** "placeholder" = a visual still to come: a grey frame showing `note`. */
export type MediaType = "image" | "video" | "placeholder";

export type Media = {
  type: MediaType;
  src: string;
  /** still image for a video (thumbnails) */
  poster?: string;
  /** aspect ratio "w/h" used to reserve layout space */
  ratio?: string;
  caption?: Localized;
  /** for placeholders: what the visual should show */
  note?: string;
  /** layout width on desktop grid: "full" (default), "half" or "third" */
  span?: "full" | "half" | "third" | "quarter";
  /** looping clips laid over an image (a Figma board whose GIFs must keep playing) */
  overlays?: MediaOverlay[];
};

/**
 * A muted looping clip placed over an image, in the image's own pixel
 * coordinates (`frame`, 1920×1080 by default): `clip` is the visible rounded
 * window, `box` where the clip sits inside it (defaults to the window).
 */
export type MediaOverlay = {
  src: string;
  clip: [x: number, y: number, w: number, h: number];
  box?: [x: number, y: number, w: number, h: number];
  radius?: number;
  frame?: [w: number, h: number];
};

/** One titled part of a long-form case study, with the visuals that follow it. */
export type StorySection = {
  title: Localized;
  body: Localized[]; // paragraphs
  media?: Media[];
};

/**
 * Stand-in for a missing visual. Case studies never run two blocks of text
 * back to back: when a section has no visual, this grey frame takes its place.
 */
export const VISUAL_TO_COME: Media = {
  type: "placeholder",
  src: "",
  ratio: "16/9",
  note: "A visual for this part of the story.",
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
  /** header facts, as on the case-study page: Scope / Industry / Type */
  scope: Localized[];
  industry: Localized[];
  kind: Localized[];
  tags: Localized[];
  summary: Localized; // the one-line hook
  /** the block right after the hero visual: a headline, then a few paragraphs */
  overview: { headline: Localized; body: Localized[] };
  /** visuals right under the overview: text is never followed straight by more text */
  overviewMedia?: Media[];
  stats?: { value: string; label: Localized }[];
  /** the case study after the overview */
  story?: StorySection[];
  /** link to the long-form "backstage" article on Medium (shown when set) */
  medium?: string;
  cover: Media;
  /** Work page: show the cover in its own ratio instead of the staggered tall/short frames */
  keepCoverRatio?: boolean;
  /** the big visual at the top of the case study (defaults to the cover) */
  hero?: Media;
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
    slug: "medgpt-motion-system",
    index: "01",
    client: "Synapse Medicine",
    title: L("MedGPT — Motion Design System"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2026",
    scope: [L("Motion system"), L("Guidelines"), L("Jitter library")],
    industry: [L("Healthcare"), L("AI")],
    kind: [L("Motion")],
    tags: [L("Motion design"), L("Brand system", "Système de marque")],
    summary: L("The pulse: a motion system for a medical AI assistant."),
    overview: {
      headline: L("The pulse"),
      body: [
        L("MedGPT is Synapse Medicine’s AI assistant for healthcare professionals. After building its brand, I gave it a motion system."),
        L("MedGPT’s concept is a blinking heart: a text cursor blinks, a heart beats. That is already a motion idea, so the motion system isn’t a layer on top of the brand. It’s the concept doing its job."),
        L("MedGPT turns complexity into clarity. The system gives that sentence a body: a philosophy, six behaviours, six principles, timing rules, and a Jitter library so anyone making a MedGPT video starts from the same pieces."),
      ],
    },
    cover: { type: "video", src: "/work/medgpt-motion-system/scribe-ambiant.mp4", ratio: "16/9" },
    keepCoverRatio: true,
    hero: { type: "video", src: "/work/medgpt-motion-system/app-question-answer.mp4", ratio: "16/9" },
    overviewMedia: [{ type: "video", src: "/work/medgpt-motion-system/gradient-flow.mp4", ratio: "16/9" }],
    story: medgptMotionStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-manifestation-event",
    index: "02",
    client: "Synapse Medicine",
    title: L("MedGPT — Brand Campaign"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2026",
    scope: [L("Event identity"), L("Campaign")],
    industry: [L("Healthcare"), L("AI")],
    kind: [L("Event")],
    tags: [L("Event branding", "Identité d'événement"), L("Visual identity", "Identité visuelle"), L("Campaign", "Campagne")],
    summary: L(
      "A bold event identity for a health-tech gathering.",
      "Une identité d'événement affirmée pour un rassemblement health-tech."
    ),
    overview: {
      headline: L("Liberté, Egalité, MedGPT"),
      body: [L("[Liam — context to come: what the event was, where and when, who it was for, and what you designed.]")],
    },
    cover: { type: "video", src: "/work/synapse-manifestation-event/cover.mp4", ratio: "16/9" },
    overviewMedia: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The event at a glance: the key visual in place, on a screen, a banner or a poster.",
      },
    ],
    story: libertyStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-medgpt-branding",
    index: "03",
    client: "Synapse Medicine",
    title: L("MedGPT — Brand Identity"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2025",
    scope: [L("Concept"), L("Visual identity"), L("Guidelines")],
    industry: [L("Healthcare"), L("AI")],
    kind: [L("Brand")],
    tags: [L("Visual identity", "Identité visuelle"), L("Creative direction", "Direction créative")],
    summary: L(
      "Branding a medical AI assistant to feel rigorous, sovereign and trustworthy.",
      "Une identité pour un assistant d'IA médicale : rigueur, souveraineté et confiance."
    ),
    overview: {
      headline: L("The blinking heart"),
      body: [
        L("MedGPT is an AI assistant that helps healthcare professionals make clinical decisions. Synapse Medicine built it as a standalone product, and launched it right where AI, trust and medical rigour collide."),
        L("The challenge: stand clearly apart from generalist AI, and reassure doctors on what they care about most, **reliability, sovereignty and scientific credibility**."),
        L("I led the creative direction and the visual identity, worked hand in hand with the product teams to build one brand and product system, and oversaw the launch assets across motion, web, social and print."),
      ],
    },
    cover: { type: "image", src: "/work/medgpt/cover-app-icon.jpg", ratio: "1/1" },
    hero: { type: "image", src: "/work/medgpt/page/00-hero.jpg", ratio: "16/9" },
    overviewMedia: [{ type: "image", src: "/work/medgpt/page/01-overview.jpg", ratio: "16/9" }],
    story: medgptStory,
    medium: "https://medium.com/@liamdonne_59272/branding-medgpt-f7994e383a58",
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-motion-identity",
    index: "04",
    client: "Synapse Medicine",
    title: L("Synapse — Motion Design System"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2025",
    scope: [L("Motion system"), L("Brand")],
    industry: [L("Healthcare"), L("AI")],
    kind: [L("Motion")],
    tags: [L("Motion design"), L("Brand system", "Système de marque"), L("Visual identity", "Identité visuelle")],
    summary: L(
      "A living motion language for a medical AI platform.",
      "Un langage de motion vivant pour une plateforme d'IA médicale."
    ),
    overview: {
      headline: L("Motion as a language, not a decoration"),
      body: [
        L("The Synapse Medicine Motion Identity System is a foundational layer of the brand, designed to bring clarity, consistency, and meaning to every animated interaction. Built at the crossroads of healthcare, technology, and AI, the system transforms motion into a functional language—one that supports understanding, guides attention, and reinforces trust in high-stakes medical environments."),
        L("Rather than treating animation as a decorative element, this project positions motion as a strategic tool. Each movement is designed to simplify complexity, reduce cognitive load, and express Synapse’s vision of a modern, reliable, and human-centered healthcare ecosystem."),
        L("Text animations play a central role within the Motion Identity System. They are directly inspired by dynamic actions already present in Synapse products—such as word-by-word appearances in Copilot Recos or natural scrolling behaviors. This creates a strong link between brand expression and real product interactions, ensuring coherence between marketing, interface, and motion language."),
      ],
    },
    cover: { type: "video", src: "/work/synapse-motion-identity/cover.mp4", ratio: "1440/852" },
    overviewMedia: [{ type: "video", src: "/work/synapse-motion-identity/01.mp4", ratio: "16/9" }],
    story: motionStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-corporate-refresh",
    index: "05",
    client: "Synapse Medicine",
    title: L("Synapse — Brand Refresh"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2024",
    scope: [L("Brand refresh"), L("Brand architecture"), L("Web")],
    industry: [L("Healthcare"), L("AI")],
    kind: [L("Brand")],
    tags: [L("Brand refresh", "Refonte de marque"), L("Visual identity", "Identité visuelle"), L("Design system", "Design system")],
    summary: L(
      "Modernizing a health-tech brand for clarity and trust at scale.",
      "Moderniser une marque health-tech pour la clarté et la confiance à grande échelle."
    ),
    overview: {
      headline: L("The Shapes of Life"),
      body: [
        L("Synapse Medicine is a medical decision-support company founded by physicians and engineers, combining medical expertise and artificial intelligence to help healthcare professionals make safer, more informed decisions."),
        L("As the company entered a phase of rapid growth, international expansion, and a major shift toward AI-driven products, the existing brand no longer reflected the scale, ambition, or complexity of the ecosystem."),
        L("I led the corporate brand refresh end-to-end, with leadership, marketing, product and medical teams. The goal: clarify the offer, reinforce credibility, and unify the corporate brand with a growing suite of products."),
      ],
    },
    stats: [
      { value: "40+", label: L("colleagues surveyed in 2 days", "collègues interrogés en 2 jours") },
      { value: "6/7", label: L("votes for the chosen route", "votes pour la piste retenue") },
      { value: "3", label: L("product suites, one colour each", "suites produit, une couleur chacune") },
      { value: "50–100", label: L("people using the self-service tools", "personnes utilisant les outils self-service") },
    ],
    cover: { type: "image", src: "/work/synapse-corporate-refresh/cover.jpg", ratio: "1400/720" },
    overviewMedia: [{ type: "image", src: "/work/synapse-corporate-refresh/posters.jpg", ratio: "2000/1500" }],
    story: refreshStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "cuidam-hearts-event",
    index: "06",
    client: "Cuidam",
    title: L("Cuidam — Event Branding"),
    role: L("Founding Designer", "Designer fondateur"),
    year: "2023",
    scope: [L("Event identity"), L("Live-stream design")],
    industry: [L("Mental health"), L("Charity")],
    kind: [L("Event")],
    tags: [L("Event branding", "Identité d'événement"), L("Visual identity", "Identité visuelle"), L("Campaign", "Campagne")],
    summary: L(
      "A 72-hour charity stream marathon for student mental health.",
      "Un marathon caritatif de 72 heures en live pour la santé mentale étudiante."
    ),
    overview: {
      headline: L("72 hours live, one pixel at a time"),
      body: [
        L("Cuidam Hearts was a charity event held on Twitch as part of Cuidam’s crowdfunding campaign on Ulule. The aim was to raise awareness about youth mental health issues through a 72-hour video game streaming marathon."),
        L("From Thursday, April 20th to Sunday, April 23rd, 10 streamers broadcasted live content on their Twitch channels, encouraging viewers to rally support for Cuidam."),
        L("As part of this unprecedented event, I was responsible for developing the brand universe and designing the perfect environment for these four days of live streaming. I drew my inspiration from the world of video games and computer science, introducing the pixel as the main pattern."),
      ],
    },
    cover: {
      type: "video",
      src: "/work/cuidam-hearts-event/cover.mp4",
      poster: "/work/cuidam-hearts-event/poster.jpg",
      ratio: "16/9",
    },
    overviewMedia: [{ type: "image", src: "/work/cuidam-hearts-event/poster.jpg", ratio: "16/9" }],
    story: heartsStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "cuidam-corporate-branding",
    index: "07",
    client: "Cuidam",
    title: L("Cuidam — Brand Identity"),
    role: L("Founding Designer", "Designer fondateur"),
    year: "2021",
    scope: [L("Brand identity"), L("Visual system")],
    industry: [L("Mental health"), L("Students")],
    kind: [L("Brand")],
    tags: [L("Brand identity", "Identité de marque"), L("Visual system", "Système visuel"), L("Creative direction", "Direction créative")],
    summary: L(
      "Founding the visual identity of a healthcare startup from zero.",
      "Fonder l'identité visuelle d'une startup santé à partir de zéro."
    ),
    overview: {
      headline: L("Psychology, without the waiting-room feeling"),
      body: [
        L("Cuidam was born to disrupt and revolutionize the norms surrounding mental health and psychology. My role at Cuidam has been to fully express the following mission: to create a welcoming and inclusive environment where students feel comfortable seeking the psychological support they need."),
        L("The healthcare sector, especially psychology, tends to be visually cold, uninviting, and verbally formal. These aspects make it less appealing and accessible to a younger audience, such as students, due to its lack of personality and charisma."),
      ],
    },
    cover: { type: "image", src: "/work/cuidam-corporate-branding/cover.jpg", ratio: "1400/720" },
    overviewMedia: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "Cuidam at a glance: the logo with two or three key applications (social, poster, website).",
      },
    ],
    story: cuidamStory,
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
 * The Work page groups projects by company (as on aaronpoeandco.com/projects):
 * name, role and years on the left, a short note on what Liam did there.
 */
export type Company = {
  name: string;
  role: Localized;
  years: string;
  about: Localized;
  slugs: string[];
};

export const companies: Company[] = [
  {
    name: "MedGPT",
    role: L("Brand Designer", "Designer de marque"),
    years: "2024–now",
    about: L(
      "Synapse Medicine’s AI assistant for healthcare professionals. I built its brand, then everything it needed to go out into the world: a motion system, a launch film, street activations and events."
    ),
    slugs: ["medgpt-motion-system", "synapse-manifestation-event", "synapse-medgpt-branding"],
  },
  {
    name: "Synapse Medicine",
    role: L("Brand Designer", "Designer de marque"),
    years: "2024–now",
    about: L(
      "An AI medical decision-support company built on one idea: simplifying medical complexity without losing rigor. As sole brand designer, I gave that idea a shape: a refreshed identity, a family of product brands and a motion language."
    ),
    slugs: ["synapse-motion-identity", "synapse-corporate-refresh"],
  },
  {
    name: "Cuidam",
    role: L("Founding Designer", "Designer fondateur"),
    years: "2021–2024",
    about: L(
      "A student mental-health support initiative I started after graduating. I built its identity from zero, then took it live with Cuidam Hearts, a 72-hour charity stream on Twitch."
    ),
    slugs: ["cuidam-hearts-event", "cuidam-corporate-branding"],
  },
];

/** A project's case study as plain, locale-resolved sections. */
export function resolveStory(
  p: Project,
  locale: Locale
): { title: string; paras: string[]; media: Media[] }[] {
  return (p.story ?? []).map((s) => ({
    title: t(s.title, locale),
    paras: s.body.map((b) => t(b, locale)),
    media: s.media ?? [],
  }));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects in Work page order: company by company. */
function workOrder(): Project[] {
  return companies.flatMap((c) => c.slugs).map((s) => getProject(s)!).filter((p) => p.ready);
}

/** The project after this one in Work page order, wrapping round to the first. */
export function getAdjacentProject(slug: string): Project {
  const order = workOrder();
  const i = order.findIndex((p) => p.slug === slug);
  return order[(i + 1) % order.length];
}

/** The project before this one in Work page order, wrapping round to the last. */
export function getPreviousProject(slug: string): Project {
  const order = workOrder();
  const i = order.findIndex((p) => p.slug === slug);
  return order[(i - 1 + order.length) % order.length];
}
