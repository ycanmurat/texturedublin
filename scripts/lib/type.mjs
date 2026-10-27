// Text -> SVG path helpers (opentype.js) so exported artwork never depends on
// installed fonts.
import opentype from 'opentype.js';
import fs from 'node:fs';

const files = {
  poppins300: 'node_modules/@fontsource/poppins/files/poppins-latin-300-normal.woff',
  poppins400: 'node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff',
  jost300: 'node_modules/@fontsource/jost/files/jost-latin-300-normal.woff',
  jost400: 'node_modules/@fontsource/jost/files/jost-latin-400-normal.woff',
  jost500: 'node_modules/@fontsource/jost/files/jost-latin-500-normal.woff',
  fraunces300: 'node_modules/@fontsource/fraunces/files/fraunces-latin-300-normal.woff',
  fraunces400: 'node_modules/@fontsource/fraunces/files/fraunces-latin-400-normal.woff',
  fraunces400i: 'node_modules/@fontsource/fraunces/files/fraunces-latin-400-italic.woff',
  fraunces300i: 'node_modules/@fontsource/fraunces/files/fraunces-latin-300-italic.woff',
};

const cache = new Map();
export function font(name) {
  if (!cache.has(name)) {
    const b = fs.readFileSync(files[name]);
    cache.set(name, opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)));
  }
  return cache.get(name);
}

export const capHeight = (fnt) => (fnt.tables.os2?.sCapHeight || fnt.unitsPerEm * 0.7) / fnt.unitsPerEm;
export const xHeight = (fnt) => (fnt.tables.os2?.sxHeight || fnt.unitsPerEm * 0.5) / fnt.unitsPerEm;

/** lay glyphs out with kerning + tracking (tracking in em) */
export function shape(fnt, text, size, { tracking = 0 } = {}) {
  const scale = size / fnt.unitsPerEm;
  const glyphs = [];
  let x = 0;
  let prev = null;
  for (const ch of [...text]) {
    const g = fnt.charToGlyph(ch);
    if (prev) {
      // some fonts return NaN for pairs without a kerning entry
      const k = fnt.getKerningValue(prev, g);
      if (Number.isFinite(k)) x += k * scale;
    }
    glyphs.push({ g, x, ch });
    x += g.advanceWidth * scale + tracking * size;
    prev = g;
  }
  const width = glyphs.length ? x - tracking * size : 0;
  return { glyphs, width };
}

export function measure(fnt, text, size, opts) {
  return shape(fnt, text, size, opts).width;
}

/** path data for a single line. align: 'start' | 'middle' | 'end' */
export function textPath(fnt, text, x, y, size, { tracking = 0, align = 'start' } = {}) {
  const { glyphs, width } = shape(fnt, text, size, { tracking });
  const ox = align === 'middle' ? x - width / 2 : align === 'end' ? x - width : x;
  let d = '';
  for (const { g, x: gx } of glyphs) d += g.getPath(ox + gx, y, size).toPathData(2);
  return { d, width, x: ox };
}

/** tracking (em) that makes `text` exactly `target` wide */
export function fitTracking(fnt, text, size, target) {
  const natural = measure(fnt, text, size);
  const gaps = Math.max(1, [...text].length - 1);
  return (target - natural) / (gaps * size);
}

/** greedy word wrap */
export function wrap(fnt, text, size, maxWidth, opts = {}) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (measure(fnt, t, size, opts) > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}
