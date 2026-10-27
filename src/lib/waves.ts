import { smoothPath } from '../brand/mark.mjs';

/** wood-grain wave lines for decorative backgrounds (server-rendered SVG paths) */
export function waveField(w: number, h: number, { count = 14, amp = 22, wave = 520, seed = 0.6, step: xStep = 80 } = {}) {
  const out: string[] = [];
  const step = h / (count - 1);
  for (let i = -1; i <= count; i++) {
    const y0 = i * step;
    const ph = seed + i * 0.27;
    const a = amp * (0.8 + 0.3 * Math.sin(i * 0.8));
    const pts: Array<[number, number]> = [];
    for (let x = -xStep; x <= w + xStep; x += xStep) {
      const t = x / wave;
      pts.push([x, y0 + a * Math.sin(t * Math.PI * 2 + ph) + a * 0.25 * Math.sin(t * Math.PI * 4.4 + ph * 1.6)]);
    }
    out.push(smoothPath(pts));
  }
  return out;
}
