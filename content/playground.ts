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
    mobile: { x: -116, y: 100, size: 106 },
  },
  {
    id: "ld-monogram",
    title: "LD Monogram",
    tag: "Monogram · Heatmap effect",
    tools: ["Claude"],
    // ld-monogram.svg is padded 150 units around the 237×147 art for the halo
    media: { type: "heatmap", src: "/playground/ld-monogram.svg", width: 537, height: 447 },
    size: 190,
    place: { x: -40, y: 150, rotate: -4 },
    mobile: { x: 14, y: 80, size: 148 },
  },
  {
    id: "club-medgpt",
    title: "Club MedGPT",
    tag: "MedGPT · Motion",
    tools: ["Midjourney", "Figma", "Jitter"],
    media: { type: "video", src: "/playground/club-medgpt.mp4", width: 1580, height: 1080 },
    size: 190,
    place: { x: -300, y: -255, rotate: 4 },
    mobile: { x: -66, y: -222, size: 192 },
  },
  {
    id: "j-edgar-hover",
    title: "J. Edgar “Hover”",
    tag: "Portrait",
    tools: ["Midjourney", "Figma", "Jitter"],
    media: { type: "video", src: "/playground/j-edgar-hover.mp4", width: 1080, height: 1080 },
    size: 170,
    place: { x: 300, y: -225, rotate: -5 },
    mobile: { x: 108, y: -180, size: 136 },
  },
  {
    id: "year-of-the-horse",
    title: "Year of the Horse",
    tag: "Motion",
    tools: ["Midjourney", "Figma", "Jitter"],
    media: { type: "video", src: "/home/playground.mp4", width: 640, height: 282 },
    size: 270,
    place: { x: 190, y: 175, rotate: 5 },
    mobile: { x: 74, y: 162, size: 206 },
  },
];
