import type { StorySection } from "../projects";

/**
 * Synapse Medicine brand refresh — portfolio version (short). Condensed from
 * drafts/branding-synapse-refresh-draft-04.md; the full story goes on Medium.
 * Facts only from Liam — nothing added. Santexpo is named (Liam, 2026-11-08).
 */
const p = (en: string) => ({ en, fr: en });
const R = "/work/synapse-corporate-refresh";
const M = "/work/synapse-motion-identity";

export const refreshStory: StorySection[] = [
  {
    title: p("My role"),
    body: [
      p("Sole brand designer, from May 2024 to the official launch in March 2025.\nI wrote the brief, ran the research, designed the identity, the brand book and the website (content and copy by the product marketing manager)."),
    ],
    media: [{ type: "image", src: `${R}/laptop.jpg`, ratio: "2000/1500" }],
  },
  {
    title: p("Research"),
    body: [
      p("- **Brand audit:** three surveys (employees in France and the US, clients and partners, end users). 40+ colleagues answered in two days; clients rated the brand 8.25/10 but still saw a start-up.\n- **Workshops** to define the brand core: purpose, values, personality.\n- **Three creative routes**, presented as a short video and a feedback form. *The Shapes of Life* took 6 of 7 votes; the CEO chose it."),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The research: a few survey results, the brand-persona workshop boards, and the three creative routes side by side.",
      },
    ],
  },
  {
    title: p("The idea"),
    body: [
      p("The refreshed brand is built around one core idea: **simplifying medical complexity without losing rigor**."),
      p("**The Shapes of Life.** Synapse's modules adapt to whatever software they land in: the *shapes*. Organic forms add biology and *life*, and became the central visual language: adaptability, personalization, living systems. The existing colours stayed, because the audit showed they were what people liked most."),
    ],
    media: [
      { type: "image", src: `${R}/shape-blue.jpg`, ratio: "1/1", span: "third" },
      { type: "image", src: `${R}/shape-pink.jpg`, ratio: "1/1", span: "third" },
      { type: "image", src: `${R}/shape-purple.jpg`, ratio: "1/1", span: "third" },
    ],
  },
  {
    title: p("Built to scale"),
    body: [
      p("A structured colour logic lets the corporate brand and each product line coexist in one system, and a refined type pairing balances character and readability, scientific credibility and modernity. The identity had to carry AI-driven products, regulated medical content and very different audiences, from software partners to healthcare professionals, while staying unmistakably Synapse."),
      p("I turned the shapes into an architecture, one colour per product suite:\n- **Blue:** Secure, all our widgets, certified medical device or not.\n- **Pink:** Database, Thériaque.\n- **Purple:** Copilote, the AI widgets Follow, Audio and Ordo."),
    ],
    media: [
      { type: "image", src: `${R}/architecture.jpg`, ratio: "16/9" },
      { type: "image", src: `${R}/card-secure.jpg`, ratio: "2000/1565", span: "third" },
      { type: "image", src: `${R}/card-database.jpg`, ratio: "2000/1565", span: "third" },
      { type: "image", src: `${R}/card-copilote.jpg`, ratio: "2000/1565", span: "third" },
    ],
  },
  {
    title: p("Rollout"),
    body: [
      p("The new identity went out across every touchpoint: website, social media, product environments, events like Santexpo, videos, presentations and physical assets."),
      p("- **Synapse's first brand book**, in a full version (design and marketing) and a light one (press and partners), in Figma, Notion and Google Slides.\n- **Self-service tools** so the everyday assets don't need a designer: a slide template built with Claude artifacts and an email-signature generator, used by the whole company (50 to 100 people).\n- **The website**, top 10 pages, designed in Figma and built in Webflow; plus presentation templates, a 30-second brand video and all social assets."),
    ],
    media: [
      { type: "video", src: `${R}/website.mp4`, ratio: "4/3" },
      { type: "image", src: `${R}/slides.jpg`, ratio: "2000/967" },
      { type: "image", src: `${R}/cards.jpg`, ratio: "3/2" },
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("Synapse got its **first brand book**, **3 product suites** with one colour each, and self-service tools used by the whole company, **50 to 100 people**."),
      p("[Liam — adoption KPIs: e.g. share of decks and assets made with the new templates, number of signatures generated, brand-book views, partner or event feedback in figures (Santexpo).]"),
      p("The AI-generated shapes were hard to animate, and I'm not a 3D animator: I got there with Spline and Midjourney. Next time, motion comes first. A concept called *The Shapes of Life* should move from day one."),
      p("! Even in highly regulated sectors, bold and thoughtful brand systems can create trust, differentiation and momentum."),
    ],
    media: [
      { type: "video", src: `${M}/02.mp4`, ratio: "1/1", span: "third" },
      { type: "video", src: `${M}/03.mp4`, ratio: "1/1", span: "third" },
      { type: "video", src: `${M}/04.mp4`, ratio: "1/1", span: "third" },
    ],
  },
];
