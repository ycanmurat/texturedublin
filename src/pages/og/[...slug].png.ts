export const prerender = true;
import { withoutBase } from '../../lib/paths.ts';
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { services } from '../../data/services.ts';
import { areas } from '../../data/areas.ts';
import { site } from '../../config/site.ts';
import { ui } from '../../i18n/ui.ts';
import { href, LOCALES } from '../../lib/routes.ts';
import { fromLabel, leadItem } from '../../lib/pricing.ts';
import { ogPhotoOverlay, ogSvg, type OgInput } from '../../lib/og.ts';
import path from 'node:path';

const slugOf = (path: string) => withoutBase(path).replace(/^\/|\/$/g, '');

export const getStaticPaths = (async () => {
  const out: Array<{ params: { slug: string }; props: OgInput & { photo?: string } }> = [];
  const host = site.url.replace(/^https?:\/\//, '');
  const guides = await getCollection('guides');
  for (const l of LOCALES) {
    const t = ui[l];
    const cta = t.wa.ctaLong;
    for (const s of services) {
      out.push({
        params: { slug: slugOf(href(l, 'service', { service: s.id })) },
        props: { eyebrow: `${s.category === 'woodworks' ? t.nav.woodworks : t.nav.signage} · ${l === 'en' ? 'Dublin' : 'Baile Átha Cliath'}`, title: s.headline[l], price: l === 'en' ? 'Enquire with Ali Onder' : 'Fiosraigh le Ali Onder', cta, url: host },
      });
    }
    const W = services.find((x) => x.id === 'fitted-wardrobes')!;
    for (const a of areas) {
      out.push({
        params: { slug: slugOf(href(l, 'area', { area: a.id })) },
        props: {
          eyebrow: `${a.postal} · ${t.common.zone} ${a.zone}`,
          title: l === 'en' ? `Carpenter & sign maker in ${a.name.en}` : `${t.area.titleA} ${a.inGa}`,
          price: l === 'en' ? 'Furniture & signage · made to order' : 'Troscán agus comharthaíocht',
          cta,
          url: host,
        },
      });
    }
    for (const g of guides.filter((x) => x.data.locale === l)) {
      out.push({
        params: { slug: slugOf(href(l, 'guide', { guide: { en: g.data.slug, ga: g.data.slug } })) },
        props: { eyebrow: t.guides.title, title: g.data.title, cta, url: host, ...(g.data.cover ? { photo: path.join(process.cwd(), 'src/assets/blog', g.data.cover) } : {}) },
      });
    }
  }
  return out;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const o = props as OgInput & { photo?: string };
  const png = o.photo
    ? await sharp(o.photo).resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention }).composite([{ input: Buffer.from(ogPhotoOverlay(o)) }]).png({ compressionLevel: 9 }).toBuffer()
    : await sharp(Buffer.from(ogSvg(o))).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
