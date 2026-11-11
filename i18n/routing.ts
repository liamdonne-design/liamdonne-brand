import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  // the site is in English: its pages live at the root (liamdonne.com,
  // /work, /about…), no /en prefix; no redirect from the browser language
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
