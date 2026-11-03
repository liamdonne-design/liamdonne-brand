"use client";

import { Button } from "@/components/ui/button";
import type { IconComponentProps } from "@/lib/icon-context";

/** Medium's three-ellipse mark, in the text colour. */
function MediumIcon({ size = 16, className }: IconComponentProps) {
  return (
    <svg
      viewBox="0 -55 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M72.2 0c39.88 0 72.2 32.55 72.2 72.7 0 40.15-32.33 72.69-72.2 72.69C32.33 145.39 0 112.84 0 72.7 0 32.55 32.33 0 72.2 0Zm115.3 4.26c19.94 0 36.1 30.64 36.1 68.44 0 37.79-16.16 68.44-36.1 68.44-19.94 0-36.1-30.65-36.1-68.44 0-37.8 16.16-68.44 36.1-68.44Zm55.8 7.13c7.01 0 12.7 27.45 12.7 61.31 0 33.85-5.68 61.31-12.7 61.31-7.01 0-12.69-27.45-12.69-61.31 0-33.86 5.68-61.31 12.69-61.31Z" />
    </svg>
  );
}

/** Ghost "Read the full story" button, opening the project's Medium article. */
export default function MediumButton({ href }: { href: string }) {
  return (
    <span className="ui-haze">
      <Button asChild variant="ghost" leadingIcon={MediumIcon}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          Read the full story
        </a>
      </Button>
    </span>
  );
}
