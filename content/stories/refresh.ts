import type { Media, StorySection } from "../projects";

/**
 * Synapse Medicine brand refresh — exactly the visuals and the text of Liam's
 * figma.site page (/synapse-medicine-branding, Figma "Liam's Portfolio"
 * 1:3181), in the same order. One sentence of that page is left out on
 * purpose: "strongly embraced… significantly elevated… strong qualitative
 * feedback" — no figures to back it yet (Liam's rule). The key results at the
 * end are his own figures, added on top of the Figma page.
 */
const p = (en: string) => ({ en, fr: en });
const R = "/work/synapse-corporate-refresh";
const M = "/work/synapse-motion-identity";
const img = (name: string, ratio: string, span?: Media["span"]): Media => ({ type: "image", src: `${R}/${name}.jpg`, ratio, span });

export const refreshStory: StorySection[] = [
  {
    // visuals only, as on the Figma page right after the overview
    title: p(""),
    body: [],
    media: [
      img("symbol", "1/1", "half"),
      img("connection", "1/1", "half"),
      img("website", "2000/1183"),
      img("slides", "2000/967"),
    ],
  },
  {
    title: p("The idea"),
    body: [
      p("The refreshed brand is built around a core idea: simplifying medical complexity without losing rigor."),
      p("Organic shapes became a central visual language, symbolizing adaptability, personalization, and living systems, while a structured color logic allows the corporate brand and each product line to coexist within a coherent system."),
      p("A refined typographic pairing balances character and readability, reinforcing both scientific credibility and modernity."),
      p("The identity was designed as a scalable foundation, capable of supporting AI-driven products, regulated medical content, and diverse audiences—from software partners to healthcare professionals—while remaining unmistakably Synapse."),
    ],
    media: [
      img("shapes", "16/9"),
      { type: "video", src: `${R}/website.mp4`, ratio: "4/3" },
      img("card-database", "2000/1565", "third"),
      img("card-secure", "2000/1565", "third"),
      img("card-copilote", "2000/1565", "third"),
    ],
  },
  {
    title: p("Rollout"),
    body: [
      p("The new corporate identity was deployed across all touchpoints, including the website, social media, product environments, events, videos, presentations, and physical assets."),
      p("This project reinforced Synapse’s position as a modern, independent, and credible health-tech leader, and deepened my conviction that even in highly regulated sectors, bold and thoughtful brand systems can create trust, differentiation, and momentum."),
    ],
    media: [
      img("social", "7/3"),
      img("phone", "35/18"),
      img("architecture", "16/9"),
      img("laptop", "35/18"),
      img("cards", "668/450", "half"),
      img("bottles", "668/450", "half"),
      img("stand-1", "35/18"),
      img("stand-2", "668/540", "half"),
      img("stand-3", "668/540", "half"),
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("Synapse got its **first brand book**, **3 product suites** with one colour each, and self-service tools used by the whole company, **50 to 100 people**."),
      p("The slide generator alone: **50+ people** have used it, with an average satisfaction of **5/5**, and **100%** of them say it saves time and is easier than starting from Google Slides."),
      p("The AI-generated shapes were hard to animate, and I'm not a 3D animator: I got there with Spline and Midjourney. Next time, motion comes first. A concept called *The Shapes of Life* should move from day one."),
    ],
    media: [
      { type: "video", src: `${M}/02.mp4`, ratio: "1/1", span: "third" },
      { type: "video", src: `${M}/03.mp4`, ratio: "1/1", span: "third" },
      { type: "video", src: `${M}/04.mp4`, ratio: "1/1", span: "third" },
    ],
  },
];
