import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { clients, experience, skills, tools } from "@/content/about";
import { t } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "iconsax-react";
import LitText, { type LitRun } from "@/components/LitText";

// Intro (Figma "Info"): grey that darkens near the cursor; the three phrases
// isolated in Figma stay dark.
const GREY: [number, number, number] = [153, 153, 153];
const INK: [number, number, number] = [31, 31, 31];
const INTRO: LitRun[][] = [
  [
    { text: "I’m a Franco-British " },
    { text: "brand designer", strong: true },
    { text: " working at the intersection of strategy, visual design, and storytelling, with a strong focus on " },
    { text: "health and tech products", strong: true },
    { text: ". " },
    { text: "I design brand identities and visual systems", strong: true },
    { text: " that help complex platforms feel clear, credible, and human by aligning visual language, tone, and motion across touchpoints." },
  ],
  [
    {
      text: "My work blends strong conceptual thinking with hands-on execution, from defining brand systems to shipping campaigns, motion assets, and digital content at scale.",
    },
  ],
];

// Figures Liam has confirmed — nothing invented.
const NUMBERS = [
  { value: "6+", label: "years designing health & tech brands" },
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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-24 w-full">
      <h2 className="mb-8 text-center font-mono text-[12px] leading-[1.3] text-[#999]">{title}</h2>
      {children}
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/home/info.gif" alt="Liam Donne" width={131} height={131} className="size-[110px] mix-blend-multiply sm:size-[131px]" />

      <LitText
        paragraphs={INTRO}
        base={GREY}
        lit={INK}
        strongColor="#1f1f1f"
        className="mt-8 text-center text-[19px] font-medium leading-[1.3] tracking-[-0.03em] sm:text-[24px]"
        paragraphClassName="[&+&]:mt-[1.3em]"
      />

      <Section title="By the numbers">
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-10">
          {NUMBERS.map((n) => (
            <div key={n.label} className="text-center">
              <p className="text-[40px] font-medium leading-none tracking-[-0.04em] sm:text-[48px]">{n.value}</p>
              <p className="mx-auto mt-3 max-w-[18ch] font-mono text-[12px] leading-[1.3] text-[#999]">{n.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Brands I’ve worked with">
        {/* logo wall: grey at rest, the logo's own colours on hover */}
        <ul className="grid grid-cols-2 border-l border-t border-black/10! sm:grid-cols-4">
          {clients.map((c) => (
            <li
              key={c.name}
              className="group flex h-[112px] items-center justify-center border-b border-r border-black/10! bg-white px-6 sm:h-[128px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.name}
                className={`max-h-[48px] max-w-[78%] object-contain opacity-60 grayscale transition-[filter,opacity] duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0 ${
                  c.invert ? "invert" : ""
                }`}
              />
            </li>
          ))}
        </ul>
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

      <Section title="Capabilities">
        <ul className="flex flex-wrap justify-center gap-2">
          {skills.map((s) => (
            <li key={s.en} className="rounded-[6px] bg-[#ebebeb] px-2.5 py-1 text-[14px] leading-[1.3]">
              {t(s, locale)}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tools">
        <p className="text-center text-[17px] leading-[1.6] tracking-[-0.02em] text-[#999]">
          {tools.map((tool, i) => (
            <span key={tool}>
              <span className="text-[#1f1f1f]">{tool}</span>
              {i < tools.length - 1 && " · "}
            </span>
          ))}
        </p>
      </Section>

      <p className="mt-24 text-center text-[19px] font-medium leading-[1.3] tracking-[-0.03em] text-[#999] sm:text-[24px]">
        Off-screen, <span className="text-[#1f1f1f]">surfboards and sketchbooks</span>.
      </p>
    </div>
  );
}
