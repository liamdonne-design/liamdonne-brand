import type { Media, StorySection } from "../projects";

/**
 * MedGPT Motion System — "the pulse". Text from Liam's Figma file
 * "MOTION DESIGN SYSTEM (MEDGPT)" (node 1067:11711): philosophy, personality,
 * language, principles, physics, gradient, logo, transitions, do's & don'ts,
 * applications, Jitter library. Facts only from that page.
 */
const p = (en: string) => ({ en, fr: en });
const D = "/work/medgpt-motion-system";
const v = (name: string, ratio: string, caption: string, span?: Media["span"]): Media => ({
  type: "video",
  src: `${D}/${name}.mp4`,
  ratio,
  caption: p(caption),
  span,
});

export const medgptMotionStory: StorySection[] = [
  {
    title: p("Philosophy"),
    body: [
      p("> Complexity → transformation → clarity."),
      p("Why does MedGPT move at all? Because the product takes something complex and makes it clear, and motion can show that happening. Four traits decide how:"),
      p("- **Intelligent:** elements transform, connect and structure rather than simply move.\n- **Fluid:** transitions feel continuous and alive, never mechanical.\n- **Precise:** every movement has a clear intention and a defined endpoint.\n- **Impactful:** key moments present themselves with confidence, impossible to overlook."),
    ],
  },
  {
    title: p("Six behaviours"),
    body: [
      p("A small set of recurring behaviours, shared by brand, product, social and communication:"),
      p("- **Reveal:** information emerges into view, so content feels clear and intentional.\n- **Connect:** elements move toward one another and form a visible relationship.\n- **Generate:** the user’s input appears as typing; the answer emerges with a subtle gradient glow.\n- **Transform:** elements change, combine or reorganise, which is what the product does.\n- **Flow:** the gradient moves organically, a sense of continuous activity.\n- **Pulse:** subtle breathing, expansion and blinking. The heart, and the caret."),
    ],
    media: [
      v("lang-reveal", "35/16", "Reveal", "third"),
      v("lang-connect", "35/16", "Connect", "third"),
      v("lang-generate", "35/16", "Generate", "third"),
      v("lang-transform", "35/16", "Transform", "third"),
      v("lang-flow", "35/16", "Flow", "third"),
      v("lang-pulse", "35/16", "Pulse", "third"),
    ],
  },
  {
    title: p("Principles"),
    body: [
      p("The rules that make a movement feel like MedGPT:"),
      p("- **Motion has meaning:** it communicates a change, a relationship or a state, or it doesn’t happen.\n- **Motion follows the story:** something happens, transforms, and resolves.\n- **Motion is restrained:** the minimum movement needed. Every effect earns its place.\n- **Motion creates relationships:** elements respond to one another.\n- **Motion has rhythm:** timing, repetition, Flow and Pulse.\n- **Motion resolves clearly:** every animation lands on a deliberate final state."),
      p("The last one matters most. In a product that answers clinical questions, ambiguity is exactly what you’re selling against."),
    ],
  },
  {
    title: p("Physics"),
    body: [
      p("Responsive, never rushed. The numbers:"),
      p("- **Timing:** 200–300 ms for micro-interactions, 400–600 ms for most brand and product motion, 800–1200 ms for Flow, Pulse and expressive moments.\n- **Easing:** ease-out for things appearing or settling, ease-in-out for transformations.\n- **Rhythm:** 10–50 ms between elements, so they follow each other instead of arriving at once.\n- **Scale:** 90–100% for standard reveals; bigger changes are kept for impactful moments.\n- **Pause:** stillness is part of the animation. Let important things settle before the next move."),
      p("> Pulse should feel like breathing, not bouncing."),
      p("A pulse cycle runs about 2 to 4 seconds, with very small changes in scale or opacity: almost subconscious."),
    ],
    media: [
      v("physics-fast", "35/16", "Timing: fast", "third"),
      v("physics-standard", "35/16", "Timing: standard", "third"),
      v("physics-slow", "35/16", "Timing: slow", "third"),
      v("physics-easeout", "1/1", "Ease out", "third"),
      v("physics-easeinout", "1/1", "Ease in out", "third"),
      v("physics-simultaneous", "1/1", "Simultaneous", "third"),
      v("physics-staggered", "1/1", "Staggered", "third"),
      v("physics-large", "1/1", "Movement: large", "third"),
      v("physics-subtle", "1/1", "Movement: subtle", "third"),
      v("physics-scale", "47/80", "Scale: standard reveal", "third"),
      v("physics-pulse", "47/80", "Pulse: slow", "third"),
      v("physics-pause", "47/80", "Pause: short", "third"),
    ],
  },
  {
    title: p("Gradient & logo"),
    body: [
      p("The gradient has three states: **static** (present but still), **flow** (moving organically) and **glow** (concentrated around an interaction)."),
      p("The logo has two ways in and out, used at the start, the end, or both ends of a video: the **cursor masking the wordmark**, and the **cursor flickering**."),
    ],
    media: [
      v("gradient-flow", "16/9", "Gradient: flow", "half"),
      v("gradient-glow", "32/19", "Gradient: glow", "half"),
      v("logo-intro-v1", "16/9", "Logo, version 1: intro", "half"),
      v("logo-outro-v1", "16/9", "Logo, version 1: outro", "half"),
      v("logo-intro-v2", "16/9", "Logo, version 2: intro", "half"),
      v("logo-outro-v2", "16/9", "Logo, version 2: outro", "half"),
    ],
  },
  {
    title: p("Transitions"),
    body: [
      p("Three patterns to get from one scene to the next, in a social video, a presentation or a brand film: **Flow** (the gradient carries the viewer across), **Morph** (A becomes B) and **Cut** (two sequences linked by a similar motion)."),
      p("And three sequences that show the system in practice:\n- Question → answer: typing → AI generation → pulse.\n- Complexity → clarity: reveal → connect → glow.\n- Brand transition: one message exits, the gradient flows across, the next message enters from the same direction."),
    ],
    media: [
      v("transition-flow", "16/9", "Flow", "third"),
      v("transition-morph", "16/9", "Morph", "third"),
      v("transition-cut", "16/9", "Cut", "third"),
      v("app-question-answer", "16/9", "Question → answer"),
      v("app-complexity-clarity", "16/9", "Complexity → clarity", "half"),
      v("app-brand-transition", "16/9", "Brand transition", "half"),
    ],
  },
  {
    title: p("Do’s & don’ts"),
    body: [
      p("- Make the pulse subtle and alive, not an obvious loop.\n- Give each movement time to be understood; don’t rush important information.\n- Keep movement small and intentional; don’t exaggerate it for attention.\n- Align directions across a transition; conflicting directions create friction."),
    ],
    media: [
      v("do-pulse", "1/1", "Do: a subtle pulse", "quarter"),
      v("dont-pulse", "1/1", "Don’t: an obvious loop", "quarter"),
      v("do-timing", "1/1", "Do: time to be understood", "quarter"),
      v("dont-timing", "1/1", "Don’t: rushed", "quarter"),
      v("do-restraint", "1/1", "Do: subtle, intentional", "quarter"),
      v("dont-restraint", "1/1", "Don’t: exaggerated", "quarter"),
      v("do-transition", "1/1", "Do: one direction", "quarter"),
      v("dont-transition", "1/1", "Don’t: conflicting directions", "quarter"),
    ],
  },
  {
    title: p("The library"),
    body: [
      p("The system lives in a **Jitter library**: reusable animations and components, so whoever makes a MedGPT video starts from the same pieces and the brand moves the same way everywhere."),
    ],
    media: [
      { type: "image", src: `${D}/jitter.png`, ratio: "1610/1804", span: "half" },
    ],
  },
];
