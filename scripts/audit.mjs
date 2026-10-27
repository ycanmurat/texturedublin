/**
 * SEO audit of the built site (run after `npm run build`):
 *   npm run audit
 * Checks every page for title/description/canonical/hreflang/H1/JSON-LD,
 * duplicate titles & descriptions, broken internal links and missing OG images.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '../dist');
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.html')) files.push(p);
  }
})(DIST);

const home = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const homeCanonical = home.match(/<link rel="canonical" href="([^"]*)"/)[1];
const origin = new URL(homeCanonical).origin;
const base = new URL(homeCanonical).pathname.replace(/\/$/, '');
const stripBase = (url) => base && url.startsWith(`${base}/`) ? url.slice(base.length) : url;
const exists = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean) return true;
  const p = path.join(DIST, decodeURI(stripBase(clean)));
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html')));
};

const problems = [];
const titles = new Map();
const descs = new Map();
let links = 0;
let ldBlocks = 0;
for (const f of files) {
  const rel = '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  if (rel === '/404.html') continue;
  const h = fs.readFileSync(f, 'utf8');
  const decode = (v) => v && v.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const get = (re) => decode((h.match(re) || [])[1]);
  const title = get(/<title>([^<]*)<\/title>/);
  const desc = get(/<meta name="description" content="([^"]*)"/);
  const canon = get(/<link rel="canonical" href="([^"]*)"/);
  const h1s = (h.match(/<h1[\s>]/g) || []).length;
  const hreflangs = (h.match(/hreflang="(en-IE|ga-IE|x-default)"/g) || []).length;
  const og = get(/<meta property="og:image" content="([^"]*)"/);
  if (!title) problems.push([rel, 'missing <title>']);
  else {
    if (title.length > 70) problems.push([rel, `long title (${title.length})`]);
    titles.set(title, [...(titles.get(title) || []), rel]);
  }
  if (!desc) problems.push([rel, 'missing meta description']);
  else {
    if (desc.length > 165 || desc.length < 70) problems.push([rel, `description length ${desc.length}`]);
    descs.set(desc, [...(descs.get(desc) || []), rel]);
  }
  if (!canon || canon !== `${origin}${base}${rel}`) problems.push([rel, `canonical mismatch ${canon}`]);
  if (h1s !== 1) problems.push([rel, `${h1s} <h1>`]);
  if (hreflangs < 3 && !h.includes('noindex')) problems.push([rel, `hreflang tags: ${hreflangs}`]);
  if (!og) problems.push([rel, 'missing og image']);
  if (og) {
    const ogPath = og.replace(/^https?:\/\/[^/]+/, '');
    if (!exists(ogPath)) problems.push([rel, `missing og image ${ogPath}`]);
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    ldBlocks++;
    try {
      JSON.parse(m[1]);
    } catch (e) {
      problems.push([rel, 'invalid JSON-LD']);
    }
  }
  for (const m of h.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const u = m[1];
    if (u.startsWith('//')) continue;
    links++;
    if (base && !u.startsWith(`${base}/`)) problems.push([rel, `asset/link escapes base path ${u}`]);
    if (!exists(u)) problems.push([rel, `broken link ${u}`]);
  }
}
for (const [t, pages] of titles) if (pages.length > 1) problems.push([pages.join(', '), `duplicate title "${t}"`]);
for (const [d, pages] of descs) if (pages.length > 1) problems.push([pages.slice(0, 3).join(', ') + (pages.length > 3 ? ` +${pages.length - 3}` : ''), `duplicate description "${d.slice(0, 60)}…"`]);

const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (locations.length !== files.length - 1) problems.push(['sitemap.xml', 'page count mismatch']);
for (const location of locations) {
  const url = new URL(location);
  if (url.origin !== origin || !exists(url.pathname)) problems.push(['sitemap.xml', `invalid location ${location}`]);
}
const manifest = JSON.parse(fs.readFileSync(path.join(DIST, 'site.webmanifest'), 'utf8'));
if (manifest.start_url !== `${base}/` || manifest.scope !== `${base}/`) problems.push(['site.webmanifest', 'base path mismatch']);
for (const icon of manifest.icons) if (!exists(icon.src)) problems.push(['site.webmanifest', `missing icon ${icon.src}`]);
console.log(`Pages: ${files.length} · internal links checked: ${links} · JSON-LD blocks: ${ldBlocks}`);
if (!problems.length) console.log('✓ No problems found');
else {
  const byType = {};
  for (const [, msg] of problems) {
    const k = msg.replace(/[\d"(].*$/, '').trim();
    byType[k] = (byType[k] || 0) + 1;
  }
  console.log('Problems by type:', byType);
  for (const p of problems.slice(0, 40)) console.log(' -', p[0], '→', p[1]);
  process.exitCode = 1;
}
