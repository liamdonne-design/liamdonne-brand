import type { Localized } from "./projects";

const L = (en: string, fr?: string): Localized => ({ en, fr: fr ?? en });

export const bio = {
  short: L(
    "Brand & visual designer with 6+ years of experience living in Bordeaux. Surfboards and sketchbooks are my go-to side gigs. Currently working @Synapse Medicine.",
    "Designer de marque & visuel avec 6+ ans d'expérience, basé à Bordeaux. Les planches de surf et les carnets de croquis sont mes activités favorites. Actuellement @Synapse Medicine."
  ),
  long: [
    L(
      "I'm a Franco-British brand designer working at the intersection of strategy, visual design and storytelling, with a strong focus on health and tech products. I design brand identities and visual systems that help complex platforms feel clear, credible and human by aligning visual language, tone and motion across touchpoints.",
      "Je suis un designer de marque franco-britannique travaillant à la croisée de la stratégie, du design visuel et du storytelling, avec un fort accent sur les produits de santé et de tech. Je conçois des identités de marque et des systèmes visuels qui rendent des plateformes complexes claires, crédibles et humaines, en alignant langage visuel, ton et motion sur tous les points de contact."
    ),
    L(
      "My work blends strong conceptual thinking with hands-on execution, from defining brand systems to shipping campaigns, motion assets and digital content at scale. I believe good design isn't decoration — it's a tool to build trust, reduce complexity and support meaningful products.",
      "Mon travail associe une pensée conceptuelle forte à une exécution concrète, de la définition de systèmes de marque à la livraison de campagnes, d'assets motion et de contenus digitaux à grande échelle. Je crois que le bon design n'est pas une décoration — c'est un outil pour bâtir la confiance, réduire la complexité et soutenir des produits qui comptent."
    ),
  ],
};

export type Experience = {
  company: string;
  role: Localized;
  start: string;
  end: Localized | null; // null => "Present"
};

export const experience: Experience[] = [
  { company: "Synapse Medicine", role: L("Brand Designer", "Designer de marque"), start: "03/24", end: null },
  { company: "TEDxBordeaux", role: L("Brand Designer", "Designer de marque"), start: "11/22", end: L("03/24") },
  { company: "Cuidam", role: L("Founding Designer", "Designer fondateur"), start: "01/21", end: L("03/24") },
  { company: "Wellputt", role: L("Art Director", "Directeur artistique"), start: "09/19", end: L("03/21") },
  { company: "UBB Rugby", role: L("Design Intern", "Stagiaire design"), start: "09/18", end: L("06/19") },
];

export const tools = [
  "Figma",
  "Adobe CC (Ps / Ai / Pr / Ae)",
  "Jitter",
  "Midjourney",
  "Webflow",
  "Notion",
  "ChatGPT",
  "Perplexity",
  "Claude",
];

export const skills: Localized[] = [
  L("Health branding", "Branding santé"),
  L("Brand systems", "Systèmes de marque"),
  L("Motion design"),
  L("Visual identity", "Identité visuelle"),
  L("Creative direction", "Direction créative"),
  L("Video storytelling", "Storytelling vidéo"),
  L("Digital campaigns", "Campagnes digitales"),
  L("Generative AI", "IA générative"),
  L("Design consistency", "Cohérence de design"),
  L("Scalable assets", "Assets scalables"),
];

/** Brands Liam has worked for (Info page logo wall). `invert` = a white
 *  logo file, flipped to dark so it reads on the light page. */
export const clients: { name: string; logo: string; invert?: boolean }[] = [
  { name: "Synapse Medicine", logo: "/clients/synapse.svg" },
  { name: "Vocca", logo: "/clients/vocca.svg" },
  { name: "Hôpital Suburbain du Bouscat", logo: "/clients/hopital-bouscat.png" },
  { name: "E.Leclerc", logo: "/clients/leclerc.svg" },
  { name: "Union Bordeaux Bègles", logo: "/clients/ubb.svg" },
  { name: "Sup de Pub", logo: "/clients/supdepub.svg" },
  { name: "Wellputt", logo: "/clients/wellputt.png", invert: true },
  { name: "Billabong", logo: "/clients/billabong.svg" },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/liam-donne/" },
];

export const contactEmail = "liam@synapse-medicine.com";

/** Medium profile — shown on the home footer. */
export const mediumProfile = "https://medium.com/@liamdonne_59272";
