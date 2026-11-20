import type { Media, StorySection } from "../projects";

/**
 * Synapse — Branding: the brand refresh (2024–2025). What came after, the
 * brand turned into tools with Claude (2026), is its own project
 * (stories/tooling.ts, split out on Liam's call, 2026-11-20). Laid out like Eric Sin's case-study
 * pages (ericsin.com/work/VICTORY-PLUS): the overview, then short chapters
 * (no numbers, Liam's call), each a short text and its visuals. Visuals keep the order of
 * Liam's figma.site page, with the three routes board for the research.
 * Facts only from Liam (context, routes, resistance: 2026-11-20); the 8.25/10
 * client rating stays out (his call), and so does "strongly embraced…
 * significantly elevated" until there are figures to back it.
 */
const p = (en: string) => ({ en, fr: en });
const R = "/work/synapse-corporate-refresh";
const img = (name: string, ratio: string, span?: Media["span"]): Media => ({ type: "image", src: `${R}/${name}.jpg`, ratio, span });

export const refreshStory: StorySection[] = [
  {
    // after Eric Sin's "Redesigning the Product": the frame, the method, the result
    title: p("The Shapes of Life"),
    body: [
      p("The concept came from what Synapse makes: modules that adapt to whatever software they land in."),
      p("Before creating anything, I ran a brand audit with employees in France and the US, clients and partners, and end users. Then I built the brand in two layers. What stays constant: the logo and the colours, which the audit showed people liked most. What adapts: the shapes, and one colour per product suite. Blue for Secure, pink for Database, purple for Copilote."),
      p("The result: a corporate brand and a family of product brands in one system, where a purple shape is Copilote before you’ve read a word."),
    ],
    media: [
      // the organic shapes, then one colour per product suite, then the family of brands
      img("shapes", "16/9"),
      img("card-database", "2000/1565", "third"),
      img("card-secure", "2000/1565", "third"),
      img("card-copilote", "2000/1565", "third"),
      img("architecture", "16/9"),
    ],
  },
  {
    // after Eric Sin's "Brand Design Informed by Product": keep the equity,
    // and decide where the brand speaks (Liam, 2026-11-20)
    title: p("Where the brand speaks"),
    body: [
      p("Synapse already had equity worth keeping: over 90% of employees liked the logo, and the colours were their favourite part of the brand. So the logo stayed exactly as it was. I only reworked the icon: the small “med” next to the S was barely readable and threw the symbol off balance."),
      p("Inside the product, the brand steps back. Our widgets run within our clients’ software, some of them white-labelled, so they’re designed to feel native rather than branded. The new identity lives where people meet Synapse: marketing, events, social media and the website."),
    ],
    media: [
      // the reworked icon first, then where the identity lives: website, social, print, events
      img("symbol", "1/1", "half"),
      img("connection", "1/1", "half"),
      { type: "video", src: `${R}/website.mp4`, ratio: "4/3" },
      img("website", "2000/1183"),
      img("social", "7/3"),
      img("phone", "35/18"),
      img("laptop", "35/18"),
      img("cards", "668/450", "half"),
      img("bottles", "668/450", "half"),
      img("stand-1", "35/18"),
      img("stand-2", "668/540", "half"),
      img("stand-3", "668/540", "half"),
    ],
  },
  {
    // after Eric Sin's "The Vision" (Liam, 2026-11-20); links to the tooling case study
    title: p("The Vision"),
    body: [
      p("Synapse keeps growing in France and the US, and design has become central to it, in the product as much as in the business."),
      p("In 2026, we started exploring and testing new AI tools to scale the brand more easily, take the most time-consuming tasks off the designer’s plate, and let everyone at Synapse be a designer at their own level: presentations, one-pagers, studies. That work became its own case study: [Synapse — Brand Tooling with AI](/work/synapse-brand-tooling)."),
    ],
    media: [
      // presentations anyone at Synapse can make: the deck templates
      img("slides", "2000/967"),
    ],
  },
  {
    title: p("Learnings & reflection"),
    body: [
      // after Eric Sin's closing ("Success showed up in… The lesson—…"), tied to
      // what the page says: one system, the equity kept, a brand that steps back
      p("Success showed up in a brand that holds together: one system for the corporate brand and three product suites, loud enough to carry a Santexpo stand, quiet enough to disappear inside our clients’ software."),
      p("The lesson—a refresh is as much about what you keep, and where the brand stays quiet, as about what you add. Knowing when a brand should step back is part of designing it."),
    ],
  },
];
