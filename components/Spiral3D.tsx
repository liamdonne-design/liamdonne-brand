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
    float ang = uTwist * p.y;
    float s = sin(ang);
    float c = cos(ang);
    p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
    p.z -= uBend * p.x * p.x; // cylindrical wrap
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

// Sharp by default; blurs when uBlur > 0 (used for rear-facing cards).
const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uOpacity;
  uniform float uRadius;
  uniform float uBlur;
  varying vec2 vUv;
  float rr(vec2 uv, float r) {
    vec2 q = abs(uv - 0.5) - (0.5 - r);
    float d = length(max(q, 0.0)) - r;
    return 1.0 - smoothstep(0.0, 0.006, d);
  }
  void main() {
    vec3 col;
    if (uBlur > 0.0002) {
      vec3 acc = vec3(0.0);
      for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
          acc += texture2D(uTex, vUv + vec2(float(x), float(y)) * uBlur).rgb;
        }
      }
      col = acc / 25.0;
    } else {
      col = texture2D(uTex, vUv).rgb;
    }
    float a = rr(vUv, uRadius) * uOpacity;
    if (a <= 0.001) discard;
    gl_FragColor = vec4(col, a);
  }
`;

/* -------------------------------------------------------------- geometry cfg */
const N = 6; // one strand, one card per project (no repeats)
const R = 2.2; // orbit radius (tighter → cards closer)
const HEIGHT = 7; // vertical span of the helix (less spacing)
const TURNS = 2; // EVEN → highlight card lands dead-centre
const AUTO_SPEED = 0.015; // very slow, gentle idle drift (~65s per loop)
const MAX_BLUR = 0.01; // blur at the edges (far from centre)
const MIN_OPACITY = 0.12; // opacity at the edges (far from centre)
const CARD_W = 2.4;
const CARD_H = 1.45;

function makeMaterial(tex: THREE.Texture | null) {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: true,
    side: THREE.DoubleSide, // show the back when a card orbits behind
    uniforms: {
      uTex: { value: tex },
      uOpacity: { value: 1 },
      uBend: { value: 0.28 },
      uTwist: { value: 0.06 },
      uRadius: { value: 0.06 },
      uBlur: { value: 0 },
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

/* --------------------------------------------------------------- the strand */
function Spiral({
  items,
  textures,
  progressRef,
  onSelect,
}: {
  items: LandingItem[];
  textures: (THREE.Texture | null)[];
  progressRef: React.RefObject<number>;
  onSelect: (it: LandingItem) => void;
}) {
  const geo = useMemo(
    () => new THREE.PlaneGeometry(CARD_W, CARD_H, 40, 24),
    []
  );
  const mats = useMemo(
    () =>
      Array.from({ length: N }, (_, i) =>
        makeMaterial(textures[i % Math.max(1, items.length)] ?? null)
      ),
    [textures, items.length]
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const prog = progressRef.current ?? 0;
    for (let i = 0; i < N; i++) {
      const m = refs.current[i];
      if (!m) continue;
      const u = (((i / N + prog) % 1) + 1) % 1;
      const theta = -u * Math.PI * 2 * TURNS; // left-handed circular helix
      const y = (0.5 - u) * HEIGHT;
      m.position.set(Math.sin(theta) * R, y, Math.cos(theta) * R);
      m.rotation.set(0, theta, 0); // face outward
      m.renderOrder = Math.round(Math.cos(theta) * 100);
      // progressive: sharpest + fully opaque at centre (u=0.5),
      // blurrier + more transparent the further a card drifts away
      const t = Math.min(1, 2 * Math.abs(u - 0.5));
      const mat = mats[i];
      if (mat) {
        mat.uniforms.uBlur.value = t * MAX_BLUR;
        mat.uniforms.uOpacity.value = 1 - t * (1 - MIN_OPACITY);
      }
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
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onSelect(items[i % Math.max(1, items.length)]);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
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
      targetRef.current += e.deltaY * 0.0007;
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
      targetRef.current -= dy * 0.0015;
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

  useFrame((_, delta) => {
    // continuous, very gentle idle drift; scroll/drag adds on top
    targetRef.current += Math.min(delta, 0.05) * AUTO_SPEED;
    progressRef.current += (targetRef.current - progressRef.current) * 0.06;
  });

  const onSelect = (it: LandingItem) => {
    if (movedRef.current > 8) return; // ignore drags
    router.push(`/work/${it.slug}`);
  };

  return (
    <Spiral
      items={items}
      textures={textures}
      progressRef={progressRef}
      onSelect={onSelect}
    />
  );
}

export default function Spiral3D({ items }: { items: LandingItem[] }) {
  const textures = useCovers(items);
  return (
    <div className="absolute inset-0 z-10 touch-none select-none">
      <Canvas
        camera={{ position: [0, 0, 6.3], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene items={items} textures={textures} />
      </Canvas>
    </div>
  );
}
