import type { Media, StorySection } from "../projects";

/**
 * MedGPT — Brand Campaign ("Liberté, Égalité, MedGPT", Santexpo 2026).
 * Facts from Liam (2026-11-09), his Figma file "BRAND ALTERNATE — MANIFESTATION
 * MEDGPT" and Synapse's public manifesto on the company blog. The 110 / 21 / 26
 * results come from Liam and the team's internal Santexpo debrief (he OK'd it).
 */
const p = (en: string) => ({ en, fr: en });
const D = "/work/synapse-manifestation-event";
const img = (name: string, ratio: string, span?: Media["span"], caption?: string): Media => ({
  type: "image",
  src: `${D}/${name}.jpg`,
  ratio,
  span,
  caption: caption ? p(caption) : undefined,
});

export const libertyStory: StorySection[] = [
  {
    title: p("The idea"),
    body: [
      p("Synapse published a manifesto for sovereign medical AI. AI is already part of French medical practice, often through tools that were never built for care. When it sits outside French control, three things are at stake: dependence, influence over clinical decisions, and patients’ health data."),
      p("Marketing came up with the starting point: a *manifestation*, a protest for sovereign medical AI. I pushed it further, underground: posters pasted at night, tags, stencils, spray paint. And a slogan borrowed from the French motto: **Liberté, Égalité, MedGPT.**"),
    ],
    media: [
      img("accroche", "2000/1570"),
      {
        type: "slideshow",
        src: `${D}/teaser-still.jpg`,
        ratio: "16/9",
        slides: ["teaser-still", "shoot-16", "shoot-21", "shoot-01", "shoot-10"].map((n) => ({ src: `${D}/${n}.jpg` })),
      },
    ],
  },
  {
    title: p("The teaser"),
    body: [
      p("A teaser film announced the campaign: a night shoot in front of a graffiti wall, the posters going up one by one. Our assistant product designer played the poster-paster; I directed, shot and edited it."),
    ],
    media: [
      { type: "video", src: `${D}/teaser-v2.mp4`, poster: `${D}/teaser-v2-poster.jpg`, ratio: "16/9", controls: true, title: "the teaser" },
    ],
  },
  {
    // no title: the soundtrack carries on from the teaser, after the film
    title: p(""),
    body: [
      p("I made the teaser’s music with Suno, from a prompt written like a brief: an instrumental that starts slow and eerie, then breaks into an old-school boom bap beat, with synth stabs, cold metallic textures and the sound of spray cans. *Rebellious, and cinematic.*"),
    ],
    media: [
      { type: "audio", src: `${D}/soundtrack.m4a`, label: `${D}/vinyl-label.jpg`, background: `${D}/bg-4.jpg`, title: "Liberté – Instru", ratio: "16/9" },
      // side by side, same height: the app on two thirds, the prompt (padded square) on one
      { ...img("suno-app", "2000/1016", "twoThirds"), outline: false },
      img("suno-styles", "1190/1228", "third"),
    ],
  },
  {
    title: p("Print & goodies"),
    body: [
      p("Fly-posting posters and the stand’s main poster, then everything visitors could take home: a printed programme, ecocups, stickers, webcam covers and tote bags. Down to the email signature."),
    ],
    media: [
      img("poster-main", "5/7", "half"),
      img("posters-wild", "5/7", "half"),
      img("goodies-hd", "2400/3173"),
    ],
  },
  {
    title: p("Social media"),
    body: [
      p("Before and during the show, every post spoke the campaign’s language: the announcement, the three-day programme as a carousel, key messages and interview reels."),
    ],
    media: [img("programme", "2000/270"), img("social-2", "2000/1304")],
  },
  {
    title: p("On the stand"),
    body: [
      p("At Santexpo, 19–21 May 2026, on stand O62: the slogan on the walls, the posters pasted as they were in the street, and the campaign’s ecocups on the bar."),
    ],
    media: [
      {
        type: "slideshow",
        src: `${D}/stand.jpg`,
        ratio: "16/9",
        slides: ["stand", "stand-8", "stand-3", "stand-4", "stand-5", "stand-6", "stand-7"].map((n) => ({ src: `${D}/${n}.jpg` })),
      },
    ],
  },
  {
    title: p("Graffiti workshop"),
    body: [
      p("The street came onto the stand: stencils of the MedGPT wordmark and the campaign’s shapes, sprayed live onto tote bags. I sprayed them on the stand with our UX researcher, and filmed the show along the way."),
    ],
    media: [
      // the end of the Santexpo aftermovie (from 1:09): the workshop, then the slogan
      { type: "video", src: `${D}/aftermovie-workshop.mp4`, poster: `${D}/aftermovie-poster.jpg`, ratio: "16/9", controls: true, title: "the aftermovie" },
      ...["graffiti-0", "graffiti-1", "graffiti-3", "graffiti-4", "graffiti-5", "graffiti-6"].map((n) => img(n, "16/9", "third")),
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("**5,000 tote bags** handed out in three days, a record for the stand. Then they travelled: people sent us photos of the MedGPT tote in cities all over France."),
      p("In the team’s internal debrief (25 people), the edition scored **4.76/5**. Every respondent named the tote bags as the thing to keep, and everyone on the stand found the positioning clear and consistent."),
      p("> “The MedGPT tote bags we saw all over the show really stuck in people’s minds.”"),
      p("What didn’t land: stickers and webcam covers were barely taken, and visitors asked for a MedGPT leaflet we didn’t have. Next time, fewer small goodies, more tote bags, and print that explains the product."),
      p("! A good idea is a starting point. Taking the protest underground is what gave the campaign its voice."),
    ],
  },
];
