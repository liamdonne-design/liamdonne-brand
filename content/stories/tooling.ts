import type { StorySection } from "../projects";

/**
 * Synapse — Brand Tooling with AI: what came after the brand refresh. One
 * brand designer for the whole company, so in 2026 the brand became tools
 * built with Claude. Split out of "Synapse — Branding" (Liam, 2026-11-20:
 * the page was too long).
 * Timeline (Liam, 2026-11-20): at launch in 2025 the brand lived in Figma
 * (brand book in two versions, asset templates); Claude arrived at Synapse
 * in early 2026, then the brand system in Claude, the email-signature
 * generator, Compressor and Shader. Shader's details come from Liam's
 * LinkedIn post, Compressor's from his Playground text. Facts only from Liam.
 * The brand-system section has no visual yet: the grey stand-in shows until
 * Liam sends captures.
 */
const p = (en: string) => ({ en, fr: en });

export const toolingStory: StorySection[] = [
  {
    title: p("The brand system in Claude"),
    body: [
      p("At launch in 2025, the brand lived in Figma: a full brand book for design and marketing, a light version for press and partners, and asset templates for the everyday visuals. Useful, but only to people who open Figma."),
      p("When Claude arrived at Synapse in early 2026, I put the Synapse brand system inside it, so any team can make on-brand slides and documents, data visualisation included. **50+** people have used it for slides, rated **5/5**, and **100%** say it saves time and is easier than starting from Google Slides. An email-signature generator followed, so signatures stay on-brand without a designer."),
    ],
  },
  {
    title: p("Compressor"),
    body: [
      p("Compressor flips the usual logic of file optimization. Instead of asking how small a file can get, you choose where it’s going: blog, newsletter, email, LinkedIn. The tool applies that destination’s guidelines and compresses just enough to meet them, with no visible loss of quality."),
      p("I built it for the marketing and business teams, so the visuals they publish come out right without a designer."),
    ],
    media: [{ type: "video", src: "/playground/compressor.mp4", ratio: "1120/848" }],
  },
  {
    title: p("Shader"),
    body: [
      p("Our homepage background was made with a paid tool. Instead of renewing it, I built my own, to set the rules myself and give the brand room to experiment. Shader turns the Synapse identity into living, interactive backgrounds: pick a form, push it, try fifty variants in a minute, keep the one that feels right, export it."),
      p("- **12 forms**, from our signature organic shapes to spirals, ribbons, rays and drops.\n- **Our three brand colour universes**, with the Synapse palette always at hand.\n- **Glass, outlines, grain, distortion and motion**, all tuned in real time.\n- **Image, GIF and video exports**, plus a ready-to-paste embed for our Webflow sites.\n\nIt runs on the Synapse website today, behind the hero and inside the Contact button."),
    ],
    media: [{ type: "video", src: "/playground/shader.mp4", ratio: "1120/642" }],
  },
  {
    title: p("Learnings & reflection"),
    body: [
      p("The tools we used to pay for can now be rebuilt by the people who use them, with full control and shaped around the way we actually work."),
      p("The real shift isn’t the tool. It’s that a brand can now have tools made exactly for it."),
    ],
  },
];
