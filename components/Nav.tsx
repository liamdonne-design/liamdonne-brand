import SiteMark from "./SiteMark";
import SiteTabs from "./SiteTabs";

/**
 * Site header for every page but the home (which lays out its own): the
 * signature with the tabs centred under it. Links live in SiteFooter.
 */
export default function Nav() {
  return (
    <header className="relative z-30 px-4 pt-8">
      <SiteMark />
      <div className="mt-[35px] flex justify-center">
        <SiteTabs />
      </div>
    </header>
  );
}
