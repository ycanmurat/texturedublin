/**
 * Builds the complete Texture Dublin brand kit:
 *   brand-kit/svg      logo lockups (light, dark, black, white; EN + GA; "& CO" alt)
 *   brand-kit/png      high-res PNG exports
 *   brand-kit/social   Instagram / Facebook / LinkedIn / Google Business / WhatsApp
 *   public/            favicon.svg, favicon.ico, apple-touch-icon, PWA icons, og-default
 *   src/brand/wordmark.generated.json   text paths used by the website <Logo />
 *
 * Run: npm run brand
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { markInner, VIEWBOX, smoothPath } from '../src/brand/mark.mjs';
import { font, capHeight, textPath, measure, fitTracking } from './lib/type.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const out = (...p) => path.join(ROOT, ...p);
for (const d of ['brand-kit/svg', 'brand-kit/png', 'brand-kit/social', 'public']) fs.mkdirSync(out(d), { recursive: true });

export const COLORS = {
  ink: '#15120F',
  paper: '#F3EEE6',
  oak: '#C9925A',
  oakDeep: '#8A5A2B',
  walnut: '#4A2F1D',
  moss: '#2F4537',
};

const THEMES = {
  light: { bg: COLORS.paper, ink: COLORS.ink, grain: COLORS.oakDeep, accent: COLORS.oakDeep, sub: '#4A433B' },
  dark: { bg: COLORS.ink, ink: COLORS.paper, grain: COLORS.oak, accent: COLORS.oak, sub: '#CFC6B8' },
  black: { bg: null, ink: '#000000', grain: '#000000', accent: '#000000', sub: '#000000' },
  white: { bg: null, ink: '#FFFFFF', grain: '#FFFFFF', accent: '#FFFFFF', sub: '#FFFFFF' },
};

const TEXT = {
  tagline: { en: 'bespoke wood works and branding', ga: 'obair adhmaid shaincheaptha agus brandáil' },
  services: {
    en: 'Kitchens · Interior Design · Complete Works · Branding',
    ga: 'Cistineacha · Dearadh Intí · Oibreacha Iomlána · Brandáil',
  },
};

const light = font('poppins300');
const regular = font('poppins400');
const CAP = capHeight(light);
const MARK_W = VIEWBOX.w;
const MARK_H = VIEWBOX.h;

/* ------------------------------------------------------------------ text */
function wordmark(name, x, baseline, size, { tracking = 0.1 } = {}) {
  if (name === 'co') {
    const t = textPath(light, 'TEXTURE & CO', x, baseline, size, { tracking });
    return { parts: [{ cls: 'wm-word', d: t.d }], width: t.width };
  }
  const a = textPath(light, 'TEXTURE', x, baseline, size, { tracking });
  const gap = size * 0.52;
  const b = textPath(light, 'DUBLIN', x + a.width + gap, baseline, size, { tracking });
  return { parts: [{ cls: 'wm-word', d: a.d }, { cls: 'wm-accent', d: b.d }], width: a.width + gap + b.width };
}

/** the tagline, tracked out to exactly `width` */
function tagline(lang, x, baseline, width, sizeHint) {
  const txt = TEXT.tagline[lang];
  // choose a size where tracking lands around 0.2em, but never larger than the hint
  const natural1 = measure(regular, txt, 1);
  const gaps = [...txt].length - 1;
  let size = Math.min(sizeHint, width / (natural1 + gaps * 0.2));
  const tracking = fitTracking(regular, txt, size, width);
  const t = textPath(regular, txt, x, baseline, size, { tracking });
  return { d: t.d, size, width: t.width };
}

/* ---------------------------------------------------------------- lockups */
function horizontal({ name = 'dublin', lang = 'en' } = {}) {
  const capH = MARK_H * 0.245;
  const size = capH / CAP;
  const x0 = MARK_W + 46;
  const baseline = MARK_H * 0.765;
  const wm = wordmark(name, x0, baseline, size);
  const tg = tagline(lang, x0 + size * 0.02, MARK_H * 0.972, wm.width, size * 0.36);
  const w = x0 + wm.width + 8;
  return {
    w,
    h: MARK_H,
    mark: { x: 0, y: 0, s: 1 },
    parts: [...wm.parts, { cls: 'wm-tag', d: tg.d }],
  };
}

function stacked({ name = 'dublin', lang = 'en', services = true } = {}) {
  const capH = MARK_H * 0.25;
  const size = capH / CAP;
  const wmWidth = wordmark(name, 0, 0, size).width;
  const W = Math.max(wmWidth, MARK_W) + size * 0.9;
  const cx = W / 2;
  const capTop = MARK_H + MARK_H * 0.16;
  const baseline = capTop + capH;
  const wm = wordmark(name, cx - wmWidth / 2, baseline, size);
  const parts = [...wm.parts];

  // tagline between two rules
  const tagSize = size * 0.31;
  const tagTxt = TEXT.tagline[lang];
  const tagTracking = 0.06;
  const tagW = measure(regular, tagTxt, tagSize, { tracking: tagTracking });
  const tagBase = baseline + size * 0.62;
  const tg = textPath(regular, tagTxt, cx, tagBase, tagSize, { tracking: tagTracking, align: 'middle' });
  parts.push({ cls: 'wm-tag', d: tg.d });
  const ruleY = tagBase - tagSize * 0.3;
  const ruleGap = tagSize * 0.9;
  const ruleLen = Math.max(size * 0.9, (wmWidth * 1.06 - tagW) / 2 - ruleGap);
  const rs = 3.2;
  const r1x = cx - tagW / 2 - ruleGap;
  const r2x = cx + tagW / 2 + ruleGap;
  parts.push({
    cls: 'wm-rule',
    d: `M${(r1x - ruleLen).toFixed(1)} ${(ruleY - rs / 2).toFixed(1)}h${ruleLen.toFixed(1)}v${rs}h-${ruleLen.toFixed(1)}Z` +
      `M${r2x.toFixed(1)} ${(ruleY - rs / 2).toFixed(1)}h${ruleLen.toFixed(1)}v${rs}h-${ruleLen.toFixed(1)}Z`,
  });
  let h = tagBase + tagSize * 0.5;
  if (services) {
    const svTxt = TEXT.services[lang];
    const svSize = tagSize * 0.98;
    const svW = wmWidth * 1.04;
    const tr = Math.max(0.02, fitTracking(regular, svTxt, svSize, svW));
    const sv = textPath(regular, svTxt, cx, tagBase + size * 0.5, svSize, { tracking: Math.min(tr, 0.16), align: 'middle' });
    parts.push({ cls: 'wm-services', d: sv.d });
    h = tagBase + size * 0.5 + svSize * 0.45;
  }
  const W2 = Math.max(W, (ruleLen * 2 + tagW + ruleGap * 2) + 20);
  const shift = (W2 - W) / 2;
  return {
    w: W2,
    h: h + 10,
    mark: { x: cx - MARK_W / 2 + shift, y: 0, s: 1 },
    parts: parts.map((p) => ({ ...p, shift })),
  };
}

/* ---------------------------------------------------------------- render */
function renderLockup(L, theme, { id = 'tdl', pad = 0, width, height } = {}) {
  const T = THEMES[theme];
  const vbW = L.w + pad * 2;
  const vbH = L.h + pad * 2;
  const color = (cls) => (cls === 'wm-accent' ? T.accent : cls === 'wm-tag' || cls === 'wm-services' ? T.sub : cls === 'wm-rule' ? T.grain : T.ink);
  const wh = width ? ` width="${width}" height="${height ?? Math.round((width * vbH) / vbW)}"` : '';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${vbW.toFixed(1)} ${vbH.toFixed(1)}"${wh}>`;
  s += `<title>Texture Dublin</title>`;
  if (T.bg) s += `<rect x="${-pad}" y="${-pad}" width="${vbW.toFixed(1)}" height="${vbH.toFixed(1)}" fill="${T.bg}"/>`;
  s += `<g transform="translate(${(L.mark.x - VIEWBOX.x).toFixed(1)} ${(L.mark.y - VIEWBOX.y).toFixed(1)})">${markInner({ id, ink: T.ink, grain: T.grain })}</g>`;
  for (const p of L.parts) {
    const tr = p.shift ? ` transform="translate(${p.shift.toFixed(1)} 0)"` : '';
    s += `<path${tr} fill="${color(p.cls)}" d="${p.d}"/>`;
  }
  s += `</svg>`;
  return s;
}

function renderMark(theme, { id = 'tdm', detail = 'full', pad = 0, width } = {}) {
  const T = THEMES[theme];
  const vb = `${VIEWBOX.x - pad} ${VIEWBOX.y - pad} ${VIEWBOX.w + pad * 2} ${VIEWBOX.h + pad * 2}`;
  const wh = width ? ` width="${width}" height="${Math.round((width * (VIEWBOX.h + pad * 2)) / (VIEWBOX.w + pad * 2))}"` : '';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${wh}><title>Texture Dublin</title>`;
  if (T.bg) s += `<rect x="${VIEWBOX.x - pad}" y="${VIEWBOX.y - pad}" width="${VIEWBOX.w + pad * 2}" height="${VIEWBOX.h + pad * 2}" fill="${T.bg}"/>`;
  s += markInner({ id, detail, ink: T.ink, grain: T.grain }) + `</svg>`;
  return s;
}

const write = (p, s) => fs.writeFileSync(out(p), s);
const png = (svg, file, w, h) => sharp(Buffer.from(svg), { density: 144 }).resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile(out(file));

/* background grain for social artwork */
function grainField(w, h, { count = 14, color = COLORS.oak, opacity = 0.22, amp = 26, wave = 620, sw = 3, seed = 0.6 } = {}) {
  let s = `<g fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${sw}" stroke-linecap="round">`;
  const step = h / (count - 1);
  for (let i = -1; i <= count; i++) {
    const y0 = i * step;
    const ph = seed + i * 0.27;
    const a = amp * (0.8 + 0.3 * Math.sin(i * 0.8));
    const pts = [];
    for (let x = -40; x <= w + 40; x += 20) {
      const t = x / wave;
      pts.push([x, y0 + a * Math.sin(t * Math.PI * 2 + ph) + a * 0.25 * Math.sin(t * Math.PI * 4.4 + ph * 1.6)]);
    }
    s += `<path d="${smoothPath(pts)}"/>`;
  }
  return s + `</g>`;
}

function placeLockup(L, theme, x, y, scale, id) {
  const T = THEMES[theme];
  const color = (cls) => (cls === 'wm-accent' ? T.accent : cls === 'wm-tag' || cls === 'wm-services' ? T.sub : cls === 'wm-rule' ? T.grain : T.ink);
  let s = `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${scale.toFixed(4)})">`;
  s += `<g transform="translate(${(L.mark.x - VIEWBOX.x).toFixed(1)} ${(L.mark.y - VIEWBOX.y).toFixed(1)})">${markInner({ id, ink: T.ink, grain: T.grain })}</g>`;
  for (const p of L.parts) s += `<path${p.shift ? ` transform="translate(${p.shift.toFixed(1)} 0)"` : ''} fill="${color(p.cls)}" d="${p.d}"/>`;
  return s + `</g>`;
}

function canvas(w, h, theme, inner, grain = true) {
  const T = THEMES[theme];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${T.bg}"/>${grain ? grainField(w, h, { color: T.grain, opacity: theme === 'dark' ? 0.2 : 0.16 }) : ''}${inner}</svg>`;
}

/* ------------------------------------------------------------------ build */
const H = { en: horizontal({ lang: 'en' }), ga: horizontal({ lang: 'ga' }), co: horizontal({ name: 'co', lang: 'en' }) };
const S = { en: stacked({ lang: 'en' }), ga: stacked({ lang: 'ga' }), co: stacked({ name: 'co', lang: 'en' }) };

const jobs = [];
for (const theme of Object.keys(THEMES)) {
  write(`brand-kit/svg/texture-dublin-mark-${theme}.svg`, renderMark(theme, { pad: 20 }));
  write(`brand-kit/svg/texture-dublin-horizontal-${theme}.svg`, renderLockup(H.en, theme, { pad: 30 }));
  write(`brand-kit/svg/texture-dublin-horizontal-ga-${theme}.svg`, renderLockup(H.ga, theme, { pad: 30 }));
  write(`brand-kit/svg/texture-dublin-stacked-${theme}.svg`, renderLockup(S.en, theme, { pad: 40 }));
  write(`brand-kit/svg/texture-dublin-stacked-ga-${theme}.svg`, renderLockup(S.ga, theme, { pad: 40 }));
  write(`brand-kit/svg/texture-and-co-horizontal-${theme}.svg`, renderLockup(H.co, theme, { pad: 30 }));
  write(`brand-kit/svg/texture-and-co-stacked-${theme}.svg`, renderLockup(S.co, theme, { pad: 40 }));
  jobs.push(png(renderMark(theme, { pad: 20, width: 2048 }), `brand-kit/png/texture-dublin-mark-${theme}-2048.png`, 2048));
  jobs.push(png(renderLockup(H.en, theme, { pad: 30, width: 3000 }), `brand-kit/png/texture-dublin-horizontal-${theme}-3000.png`, 3000));
  jobs.push(png(renderLockup(S.en, theme, { pad: 40, width: 2400 }), `brand-kit/png/texture-dublin-stacked-${theme}-2400.png`, 2400));
  jobs.push(png(renderLockup(H.en, theme, { pad: 30, width: 600 }), `brand-kit/png/texture-dublin-email-signature-${theme}-600.png`, 600));
}

/* social */
function avatar(theme, size = 1080) {
  const mW = size * 0.62;
  const sc = mW / VIEWBOX.w;
  const mH = VIEWBOX.h * sc;
  const inner = `<g transform="translate(${((size - mW) / 2 - VIEWBOX.x * sc).toFixed(1)} ${((size - mH) / 2 - VIEWBOX.y * sc).toFixed(1)}) scale(${sc.toFixed(4)})">${markInner({ id: 'av' + theme, ink: THEMES[theme].ink, grain: THEMES[theme].grain })}</g>`;
  return canvas(size, size, theme, inner, false);
}
function wide(theme, w, h, L, scaleOfH = 0.42, id = 'wd') {
  const sc = (h * scaleOfH) / L.h;
  const lw = L.w * sc;
  const lh = L.h * sc;
  return canvas(w, h, theme, placeLockup(L, theme, (w - lw) / 2, (h - lh) / 2, sc, id + theme));
}

for (const theme of ['dark', 'light']) {
  const a = avatar(theme);
  write(`brand-kit/social/profile-${theme}-1080.svg`, a);
  jobs.push(png(a, `brand-kit/social/profile-instagram-facebook-${theme}-1080.png`, 1080, 1080));
  jobs.push(png(avatar(theme, 720), `brand-kit/social/google-business-logo-${theme}-720.png`, 720, 720));
  jobs.push(png(avatar(theme, 640), `brand-kit/social/whatsapp-business-${theme}-640.png`, 640, 640));
  jobs.push(png(wide(theme, 1640, 624, H.en, 0.34), `brand-kit/social/facebook-cover-${theme}-1640x624.png`, 1640, 624));
  jobs.push(png(wide(theme, 1584, 396, H.en, 0.46), `brand-kit/social/linkedin-banner-${theme}-1584x396.png`, 1584, 396));
  jobs.push(png(wide(theme, 1080, 608, S.en, 0.66), `brand-kit/social/google-business-cover-${theme}-1080x608.png`, 1080, 608));
  jobs.push(png(wide(theme, 1080, 1920, S.en, 0.3), `brand-kit/social/instagram-story-${theme}-1080x1920.png`, 1080, 1920));
}
// default Open Graph image (also used as fallback share image)
const og = wide('dark', 1200, 630, S.en, 0.62, 'og');
write('brand-kit/social/og-default-1200x630.svg', og);
jobs.push(png(og, 'public/og-default.png', 1200, 630));
jobs.push(png(wide('dark', 1200, 630, S.ga, 0.62, 'ogga'), 'public/og-default-ga.png', 1200, 630));

/* favicons + PWA icons */
const fav = (() => {
  const T = THEMES.light;
  const D = THEMES.dark;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX.x - 10} ${VIEWBOX.y - 50} ${VIEWBOX.w + 20} ${VIEWBOX.w + 20}">`;
  s += `<style>.mark-frame,.mark-compass{stroke:${T.ink}}.mark-dots{fill:${T.ink}}.mark-grain{stroke:${T.grain}}@media (prefers-color-scheme:dark){.mark-frame,.mark-compass{stroke:${D.ink}}.mark-dots{fill:${D.ink}}.mark-grain{stroke:${D.grain}}}</style>`;
  s += markInner({ id: 'fv', detail: 'simple', ink: T.ink, grain: T.grain }) + `</svg>`;
  return s;
})();
write('public/favicon.svg', fav);

function iconTile(size, padRatio, theme = 'light', detail = 'full') {
  const T = THEMES[theme];
  const inner = size * (1 - padRatio * 2);
  const sc = inner / VIEWBOX.w;
  const mh = VIEWBOX.h * sc;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${T.bg}"/><g transform="translate(${(size * padRatio - VIEWBOX.x * sc).toFixed(2)} ${((size - mh) / 2 - VIEWBOX.y * sc).toFixed(2)}) scale(${sc.toFixed(5)})">${markInner({ id: 'ic' + size + detail, detail, ink: T.ink, grain: T.grain })}</g></svg>`;
}
jobs.push(png(iconTile(180, 0.14), 'public/apple-touch-icon.png', 180, 180));
jobs.push(png(iconTile(192, 0.13), 'public/icon-192.png', 192, 192));
jobs.push(png(iconTile(512, 0.13), 'public/icon-512.png', 512, 512));
jobs.push(png(iconTile(512, 0.22, 'dark'), 'public/icon-maskable-512.png', 512, 512));

await Promise.all(jobs);

// favicon.ico (PNG-in-ICO: 16, 32, 48)
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((sz) => sharp(Buffer.from(iconTile(sz * 8, 0.06, 'light', 'simple'))).resize(sz, sz).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * icoSizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);
let offset = header.length;
icoSizes.forEach((sz, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(sz, e);
  header.writeUInt8(sz, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(icoPngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += icoPngs[i].length;
});
fs.writeFileSync(out('public/favicon.ico'), Buffer.concat([header, ...icoPngs]));

/* data for the website <Logo /> component */
const lean = (d) => d.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1).replace(/\.0$/, ''));
const forSite = (L) => ({
  w: +L.w.toFixed(1),
  h: +L.h.toFixed(1),
  mark: { x: +(L.mark.x - VIEWBOX.x).toFixed(1), y: +(L.mark.y - VIEWBOX.y).toFixed(1) },
  parts: L.parts.map((p) => ({ cls: p.cls, d: lean(p.d), shift: p.shift ? +p.shift.toFixed(1) : 0 })),
});
// compact wordmark for the header: TEXTURE DUBLIN only (no tagline)
const compact = (() => {
  const L = horizontal({ lang: 'en' });
  return { ...L, h: MARK_H, parts: L.parts.filter((p) => p.cls !== 'wm-tag') };
})();
fs.writeFileSync(
  out('src/brand/wordmark.generated.json'),
  JSON.stringify({ horizontal: { en: forSite(H.en), ga: forSite(H.ga) }, compact: forSite(compact), stacked: { en: forSite(S.en), ga: forSite(S.ga) } }),
);

console.log('Brand kit built:', fs.readdirSync(out('brand-kit/svg')).length, 'SVGs,', fs.readdirSync(out('brand-kit/png')).length, 'PNGs,', fs.readdirSync(out('brand-kit/social')).length, 'social files');
