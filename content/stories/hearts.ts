import type { Media, StorySection } from "../projects";

/**
 * Cuidam Hearts — event branding, the heart of the project; the Ulule campaign
 * it pushed gives the context and the result. Facts from Liam, his Figma page
 * (/cuidam-event-branding-cuidam-hearts) and the Ulule campaign page.
 */
const p = (en: string) => ({ en, fr: en });
const D = "/work/cuidam-hearts-event";
// looping clips from Liam's figma.site page for the project
const v = (name: string, span?: Media["span"]): Media => ({ type: "video", src: `${D}/${name}.mp4`, ratio: "16/9", span });

export const heartsStory: StorySection[] = [
  {
    // context: the Ulule campaign the live was built to push (facts from the Ulule page)
    title: p("The campaign behind it"),
    body: [
      p("Cuidam’s first crowdfunding campaign, on Ulule: **€6,000** to start building a real Cuidam app, so that students could see a psychologist without spending their grant."),
      p("Cuidam Hearts was built to carry it: 72 hours of live streaming to spread the word and bring the donations in."),
    ],
    // the stream's waiting screen, on Twitch: it sends viewers to the Ulule page
    media: [v("twitch-starting")],
  },
  {
    title: p("The idea"),
    body: [
      p("[Liam — how the pixel and the heart work together, and why the red and pink.]"),
    ],
    media: [v("pixel-heart", "half"), v("pixel-coins", "half")],
  },
  {
    title: p("On screen"),
    body: [
      p("Four days of live streaming meant designing the environment the viewers actually watched."),
      p("The waiting screen, the overlay around each streamer’s camera and chat, the donation alerts, and a pixel heart counting the money as it came in."),
      p("[Liam — anything else you designed for the streams: streamer kits, line-up announcement, social posts?]"),
    ],
    media: [v("stream-overlay"), v("donation-alert", "half"), v("donation-counter", "half")],
  },
  {
    title: p("The recap"),
    body: [p("Seventy-two hours squeezed into a few minutes: the streamers’ reactions as the donations came in.")],
    media: [
      { type: "video", src: "", youtube: "-74tTi1HL_k", poster: `${D}/recap-poster.jpg`, ratio: "16/9", controls: true, title: "the Cuidam Hearts recap" },
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("**10 streamers**, live on their own channels for **four days**, from 20 to 23 April."),
      p("**€2,030 raised in 72 hours** during the live: a third of a Ulule campaign that closed at **€6,340, 105% of its €6,000 goal**, with **186 contributions**. The money went into building a proper Cuidam app."),
      p("During the campaign, Cuidam also won two contests: Ulule’s **Pitch Pitch** (+€250) and BNP Paribas’ **Act for Impact**."),
      p("[Liam — one takeaway: what you learned, or what you’d do differently.]"),
    ],
  },
];
