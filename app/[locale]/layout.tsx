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
import Preloader from "@/components/Preloader";
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
      // the preloader script may add a class before React hydrates
      suppressHydrationWarning
    >
      <head>
        {/* first visit: hide the page until the preloader is done (components/Preloader).
            Set before the first paint, so returning visitors never see a flash;
            skipped on the (dark) Playground */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!localStorage.getItem("ld-intro-seen")&&location.pathname.indexOf("/playground")<0)document.documentElement.classList.add("intro-on")}catch(e){}`,

          }}
        />
        <style>{`html.intro-on [data-site]{opacity:0}[data-site]{transition:opacity .5s ease}`}</style>
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          {/* Fluid Functionalism settings (shape, size, icons, reduced motion).
              Light only: no theme provider — the site keeps its own palette. */}
          <FluidRoot>
            <DotField />
            <Preloader />
            {/* the haze halos (::before, wider than their text) and the
                Playground board reach past the screen edge: clip them so the
                page never scrolls sideways. `clip`, not `hidden`, so sticky
                sections keep working (and fixed elements are not clipped). */}
            <div data-site className="flex flex-1 flex-col overflow-x-clip">
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
