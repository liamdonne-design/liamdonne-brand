import type { Media, StorySection } from "../projects";

/**
 * Cuidam — brand identity. Facts from Liam, his figma.site page
 * (/cuidam-branding, all its visuals) and the Ulule campaign page; what the
 * visuals show is described, the reasoning waits on him.
 */
const p = (en: string) => ({ en, fr: en });
const D = "/work/cuidam-corporate-branding";
const img = (name: string, ratio: string, span?: Media["span"]): Media => ({ type: "image", src: `${D}/${name}.jpg`, ratio, span });

export const cuidamStory: StorySection[] = [
  {
    title: p("My role"),
    body: [
      p("Founding designer, from 2021 to 2024, one of three co-founders. Everything that touched design, marketing and communication was mine: the brand identity and its design system, the app’s UI mockups, video, photography, social media and events."),
    ],
    media: [img("logo", "16/9")],
  },
  {
    title: p("The identity"),
    body: [
      p("A lavender purple with four bright companions (pink, green, yellow, red), and two typefaces, Spectral and Raleway: an editorial serif that can speak softly, and a clean sans for everything else."),
      p("The logo hides an exclamation mark in the **M**. Cuidam isn’t afraid to speak up: mental health stayed a taboo for too long, and we wanted to stand at the front of the stage, to raise awareness and to support students in distress."),
    ],
    media: [
      img("colours", "3/4", "half"),
      img("typography", "3/4", "half"),
      img("exclamation", "3/4", "half"),
      img("app-icon", "3/4", "half"),
    ],
  },
  {
    title: p("The platform"),
    body: [
      p("The Cuidam app: find the practitioner who fits, book a session, watch masterclasses with health experts, and message the team when something is wrong. I designed its interface from the first mockups."),
    ],
    media: [img("app-screens", "3/2"), img("app-hand", "922/1078", "half"), { type: "video", src: `${D}/website.mp4`, ratio: "922/1078", span: "half", outline: true }],
  },
  {
    title: p("Across touchpoints"),
    body: [
      p("The brand reached students where they are: a series of video masterclasses with experts, an Instagram feed, and posters with one line, *Agis aujourd’hui pour aller mieux demain*, act today to feel better tomorrow."),
    ],
    media: [
      img("masterclass-app", "3/2"),
      img("masterclass-emotions", "16/9", "third"),
      img("masterclass-ist", "16/9", "third"),
      img("masterclass-burnout", "16/9", "third"),
      img("instagram", "3/2"),
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("- **7,000+ students** made aware of mental health\n- **10+ mental-health professionals** working alongside us\n- Present in France’s biggest student cities: Paris, Bordeaux, Lyon…\n- **10+ national and European awards**, among them BNP Paribas’ Act for Impact, French Tech Tremplin, the Trophée Gustave and the ECEC Award"),
      p("! Building a start-up is extremely hard, and extremely formative. You have to be a Swiss army knife, and curious enough to catch every opportunity that comes. I handled design, product and marketing, but still had to understand finance, business and strategy. You learn fast and grow fast, and I was lucky to have committed, talented partners at my side."),
    ],
  },
];
