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

export const SITE_URL = "https://www.liamdonne.com";

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
  // shared links (LinkedIn, Slack, mail…) get a title, a line and a picture;
  // pages set their own title ("Work — Liam Donne"), projects their own image
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: "%s — Liam Donne" },
    description: t("description"),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: "Liam Donne",
      title: t("title"),
      description: t("description"),
      url: "/",
      images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: "Liam Donne — Brand & Visual Designer" }],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description"), images: ["/og/default.jpg"] },
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
        {/* home: hide the page until the preloader is done (components/Preloader),
            set before the first paint so nothing flashes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(/^\\/(en\\/?)?$/.test(location.pathname)&&!sessionStorage.getItem("ld-intro-seen"))document.documentElement.classList.add("intro-on")}catch(e){}`,



          }}
        />
        <style>{`[data-site]{transition:opacity .5s ease}html.intro-on [data-site]{opacity:0;transition:none}`}</style>
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
