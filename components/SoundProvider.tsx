"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SoundCtx = {
  enabled: boolean;
  toggle: () => void;
};

const Ctx = createContext<SoundCtx | null>(null);

export function useSound() {
  return useContext(Ctx);
}

/* ----------------------------------------------------------------------------
   Hover SFX mapping. To reassign a sound to a role, just change the path.
   - project : hovering a project (elements marked data-sfx="project")
   - other   : hovering any other link / button / [data-sfx] element
---------------------------------------------------------------------------- */
const AMBIENT_SRC = "/sounds/ambient.mp3";
const HOVER_PROJECT_SRC = "/sounds/sound-effect-5.mp3";
const HOVER_OTHER_SRC = "/sounds/sound-effect-6.mp3";

type Engine = {
  ambient: HTMLAudioElement;
  projectPool: HTMLAudioElement[];
  otherPool: HTMLAudioElement[];
  projectIdx: number;
  otherIdx: number;
  enabled: boolean;
};

/**
 * ONE engine for the whole app lifetime. Kept at module scope (not per React
 * mount) so remounting the provider — e.g. switching locale — never spawns a
 * second, orphaned ambient element. Because there is only ever one ambient
 * audio object, turning sound off always pauses the exact thing that's playing.
 */
let engine: Engine | null = null;

function getEngine(): Engine | null {
  if (typeof window === "undefined") return null;
  if (!engine) {
    const ambient = new Audio(AMBIENT_SRC);
    ambient.loop = true;
    ambient.volume = 0.3;
    ambient.preload = "auto";

    const makePool = (src: string, volume: number) =>
      Array.from({ length: 4 }, () => {
        const a = new Audio(src);
        a.volume = volume;
        a.preload = "auto";
        return a;
      });

    engine = {
      ambient,
      projectPool: makePool(HOVER_PROJECT_SRC, 0.55),
      otherPool: makePool(HOVER_OTHER_SRC, 0.45),
      projectIdx: 0,
      otherIdx: 0,
      enabled: false,
    };

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __ambient?: HTMLAudioElement }).__ambient = ambient;
    }
  }
  return engine;
}

// Best-effort: silence + drop the engine before a dev hot-module swap, so
// Fast Refresh never leaves an orphaned loop playing. No-op in production.
type HotModule = { hot?: { dispose: (cb: () => void) => void } };
if (
  typeof module !== "undefined" &&
  (module as unknown as HotModule).hot
) {
  (module as unknown as Required<HotModule>).hot.dispose(() => {
    if (!engine) return;
    engine.ambient.pause();
    engine.projectPool.forEach((a) => a.pause());
    engine.otherPool.forEach((a) => a.pause());
    engine = null;
  });
}

export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const eng = getEngine();
  const [enabled, setEnabled] = useState<boolean>(() => eng?.enabled ?? false);
  const lastHovered = useRef<Element | null>(null);

  // Single source of truth: play when enabled, pause when not.
  useEffect(() => {
    if (!eng) return;
    eng.enabled = enabled;
    if (enabled) {
      void eng.ambient.play().catch(() => {});
    } else {
      eng.ambient.pause();
    }
  }, [enabled, eng]);

  const playHover = useCallback(
    (isProject: boolean) => {
      if (!eng || !eng.enabled) return;
      const pool = isProject ? eng.projectPool : eng.otherPool;
      const idx = isProject ? eng.projectIdx : eng.otherIdx;
      const a = pool[idx % pool.length];
      if (isProject) eng.projectIdx += 1;
      else eng.otherIdx += 1;
      try {
        a.currentTime = 0;
        void a.play().catch(() => {});
      } catch {
        /* no-op */
      }
    },
    [eng]
  );

  // Site-wide hover blip on interactive elements.
  useEffect(() => {
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(
        "a,button,[data-sfx]"
      );
      if (el && el !== lastHovered.current) {
        lastHovered.current = el;
        playHover(!!el.closest('[data-sfx="project"]'));
      } else if (!el) {
        lastHovered.current = null;
      }
    };
    window.addEventListener("pointerover", onOver);
    return () => window.removeEventListener("pointerover", onOver);
  }, [playHover]);

  const toggle = useCallback(() => setEnabled((e) => !e), []);

  return <Ctx.Provider value={{ enabled, toggle }}>{children}</Ctx.Provider>;
}
