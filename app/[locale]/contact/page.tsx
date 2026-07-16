import { getTranslations, setRequestLocale } from "next-intl/server";
import { contactEmail, socials } from "@/content/about";
import type { Locale } from "@/i18n/routing";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations("Contact");

  return (
    <div className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden px-5 py-20 md:px-10">
      <div className="mm-grid absolute inset-0 opacity-50" aria-hidden />
      <div className="relative">
        <div className="mono-label mb-6">{tc("title")}</div>
        <a
          href={`mailto:${contactEmail}`}
          className="display-xl block break-words transition-opacity hover:opacity-50"
        >
          {contactEmail}
        </a>
        <p className="mt-8 max-w-md text-lg text-grey-600 md:text-xl">
          {tc("subtitle")}
        </p>

        <div className="mt-12 border-t border-hairline pt-6">
          <div className="mono-label mb-4">{tc("elsewhere")}</div>
          <div className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl transition-opacity hover:opacity-50 md:text-3xl"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
