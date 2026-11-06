import type { Locale } from "@/i18n/routing";
import { cuidamStory } from "./stories/cuidam";
import { heartsStory } from "./stories/hearts";
import { libertyStory } from "./stories/liberty";
import { medgptStory } from "./stories/medgpt";
import { medgptFilmStory } from "./stories/medgpt-film";
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

const MEDGPT_STATS = [
  { value: "25", label: L("press articles", "articles de presse") },
  { value: "21.5k", label: L("visitors in month one", "visiteurs le premier mois") },
  { value: "108k", label: L("social impressions", "impressions social") },
  { value: "20k", label: L("views on the film", "vues sur le film") },
];

const rawProjects: Project[] = [
  {
    slug: "synapse-motion-identity",
    index: "01",
    client: "Synapse Medicine",
    title: L("Synapse in Motion"),
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
        L("The Synapse Medicine Motion Identity System is a foundational layer of the brand, designed to bring clarity, consistency and meaning to every animated interaction. Built at the crossroads of healthcare, technology and AI, it turns motion into a functional language: one that supports understanding, guides attention and reinforces trust in high-stakes medical environments."),
        L("Each movement is designed to simplify complexity, reduce cognitive load, and express Synapse’s vision of a modern, reliable and human-centred healthcare ecosystem."),
      ],
    },
    cover: { type: "video", src: "/work/synapse-motion-identity/cover.mp4", ratio: "1440/852" },
    overviewMedia: [{ type: "video", src: "/work/synapse-motion-identity/01.mp4", ratio: "16/9" }],
    story: motionStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-medgpt-branding",
    index: "02",
    client: "Synapse Medicine",
    title: L("MedGPT Branding"),
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
    hero: { type: "image", src: "/work/medgpt/04.jpg", ratio: "2526/1438" },
    overviewMedia: [
      { type: "video", src: "/work/medgpt/05.mp4", ratio: "1/1", span: "half" },
      { type: "video", src: "/work/medgpt/06.mp4", ratio: "1/1", span: "half" },
    ],
    story: medgptStory,
    medium: "https://medium.com/@liamdonne_59272/branding-medgpt-f7994e383a58",
    gallery: [],
    ready: true,
  },
  {
    slug: "medgpt-motion-system",
    index: "03",
    client: "Synapse Medicine",
    title: L("MedGPT Motion System"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2025",
    scope: [L("Motion system"), L("Guidelines"), L("Jitter library")],
    industry: [L("Healthcare"), L("AI")],
    kind: [L("Motion")],
    tags: [L("Motion design"), L("Brand system", "Système de marque")],
    summary: L("The pulse: a motion system for a medical AI assistant."),
    overview: {
      headline: L("The pulse"),
      body: [
        L("MedGPT’s concept is a blinking heart: a text cursor blinks, a heart beats. That is already a motion idea, so the motion system isn’t a layer on top of the brand. It’s the concept doing its job."),
        L("MedGPT turns complexity into clarity. The system gives that sentence a body: a philosophy, six behaviours, six principles, timing rules, and a Jitter library so anyone making a MedGPT video starts from the same pieces."),
      ],
    },
    cover: { type: "video", src: "/work/medgpt-motion-system/lang-pulse.mp4", ratio: "35/16" },
    hero: { type: "video", src: "/work/medgpt-motion-system/app-question-answer.mp4", ratio: "16/9" },
    overviewMedia: [{ type: "video", src: "/work/medgpt-motion-system/gradient-flow.mp4", ratio: "16/9" }],
    story: medgptMotionStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "medgpt-launch-film",
    index: "04",
    client: "Synapse Medicine",
    title: L("MedGPT Launch"),
    role: L("Brand Designer", "Designer de marque"),
    year: "2025",
    scope: [L("Launch film"), L("Print"), L("Guerrilla")],
    industry: [L("Healthcare"), L("AI")],
    kind: [L("Campaign")],
    tags: [L("Launch campaign", "Campagne de lancement"), L("Film")],
    summary: L("Forty seconds of film, then out into the street."),
    overview: {
      headline: L("Forty seconds, no explaining"),
      body: [
        L("MedGPT launched on 12 September 2025 with a 40-second film that runs the product instead of describing it, and with two physical activations that took the brand where medicine is read and learned: bookmarks and stickers."),
      ],
    },
    stats: MEDGPT_STATS,
    cover: { type: "image", src: "/work/medgpt/15.jpg", ratio: "1067/1250" },
    hero: { type: "video", src: "/work/medgpt/cover.mp4", ratio: "16/9" },
    overviewMedia: [{ type: "image", src: "/work/medgpt/10.jpg", ratio: "2800/1440" }],
    story: medgptFilmStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-corporate-refresh",
    index: "05",
    client: "Synapse Medicine",
    title: L("Synapse Medicine"),
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
        L("By 2024, Synapse Medicine had become an AI and data company, with new products, new markets and acquisitions. Its brand still looked like the start-up it used to be, and there were no brand guidelines."),
        L("The job: make the brand scalable, turn one brand into a family of product brands, and speak to both the software publishers who integrate Synapse and the healthcare professionals who use it."),
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
    slug: "cuidam-corporate-branding",
    index: "06",
    client: "Cuidam",
    title: L("Cuidam"),
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
        L("Cuidam set out to change the norms around mental health and psychology for students. My job was to give a shape to its mission: a welcoming, inclusive place where students feel comfortable asking for the psychological support they need."),
        L("The problem it was up against: healthcare, and psychology in particular, tends to look cold and sound formal. For a twenty-year-old, that reads as *not for me*."),
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
  {
    slug: "cuidam-hearts-event",
    index: "07",
    client: "Cuidam",
    title: L("Cuidam Hearts"),
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
        L("Cuidam Hearts was a charity event on Twitch, part of Cuidam’s crowdfunding campaign on Ulule. The aim: raise awareness of youth mental health through a 72-hour video-game streaming marathon."),
        L("From Thursday 20 to Sunday 23 April, 10 streamers went live on their own channels and asked their viewers to rally behind Cuidam. I designed the event’s brand universe and the on-screen environment for those four days."),
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
    slug: "synapse-manifestation-event",
    index: "08",
    client: "Synapse Medicine",
    title: L("Liberté, Egalité, MedGPT"),
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
    years: "2025–2026",
    about: L(
      "Synapse Medicine’s AI assistant for healthcare professionals. I built its brand, then everything it needed to go out into the world: a motion system, a launch film, street activations and events."
    ),
    slugs: ["synapse-medgpt-branding", "medgpt-motion-system", "medgpt-launch-film", "synapse-manifestation-event"],
  },
  {
    name: "Synapse Medicine",
    role: L("Brand Designer", "Designer de marque"),
    years: "2024–now",
    about: L(
      "A Bordeaux health-tech company turned AI and data company. Sole brand designer on its refresh: the identity, a family of product brands, a motion language, and self-service tools the whole company uses."
    ),
    slugs: ["synapse-corporate-refresh", "synapse-motion-identity"],
  },
  {
    name: "Cuidam",
    role: L("Founding Designer", "Designer fondateur"),
    years: "2021–2024",
    about: L(
      "A student mental-health support initiative I started after graduating. I built its identity from zero, then took it live with Cuidam Hearts, a 72-hour charity stream on Twitch."
    ),
    slugs: ["cuidam-corporate-branding", "cuidam-hearts-event"],
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
