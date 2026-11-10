import type { Media, StorySection } from "../projects";

/**
 * MedGPT — Brand Campaign ("Liberté, Égalité, MedGPT", Santexpo 2026).
 * Facts from Liam (2026-11-09), his Figma file "BRAND ALTERNATE — MANIFESTATION
 * MEDGPT" and Synapse's public manifesto on the company blog. The 110 / 21 / 26
 * figures come from the LinkedIn announcement post Liam shared.
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
    title: p("Social media"),
    body: [
      p("Before and during the show, every post spoke the campaign’s language: the announcement, the three-day programme as a carousel, key messages and interview reels."),
    ],
    media: [img("programme", "2000/270"), img("social-2", "2000/1304")],
  },
  {
    title: p("Print & goodies"),
    body: [
      p("Fly-posting posters and the stand’s main poster, then everything visitors could take home: a printed programme, ecocups, stickers, webcam covers and tote bags. Down to the email signature."),
    ],
    media: [
      img("poster-main", "5/7", "half"),
      img("posters-wild", "5/7", "half"),
      img("goodies", "1513/2000"),
    ],
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
        slides: ["stand", "stand-2", "stand-3", "stand-4", "stand-5", "stand-6", "stand-7"].map((n) => ({ src: `${D}/${n}.jpg` })),
      },
    ],
  },
  {
    title: p("Graffiti workshop"),
    body: [
      p("The street came onto the stand: stencils of the MedGPT wordmark and the campaign’s shapes, sprayed live onto tote bags."),
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
      p("The LinkedIn post announcing the campaign drew **110 reactions, 21 comments and 26 reposts**."),
      p("[Liam — other results if you have them: visitors at the stand, tote bags sprayed, teaser views, contacts made.]"),
      p("! A good idea is a starting point. Taking the protest underground is what gave the campaign its voice."),
    ],
  },
];
