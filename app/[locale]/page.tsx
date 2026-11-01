import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { contactEmail, mediumProfile, socials } from "@/content/about";
import HomeCards, { CompanyTag } from "@/components/HomeCards";
import HomeLinks from "@/components/HomeLinks";
import SiteMark from "@/components/SiteMark";

const linkedin = socials.find((s) => s.label === "LinkedIn")?.href ?? "";

/**
 * Landing page (Figma "Home", 1440×882): signature + place/year on top, a
 * three-line intro, the Work / Playground / Info cards, links at the bottom.
 * The interactive dot field behind comes from the layout.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center px-4 pb-8 pt-8 text-[#1f1f1f]">
      <header>
        <SiteMark />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-[33px] py-12">
        <h1 className="text-center text-[19px] leading-[1.3] tracking-[-0.02em] sm:text-[24px]">
          <span className="font-medium text-[#999]">Hey, my name is</span>{" "}
          <span className="font-semibold">Liam</span>.
          <br />
          <span className="font-medium text-[#999]">I’m currently at</span>{" "}
          <CompanyTag />
          <br />
          <span className="font-medium text-[#999]">working as a</span>{" "}
          <span className="font-semibold">Brand Designer</span>.
        </h1>

        <HomeCards />
      </div>

      <footer>
        <HomeLinks
          links={[
            { label: "Email", href: `mailto:${contactEmail}` },
            { label: "Linkedin", href: linkedin },
            { label: "Medium", href: mediumProfile },
          ]}
        />
      </footer>
    </div>
  );
}
