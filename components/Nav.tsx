import Logo from "./Logo";
import NavToggle from "./NavToggle";

export default function Nav() {
  // Same alignment as the landing corners (logo left, ABOUT/WORK right)
  return (
    <header className="sticky top-0 z-30 bg-paper/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-4 md:px-8 md:py-6">
        <Logo />
        <NavToggle />
      </div>
    </header>
  );
}
