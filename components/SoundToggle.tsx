"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";
import GlitchText from "./GlitchText";

export default function SoundToggle() {
  const sound = useSound();
  const [word, setWord] = useState<"ON" | "OFF">("OFF");
  const [striking, setStriking] = useState(false);
  const first = useRef(true);
  const enabled = sound?.enabled ?? false;

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setWord(enabled ? "ON" : "OFF");
      return;
    }
    // strike the current word, then swap to the new one
    setStriking(true);
    const t = setTimeout(() => {
      setWord(enabled ? "ON" : "OFF");
      setStriking(false);
    }, 450);
    return () => clearTimeout(t);
  }, [enabled]);

  if (!sound) return null;

  return (
    <button
      onClick={sound.toggle}
      data-sfx
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound" : "Unmute ambient sound"}
      className="mono-label fixed bottom-4 right-5 z-40 transition-colors hover:text-ink md:bottom-6 md:right-8"
    >
      <GlitchText text="SOUND" />{" "}
      <span className="relative inline-block">
        {word}
        <span className={`strike-line${striking ? " active" : ""}`} aria-hidden />
      </span>
    </button>
  );
}
