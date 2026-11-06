import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { experience } from "@/content/about";
import { t } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "iconsax-react";
import LitText, { type LitRun } from "@/components/LitText";
import ToolsDeck from "@/components/ToolsDeck";

// Intro (Figma "Info"): all grey, letters darken near the cursor (as the
// Playground intro lights up).
const GREY: [number, number, number] = [153, 153, 153];
const INK: [number, number, number] = [0, 0, 0];
const INTRO: LitRun[][] = [
  [
    {
      text: "I’m a Franco-British brand designer working at the intersection of strategy, visual design, and storytelling, with a strong focus on health and tech products. ",
      strong: true,
    },
    {
      text: "I design brand identities and visual systems that help complex platforms feel clear, credible, and human by aligning visual language, tone, and motion across touchpoints.",
    },
  ],
  [
    {
      text: "My work blends strong conceptual thinking with hands-on execution, from defining brand systems to shipping campaigns, motion assets, and digital content at scale.",
    },
  ],
];

// Figures Liam has confirmed — nothing invented.
const NUMBERS = [
  { value: "6+", label: "years experience in design" },
  { value: "30+", label: "clients worked with" },
  { value: "70+", label: "projects delivered" },
];

// What I bring, each backed by a case study on the site.
const FOCUS = [
  {
    title: "Health brands people trust",
    body: "From founding Cuidam’s identity from zero to branding MedGPT, a medical AI assistant, to feel rigorous, sovereign and trustworthy.",
    href: "/work/synapse-medgpt-branding",
  },
  {
    title: "Systems across every touchpoint",
    body: "Sole brand designer on the Synapse Medicine refresh: routes, product-brand architecture, one colour per product suite.",
    href: "/work/synapse-corporate-refresh",
  },
  {
    title: "Motion as part of the brand",
    body: "A living motion language for a medical AI platform, so the brand moves the same way across video and social.",
    href: "/work/synapse-motion-identity",
  },
  {
    title: "Design that scales without me",
    body: "Self-service tools (a slide template built with Claude artifacts, an email-signature generator) so the whole company ships on-brand.",
    href: "/work/synapse-corporate-refresh",
  },
  {
    title: "From screen to stage",
    body: "Event identities that carry a brand into the room, from invite to stage.",
    href: "/work/synapse-manifestation-event",
  },
];

// What I do, then how AI fits into it: a teammate, not a replacement.
const CAPABILITIES = [
  "Now that anyone can make an image in seconds, the designer’s job is less about making and more about deciding: what’s worth saying, what fits the brand, what earns trust and what quietly breaks it. That judgment is the part of the work I protect.",
  "AI is my everyday sparring partner. I start from my own idea, then I might use Midjourney to explore wider and Claude to challenge my thinking, prototype a tool or turn a brand into a system the whole team can use. It handles the repetitive. I keep the concept.",
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

/** Info (Figma "Info"): portrait + intro, then numbers, focus, experience, capabilities. */
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
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-10">
          {NUMBERS.map((n) => (
            <div key={n.label} className="text-center">
              <p className="font-mono text-[80px] leading-none tracking-[-0.04em] sm:text-[96px]">{n.value}</p>
              <p className="mx-auto mt-3 max-w-[18ch] font-mono text-[12px] leading-[1.3] text-[#999]">{n.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Focus">
        <ul className="border-t border-black/10!">
          {FOCUS.map((f) => (
            <li key={f.title} className="border-b border-black/10!">
              <Link
                href={f.href}
                className="group grid gap-1 py-5 sm:grid-cols-[240px_1fr] sm:gap-6"
              >
                <span className="text-[17px] font-medium tracking-[-0.02em]">
                  {f.title}{" "}
                  <ArrowRight
                    aria-hidden
                    size={16}
                    color="currentColor"
                    className="inline-block align-[-2px] text-[#999] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <span className="text-[15px] leading-[1.45] text-[#999] transition-colors duration-200 group-hover:text-[#1f1f1f]">
                  {f.body}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        <ul className="border-t border-black/10!">
          {experience.map((e) => (
            <li
              key={e.company}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-0.5 border-b border-black/10! py-4 sm:grid-cols-[1fr_1fr_120px]"
            >
              <span className="text-[17px] font-medium tracking-[-0.02em]">{e.company}</span>
              <span className="order-3 text-left text-[15px] text-[#999] sm:order-none">{t(e.role, locale)}</span>
              <span className="text-right font-mono text-[12px] text-[#999]">
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

      <p className="ui-haze-box mt-24 text-center text-[19px] font-medium leading-[1.3] tracking-[-0.03em] text-[#999] sm:text-[24px]">
        Off-screen, <span className="text-[#1f1f1f]">surfboards and sketchbooks</span>.
      </p>
    </div>
  );
}
