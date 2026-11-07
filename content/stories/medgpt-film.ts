import type { StorySection } from "../projects";

/**
 * MedGPT Launch — the film, the physical activations and the results.
 * Condensed from Liam's approved long case study (skill reference, draft 5).
 * Facts only from Liam. The CEO's quote is in English and unattributed by name.
 */
const p = (en: string) => ({ en, fr: en });
const M = "/work/medgpt";

export const medgptFilmStory: StorySection[] = [
  {
    title: p("The film"),
    body: [
      p("The launch film doesn’t describe the product. It runs it."),
      p("The logo appears, then the interface. A medical question is typed into the prompt, character by character, the caret doing exactly what the symbol says it does. The answer generates. Then the sources: HAS, BDPM, SPILF, the actual references named on screen, which is the whole argument of the product without a single adjective. Then the taglines: performance, sovereignty, security."),
      p("Forty seconds, no voiceover explaining that this is artificial intelligence. We opened on a cursor waiting for someone to type, because the person typing is the point."),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The full 40-second launch film (mp4 or a YouTube/Vimeo link).",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        span: "third",
        note: "Still 1: the question being typed in the prompt.",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        span: "third",
        note: "Still 2: the answer generating.",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        span: "third",
        note: "Still 3: the sources on screen (HAS, BDPM, SPILF).",
      },
    ],
  },
  {
    title: p("Endorsement"),
    body: [
      p("“By Synapse Medicine” appears in the film’s outro and in the website footer, and nowhere else prominent. MedGPT stands on its own; the parent brand is there as a credential, not a headline."),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The film’s outro with “By Synapse Medicine”, next to the website footer: the parent brand as a credential.",
      },
    ],
  },
  {
    title: p("Taking it outside"),
    body: [
      p("A medical AI that only exists inside social feeds looks like every other AI in social feeds. So we took it where medicine is read and learned."),
      p("- **Bookmarks** for specialised medical bookshops, printed with *Ouvrez un nouveau chapitre avec MedGPT*. An idea from the marketing team, and the kind I’m slightly annoyed I didn’t have.\n- **Stickers** with large QR codes. I designed them and wrote the lines; the marketing team put them up across the country themselves."),
      p("> You’re not asking to be believed. You’re standing somewhere believable."),
    ],
    media: [
      { type: "image", src: `${M}/14.jpg`, ratio: "1067/1250", span: "half" },
      { type: "image", src: `${M}/15.jpg`, ratio: "1067/1250", span: "half" },
      {
        type: "placeholder",
        src: "",
        ratio: "4/3",
        span: "half",
        note: "Photos of the stickers in the street, in place (a wall, a lamp post, near a hospital or a university).",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "4/3",
        span: "half",
        note: "A bookmark in a real book or on a bookshop counter.",
      },
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("In the first month:\n- **+25** press articles\n- **+21,500** visitors\n- **+108,000** social impressions\n- **+20,000** views on the film"),
      p("And the message I’m keeping forever, from our CEO, about the film:"),
      p("> “I have just one thing to say: this video is the most beautiful thing I’ve seen in my life, after my wife, my son and a Juventus win in the Champions League.”"),
      p("[Liam — one takeaway: what you learned, or what you’d do differently.]"),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "Two or three press headlines or a collage of article screenshots about the launch.",
      },
    ],
  },
  {
    title: p("Credits"),
    body: [
      p("The **marketing team**, who led the strategy, came up with the bookmarks and stuck things to walls."),
    ],
  },
];
