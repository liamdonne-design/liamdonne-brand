import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import ChromeGate from "@/components/ChromeGate";
import DotField from "@/components/DotField";
import { FluidRoot } from "@/components/fluid-root";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          {/* Fluid Functionalism settings (shape, size, icons, reduced motion).
              Light only: no theme provider — the site keeps its own palette. */}
          <FluidRoot>
            <DotField />
            {/* the haze halos (::before, wider than their text) and the
                Playground board reach past the screen edge: clip them so the
                page never scrolls sideways. `clip`, not `hidden`, so sticky
                sections keep working (and fixed elements are not clipped). */}
            <div className="flex flex-1 flex-col overflow-x-clip">
              <ChromeGate nav={<Nav />} footer={<SiteFooter />}>
                <main className="flex-1">{children}</main>
              </ChromeGate>
            </div>
          </FluidRoot>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
