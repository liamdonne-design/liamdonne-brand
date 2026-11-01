/**
 * Scripted answers for the home-page chat. Every answer is written (and
 * validated) by hand — nothing is generated. Edit freely.
 *
 * - `chip`      the suggestion shown as a button (and echoed as the visitor's message)
 * - `keywords`  words/phrases that route a typed question to this answer
 *               (lowercase, no accents; matched as whole words)
 * - `answer`    paragraphs. Links use [label](href): "/work/…" stays on site,
 *               "https://…" opens a new tab, "mailto:…" opens the mail app.
 */
import { contactEmail, socials } from "./about";

export type ChatLang = "en" | "fr";

export type ChatEntry = {
  id: string;
  chip: Record<ChatLang, string>;
  keywords: string[];
  answer: Record<ChatLang, string[]>;
};

const linkedin = socials.find((s) => s.label === "LinkedIn")?.href ?? "https://www.linkedin.com/";

export const chatEntries: ChatEntry[] = [
  {
    id: "what",
    chip: { en: "What do you do exactly?", fr: "Tu fais quoi exactement ?" },
    keywords: [
      "what do you do", "who are you", "about you", "yourself", "introduce", "your job", "what you do",
      "your work", "ton travail", "votre travail", "de toi", "toi meme",
      "tu fais quoi", "vous faites quoi", "qui es tu", "qui etes vous", "presente", "ton metier", "ton job",
    ],
    answer: {
      en: [
        "I'm a Franco-British brand designer based in Bordeaux. I build brand identities and visual systems: the rules, components and motion that keep a brand recognisable, whether it shows up on a website, in a launch video, in a slide deck or on a conference stand.",
        "Right now I'm at Synapse Medicine, a health-tech company, where I work on the brand and on MedGPT, its medical AI assistant. Most of my work sits where brand meets a complex product: making something technical feel clear, credible and human.",
        "Want specifics? Ask me about MedGPT, or about who I've worked with.",
      ],
      fr: [
        "Je suis designer de marque, franco-britannique, basé à Bordeaux. Je construis des identités et des systèmes visuels : les règles, composants et principes de motion qui gardent une marque reconnaissable, que ce soit sur un site, dans une vidéo de lancement, un deck ou sur un stand.",
        "En ce moment je suis chez Synapse Medicine, une entreprise health-tech, où je travaille sur la marque et sur MedGPT, son assistant d'IA médicale. L'essentiel de mon travail se joue là où la marque rencontre un produit complexe : rendre quelque chose de technique clair, crédible et humain.",
        "Tu veux du concret ? Demande-moi pour MedGPT, ou avec qui j'ai travaillé.",
      ],
    },
  },
  {
    id: "clients",
    chip: { en: "Who have you worked with?", fr: "Avec qui as-tu travaillé ?" },
    keywords: [
      "worked with", "work with", "worked", "clients", "client", "companies", "experience", "cv", "resume", "background",
      "travaille avec", "travaille", "entreprises", "experience", "parcours", "synapse", "tedx", "tedxbordeaux",
      "cuidam", "wellputt", "ubb",
    ],
    answer: {
      en: [
        "In-house at Synapse Medicine since 2024: I led the corporate brand refresh end-to-end, built MedGPT's identity and launch, and event work like [Liberté, Egalité, MedGPT](/work/synapse-manifestation-event).",
        "Before that: brand designer for TEDxBordeaux (2022–2024); founding designer of [Cuidam](/work/cuidam-corporate-branding), a student mental-health support initiative I started after graduating (2021–2024); art director at Wellputt (2019–2021); and a design internship with UBB Rugby.",
        "Alongside all of it, 6+ years of freelance graphic design for 30+ clients.",
      ],
      fr: [
        "En interne chez Synapse Medicine depuis 2024 : j'ai mené le refresh de la marque de bout en bout, construit l'identité et le lancement de MedGPT, et des événements comme [Liberté, Egalité, MedGPT](/work/synapse-manifestation-event).",
        "Avant ça : designer de marque pour TEDxBordeaux (2022–2024) ; designer fondateur de [Cuidam](/work/cuidam-corporate-branding), une initiative de soutien en santé mentale pour les étudiants que j'ai lancée après mon diplôme (2021–2024) ; directeur artistique chez Wellputt (2019–2021) ; et un stage en design à l'UBB Rugby.",
        "Et en parallèle, plus de 6 ans de freelance en design graphique pour plus de 30 clients.",
      ],
    },
  },
  {
    id: "ai",
    chip: { en: "How do you use AI in design?", fr: "C'est quoi ton approche de l'IA ?" },
    keywords: [
      "ai", "ia", "artificial intelligence", "intelligence artificielle", "claude", "midjourney", "chatgpt",
      "generative", "generative ai", "prompt", "prompts", "automation", "automatisation",
    ],
    answer: {
      en: [
        "Short version: AI makes generating output easy; design judgement is what makes that output coherent, useful and worth using.",
        "I use Claude and Midjourney day to day, but what interests me most is workflows, not one-off images. For example, I built a slide workflow with Claude, grounded in 40+ slides I'd designed, so colleagues can produce on-brand slides without starting from a blank page.",
        "The tricky part wasn't the generation, it was the handoff: exporting to Google Slides broke dimensions, type sizes and layouts. So I wrote a custom Claude skill to deal with those conversion issues, so the result works in the tool the team actually uses.",
      ],
      fr: [
        "En bref : l'IA rend la production facile ; c'est le jugement de design qui rend cette production cohérente, utile et digne d'être utilisée.",
        "J'utilise Claude et Midjourney au quotidien, mais ce qui m'intéresse le plus, ce sont les workflows, pas les images isolées. Par exemple, j'ai construit un workflow de slides avec Claude, basé sur plus de 40 slides que j'avais designées, pour que mes collègues produisent des slides dans la marque sans partir d'une page blanche.",
        "Le plus dur n'était pas la génération mais la passation : l'export vers Google Slides cassait les formats, les tailles de typo et les mises en page. J'ai donc écrit un skill Claude sur mesure pour corriger ces problèmes de conversion, pour que le résultat marche dans l'outil que l'équipe utilise vraiment.",
      ],
    },
  },
  {
    id: "medgpt",
    chip: { en: "Tell me about MedGPT", fr: "Parle-moi de MedGPT" },
    keywords: ["medgpt", "med gpt", "medical ai", "ia medicale", "launch", "lancement"],
    answer: {
      en: [
        "MedGPT is Synapse Medicine's AI assistant for healthcare professionals. We had fourteen days to build its brand, so there was room for exactly one concept: the blinking heart. A text cursor blinks, a heart beats: the most recognisable symbol in computing and the most recognisable one in medicine, doing the same thing.",
        "So the symbol is a caret, not a brain, not a sparkle. In the system, the cursor is the healthcare professional: they ask, MedGPT answers. Around it: Instrument Serif for the voice of medical literature, IBM Plex Mono for the register of lab results, a millimetre grid, and Synapse's three colours blended into a gradient used as a signature, not a surface.",
        "In its first month the launch got 25 press articles, 21,500 visitors, 108,000 social impressions and 20,000 views on the film. The full story, including the part that went wrong, is in the [case study](/work/synapse-medgpt-branding).",
      ],
      fr: [
        "MedGPT, c'est l'assistant d'IA de Synapse Medicine pour les professionnels de santé. On avait quatorze jours pour construire sa marque, donc la place pour un seul concept : le cœur qui clignote. Un curseur clignote, un cœur bat : le symbole le plus reconnaissable de l'informatique et celui de la médecine font exactement la même chose.",
        "Le symbole est donc un caret, pas un cerveau, pas une étincelle. Dans le système, le curseur, c'est le soignant : il pose la question, MedGPT répond. Autour : Instrument Serif pour la voix de la littérature médicale, IBM Plex Mono pour le registre des analyses biologiques, une grille de papier millimétré, et les trois couleurs de Synapse fondues en un dégradé utilisé comme signature, pas comme surface.",
        "Le premier mois, le lancement a récolté 25 articles de presse, 21 500 visiteurs, 108 000 impressions et 20 000 vues sur le film. L'histoire complète, y compris ce qui a raté, est dans [le projet](/work/synapse-medgpt-branding).",
      ],
    },
  },
  {
    id: "process",
    chip: { en: "How do you work?", fr: "Comment tu travailles ?" },
    keywords: [
      "how do you work", "process", "approach", "method", "methodology", "workflow",
      "comment tu travailles", "comment travailles tu", "processus", "approche", "methode",
    ],
    answer: {
      en: [
        "Problem before pixels. I start with who it's for, what it needs to do for the business, and which constraints are real.",
        "Then I make a few deliberate decisions, turn them into a system (rules, components, motion principles) and execute it carefully on the touchpoints that matter most, rather than spreading thin across everything.",
        "The last step is the one people skip: making the system easy for the team to use without me.",
      ],
      fr: [
        "Le problème avant les pixels. Je commence par comprendre pour qui c'est, ce que ça doit apporter au business, et quelles contraintes sont réelles.",
        "Ensuite je prends quelques décisions assumées, je les transforme en système (règles, composants, principes de motion) et je l'exécute avec soin sur les points de contact qui comptent le plus, plutôt que de m'éparpiller.",
        "La dernière étape est celle qu'on oublie : rendre le système simple à utiliser par l'équipe, sans moi.",
      ],
    },
  },
  {
    id: "location",
    chip: { en: "Where are you based?", fr: "Tu es basé où ?" },
    keywords: [
      "where", "based", "located", "location", "bordeaux", "remote", "relocate", "relocation", "city",
      "ou es tu", "ou tu es", "habites", "base", "ville", "teletravail", "demenager", "france",
    ],
    answer: {
      en: ["Bordeaux, France, and happily staying here. Being Franco-British, I work just as comfortably in English as in French."],
      fr: ["À Bordeaux, et j'y reste avec plaisir. Franco-britannique, je travaille aussi bien en anglais qu'en français."],
    },
  },
  {
    id: "contact",
    chip: { en: "How can I reach you?", fr: "Comment te contacter ?" },
    keywords: [
      "contact", "email", "mail", "linkedin", "reach", "hire", "call", "talk",
      "contacter", "joindre", "ecrire", "appel", "discuter",
    ],
    answer: {
      en: [`The easiest is [LinkedIn](${linkedin}) or [email](mailto:${contactEmail}). I'll get back to you.`],
      fr: [`Le plus simple : [LinkedIn](${linkedin}) ou [par email](mailto:${contactEmail}). Je te réponds vite.`],
    },
  },
];

/** When a typed question matches nothing. */
export const chatFallback: Record<ChatLang, string[]> = {
  en: [
    `Good question, and one I don't have a ready-made answer for. Ask me directly on [LinkedIn](${linkedin}) or by [email](mailto:${contactEmail}) and I'll reply myself.`,
  ],
  fr: [
    `Bonne question, mais je n'ai pas de réponse toute prête pour celle-là. Écris-moi directement sur [LinkedIn](${linkedin}) ou [par email](mailto:${contactEmail}), je te réponds en personne.`,
  ],
};

export const chatUi: Record<
  ChatLang,
  { dockPlaceholder: string; placeholder: string; contact: string; close: string; send: string }
> = {
  en: {
    dockPlaceholder: "Ask me anything about my work…",
    placeholder: "Write your message…",
    contact: "Get in touch",
    close: "Close chat",
    send: "Send",
  },
  fr: {
    dockPlaceholder: "Pose-moi une question sur mon travail…",
    placeholder: "Écris ton message…",
    contact: "Me contacter",
    close: "Fermer le chat",
    send: "Envoyer",
  },
};

/* --------------------------------------------------------------- matching */

const norm = (s: string) =>
  ` ${s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;

const FR_HINTS = [
  "je", "tu", "vous", "quoi", "est", "es", "avec", "comment", "ton", "tes", "ta", "qui", "pourquoi",
  "quel", "quelle", "quels", "les", "des", "une", "et", "c", "parle", "moi", "fais", "faites",
  "travailles", "bonjour", "salut", "ou", "dans", "pour", "sur", "merci", "de", "du", "le", "la",
  "mon", "ma", "peux", "peut", "parler", "parlez", "ca", "as", "vos", "votre", "ton",
];
const EN_HINTS = [
  "you", "your", "what", "how", "who", "the", "is", "are", "do", "with", "hello", "hi", "about",
  "where", "can", "and", "for", "thanks", "tell", "my", "of", "have", "did", "does",
];

/** Guess the language of a typed message (accents count as French). */
export function detectLang(text: string, fallback: ChatLang): ChatLang {
  if (/[àâçéèêëîïôûùüÿœ]/i.test(text)) return "fr";
  const words = norm(text).trim().split(" ");
  const fr = words.filter((w) => FR_HINTS.includes(w)).length;
  const en = words.filter((w) => EN_HINTS.includes(w)).length;
  if (fr === en) return fallback;
  return fr > en ? "fr" : "en";
}

/** Best scripted answer for a typed question, or null. */
export function matchEntry(text: string): ChatEntry | null {
  const t = norm(text);
  let best: ChatEntry | null = null;
  let bestScore = 0;
  for (const e of chatEntries) {
    // longer phrases are more specific → weigh them higher
    const score = e.keywords.reduce(
      (n, k) => (t.includes(` ${k} `) ? n + k.split(" ").length : n),
      0
    );
    if (score > bestScore) {
      best = e;
      bestScore = score;
    }
  }
  return best;
}
