import type { Media, StorySection } from "../projects";

/**
 * MedGPT Motion System — "the pulse". Text from Liam's Figma file
 * "MOTION DESIGN SYSTEM (MEDGPT)" (node 1067:11711): philosophy, personality,
 * language, principles, physics, gradient, logo, transitions, do's & don'ts,
 * applications, Jitter library. Facts only from that page.
 */
const p = (en: string) => ({ en, fr: en });
const D = "/work/medgpt-motion-system";
// clips that never show a white edge; every other one gets a light-grey outline
const NO_WHITE = new Set(["gradient-flow", "physics-slow"]);
const v = (name: string, ratio: string, caption?: string, span?: Media["span"], outline?: boolean, struck?: boolean): Media => ({
  type: "video",
  src: `${D}/${name}.mp4`,
  ratio,
  caption: caption ? p(caption) : undefined,
  span,
  outline: outline ?? !NO_WHITE.has(name),
  struck,
});
const d = (m: Media, description: string): Media => ({ ...m, description: p(description) });
const verdict = (m: Media, kind: "do" | "dont", description: string): Media => ({
  ...m,
  verdict: kind,
  struck: kind === "dont",
  description: p(description),
});

export const medgptMotionStory: StorySection[] = [
  {
    title: p("Concept: the pulse"),
    body: [
      p("MedGPT’s concept is a blinking heart: a text cursor blinks, a heart beats. That is already a motion idea, so the motion system isn’t a layer on top of the brand. It’s the concept doing its job."),
    ],
    media: [v("lang-pulse", "35/16")],
  },
  {
    title: p("Our motion philosophy"),
    body: [
      p("MedGPT turns complexity into clarity. Its motion language reflects **intelligence** through transformation and connection, **fluidity** through organic movement, **precision** through intentional transitions, and **impact** through confident presentation."),
    ],
    media: [
      v("gradient-flow", "16/9", "Gradient: flow", "half"),
      v("gradient-glow", "16/9", "Gradient: glow", "half"),
    ],
  },
  {
    title: p("Six behaviours"),
    body: [
      p("MedGPT uses a small set of recurring motion behaviours. These behaviours form a consistent visual language across brand, product, social and communication."),
    ],
    media: [
      { ...v("lang-reveal", "35/16", "Reveal", "third"), description: p("Information emerges into view, so content feels clear and intentional.") },
      { ...v("lang-connect", "35/16", "Connect", "third"), description: p("Elements move toward one another and form a visible relationship.") },
      { ...v("lang-generate", "35/16", "Generate", "third"), description: p("The user’s input appears as typing; the answer emerges with a subtle gradient glow.") },
      { ...v("lang-transform", "35/16", "Transform", "third"), description: p("Elements change, combine or reorganise, which is what the product does.") },
      { ...v("lang-flow", "35/16", "Flow", "third"), description: p("The gradient moves organically, a sense of continuous activity.") },
      { ...v("lang-pulse", "35/16", "Pulse", "third"), description: p("Subtle breathing, expansion and blinking. The heart, and the caret.") },
    ],
  },
  {
    title: p("The physics behind it"),
    body: [
      p("Motion physics define the timing, rhythm and physical behaviour of MedGPT’s animations. They give every movement a consistent feel, while allowing enough flexibility for different contexts."),
    ],
    lead: true,
  },
  {
    title: p("Timing"),
    body: [p("MedGPT should feel responsive, never rushed. Small interactions move quickly, while important transformations take more time to breathe.")],
    board: {
      guideline: [
        p("**Fast**\n*200–300 ms*\nSmall reveals and micro interactions"),
        p("**Standard**\n*400–600 ms*\nMost brand and product motion"),
        p("**Slow**\n*800–1200 ms*\nFlow, Pulse, and expressive moments"),
      ],
    },
    media: [v("physics-fast", "35/16", "Fast"), v("physics-standard", "35/16", "Standard"), v("physics-slow", "35/16", "Slow")],
  },
  {
    title: p("Easing"),
    body: [p("Movement should accelerate and settle naturally rather than feeling mechanical.")],
    board: { guideline: [p("**Ease Out** → elements appearing or settling\n**Ease In Out** → transformations and transitions")] },
    media: [v("physics-easeout", "1/1", "Ease Out"), v("physics-easeinout", "1/1", "Ease In Out")],
  },
  {
    title: p("Rhythm"),
    body: [p("Motion should have a sense of rhythm. Not everything should happen at the same time — elements can follow, overlap, or react to one another.")],
    board: { guideline: [p("Use small delays between elements, typically 10–50 ms, to create progression without making the animation feel slow.")] },
    media: [v("physics-simultaneous", "1/1", "Simultaneous", undefined, false, true), v("physics-staggered", "1/1", "Staggered")],
  },
  {
    title: p("Movement"),
    body: [p("Elements should travel short, intentional distances. Movement should support the idea being communicated rather than draw attention to itself.")],
    board: { guideline: [p("Prefer subtle movement over large trajectories. A small shift combined with opacity or scale is often enough.")] },
    media: [v("physics-large", "1/1", "Large", undefined, false, true), v("physics-subtle", "1/1", "Subtle")],
  },
  {
    title: p("Scale"),
    body: [p("Scale gives elements presence when they appear or activate.")],
    board: { guideline: [p("Use subtle growth such as 90–100% for standard reveals. Reserve larger scale changes for impactful moments.")] },
    media: [v("physics-scale", "47/80", "Standard reveals")],
  },
  {
    title: p("Pulse"),
    body: [p("Pulse should feel like breathing rather than bouncing — subtle, continuous, and almost subconscious.")],
    board: { guideline: [p("Keep Pulse slow and restrained, typically around 2–4 seconds per cycle, with very small changes in scale or opacity.")] },
    media: [v("physics-pulse", "47/80", "Slow pulse")],
  },
  {
    title: p("Pause"),
    body: [p("A moment of stillness is part of the animation. Let important elements settle before introducing the next movement.")],
    board: { guideline: [p("Use short pauses between major moments, especially before or after an impactful reveal.")] },
    media: [v("physics-pause", "47/80", "Short pause")],
  },
  {
    title: p("Logo motion"),
    body: [
      p("Two logo animations, used consistently at the start, the end, or both ends of each video to introduce the narrative."),
    ],
    media: [
      v("logo-intro-v1", "16/9", "Logo, version 1: intro", "half"),
      v("logo-outro-v1", "16/9", "Logo, version 1: outro", "half"),
      v("logo-intro-v2", "16/9", "Logo, version 2: intro", "half"),
      v("logo-outro-v2", "16/9", "Logo, version 2: outro", "half"),
    ],
  },
  {
    title: p("Transitions: moving from one scene to another"),
    body: [
      p("A few transition patterns, useful in a social media video, a presentation or even a brand film."),
    ],
    media: [
      d(v("transition-flow", "16/9", "Flow"), "Organic gradient movement carries the viewer between scenes."),
      d(v("transition-morph", "16/9", "Morph"), "Element A becomes B."),
      d(v("transition-cut", "16/9", "Cut"), "Two sequences linked together by a similar motion."),
    ],
  },
  {
    title: p("Examples & applications"),
    body: [
      p("These applications show how the MedGPT motion system comes together across different contexts, from product interactions to brand storytelling."),
    ],
    media: [
      d(v("app-question-answer", "16/9", "Question → answer"), "Typing → AI generation → pulse."),
      d(v("app-complexity-clarity", "16/9", "Complexity → clarity"), "Reveal → connect → glow."),
      d(v("app-brand-transition", "16/9", "Brand transition"), "One message exits, the gradient flows across, the next message enters from the same direction."),
    ],
  },
  {
    title: p("Do’s & don’ts"),
    body: [
      p("Defining the boundaries of the system matters. It helps designers make the right choices when creating motion that isn’t explicitly covered by a component."),
    ],
    // shown in pairs, Do then Don’t, as in the Figma file
    pairs: true,
    media: [
      verdict(v("do-pulse", "1/1"), "do", "make the pulse feel subtle and alive."),
      verdict(v("dont-pulse", "1/1"), "dont", "make the pulse too exaggerated and feel like an obvious loop."),
      verdict(v("do-timing", "1/1"), "do", "give each movement enough time to be understood."),
      verdict(v("dont-timing", "1/1"), "dont", "rush through if the information is important."),
      verdict(v("do-restraint", "1/1"), "do", "keep movement subtle and intentional."),
      verdict(v("dont-restraint", "1/1"), "dont", "exaggerate movement for attention."),
      verdict(v("do-transition", "1/1"), "do", "align the direction of elements across transitions to create a continuous flow."),
      verdict(v("dont-transition", "1/1"), "dont", "combine conflicting directions that create friction between elements."),
    ],
  },
  {
    title: p("Key results & takeaways"),
    body: [
      p("Built ahead of the need: it keeps my own motion work consistent today, and gives any future motion designer or freelancer everything they need to animate MedGPT from day one."),
      p("! A motion system is easiest to write when the brand is still young. Documenting it now means the next person doesn’t have to guess how to animate the brand."),
    ],
  },
];
