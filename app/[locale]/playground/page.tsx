import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { playground } from "@/content/playground";
import PlaygroundCanvas from "@/components/PlaygroundCanvas";

/** Playground (Figma "Playground"): dark canvas of side-project stickers. */
export default async function Playground({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    // data-dark-page turns the whole page (header + dot field) dark, see globals.css
    <div data-dark-page>
      <PlaygroundCanvas items={playground} />
    </div>
  );
}
