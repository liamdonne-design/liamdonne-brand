"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import SpiralView from "./SpiralView";
import type { LandingItem } from "./LandingProjects";

// WebGL scene, client-only (three.js is not SSR-friendly).
const Spiral3D = dynamic(() => import("./Spiral3D"), { ssr: false });

class WebGLBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function SpiralStage({ items }: { items: LandingItem[] }) {
  // If WebGL throws (unsupported / context lost), fall back to the CSS spiral.
  return (
    <WebGLBoundary fallback={<SpiralView items={items} />}>
      <Spiral3D items={items} />
    </WebGLBoundary>
  );
}
