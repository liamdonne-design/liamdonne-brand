import { getTranslations } from "next-intl/server";
import { contactEmail, socials } from "@/content/about";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-hairline">
      <div className="flex flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <a
            href={`mailto:${contactEmail}`}
            className="font-display text-4xl leading-none transition-opacity hover:opacity-50 md:text-6xl"
          >
            {contactEmail}
          </a>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex gap-5 font-mono text-[12px]">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey-600 transition-colors hover:text-ink"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
          <div className="mono-label">
            {t("built")} · © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
