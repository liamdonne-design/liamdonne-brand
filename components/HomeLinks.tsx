/** Email · Linkedin · Medium (home footer and site header); underline on hover. */
export default function HomeLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="ui-haze flex">
      {links.map((l) => {
        const external = l.href.startsWith("http");
        return (
          <a
            key={l.label}
            href={l.href || undefined}
            aria-disabled={!l.href || undefined}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="px-2 py-1 font-mono text-[10px] leading-[1.3] text-[var(--ui-fg)] underline decoration-transparent decoration-1 underline-offset-[3px] transition-[text-decoration-color] duration-200 ease-out hover:decoration-current focus-visible:decoration-current"
          >
            {l.label}
          </a>
        );
      })}
    </div>
  );
}
