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
      p("The **pixel** points to gaming: the event lived on Twitch, with streamers and their viewers. The **heart** speaks of care, support and charity, which suits a fundraiser for mental health."),
      p("And a third layer: the money raised would bring the Cuidam project, and its app, to life."),
    ],
    media: [v("pixel-heart", "half"), v("pixel-coins", "half")],
  },
  {
    title: p("On screen"),
    body: [
      p("Four days of live streaming meant designing the environment the viewers actually watched."),
      p("The waiting screen, the overlay around each streamer’s camera and chat, the donation alerts, and a pixel heart counting the money as it came in."),
    ],
    media: [v("stream-overlay"), v("donation-alert", "half"), v("donation-counter", "half")],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("**10 streamers**, live on their own channels for **four days**, from 20 to 23 April."),
      p("**€2,030 raised in 72 hours** during the live: a third of a Ulule campaign that closed at **€6,340, 105% of its €6,000 goal**, with **186 contributions**. The money went into building a proper Cuidam app."),
      p("During the campaign, Cuidam also won two contests: Ulule’s **Pitch Pitch** (+€250) and BNP Paribas’ **Act for Impact**."),
      p("! An event is always better built with others. Our intern at the time explained how Twitch works and saw what a charity live could do for us. I knew Z Event, which inspired us, but how it was organised was a mystery to me. Without that knowledge, no Cuidam Hearts."),
    ],
  },
];
