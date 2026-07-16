import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <div className="font-display text-[28vw] leading-none md:text-[16rem]">
        404
      </div>
      <p className="mono-label mt-4">page not found</p>
      <Link
        href="/"
        className="mt-8 border border-hairline px-5 py-2.5 font-mono text-[12px] transition-colors hover:bg-ink hover:text-paper"
      >
        ← home
      </Link>
    </div>
  );
}
