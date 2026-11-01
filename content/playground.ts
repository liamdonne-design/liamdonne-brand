/**
 * Playground experiments, shown as cards like the home ones (grey card,
 * square picture, name) around the intro. `text` is
 * optional; when set it shows in the modal (one string = one paragraph).
 */
export type PlaygroundItem = {
  id: string;
  title: string;
  /** short label under the title, e.g. client or medium */
  tag: string;
  text?: string[];
  /** "heatmap" = a black-on-transparent SVG run through the animated Paper
   *  heatmap shader (after Framer's Heatmap Effect) */
  media: { type: "image" | "video" | "heatmap"; src: string; width: number; height: number };
  /** card width on the canvas, in px of the 1440×900 layout (scales with the screen) */
  size: number;
  /** transparent cut-outs (stickers) sit, contained, on this colour in the
   *  square picture; anything else fills it */
  bg?: string;
  /** name above the picture instead of below (like the home "Playground" card) */
  labelTop?: boolean;
  /** centre of the card, in px of the 1440×900 layout from the canvas
   *  centre; they ring the intro, all on the first screen, a few overlap */
  place: { x: number; y: number; rotate: number };
};

/** Centre of the Playground: letters light up as the cursor passes over them. */
export const playgroundIntro = ["Discover some of my experiments,", "tests and design studies."];

export const playground: PlaygroundItem[] = [
  {
    id: "ld-monogram",
    title: "LD Monogram",
    tag: "Monogram · Heatmap effect",
    // ld-monogram.svg is padded 150 units around the 237×147 art for the halo
    media: { type: "heatmap", src: "/playground/ld-monogram.svg", width: 537, height: 447 },
    size: 190,
    place: { x: -70, y: 130, rotate: -4 },
  },
  {
    id: "ubb-flags",
    title: "UBB Flags",
    tag: "Union Bordeaux Bègles · Animated sticker",
    media: { type: "image", src: "/playground/ubb-flags.gif", width: 600, height: 338 },
    size: 200,
    bg: "#AFC0FF",
    place: { x: -430, y: -130, rotate: -6 },
  },
  {
    id: "ubb-essai",
    title: "UBB Essai !",
    tag: "Union Bordeaux Bègles · Animated sticker",
    media: { type: "image", src: "/playground/ubb-essai.webp", width: 480, height: 480 },
    size: 170,
    bg: "#2F63E7",
    labelTop: true,
    place: { x: -290, y: -215, rotate: 5 },
  },
  {
    id: "ubb-allez",
    title: "UBB Allez",
    tag: "Union Bordeaux Bègles · Animated sticker",
    media: { type: "image", src: "/playground/ubb-allez.gif", width: 480, height: 480 },
    size: 210,
    bg: "#F7E8EC",
    place: { x: 430, y: -40, rotate: 7 },
  },
  {
    id: "year-of-the-horse",
    title: "Year of the Horse",
    tag: "Motion",
    media: { type: "video", src: "/home/playground.mp4", width: 640, height: 282 },
    size: 200,
    labelTop: true,
    place: { x: 125, y: 145, rotate: 5 },
  },
];
