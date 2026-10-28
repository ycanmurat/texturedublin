/**
 * Per-page Open Graph images (1200×630), drawn as SVG with all text converted
 * to paths so the build never depends on installed fonts, then rasterised by sharp.
 */
// @ts-ignore — plain JS helpers shared with the brand-kit build script
import { font, capHeight, textPath, wrap } from '../../scripts/lib/type.mjs';
import { markInner, VIEWBOX } from '../brand/mark.mjs';
import wordmark from '../brand/wordmark.generated.json';
import { waveField } from './waves.ts';

const INK = '#15120F';
const PAPER = '#F3EEE6';
const OAK = '#C9925A';

export interface OgInput {
  eyebrow: string;
  title: string;
  price?: string;
  cta: string;
  url: string;
}

export function ogSvg(o: OgInput) {
  const W = 1200;
  const H = 630;
  const serif = font('fraunces400');
  const sans = font('jost400');
  const sansM = font('jost500');
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  s += `<rect width="${W}" height="${H}" fill="${INK}"/>`;
  s += `<g fill="none" stroke="${OAK}" stroke-opacity="0.17" stroke-width="2">${waveField(W, H, { count: 15, amp: 20, wave: 560, seed: 0.9 }).map((d) => `<path d="${d}"/>`).join('')}</g>`;

  // big faint mark on the right
  const bigS = 0.78;
  s += `<g opacity="0.16" transform="translate(${W - VIEWBOX.w * bigS + 70} ${H - VIEWBOX.h * bigS + 40}) scale(${bigS}) translate(${-VIEWBOX.x} ${-VIEWBOX.y})">${markInner({ id: 'ogb', ink: PAPER, grain: OAK })}</g>`;

  // logo lockup top-left
  const L = wordmark.compact;
  const ls = 58 / L.h;
  s += `<g transform="translate(64 56) scale(${ls.toFixed(4)})"><g transform="translate(${L.mark.x} ${L.mark.y})">${markInner({ id: 'ogl', ink: PAPER, grain: OAK })}</g>`;
  for (const p of L.parts) s += `<path fill="${p.cls === 'wm-accent' ? OAK : PAPER}" d="${p.d}"/>`;
  s += `</g>`;

  // eyebrow
  const eb = textPath(sansM, o.eyebrow.toUpperCase(), 66, 224, 21, { tracking: 0.2 });
  s += `<path fill="${OAK}" d="${eb.d}"/>`;

  // title (auto-size to fit 3 lines)
  let size = 76;
  let lines = wrap(serif, o.title, size, 960);
  while (lines.length > 3 && size > 46) {
    size -= 6;
    lines = wrap(serif, o.title, size, 960);
  }
  const lh = size * 1.06;
  const top = 250 + capHeight(serif) * size;
  lines.slice(0, 3).forEach((ln: string, i: number) => {
    s += `<path fill="${PAPER}" d="${textPath(serif, ln, 62, top + i * lh, size).d}"/>`;
  });

  // footer: price pill + CTA
  const fy = 548;
  if (o.price) {
    const pt = textPath(sansM, o.price, 0, 0, 28);
    const pw = pt.width + 56;
    s += `<rect x="64" y="${fy - 44}" width="${pw}" height="62" rx="31" fill="${OAK}"/>`;
    s += `<path fill="${INK}" d="${textPath(sansM, o.price, 92, fy - 3, 28).d}"/>`;
  }
  const ctaT = textPath(sans, o.cta, W - 64, fy - 12, 22, { align: 'end' });
  s += `<path fill="${PAPER}" d="${ctaT.d}"/>`;
  s += `<path fill="${PAPER}" fill-opacity="0.55" d="${textPath(sans, o.url, W - 64, fy + 18, 18, { align: 'end', tracking: 0.04 }).d}"/>`;
  s += `<circle cx="${W - 64 - ctaT.width - 22}" cy="${fy - 19}" r="9" fill="#25D366"/>`;
  s += `</svg>`;
  return s;
}

/** overlay for blog posts with a cover photo: the photo shows through, title sits on a dark gradient */
export function ogPhotoOverlay(o: { eyebrow: string; title: string; url: string }) {
  const W = 1200;
  const H = 630;
  const serif = font('fraunces400');
  const sansM = font('jost500');
  const sans = font('jost400');
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  s += `<defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${INK}" stop-opacity="0.25"/><stop offset="0.45" stop-color="${INK}" stop-opacity="0.35"/><stop offset="1" stop-color="${INK}" stop-opacity="0.92"/></linearGradient></defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#fade)"/>`;
  const L = wordmark.compact;
  const ls = 52 / L.h;
  s += `<g transform="translate(60 48) scale(${ls.toFixed(4)})"><g transform="translate(${L.mark.x} ${L.mark.y})">${markInner({ id: 'ogp', ink: PAPER, grain: OAK })}</g>`;
  for (const p of L.parts) s += `<path fill="${p.cls === 'wm-accent' ? OAK : PAPER}" d="${p.d}"/>`;
  s += `</g>`;
  let size = 62;
  let lines = wrap(serif, o.title, size, 1060);
  while (lines.length > 2 && size > 42) {
    size -= 4;
    lines = wrap(serif, o.title, size, 1060);
  }
  const lh = size * 1.08;
  const last = 560;
  const first = last - (Math.min(lines.length, 2) - 1) * lh;
  s += `<path fill="${OAK}" d="${textPath(sansM, o.eyebrow.toUpperCase(), 62, first - size - 6, 20, { tracking: 0.2 }).d}"/>`;
  lines.slice(0, 2).forEach((ln: string, i: number) => {
    s += `<path fill="${PAPER}" d="${textPath(serif, ln, 60, first + i * lh, size).d}"/>`;
  });
  s += `<path fill="${PAPER}" fill-opacity="0.7" d="${textPath(sans, o.url, W - 60, 76, 20, { align: 'end', tracking: 0.04 }).d}"/>`;
  s += `</svg>`;
  return s;
}
