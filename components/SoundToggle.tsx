"use client";

import { useSound } from "./SoundProvider";
import { SpeakerIcon } from "./icons";

export default function SoundToggle() {
  const sound = useSound();
  if (!sound) return null;

  return (
    <button
      onClick={sound.toggle}
      data-sfx
      aria-pressed={sound.enabled}
      aria-label={sound.enabled ? "Mute ambient sound" : "Unmute ambient sound"}
      className="fixed bottom-4 right-5 z-40 flex items-center gap-2 text-ink transition-opacity hover:opacity-60 md:bottom-6 md:right-8"
    >
      <SpeakerIcon on={sound.enabled} className="h-3.5 w-3.5" />
      <span className="mono-label">
        {sound.enabled ? "sound on" : "sound off"}
      </span>
    </button>
  );
}
