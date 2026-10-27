/**
 * Texture Dublin — logo mark geometry.
 *
 * A vector re-draw of the supplied "TEXTURE & CO" mark: a timber frame whose
 * right side swells into a circle (the "D"), wood-grain waves, a drafting
 * set square and a pair of dividers (compasses).
 *
 * Shared by the Astro <Logo /> component and scripts/build-brand.mjs so the
 * website and every exported file use exactly the same drawing.
 *
 * All coordinates are in "design units" (DU); the viewBox is computed below.
 */

const f = (n) => (Math.round(n * 10) / 10).toString();

/* ---------- Core geometry ---------------------------------------------- */
export const G = {
  frame: { x0: 40, y0: 42, x1: 565, y1: 632 },
  circle: { cx: 426.6, cy: 363.3, r: 268.7 },
  swoosh: { x: 262 },
  square: { A: [78, 268], B: [78, 598], C: [398, 598], inset: 55 },
  head: [557, 195],
  tipL: [408, 600],
  tipR: [712, 605],
  hingeY: 385,
  stroke: { frame: 13, grain: 8.5, square: 9, compass: 7.5 },
};

export const VIEWBOX = { x: 22, y: 24, w: 706, h: 626 };
export const viewBox = `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`;

const { frame: F, circle: C } = G;

/* ---------- helpers ------------------------------------------------------ */
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);
const norm = (a) => mul(a, 1 / len(a));

/** Catmull-Rom spline through points -> smooth cubic Bézier path data */
export function smoothPath(pts, closed = false) {
  if (pts.length < 2) return '';
  const P = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f(P[1][0])} ${f(P[1][1])}`;
  const end = closed ? P.length - 2 : P.length - 2;
  for (let i = 1; i < end; i++) {
    const p0 = P[i - 1], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] ?? P[i + 1];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? d + 'Z' : d;
}

/** intersection of two infinite lines p1->p2 and p3->p4 */
function intersect(p1, p2, p3, p4) {
  const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
  const a = p1[0] * p2[1] - p1[1] * p2[0];
  const b = p3[0] * p4[1] - p3[1] * p4[0];
  return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
}

/** inset the right-angled set square by distance d (all three sides) */
function insetTriangle(d) {
  const { A, B, Cc = G.square.C } = { ...G.square, Cc: G.square.C };
  // inward normal of the hypotenuse (towards the right angle at B)
  const dir = norm(sub(Cc, A));
  let n = [dir[1], -dir[0]];
  if ((B[0] - A[0]) * n[0] + (B[1] - A[1]) * n[1] < 0) n = mul(n, -1);
  const hA = add(A, mul(n, d)), hC = add(Cc, mul(n, d));
  const vx = B[0] + d; // vertical leg moved right
  const by = B[1] - d; // bottom leg moved up
  const a = intersect(hA, hC, [vx, 0], [vx, 1000]);
  const c = intersect(hA, hC, [0, by], [1000, by]);
  return [a, [vx, by], c];
}

/* ---------- Paths -------------------------------------------------------- */
const top = [C.cx, C.cy - C.r];
const right = [C.cx + C.r, C.cy];
const bottom = [C.cx, C.cy + C.r];
const yOnCircleTop = (x) => C.cy - Math.sqrt(C.r * C.r - (x - C.cx) ** 2);
const yOnCircleBottom = (x) => C.cy + Math.sqrt(C.r * C.r - (x - C.cx) ** 2);
const rightEdgeTop = yOnCircleTop(F.x1);
const rightEdgeBottom = yOnCircleBottom(F.x1);

const swooshStart = [G.swoosh.x, F.y0];
const swoosh = `M${f(swooshStart[0])} ${f(swooshStart[1])}C${f(swooshStart[0] + 62)} ${f(F.y0 + 14)} ${f(top[0] - 78)} ${f(top[1])} ${f(top[0])} ${f(top[1])}`;
const arc = `A${C.r} ${C.r} 0 0 1 ${f(right[0])} ${f(right[1])}A${C.r} ${C.r} 0 0 1 ${f(bottom[0])} ${f(bottom[1])}`;

export const paths = {
  /** the outer frame (top-left part of the "D") */
  frame: `M${F.x1} ${f(rightEdgeTop)}L${F.x1} ${F.y0}L${F.x0} ${F.y0}L${F.x0} ${F.y1}L${f(bottom[0])} ${F.y1}`,
  /** the sweeping grain line that becomes the circle */
  circle: swoosh + arc,
  /** the inner vertical (old right edge of the frame) */
  inner: `M${F.x1} ${f(rightEdgeTop)}L${F.x1} ${f(rightEdgeBottom)}`,
  /** filled region the grain lives in */
  region:
    `M${F.x0} ${F.y0}L${f(swooshStart[0])} ${F.y0}` +
    swoosh.replace(/^M[^C]+/, '') +
    arc +
    `L${F.x0} ${F.y1}Z`,
};

/* wood grain waves */
export function grainLines({ count = 10, from = 96, step = 52, amp = 17, wave = 430 } = {}) {
  const lines = [];
  for (let i = 0; i < count; i++) {
    const y0 = from + i * step;
    const phase = 0.75 + i * 0.24;
    const a = amp * (0.82 + 0.28 * Math.sin(i * 0.9 + 0.4));
    const pts = [];
    for (let x = F.x0 - 20; x <= C.cx + C.r + 40; x += 40) {
      const t = (x - F.x0) / wave;
      const y = y0 + a * Math.sin(t * Math.PI * 2 + phase) + a * 0.22 * Math.sin(t * Math.PI * 4.3 + phase * 1.7);
      pts.push([x, y]);
    }
    lines.push(smoothPath(pts));
  }
  return lines;
}

/* set square */
const tri = [G.square.A, G.square.B, G.square.C];
const triPath = (t) => `M${t.map((p) => `${f(p[0])} ${f(p[1])}`).join('L')}Z`;
const innerTri = insetTriangle(G.square.inset);

function wavyTriangle(d, amp, waves, phase) {
  const t = insetTriangle(d);
  const pts = [];
  for (let e = 0; e < 3; e++) {
    const p = t[e], q = t[(e + 1) % 3];
    const L = len(sub(q, p));
    const dir = norm(sub(q, p));
    const n = [-dir[1], dir[0]];
    const steps = Math.max(5, Math.round(L / 26));
    for (let s = 0; s < steps; s++) {
      const u = s / steps;
      const taper = Math.sin(u * Math.PI); // keep corners crisp
      const w = amp * taper * Math.sin(u * Math.PI * 2 * waves * (L / 300) + phase + e);
      pts.push(add(add(p, mul(dir, u * L)), mul(n, w)));
    }
  }
  return smoothPath(pts, true);
}

/* dividers / compasses */
function leg(tip, halfWidth = 17) {
  const H = G.head;
  const a = norm(sub(tip, H));
  const p = [a[1], -a[0]];
  const base = add(H, mul(a, 22));
  return { a, p, base, poly: [add(base, mul(p, halfWidth)), tip, add(base, mul(p, -halfWidth))] };
}
const legL = leg(G.tipL);
const legR = leg(G.tipR);
const onLeg = (L, tip, t) => add(G.head, mul(sub(tip, G.head), t));
const atY = (tip, y) => {
  const t = (y - G.head[1]) / (tip[1] - G.head[1]);
  return onLeg(null, tip, t);
};

/* ---------- SVG builder -------------------------------------------------- */
/**
 * @param {object} o
 * @param {string} [o.id]        unique id prefix (needed when several marks share a page)
 * @param {'full'|'simple'} [o.detail]  'simple' = favicon-weight drawing
 * @param {string} [o.ink]       colour of frame, tools and outlines
 * @param {string} [o.grain]     colour of the wood grain
 * @param {string} [o.className] extra class names for animation hooks
 */
export function markInner({ id = 'tdm', detail = 'full', ink = 'currentColor', grain = 'currentColor' } = {}) {
  const S = G.stroke;
  const simple = detail === 'simple';
  const k = simple ? 2.3 : 1; // stroke multiplier for tiny sizes
  const grains = simple
    ? grainLines({ count: 4, from: 150, step: 130, amp: 26 })
    : grainLines();

  const mask = `${id}-k`;
  const clip = `${id}-c`;
  const bandClip = `${id}-b`;
  const vb = VIEWBOX;

  const hinge = [F.x1, G.hingeY];
  const barL = atY(G.tipL, G.hingeY);
  const barR = atY(G.tipR, G.hingeY);
  const rivL = onLeg(null, G.tipL, 0.56);
  const rivR = onLeg(null, G.tipR, 0.56);

  const legPoly = (L) => triPath(L.poly);

  let s = '';
  s += `<defs>`;
  s += `<clipPath id="${clip}"><path d="${paths.region}"/></clipPath>`;
  s += `<mask id="${mask}" maskUnits="userSpaceOnUse" x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}">`;
  s += `<rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="#fff"/>`;
  if (!simple) s += `<path d="${triPath(tri)}" fill="#000"/>`;
  s += `<path d="${legPoly(legL)}" fill="#000"/><path d="${legPoly(legR)}" fill="#000"/>`;
  s += `<circle cx="${G.head[0]}" cy="${G.head[1]}" r="${simple ? 40 : 33}" fill="#000"/>`;
  s += `</mask>`;
  if (!simple) {
    s += `<clipPath id="${bandClip}"><path clip-rule="evenodd" fill-rule="evenodd" d="${triPath(tri)}${triPath(innerTri)}"/></clipPath>`;
  }
  s += `</defs>`;

  // Layer 1 — grain + frame (knocked out behind the tools)
  s += `<g mask="url(#${mask})" fill="none" stroke-linecap="round">`;
  s += `<g class="mark-grain" clip-path="url(#${clip})" stroke="${grain}" stroke-width="${S.grain * k}">`;
  for (const d of grains) s += `<path d="${d}" pathLength="1"/>`;
  s += `</g>`;
  s += `<g class="mark-frame" stroke="${ink}" stroke-linecap="butt" stroke-linejoin="miter">`;
  s += `<path d="${paths.frame}" stroke-width="${S.frame * k}" pathLength="1"/>`;
  s += `<path d="${paths.circle}" stroke-width="${S.frame * k}" pathLength="1"/>`;
  if (!simple) s += `<path d="${paths.inner}" stroke-width="${S.grain * 0.85}" pathLength="1"/>`;
  s += `<path d="M${f(barL[0])} ${G.hingeY}L${f(barR[0])} ${G.hingeY}" stroke-width="${S.compass * k}" pathLength="1"/>`;
  s += `</g>`;
  s += `</g>`;

  // Layer 2 — set square
  if (!simple) {
    s += `<g class="mark-square" fill="none" stroke="${ink}" stroke-linejoin="round" stroke-linecap="round">`;
    s += `<g clip-path="url(#${bandClip})" stroke="${grain}" stroke-width="4.6">`;
    s += `<path d="${wavyTriangle(18, 2.6, 2.2, 0.3)}" pathLength="1"/>`;
    s += `<path d="${wavyTriangle(31, 3.6, 2.9, 1.4)}" pathLength="1"/>`;
    s += `<path d="${wavyTriangle(43.5, 2.6, 3.4, 2.6)}" pathLength="1"/>`;
    s += `</g>`;
    s += `<path d="${triPath(tri)}" stroke-width="${S.square}" pathLength="1"/>`;
    s += `<path d="${triPath(innerTri)}" stroke-width="${S.square * 0.78}" pathLength="1"/>`;
    s += `</g>`;
  }

  // Layer 3 — dividers
  s += `<g class="mark-compass" fill="none" stroke="${ink}" stroke-linejoin="round" stroke-width="${S.compass * k}">`;
  // at favicon sizes outlined legs disappear, so they are filled solid
  const legFill = simple ? ` fill="${ink}"` : '';
  s += `<path d="${legPoly(legL)}"${legFill} pathLength="1"/><path d="${legPoly(legR)}"${legFill} pathLength="1"/>`;
  if (!simple) {
    s += `<circle cx="${f(rivL[0])}" cy="${f(rivL[1])}" r="10" stroke-width="5" pathLength="1"/>`;
    s += `<circle cx="${f(rivR[0])}" cy="${f(rivR[1])}" r="10" stroke-width="5" pathLength="1"/>`;
  }
  s += `<circle cx="${G.head[0]}" cy="${G.head[1]}" r="${simple ? 30 : 27}" stroke-width="${simple ? 16 : 9}" pathLength="1"/>`;
  s += `</g>`;
  s += `<g class="mark-dots" fill="${ink}">`;
  if (!simple) s += `<circle cx="${G.head[0]}" cy="${G.head[1]}" r="11.5"/>`;
  s += `<circle cx="${hinge[0]}" cy="${hinge[1]}" r="${simple ? 20 : 13.5}"/>`;
  s += `</g>`;
  return s;
}

export function markSVG(opts = {}) {
  const { width, height, title = 'Texture Dublin', className = '' } = opts;
  const w = width ? ` width="${width}"` : '';
  const h = height ? ` height="${height}"` : '';
  const cls = className ? ` class="${className}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${w}${h}${cls} role="img" aria-label="${title}"><title>${title}</title>${markInner(opts)}</svg>`;
}
