import type { Media, StorySection } from "../projects";

/**
 * MedGPT Branding — light portfolio version. Overview, the concept, the brand
 * elements grouped into a few sections (titles reused from the Medium
 * article), product, credits. One or two paragraphs each, a visual between
 * every block. The full story is the Medium article
 * (medium.com/@liamdonne_59272/branding-medgpt-f7994e383a58).
 * Facts only from Liam; no names; teams credited only in the last section.
 */
const p = (en: string) => ({ en, fr: en });
const M = "/work/medgpt";
const MO = "/work/medgpt-motion-system";
const img = (file: string, ratio: string, span?: Media["span"]): Media => ({
  type: "image",
  src: `${M}/${file}`,
  ratio,
  span,
});
const vid = (src: string, ratio: string, span?: Media["span"]): Media => ({ type: "video", src, ratio, span });

export const medgptStory: StorySection[] = [
  {
    title: p("Brand concept"),
    body: [
      p("Close enough to Synapse to feel like family, distinct enough to stand on its own. The system borrows codes every doctor already knows: millimetre graph paper, text blocks structured like medical forms, and a restrained tricolour gradient. Professional, and reassuring."),
      p("Typography and motion do the balancing act between scientific rigour and modern tech, turning complex medical AI into something clear, credible and easy to approach."),
    ],
    media: [img("deck.jpg", "16/9")],
  },
  {
    title: p("The Symbol—Your turn, doctor"),
    body: [
      p("A text cursor blinks. A heart beats. Both say the same thing: something is alive and waiting. The symbol is a caret, and the caret is the healthcare professional: they ask, MedGPT answers."),
      p("It sits beside the wordmark with one caret’s width of clear space on every side, and always follows the copy’s alignment."),
    ],
    media: [img("02.jpg", "1067/1334", "half"), img("11.jpg", "1067/1334", "half"), img("logo-construction.jpg", "1938/926")],
  },
  {
    title: p("Brand Elements—Millimetre paper, rounded off"),
    body: [
      p("The grid is medical graph paper, rounded off so it reads calm rather than cold. The gradient blends Synapse’s three colours, blue, pink and purple, into one. It’s a signature, not a surface: it lives on edges, accents and motion, always with its grain."),
      p("Three typefaces share the consultation: Instrument Serif for the voice of medical literature, IBM Plex Sans for the body copy, IBM Plex Mono for the register of lab results. And every blog cover is drawn from its article’s topic, so the feed reads as one brand."),
    ],
    media: [
      img("07.jpg", "2098/1373"),
      img("brand-elements.jpg", "16/9"),
      img("08.jpg", "1072/1004", "half"),
      img("12.jpg", "1067/1334", "half"),
      img("blog.jpg", "16/9"),
    ],
  },
  {
    title: p("Brand Moves—The pulse"),
    body: [
      p("If the concept is a blinking heart, motion is the concept doing its job. Six behaviours, from reveal to pulse, run across brand, product and social, and the pulse went on to get a motion system of its own."),
    ],
    media: [vid(`${MO}/logo-intro-v1.mp4`, "16/9"), vid(`${MO}/transition-flow.mp4`, "16/9")],
  },
  {
    title: p("Productland—Closing the seam"),
    body: [
      p("My first direction was all pixels, until someone said it reminded them of Super Mario. The pixels stayed in the brand icons; the product kept Synapse’s icon library, the right call for reading at speed. And no sparkle icon, anywhere."),
      p("As the product grew, the brand found room in it: info cards, marketing modules, micro-animations like the book on the history toggle. The whole system also lives in Claude as a design system, so anyone at the company can build on-brand."),
    ],
    media: [img("app-icon.jpg", "16/9"), vid(`${M}/history-toggle.mp4`, "1920/1082"), img("design-system.jpg", "2000/1127")],
  },
  {
    title: p("Roll the credits"),
    body: [
      p("MedGPT launched on 12 September 2025. First month: **25 press articles**, **21,500 visitors**, **108,000 social impressions** and **20,000 views** on the launch film."),
      p("With the marketing team on naming and strategy, the design team in the product, and the medical team on every word."),
    ],
    media: [img("adoption.jpg", "16/9")],
  },
];
