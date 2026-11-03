import type { StorySection } from "../projects";

/**
 * Cuidam Hearts — event branding. Facts from Liam's Figma page
 * (/cuidam-event-branding-cuidam-hearts); the rest waits on him.
 */
const p = (en: string) => ({ en, fr: en });

export const heartsStory: StorySection[] = [
  {
    title: p("The idea"),
    body: [
      p("A video-game marathon called for the language of video games and computing, so the **pixel** became the main pattern of the event."),
      p("[Liam — how the pixel and the heart work together, and why the red and pink.]"),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "The Cuidam Hearts logo and the pixel pattern, with the colours.",
      },
    ],
  },
  {
    title: p("On screen"),
    body: [
      p("Four days of live streaming meant designing the environment the viewers actually watched."),
      p("[Liam — what you designed for the streams: overlays, starting/break screens, alerts, donation goal, streamer kits?]"),
    ],
    media: [
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        note: "A stream overlay in use: a screenshot of a streamer live with your frame, donation bar and alerts.",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        span: "half",
        note: "The “starting soon” or break screen.",
      },
      {
        type: "placeholder",
        src: "",
        ratio: "16/9",
        span: "half",
        note: "The line-up announcement with the 10 streamers.",
      },
    ],
  },
  {
    title: p("Results"),
    body: [p("[Liam — what the 72 hours raised or reached: funds, viewers, hours watched, Ulule result, if you have them.]")],
  },
];
