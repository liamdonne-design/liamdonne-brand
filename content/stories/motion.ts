import type { Media, StorySection } from "../projects";

/**
 * Synapse in Motion — text from the "Liam's Portfolio" Figma page, with the
 * 19 motion pieces laid out as on that page. English only for now.
 */
const p = (en: string) => ({ en, fr: en });
const v = (n: number, ratio: string, span?: Media["span"]): Media => ({
  type: "video",
  src: `/work/synapse-motion-identity/${String(n).padStart(2, "0")}.mp4`,
  ratio,
  span,
});

export const motionStory: StorySection[] = [
  {
    title: p("The system"),
    body: [],
    media: [
      v(1, "16/9"),
      v(2, "1/1", "third"),
      v(3, "1/1", "third"),
      v(4, "1/1", "third"),
      v(5, "1/1", "half"),
      v(6, "1/1", "half"),
      v(7, "16/9"),
      v(8, "16/9", "half"),
      v(9, "16/9", "half"),
      v(10, "16/9", "half"),
      v(11, "16/9", "half"),
    ],
  },
  {
    title: p("Text in motion"),
    body: [
      p("Text animations play a central role within the Motion Identity System. They are directly inspired by dynamic actions already present in Synapse products—such as word-by-word appearances in Copilot Recos or natural scrolling behaviors. This creates a strong link between brand expression and real product interactions, ensuring coherence between marketing, interface, and motion language."),
    ],
    media: [
      v(12, "16/9"),
      v(13, "16/9", "half"),
      v(16, "16/9", "half"),
      v(15, "16/9", "half"),
      v(14, "16/9", "half"),
      v(17, "16/9"),
      v(18, "16/9", "half"),
      v(19, "16/9", "half"),
    ],
  },
];
