import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { experience } from "@/content/about";
import { t } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import LitText, { type LitRun } from "@/components/LitText";
import ToolsDeck from "@/components/ToolsDeck";
import OffScreenScroller from "@/components/OffScreenScroller";
import AnimatedNumber from "@/components/AnimatedNumber";

// Intro (Figma "Info"): all grey, letters darken near the cursor (as the
// Playground intro lights up).
const GREY: [number, number, number] = [153, 153, 153];
const INK: [number, number, number] = [0, 0, 0];
const INTRO: LitRun[][] = [
  [
    {
      text: "I’m a Franco-British brand designer working at the intersection of strategy, visual design, and storytelling, with a strong focus on health and tech products.",
      strong: true,
    },
  ],
  // own paragraph: the spacing between paragraphs separates the two sentences
  [
    {
      text: "My work blends strong conceptual thinking with hands-on execution, from defining brand systems to shipping campaigns, motion assets, and digital content at scale.",
    },
  ],
];

// Figures Liam has confirmed — nothing invented.
const NUMBERS = [
  { value: 6, label: "years experience in design" },
  { value: 30, label: "clients worked with" },
  { value: 70, label: "projects delivered" },
];

// What I do, then how AI fits into it: a teammate, not a replacement.
const CAPABILITIES = [
  "Now that anyone can make an image in seconds, the designer’s job is less about making and more about deciding: what’s worth saying, what fits the brand, what earns trust and what quietly breaks it. That judgment is the part of the work I protect.",
  "AI is my everyday sparring partner. I start from my own idea, then I might use Midjourney to explore wider and Claude to challenge my thinking, prototype a tool or turn a brand into a system the whole team can use. It handles the repetitive. I keep the concept.",
];

// Off-screen gallery: surf, Truffe, a sketchbook painting, shaping a board.
const OFF_SCREEN = [
  {
    src: "/info/surf-poster.jpg",
    alt: "Macaronis — A Surfer’s Dream",
    video: "/info/surf.mp4", // 0:27–0:42 of the film, muted
    youtube: "tWyjdlYnAKE",
  },
  {
    src: "/info/truffe.jpg",
    alt: "Truffe, in a sketchbook and in real life",
    video: "/info/truffe.mp4", // the whole clip, cut at 0:16, muted
    pair: "/info/truffe.jpg",
  },
  { src: "/info/sketchbook-1.jpg", alt: "Sketchbook: a painted portrait of Riles" },
  {
    src: "/info/board-poster.jpg",
    alt: "Liam’s Board",
    video: "/info/board.mp4", // 0:51–1:08 of the film, muted
    youtube: "8LqLCdeKbew",
  },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-24 w-full">
      <h2 className="ui-haze mx-auto mb-8 w-fit text-center font-mono text-[12px] leading-[1.3] text-[#999]">{title}</h2>
      {/* page-coloured panel: the dot field stays dark behind the text */}
      <div className="ui-haze-box">{children}</div>
    </section>
  );
}

/** Info (Figma "Info"): portrait + intro, numbers, experience, my job + tools, off-screen. */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto flex w-full max-w-[775px] flex-col items-center px-5 pb-8 pt-16 text-[#1f1f1f]">
      {/* animated GIF: plain img keeps the animation */}
      <div className="ui-haze-box">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/home/info.gif" alt="Liam Donne" width={131} height={131} className="size-[110px] mix-blend-multiply sm:size-[131px]" />
      </div>

      <LitText
        paragraphs={INTRO}
        base={GREY}
        lit={INK}
        strongColor="#1f1f1f"
        className="ui-haze-box mt-8 text-center text-[19px] font-medium leading-[1.3] tracking-[-0.03em] sm:text-[24px]"
        paragraphClassName="[&+&]:mt-[1.3em]"
      />

      <Section title="By the numbers">
        <div className="flex flex-col items-center gap-y-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-16">
          {NUMBERS.map((n) => (
            <div key={n.label} className="text-center">
              <p className="font-mono text-[80px] leading-none tracking-[-0.04em] sm:text-[96px]">
                <AnimatedNumber end={n.value} suffix="+" />
              </p>
              <p className="mx-auto mt-3 max-w-[18ch] font-mono text-[12px] leading-[1.3] text-[#999]">{n.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Experience">
        <ul className="border-t border-black/10!">
          {experience.map((e) => (
            <li key={e.company} className="flex items-center gap-4 border-b border-black/10! py-4">
              {/* logo in a rounded square, as tall as the name + role */}
              <span
                className="flex size-[44px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#f2f2f2]"
                style={e.logo ? { background: e.logo.bg } : undefined}
              >
                {e.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={e.logo.src}
                    alt=""
                    className={e.logo.cover ? "size-full object-cover" : "object-contain"}
                    style={
                      e.logo.cover
                        ? undefined
                        : {
                            width: e.logo.size ?? "60%",
                            height: e.logo.size ?? "60%",
                            filter: e.logo.whiten ? "brightness(0) invert(1)" : undefined,
                          }
                    }
                  />
                ) : (
                  <span className="font-mono text-[11px] text-[#999]">{e.company.slice(0, 2).toUpperCase()}</span>
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-[17px] font-medium leading-[1.25] tracking-[-0.02em]">{e.company}</span>
                <span className="text-[15px] leading-[1.25] text-[#999]">{t(e.role, locale)}</span>
              </span>
              <span className="shrink-0 text-right font-mono text-[12px] text-[#999]">
                {e.start} — {e.end ? t(e.end, locale) : "Present"}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Capabilities + Tools, merged (Figma frames 1321316230 / 31): text left,
          the tools card on the right deals out the tools on click */}
      <section className="mt-24 grid w-[min(1100px,calc(100vw-40px))] items-center gap-12 md:grid-cols-[minmax(0,480px)_minmax(0,560px)] md:justify-between">
        <div className="ui-haze-box text-[19px] font-medium leading-[1.3] tracking-[-0.02em] text-[#999] sm:text-[22px]">
          <h2 className="font-semibold text-[#1f1f1f]">My job as a designer.</h2>
          {CAPABILITIES.map((para) => (
            <p key={para} className="mt-[1.3em]">
              {para}
            </p>
          ))}
        </div>
        <div>
          <ToolsDeck />
        </div>
      </section>

      {/* the title stays pinned above the pictures while they scroll;
          placeholders until the real GIFs / photos land */}
      <div className="mt-24 flex w-full justify-center">
        <OffScreenScroller
          items={OFF_SCREEN}
          title={
            <p className="ui-haze-box mx-auto w-fit text-center text-[19px] font-medium leading-[1.3] tracking-[-0.03em] text-[#999] sm:text-[24px]">
              Off-screen, <span className="text-[#1f1f1f]">I ride surfboards and draw in sketchbooks</span>.
            </p>
          }
        />
      </div>
    </div>
  );
}
