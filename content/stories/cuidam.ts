import type { StorySection } from "../projects";

/**
 * Cuidam — corporate branding. Only the overview and the problem come from
 * Liam (Figma "Liam's Portfolio" /cuidam-branding); the rest waits on him.
 */
const p = (en: string) => ({ en, fr: en });

export const cuidamStory: StorySection[] = [
  {
    title: p("My role"),
    body: [
      p("Founding designer, from 2021 to 2024. I built Cuidam’s visual identity from zero."),
    ],
  },
  {
    title: p("The identity"),
    body: [p("[Liam — the concept: the idea behind the logo, the type and the purple, and why it speaks to students.]")],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The logo and its construction, then the palette and the typefaces on one board.",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "4/5",
        span: "half",
        note: "A social post or a poster aimed at students.",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "4/5",
        span: "half",
        note: "The tone of voice in use: a headline or campaign line that shows the brand sounds human, not clinical.",
      },
    ],
  },
  {
    title: p("Across touchpoints"),
    body: [p("[Liam — where the brand lived: website, app, social, events, merch? And anything you’d do differently today.]")],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The brand across 3–4 touchpoints in one composition (website, phone, social, print).",
      },
    ],
  },
];
