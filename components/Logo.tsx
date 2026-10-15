import { Link } from "@/i18n/navigation";

/**
 * Logo: the rotating head GIF, looping continuously. multiply melts its white
 * background into the page so only the dithered head shows.
 */
export default function Logo({ size = 70, link = true }: { size?: number; link?: boolean }) {
  const head = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/head.gif"
      alt="Liam Donne"
      width={size}
      height={size}
      draggable={false}
      className="block mix-blend-multiply"
      style={{ width: size, height: size }}
    />
  );
  if (!link) return head;
  return (
    <Link href="/" aria-label="Liam Donne — home" className="block">
      {head}
    </Link>
  );
}
