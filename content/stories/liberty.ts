import type { StorySection } from "../projects";

/** Liberté, Egalité, MedGPT — waiting on Liam for the story. */
const p = (en: string) => ({ en, fr: en });

export const libertyStory: StorySection[] = [
  {
    title: p("The idea"),
    body: [p("[Liam — the concept behind “Liberté, Egalité, MedGPT” and the textured, hand-made look.]")],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The key visual and the type treatment, then the system: colours, textures, patterns.",
      },
    ],
  },
  {
    title: p("On site"),
    body: [p("[Liam — what you made for the event and how it went.]")],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "4/3",
        span: "half",
        note: "A photo of the event with your design in place (signage, banners, screens).",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "4/3",
        span: "half",
        note: "Print or merch from the event, or the social campaign around it.",
      },
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("[Liam — key results: what the event achieved.]"),
      p("[Liam — one takeaway: what you learned, or what you’d do differently.]"),
    ],
  },
];
