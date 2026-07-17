"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "@/i18n/navigation";
import type { LandingItem } from "./LandingProjects";

/* ------------------------------------------------------------------ shaders */
const VERT = /* glsl */ `
  uniform float uBend;
  uniform float uTwist;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // twist around Y as a function of height
    float ang = uTwist * p.y;
    float s = sin(ang);
    float c = cos(ang);
    p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
    // cylindrical wrap: edges curve back
    p.z -= uBend * p.x * p.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAG_SHARP = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uOpacity;
  uniform float uRadius;
  varying vec2 vUv;
  float rr(vec2 uv, float r) {
    vec2 q = abs(uv - 0.5) - (0.5 - r);
    float d = length(max(q, 0.0)) - r;
    return 1.0 - smoothstep(0.0, 0.006, d);
  }
  void main() {
    vec4 col = texture2D(uTex, vUv);
    float a = rr(vUv, uRadius) * uOpacity;
    if (a <= 0.001) discard;
    gl_FragColor = vec4(col.rgb, a);
  }
`;

const FRAG_BLUR = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uOpacity;
  uniform vec2 uBlur;
  varying vec2 vUv;
  void main() {
    vec3 col = vec3(0.0);
    float tot = 0.0;
    for (int x = -2; x <= 2; x++) {
      for (int y = -2; y <= 2; y++) {
        col += texture2D(uTex, vUv + vec2(float(x), float(y)) * uBlur).rgb;
        tot += 1.0;
      }
    }
    col /= tot;
    gl_FragColor = vec4(col, uOpacity);
  }
`;

/* ------------------------------------------------------------- geometry cfg */
const N = 12; // card instances (covers repeat to fill the infinite loop)
const AMPX = 3.7; // horizontal wave amplitude (wider spiral)
const AMPZ = 1.9; // depth wave amplitude
const HEIGHT = 12; // vertical span → more space between cards + seamless recycle
const TURNS = 1.5;
const MAXROT = 0.6; // max card tilt in radians (keeps cards face-on, not edge-on)
const CARD_W = 2.25;
const CARD_H = 1.3;

function makeMaterial(tex: THREE.Texture | null, mirror: boolean) {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: mirror ? FRAG_BLUR : FRAG_SHARP,
    transparent: true,
    depthWrite: !mirror,
    uniforms: {
      uTex: { value: tex },
      uOpacity: { value: mirror ? 0.32 : 1 },
      uBend: { value: mirror ? 0.5 : 0.28 },
      uTwist: { value: mirror ? 0.6 : 0.06 },
      uRadius: { value: 0.06 },
      uBlur: { value: new THREE.Vector2(0.007, 0.011) },
    },
  });
}

/* --------------------------------------------------------- textures loading */
function useCovers(items: LandingItem[]) {
  const [textures, setTextures] = useState<(THREE.Texture | null)[]>([]);
  useEffect(() => {
    let disposed = false;
    const loader = new THREE.TextureLoader();
    const videos: HTMLVideoElement[] = [];

    const jobs = items.map(
      (it) =>
        new Promise<THREE.Texture | null>((res) => {
          const cover = it.cover;
          if (!cover) return res(null);
          if (cover.type === "video") {
            const v = document.createElement("video");
            v.src = cover.src;
            v.loop = true;
            v.muted = true;
            v.playsInline = true;
            v.crossOrigin = "anonymous";
            v.play().catch(() => {});
            videos.push(v);
            const t = new THREE.VideoTexture(v);
            t.colorSpace = THREE.SRGBColorSpace;
            res(t);
          } else {
            loader.load(
              cover.src,
              (t) => {
                t.colorSpace = THREE.SRGBColorSpace;
                res(t);
              },
              undefined,
              () => res(null)
            );
          }
        })
    );

    Promise.all(jobs).then((tx) => {
      if (!disposed) setTextures(tx);
    });

    return () => {
      disposed = true;
      videos.forEach((v) => {
        v.pause();
        v.removeAttribute("src");
        v.load();
      });
    };
  }, [items]);
  return textures;
}

/* --------------------------------------------------------------- one spiral */
function Spiral({
  items,
  textures,
  progressRef,
  mirror,
  onSelect,
}: {
  items: LandingItem[];
  textures: (THREE.Texture | null)[];
  progressRef: React.RefObject<number>;
  mirror: boolean;
  onSelect: (it: LandingItem) => void;
}) {
  const geo = useMemo(
    () => new THREE.PlaneGeometry(CARD_W, CARD_H, 40, 24),
    []
  );
  const mats = useMemo(
    () =>
      Array.from({ length: N }, (_, i) =>
        makeMaterial(textures[i % Math.max(1, items.length)] ?? null, mirror)
      ),
    [textures, mirror, items.length]
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const prog = progressRef.current ?? 0;
    const dir = mirror ? -1 : 1;
    for (let i = 0; i < N; i++) {
      const m = refs.current[i];
      if (!m) continue;
      const p = (((i / N + prog * dir) % 1) + 1) % 1; // 0..1 looping
      const phase = p * Math.PI * 2 * TURNS;
      const y = (0.5 - p) * HEIGHT;
      const x = Math.sin(phase) * AMPX * (mirror ? 1.5 : 1);
      const z = (Math.cos(phase) - 1) * AMPZ - (mirror ? 2.4 : 0);
      const ry = Math.sin(phase) * MAXROT * (mirror ? 1.7 : 1);
      m.position.set(x, y, z);
      m.rotation.set(
        0,
        ry,
        mirror ? Math.sin(phase * 2 + i) * 0.45 : Math.sin(phase) * 0.08
      );
      m.renderOrder = mirror ? -1 : Math.round(z * 10);
    }
  });

  return (
    <group>
      {Array.from({ length: N }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          geometry={geo}
          material={mats[i]}
          onClick={
            mirror
              ? undefined
              : (e: ThreeEvent<MouseEvent>) => {
                  e.stopPropagation();
                  onSelect(items[i % Math.max(1, items.length)]);
                }
          }
          onPointerOver={
            mirror
              ? undefined
              : () => {
                  document.body.style.cursor = "pointer";
                }
          }
          onPointerOut={
            mirror
              ? undefined
              : () => {
                  document.body.style.cursor = "";
                }
          }
        />
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------- the scene */
function Scene({
  items,
  textures,
}: {
  items: LandingItem[];
  textures: (THREE.Texture | null)[];
}) {
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const movedRef = useRef(0);
  const router = useRouter();

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current += e.deltaY * 0.0009;
    };
    let dragging = false;
    let lastY = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastY = e.clientY;
      movedRef.current = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dy = e.clientY - lastY;
      movedRef.current += Math.abs(dy);
      targetRef.current -= dy * 0.0018;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useFrame(() => {
    progressRef.current += (targetRef.current - progressRef.current) * 0.08;
  });

  const onSelect = (it: LandingItem) => {
    if (movedRef.current > 8) return; // ignore drags
    router.push(`/work/${it.slug}`);
  };

  return (
    <>
      <Spiral
        items={items}
        textures={textures}
        progressRef={progressRef}
        mirror
        onSelect={onSelect}
      />
      <Spiral
        items={items}
        textures={textures}
        progressRef={progressRef}
        mirror={false}
        onSelect={onSelect}
      />
    </>
  );
}

export default function Spiral3D({ items }: { items: LandingItem[] }) {
  const textures = useCovers(items);
  return (
    <div className="absolute inset-0 z-10 touch-none select-none">
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene items={items} textures={textures} />
      </Canvas>
    </div>
  );
}
