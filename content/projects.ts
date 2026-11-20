import type { Locale } from "@/i18n/routing";
import { cuidamStory } from "./stories/cuidam";
import { heartsStory } from "./stories/hearts";
import { libertyStory } from "./stories/liberty";
import { medgptStory } from "./stories/medgpt";
import { medgptMotionStory } from "./stories/medgpt-motion";
import { motionStory } from "./stories/motion";
import { refreshStory } from "./stories/refresh";
import { toolingStory } from "./stories/tooling";

/** "placeholder" = a visual still to come: a grey frame showing `note`. */
export type MediaType = "image" | "video" | "placeholder" | "slideshow" | "audio";

export type Media = {
  type: MediaType;
  src: string;
  /** still image for a video (thumbnails) */
  poster?: string;
  /** video: a real player with sound and controls instead of a muted loop */
  controls?: boolean;
  /** video: a YouTube id, played in the same player once clicked (src unused) */
  youtube?: string;
  /** audio: the record label artwork and the track title (src = the sound file) */
  label?: string;
  title?: string;
  /** audio: picture behind the record */
  background?: string;
  /** slideshow: the pictures it cycles through, in order */
  slides?: { src: string; label?: string }[];
  /** aspect ratio "w/h" used to reserve layout space */
  ratio?: string;
  caption?: Localized;
  /** a short line under the caption, explaining the visual */
  description?: Localized;
  /** for placeholders: what the visual should show */
  note?: string;
  /** layout width on desktop grid: "full" (default), "half" or "third" */
  span?: "full" | "half" | "third" | "quarter" | "twoThirds";
  /** a thin light-grey outline, for white visuals that would melt into the page */
  outline?: boolean;
  /** crossed out: an example of what not to do */
  struck?: boolean;
  /** in a Do’s & don’ts pair: the Do or Don’t icon and label under the visual */
  verdict?: "do" | "dont";
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
  /** a chapter heading whose sub-sections follow straight away: no stand-in visual */
  lead?: boolean;
  /** laid out as a guideline board (Figma "Physics"): text card left with a
   *  "Guideline" at its foot, the visuals stacked on the right */
  board?: { guideline: Localized[] };
  /** visuals shown two by two on grey boards (Do’s & don’ts) */
  pairs?: boolean;
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
  /** who Liam worked with, as teams (never names) — shown under Role in the header */
  team?: Localized[];
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
    team: [L("Design & Product")],
    year: "2026",
    scope: [L("Motion system"), L("Guidelines")],
    industry: [L("Healthcare"), L("Technology"), L("AI")],
    kind: [L("Motion")],
    tags: [L("Motion design"), L("Brand system", "Système de marque")],
    summary: L("The pulse: a motion system for a medical AI assistant."),
    overview: {
      headline: L("Turning complexity into clarity"),
      body: [
        L("MedGPT is Synapse Medicine’s AI assistant for healthcare professionals. After building its brand, I led the strategy and concept of its motion design system, to create a cohesive, expressive motion language that carries the brand across every touchpoint: product, social, presentations and brand films."),
        L("The system gives every MedGPT video a unified, consistent feel, built on the brand’s promise: turning complexity into clarity. A Jitter library makes it usable by anyone, so every video starts from the same pieces."),
      ],
    },
    cover: { type: "video", src: "/work/medgpt-motion-system/scribe-ambiant.mp4", ratio: "16/9" },
    keepCoverRatio: true,
    hero: { type: "video", src: "/work/medgpt-motion-system/bento.mp4", ratio: "16/9" },
    overviewMedia: [{ type: "video", src: "/work/medgpt-motion-system/app-question-answer.mp4", ratio: "16/9", outline: true }],
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
    team: [L("Design & Product")],
    year: "2026",
    scope: [L("Event identity"), L("Campaign")],
    industry: [L("Healthcare"), L("Technology"), L("AI")],
    kind: [L("Event")],
    tags: [L("Event branding", "Identité d'événement"), L("Visual identity", "Identité visuelle"), L("Campaign", "Campagne")],
    summary: L(
      "A street-style campaign for sovereign medical AI.",
      "Une campagne street pour une IA médicale souveraine."
    ),
    overview: {
      headline: L("Liberté, Egalité, MedGPT"),
      body: [
        L("In May 2026, MedGPT went to Santexpo, the French healthcare trade show in Paris, with one message: medical AI in France should be sovereign."),
        L("I designed the campaign around it: the event identity, a teaser film, the social media assets, the print, the goodies and the stand."),
      ],
    },
    cover: { type: "video", src: "/work/synapse-manifestation-event/cover.mp4", ratio: "16/9" },
    overviewMedia: [{ type: "image", src: "/work/synapse-manifestation-event/bento-board.jpg", ratio: "16/9" }],
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
    team: [L("Design & Product")],
    year: "2025",
    scope: [L("Concept"), L("Visual identity"), L("Guidelines")],
    industry: [L("Healthcare"), L("Technology"), L("AI")],
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
    keepCoverRatio: true,
    hero: { type: "image", src: "/work/medgpt/page/00-hero.jpg", ratio: "16/9" },
    overviewMedia: [{ type: "image", src: "/work/medgpt/page/01-overview.jpg", ratio: "16/9" }],
    story: medgptStory,
    medium: "https://medium.com/@liamdonne_59272/branding-medgpt-f7994e383a58",
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-brand-tooling",
    index: "04",
    client: "Synapse Medicine",
    title: L("Synapse — Brand Tooling with AI"),
    role: L("Brand Designer", "Designer de marque"),
    team: [L("Design & Product")],
    year: "2026",
    scope: [L("Brand tooling"), L("AI workflows"), L("Brand system")],
    industry: [L("Healthcare"), L("Technology"), L("AI")],
    kind: [L("Tooling")],
    tags: [L("Brand tooling", "Outils de marque"), L("AI workflows", "Workflows IA")],
    summary: L(
      "Turning a brand into tools the whole company can use, built with Claude.",
      "Faire d'une marque des outils pour toute l'entreprise, construits avec Claude."
    ),
    overview: {
      headline: L("A brand that doesn’t wait for a designer"),
      body: [
        L("After the Synapse refresh, I was still the only brand designer, for a company of 50 to 100 people who all needed on-brand slides, documents, visuals and signatures. For the first six months, there wasn’t even a marketing team."),
        L("So rather than making every asset myself, I gave each team the level of freedom it needed. When Claude arrived at Synapse in early 2026, I turned the brand into tools anyone can use: the Synapse brand system in Claude, an email-signature generator, Compressor and Shader."),
      ],
    },
    cover: { type: "video", src: "/playground/shader.mp4", ratio: "1120/642" },
    // the 2025 deck templates: where the brand stood before the tools
    overviewMedia: [{ type: "image", src: "/work/synapse-corporate-refresh/slides.jpg", ratio: "2000/967" }],
    story: toolingStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "synapse-motion-identity",
    index: "05",
    client: "Synapse Medicine",
    title: L("Synapse — Motion Design System"),
    role: L("Brand Designer", "Designer de marque"),
    team: [L("Design & Product")],
    year: "2025",
    scope: [L("Motion system"), L("Brand")],
    industry: [L("Healthcare"), L("Technology"), L("AI")],
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
    slug: "synapse-branding",
    index: "06",
    client: "Synapse Medicine",
    title: L("Synapse — Branding"),
    role: L("Brand Designer", "Designer de marque"),
    team: [L("Design & Product")],
    year: "2024",
    scope: [L("Brand refresh"), L("Brand architecture"), L("Web")],
    industry: [L("Healthcare"), L("Technology"), L("AI")],
    kind: [L("Brand"), L("Event")],
    tags: [L("Brand refresh", "Refonte de marque"), L("Visual identity", "Identité visuelle"), L("Design system", "Design system")],
    summary: L(
      "Modernizing a health-tech brand for clarity and trust at scale.",
      "Moderniser une marque health-tech pour la clarté et la confiance à grande échelle."
    ),
    overview: {
      // after Eric Sin's overviews, with a little more story: what Synapse is, the problem, what I did
      headline: L("Bold enough for AI, safe enough for medicine"),
      body: [
        L("Synapse Medicine builds AI tools that help healthcare professionals prescribe more safely, right inside the software they already use. In a few years, it grew from a medication-safety start-up into an AI health company."),
        L("I took the refresh from the brief to the launch in 2025, in close collaboration with leadership, marketing, product and medical teams, and turned it into a system that carries an AI health company and its family of products: research, identity, product-brand architecture, brand book and website."),
      ],
    },
    cover: { type: "image", src: "/work/synapse-corporate-refresh/cover.jpg", ratio: "1400/720" },
    hero: { type: "image", src: "/work/synapse-corporate-refresh/hero.jpg", ratio: "16/9" },
    overviewMedia: [{ type: "image", src: "/work/synapse-corporate-refresh/posters.jpg", ratio: "2000/1500" }],
    story: refreshStory,
    medium: "https://medium.com/@liamdonne_59272/branding-synapse-medicine-ce539a989aa7",
    gallery: [],
    ready: true,
  },
  {
    slug: "cuidam-hearts-event",
    index: "07",
    client: "Cuidam",
    title: L("Cuidam — Event Branding"),
    role: L("Founding Designer", "Designer fondateur"),
    team: [L("Founder (Design, Product & Marketing)")],
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
    overviewMedia: [
      {
        type: "video",
        src: "",
        youtube: "-74tTi1HL_k",
        poster: "/work/cuidam-hearts-event/recap-poster.jpg",
        ratio: "16/9",
        controls: true,
        title: "the Cuidam Hearts recap",
        description: L("Seventy-two hours squeezed into a few minutes: the streamers’ reactions as the donations came in."),
      },
    ],
    story: heartsStory,
    gallery: [],
    ready: true,
  },
  {
    slug: "cuidam-corporate-branding",
    index: "08",
    client: "Cuidam",
    title: L("Cuidam — Brand Identity"),
    role: L("Founding Designer", "Designer fondateur"),
    team: [L("Founder (Design, Product & Marketing)")],
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
    overviewMedia: [{ type: "image", src: "/work/cuidam-corporate-branding/posters.jpg", ratio: "3/2" }],
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
      "Synapse Medicine’s AI assistant for healthcare professionals. I built its brand, then everything it needed to go out into the world: a motion system and a brand campaign."
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
    slugs: ["synapse-brand-tooling", "synapse-motion-identity", "synapse-branding"],
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
): { title: string; paras: string[]; media: Media[]; lead?: boolean; guideline?: string[]; pairs?: boolean }[] {
  return (p.story ?? []).map((s) => ({
    title: t(s.title, locale),
    paras: s.body.map((b) => t(b, locale)),
    media: s.media ?? [],
    lead: s.lead,
    guideline: s.board?.guideline.map((g) => t(g, locale)),
    pairs: s.pairs,
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
