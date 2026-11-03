import type { StorySection } from "../projects";

/**
 * MedGPT Branding — the concept and the graphic choices. Condensed from Liam's
 * approved long case study (skill reference, draft 5); the film and the launch
 * live in medgpt-film.ts, motion in medgpt-motion.ts. Facts only from Liam.
 */
const p = (en: string) => ({ en, fr: en });
const M = "/work/medgpt";

export const medgptStory: StorySection[] = [
  {
    title: p("Where it started"),
    body: [
      p("My first direction was a pixel system: grids of squares, snapping edges, everything built from discrete units. I thought it read as precision engineering. The room read it differently:"),
      p("> « Ça me fait penser à Super Mario Bros. sur GameCube. »"),
      p("Both readings were available. Only one mattered, because the people this brand is for write prescriptions for a living. The pixels came down, and with fourteen days there was no time to mourn them."),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The pixel direction that didn’t make it: one or two boards from the first route (logo, grid of squares, a poster), to show where the brand started.",
      },
    ],
  },
  {
    title: p("The concept"),
    body: [
      p("**The blinking heart.** A text cursor blinks. A heart beats. They do the same thing: a steady pulse, on and off, a signal that something is alive and waiting."),
      p("One is the most recognisable symbol in computing, the other the most recognisable symbol in medicine. MedGPT sits exactly where they overlap, and once I saw that, every other decision had somewhere to come from."),
      p("The concept was validated on the spot. With fourteen days there was no second concept: one direction, presented once."),
    ],
    media: [{ type: "image", src: `${M}/02.jpg`, ratio: "1067/1334", span: "half" }, { type: "image", src: `${M}/11.jpg`, ratio: "1067/1334", span: "half" }],
  },
  {
    title: p("The symbol"),
    body: [
      p("The MedGPT symbol is a caret. Not a brain, not a stethoscope, not a molecule, and not a sparkle."),
      p("Everyone who has ever typed knows what a blinking vertical line means: *your turn*. And in this system, the cursor is **the healthcare professional**. They ask, they direct; MedGPT answers. A brand that puts the AI at the centre makes a promise about the AI. A brand that puts the cursor at the centre makes a promise about the person holding it."),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The logo, built up: the caret on its own, then the lock-up with the MedGPT wordmark, with the construction lines visible.",
      },
    ],
  },
  {
    title: p("Type"),
    body: [
      p("Three typefaces, each doing a job the other two can’t."),
      p("- **Instrument Serif** carries the voice of scientific literature: journals, monographs, the written weight of medical knowledge. Line height 90–100% at display sizes; its italic does the emphasis.\n- **IBM Plex Sans** for body copy: neutral, legible, and in continuity with Synapse.\n- **IBM Plex Mono** for tags and labels: the register of lab results and official documents, which also reads as machine language. My favourite decision in the system."),
      p("One rule keeps it together: body copy and the logo always follow the headline’s alignment, left or centred. Pedantic on paper, essential when six people are making assets at once."),
    ],
    media: [
      { type: "image", src: `${M}/08.jpg`, ratio: "1072/1004", span: "half" },
      { type: "video", src: `${M}/03.mp4`, ratio: "1828/584", span: "half" },
    ],
  },
  {
    title: p("The grid"),
    body: [
      p("Medical graph paper: the millimetre paper every clinical chart and lab printout has sat on for a century. The squares are rounded, which reads calm rather than cold."),
      p("- White or grey only: very light grey on white, white at about 15% on the gradient.\n- Each square is ¼ to ⅓ of the headline’s height, and scales with it.\n\nThat last rule keeps the brand recognisable from a bus-stop poster to an email signature."),
    ],
    media: [{ type: "image", src: `${M}/07.jpg`, ratio: "2098/1373" }],
  },
  {
    title: p("Colour"),
    body: [
      p("The gradient is Synapse’s three colours, blue, pink and purple, blended into one. MedGPT is the product Synapse was aiming at from the start, and the palette says so."),
      p("> The gradient is a signature, not a surface."),
      p("The product is overwhelmingly white. If the brand shows up in full saturation everywhere, people arrive expecting a light show and land in a white interface. So the gradient lives on edges, accents, transitions and motion; the dominant field stays white."),
    ],
    media: [
      { type: "image", src: `${M}/09.jpg`, ratio: "1072/1004", span: "half" },
      { type: "image", src: `${M}/12.jpg`, ratio: "1067/1334", span: "half" },
    ],
  },
  {
    title: p("No sparkle"),
    body: [
      p("There is no sparkle icon anywhere in this brand: not in the identity, not in the product, not in a single launch asset. For a product that wants to behave like a clinical instrument, borrowing the universal icon for novelty would have undone a lot of work. Refusing it cost nothing."),
    ],
  },
  {
    title: p("Where I got it wrong"),
    body: [
      p("The pixels survived at small scale in the brand icons. I thought that was a clean compromise. It didn’t survive the product, which kept the Phosphor library used across Synapse, for consistency and for legibility at speed. The right call, and I was disappointed anyway."),
      p("Without the icons, and with a gradient too vivid for the interface, brand and product started to look like relatives rather than the same person. Closing that gap took months of work with Manon, Théo and Elisa, as the product grew places where the brand could live: info cards, marketing modules, micro-animations."),
      p("A brand built in two weeks isn’t finished at handoff. You keep closing the seam."),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        span: "half",
        note: "The pixel icons you designed, next to the Phosphor icons that shipped in the product.",
      },
      { type: "image", src: `${M}/01.jpg`, ratio: "1067/1334", span: "half" },
      { type: "image", src: `${M}/13.jpg`, ratio: "2800/1440" },
    ],
  },
  {
    title: p("Credits"),
    body: [
      p("**Victoire** (Product Marketing) led naming and strategy. **Elisa** (Head of Design), **Manon** and **Théo** (Product Design) brought brand and product together. **Axel**, whose side project became the product. The **medical team**, who made sure nothing shipped that a physician would laugh at."),
    ],
  },
];
