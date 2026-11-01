import type { CSSProperties } from "react";

// The Playground board: a fixed area larger than the screen, centred on it.
export const BOARD_W = 3000;
export const BOARD_H = 2000;

// Layout unit: positions and sizes are authored on a 1440×900 screen and
// scale with the viewport so the whole composition is on screen at first
// load (≈1300 units of it span the width, so it still fits on a phone).
const U = "min(100vw / 1300, 100vh / 900)";
export const u = (n: number) => `calc(${n} * ${U})`;

/** Absolute position of a centre point, in layout px from the board centre. */
export const at = (x: number, y: number): CSSProperties => ({
  left: `calc(${BOARD_W / 2}px + ${u(x)})`,
  top: `calc(${BOARD_H / 2}px + ${u(y)})`,
});
