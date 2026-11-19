/**
 * Playground experiments, shown as untitled cards like the home ones (grey
 * card, picture) around the intro; the title, tag, tools and optional `text`
 * show in the modal (one string = one paragraph).
 */
export type PlaygroundItem = {
  id: string;
  title: string;
  /** short label under the title, e.g. client or medium */
  tag: string;
  /** tools used, shown as chips in the modal */
  tools: string[];
  text?: string[];
  /** "heatmap" = a black-on-transparent SVG run through the animated Paper
   *  heatmap shader (after Framer's Heatmap Effect); "story" = a photo with
   *  animated stickers laid over it, as posted */
  media: {
    type: "image" | "video" | "heatmap" | "story";
    src: string;
    width: number;
    height: number;
    /** story only: the stickers, centred at x/y (% of the photo), w = % of its
     *  width, later ones on top; `spin` = seconds per turn for a still that turns */
    layers?: { src: string; x: number; y: number; w: number; rotate: number; spin?: number }[];
  };
  /** card width on the canvas, in px of the 1440×900 layout (scales with the screen) */
  size: number;
  /** centre of the card, in px of the 1440×900 layout from the canvas
   *  centre; they ring the intro, all on the first screen, a few overlap */
  place: { x: number; y: number; rotate: number };
  /** phones (< 640px): centre and width in units of a 430-wide screen,
   *  bigger cards stacked closer, overlapping more */
  mobile?: { x: number; y: number; size: number };
};

/** Centre of the Playground: letters light up as the cursor passes over them. */
export const playgroundIntro = ["Discover some of my experiments,", "tests and design studies."];

export const playground: PlaygroundItem[] = [
  {
    id: "ubb-social-stickers",
    title: "UBB social stickers",
    tag: "Union Bordeaux Bègles · Animated stickers",
    tools: ["Photoshop", "After Effects"],
    // the club's Instagram story, with the three stickers on it
    media: {
      type: "story",
      src: "/playground/ubb-story.jpg",
      width: 676,
      height: 1202,
      layers: [
        // the badge turns like a clock hand, time passing; "Essai !" overlaps it
        { src: "/playground/ubb-logo.webp", x: 22, y: 29, w: 30, rotate: 0, spin: 12 },
        { src: "/playground/ubb-essai.webp", x: 29, y: 39, w: 42, rotate: -8 },
        { src: "/playground/ubb-flags.gif", x: 70, y: 57, w: 50, rotate: 6 },
        { src: "/playground/ubb-allez-white.gif", x: 29, y: 73, w: 44, rotate: 4 },
        { src: "/playground/ubb-chaban.gif", x: 63, y: 88, w: 58, rotate: -3 },
      ],
    },
    size: 170,
    place: { x: -425, y: -80, rotate: -5 },
    mobile: { x: 168, y: -220, size: 106 },
  },
  {
    id: "compressor",
    title: "Compressor",
    tag: "In-house tool",
    tools: ["Claude Artifact"],
    text: [
      "Compressor flips the usual logic of file optimization. Instead of asking how small a file can get, you choose where it’s going: blog, newsletter, email, LinkedIn. The tool applies that destination’s guidelines and compresses just enough to meet them, with no visible loss of quality.",
    ],
    // screen recording, 1920×1452 at the source
    media: { type: "video", src: "/playground/compressor.mp4", width: 1120, height: 848 },
    size: 250,
    place: { x: 127, y: 168, rotate: 4 },
    mobile: { x: -109, y: 163, size: 168 },
  },
  {
    id: "shader",
    title: "Shader",
    tag: "Synapse · In-house tool",
    tools: ["Claude Artifact"],
    text: [
      "To replace a paid tool and set my own rules, I designed and built Shader, an in-house tool that turns the Synapse visual identity into living, interactive backgrounds. Anyone on the team can explore endless on-brand variations, then export them straight to our website.",
    ],
    // screen recording, 1920×1102 at the source
    media: { type: "video", src: "/playground/shader.mp4", width: 1120, height: 642 },
    size: 250,
    place: { x: -104, y: 117, rotate: -4 },
    mobile: { x: 12, y: 67, size: 178 },
  },
  {
    id: "j-edgar-hover",
    title: "J. Edgar “Hover”",
    tag: "Portrait",
    tools: ["Midjourney", "Figma", "Jitter"],
    media: { type: "video", src: "/playground/j-edgar-hover.mp4", width: 1080, height: 1080 },
    size: 170,
    place: { x: 295, y: -262, rotate: -4 },
    mobile: { x: 6, y: -172, size: 136 },
  },
  {
    id: "club-medgpt",
    title: "Club MedGPT",
    tag: "MedGPT · Motion",
    tools: ["Midjourney", "Figma", "Jitter"],
    media: { type: "video", src: "/playground/club-medgpt.mp4", width: 1580, height: 1080 },
    size: 190,
    place: { x: -300, y: -255, rotate: 4 },
    mobile: { x: -114, y: -229, size: 192 },
  },
  {
    id: "year-of-the-horse",
    title: "Year of the Horse",
    tag: "Motion",
    tools: ["Midjourney", "Figma", "Jitter"],
    media: { type: "video", src: "/home/playground.mp4", width: 640, height: 282 },
    size: 270,
    place: { x: 473, y: -178, rotate: 3 },
    mobile: { x: 104, y: 205, size: 206 },
  },
];
