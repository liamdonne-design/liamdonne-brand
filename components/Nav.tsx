import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import LocaleSwitcher from "./LocaleSwitcher";
import CommandMenu from "./CommandMenu";

export default async function Nav() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3.5 md:px-10">
        <Logo />

        <div className="flex items-center gap-5 md:gap-8">
          <nav className="hidden items-center gap-6 font-mono text-[12px] md:flex">
            <Link href="/work" className="text-grey-600 transition-colors hover:text-ink">
              {t("work")}
            </Link>
            <Link href="/about" className="text-grey-600 transition-colors hover:text-ink">
              {t("about")}
            </Link>
            <Link href="/contact" className="text-grey-600 transition-colors hover:text-ink">
              {t("contact")}
            </Link>
          </nav>
          <CommandMenu />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
