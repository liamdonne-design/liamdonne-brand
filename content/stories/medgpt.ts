import type { Media, StorySection } from "../projects";

/**
 * MedGPT Branding — light portfolio version. Visuals are the boards of the
 * "MedGPT Branding" Figma frame, in its order (its GIFs replayed as MP4
 * overlays). Overview, the concept, the brand elements grouped into a few
 * sections (titles reused from the Medium article), product, motion, credits. One or two paragraphs each, a visual between
 * every block. The full story is the Medium article
 * (medium.com/@liamdonne_59272/branding-medgpt-f7994e383a58).
 * Facts only from Liam; no names; teams credited only in the last section.
 */
const p = (en: string) => ({ en, fr: en });
/** A 1920×1080 board from the "MedGPT Branding" Figma frame, in its order. */
const PG = "/work/medgpt/page";
const board = (file: string, overlays?: Media["overlays"]): Media => ({
  type: "image",
  src: `${PG}/${file}`,
  ratio: "16/9",
  overlays: overlays?.map((o) => ({ ...o, src: `${PG}/${o.src}` })),
});

export const medgptStory: StorySection[] = [
  {
    title: p("Brand concept"),
    body: [
      p("Close enough to Synapse to feel like family, distinct enough to stand on its own. The system borrows codes every doctor already knows: millimetre graph paper, text blocks structured like medical forms, and a restrained tricolour gradient. Professional, and reassuring."),
      p("Typography and motion do the balancing act between scientific rigour and modern tech, turning complex medical AI into something clear, credible and easy to approach."),
    ],
    // then every board of the Figma frame, in its order
    media: [
      board("02-concept.jpg", [{ src: "question-answer.mp4", clip: [24, 474, 1044, 582], box: [24, 471, 1045, 588] }]),
      board("03-logo-construction.jpg"),
      board("04-elements.jpg"),
      board("05-colours.jpg"),
      board("06-deck.jpg"),
      board("06b-new.jpg"),
      board("07-product.jpg", [{ src: "complexity-clarity.mp4", clip: [24, 552, 924, 504], box: [16, 540, 940, 529] }]),
      board("08-dataviz.jpg"),
      board("09-motion.jpg", [
        { src: "morph-transitions.mp4", clip: [24, 24, 1018, 612], box: [-12, 24, 1090, 613] },
        { src: "outro-logo.mp4", clip: [24, 660, 1018, 396], box: [24, 572, 1018, 572] },
      ]),
      board("10-blog.jpg"),
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("MedGPT launched on 12 September 2025. First month:\n- **+25** press articles\n- **+21,500** visitors\n- **+108,000** social impressions\n- **+20,000** views on the launch film"),
      p("! The brand came before the product, then had to find its place in it: info cards, marketing modules, micro-animations. The lesson: design the brand and the product together from the start, not one after the other."),    ],
    // the one section with no visual after it: it closes the page
  },
];
