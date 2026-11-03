import type { Media, StorySection } from "../projects";

/**
 * MedGPT Branding — portfolio version, built on Smith & Diction's "Branding
 * Calendly" outline: the stakes, the concept, the hang-up, the symbol, then one
 * brand element per section (Element—line), product, credits. One or two
 * paragraphs each, a visual between every block. The full story is the Medium
 * article (medium.com/@liamdonne_59272/branding-medgpt-f7994e383a58).
 * Facts only from Liam; no names.
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
    title: p("More than a chatbot"),
    body: [
      p("The stakes were simple: get there first. There was almost no French competition yet, but we knew it was coming, so the brand had **fourteen days**."),
      p("And it had to make one point at a glance: this is a clinical instrument for healthcare professionals, not one more generalist AI."),
    ],
    media: [img("deck.jpg", "16/9")],
  },
  {
    title: p("The Symbol—Your turn, doctor"),
    body: [
      p("A text cursor blinks. A heart beats. They do the same thing: a steady pulse that says something is alive and waiting. MedGPT sits exactly where the most recognisable symbol in computing meets the most recognisable symbol in medicine."),
      p("> Technology that waits for you. Medicine that keeps time."),
    ],
    media: [img("02.jpg", "1067/1334", "half"), img("11.jpg", "1067/1334", "half")],
  },
  {
    title: p("One tiny hangup—fourteen days, one shot"),
    body: [
      p("The hardest part wasn’t the idea, it was the clock. With fourteen days there was no second concept: one direction, presented once, validated on the spot. A round of revisions would have eaten a third of the schedule."),
    ],
    media: [vid(`${M}/03.mp4`, "1828/584")],
  },
  {
    title: p("The pulse effect"),
    body: [
      p("The symbol is a caret, and the caret is the healthcare professional: they ask, they direct; MedGPT answers. A brand that puts the AI at the centre makes a promise about the AI. One that puts the cursor at the centre makes a promise about the person holding it."),
    ],
    media: [vid(`${MO}/logo-intro-v1.mp4`, "16/9")],
  },
  {
    title: p("The Lock-up—Room to breathe"),
    body: [
      p("The caret sits beside the wordmark with one caret’s width of clear space on every side. Layouts align left or centred, and the logo always follows the copy’s alignment, the rule that keeps a two-week brand together when six people make assets at once."),
    ],
    media: [img("logo-construction.jpg", "1938/926")],
  },
  {
    title: p("Product Icons—Game over for the pixels"),
    body: [
      p("My first direction was all pixels, until someone said it reminded them of Super Mario. The pixels survived in the brand icons, then not in the product, which kept the icon library used across Synapse: the right call for reading at speed."),
      p("And there is no sparkle icon, anywhere. For a product that behaves like a clinical instrument, the universal icon for novelty would have undone the work."),
    ],
    media: [img("app-icon.jpg", "16/9"), vid(`${M}/icon-open-book.mp4`, "16/9", "half"), img("phone-hand.jpg", "16/9", "half")],
  },
  {
    title: p("Color—With great gradient comes great responsibility"),
    body: [
      p("The gradient is Synapse’s three colours, blue, pink and purple, blended into one: MedGPT is what Synapse was aiming at all along. But the product is overwhelmingly white, so the gradient lives on edges, accents and motion, always with its grain."),
      p("> The gradient is a signature, not a surface."),
    ],
    media: [img("brand-elements.jpg", "16/9"), img("print.jpg", "16/9")],
  },
  {
    title: p("Imagery—Judge a post by its cover"),
    body: [
      p("The blog has its own illustration system: every article cover is drawn from its topic, so the feed reads as one brand however varied the subjects."),
    ],
    media: [img("blog.jpg", "16/9"), img("stage.jpg", "16/9", "half"), img("photography.jpg", "16/9", "half")],
  },
  {
    title: p("Brand Elements—Millimetre paper, rounded off"),
    body: [
      p("The grid is medical graph paper, the paper every clinical chart has sat on for a century, with rounded squares that read calm rather than cold. White or grey only, and each square scales with the headline, so the brand holds from a bus-stop poster to an email signature."),
    ],
    media: [img("07.jpg", "2098/1373")],
  },
  {
    title: p("Typography—Three voices, one consultation"),
    body: [
      p("Instrument Serif carries the voice of medical literature, IBM Plex Sans does the quiet work of body copy, and IBM Plex Mono speaks in the register of lab results. Humanist warmth against monospaced precision, the balance the product itself is after."),
    ],
    media: [img("08.jpg", "1072/1004", "half"), img("12.jpg", "1067/1334", "half"), img("social.jpg", "16/9")],
  },
  {
    title: p("Brand Moves—The pulse"),
    body: [
      p("If the concept is a blinking heart, motion is the concept doing its job. Six behaviours, from reveal to pulse, run across brand, product and social, and the pulse went on to get a motion system of its own."),
    ],
    media: [vid(`${MO}/transition-flow.mp4`, "16/9")],
  },
  {
    title: p("Productland—Closing the seam"),
    body: [
      p("A brand built in fourteen days is built against the product of that fortnight. As the product grew, the brand found room in it, info cards, marketing modules, micro-animations like the book on the history toggle, through months of work with the design team."),
      p("The whole system also lives in Claude as a design system, so anyone at the company can build on-brand."),
    ],
    media: [vid(`${M}/history-toggle.mp4`, "1920/1082"), img("design-system.jpg", "2000/1127")],
  },
  {
    title: p("Roll the credits"),
    body: [
      p("MedGPT launched on 12 September 2025. First month: **25 press articles**, **21,500 visitors**, **108,000 social impressions** and **20,000 views** on the launch film."),
      p("With the marketing team on naming and strategy, the design team in the product, the medical team on every word, and the AI engineer whose side project became the product."),
    ],
    media: [img("adoption.jpg", "16/9")],
  },
];
