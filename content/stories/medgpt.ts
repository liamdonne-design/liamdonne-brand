import type { StorySection } from "../projects";

/**
 * MedGPT — portfolio version (short). Condensed from Liam's approved long case
 * study (medgpt-use-case.pdf); the full story goes on Medium (see `medium`
 * on the project). Facts only from Liam — nothing added.
 */
const p = (en: string) => ({ en, fr: en });
const M = "/work/medgpt";

export const medgptStory: StorySection[] = [
  {
    title: p("Overview"),
    body: [
      p("MedGPT is Synapse Medicine's AI assistant for healthcare professionals. It started as an internal tool, became the product, and launched on 12 September 2025."),
      p("With a competitor preparing something adjacent, getting there first mattered more than anything. I had **fourteen days** to build the entire brand: one concept, presented once."),
    ],
  },
  {
    title: p("My role"),
    body: [
      p("Creative direction and visual identity, then the launch assets across motion, social, web and physical.\nNaming and strategy were led by Victoire in Product Marketing."),
    ],
  },
  {
    title: p("The concept"),
    body: [
      p("**The blinking heart.** A text cursor blinks, a heart beats: the most recognisable symbol in computing and the most recognisable symbol in medicine, doing the same thing."),
      p("The symbol is a caret, and the caret is the healthcare professional: they ask, MedGPT answers. A brand that puts the person in command, not the AI."),
    ],
    media: [{ type: "image", src: `${M}/04.jpg`, ratio: "4/3" }],
  },
  {
    title: p("The system"),
    body: [
      p("- **Type:** Instrument Serif for the voice of medical literature, IBM Plex Sans for body copy, IBM Plex Mono for the register of lab results.\n- **Grid:** medical graph paper with rounded squares, sized to the headline so it holds from a bus-stop poster to an email signature.\n- **Colour:** Synapse's three colours blended into one gradient, used as a signature, not a surface. The product stays white.\n- **Motion:** six behaviours (reveal, connect, generate, transform, flow, pulse) shared by brand, product and social.\n- **No sparkle icon**, anywhere."),
    ],
    media: [
      { type: "image", src: `${M}/02.jpg`, ratio: "1080/1373", span: "half" },
      { type: "image", src: `${M}/01.jpg`, ratio: "1080/1373", span: "half" },
      { type: "image", src: `${M}/08.jpg`, ratio: "4/3" },
      { type: "image", src: `${M}/07.jpg`, ratio: "2098/1373" },
      { type: "video", src: `${M}/05.mp4`, ratio: "16/9", span: "half" },
      { type: "video", src: `${M}/06.mp4`, ratio: "16/9", span: "half" },
    ],
  },
  {
    title: p("Launch"),
    body: [
      p("A 40-second film that runs the product instead of describing it, and two physical activations: bookmarks for specialised medical bookshops (Clémence's idea) and QR-code stickers, for which I designed the assets and wrote the lines."),
      p("**First month:** 25 press articles, 21,500 visitors, 108,000 social impressions, 20,000 views on the film."),
    ],
    media: [
      { type: "image", src: `${M}/14.jpg`, ratio: "4/3", span: "half" },
      { type: "image", src: `${M}/15.jpg`, ratio: "4/3", span: "half" },
      { type: "image", src: `${M}/10.jpg`, ratio: "4/3" },
    ],
  },
  {
    title: p("What I learned"),
    body: [
      p("The pixel icons I designed didn't survive the product, and the brand and the interface drifted apart. Closing that gap took months of work with the product design team. A brand built in two weeks isn't finished at handoff: you keep closing the seam."),
    ],
    media: [{ type: "image", src: `${M}/13.jpg`, ratio: "2000/1029" }],
  },
];
