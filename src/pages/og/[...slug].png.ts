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
import { ogSvg, type OgInput } from '../../lib/og.ts';

const slugOf = (path: string) => withoutBase(path).replace(/^\/|\/$/g, '');

export const getStaticPaths = (async () => {
  const out: Array<{ params: { slug: string }; props: OgInput }> = [];
  const host = site.url.replace(/^https?:\/\//, '');
  const guides = await getCollection('guides');
  for (const l of LOCALES) {
    const t = ui[l];
    const cta = t.wa.ctaLong;
    for (const s of services) {
      out.push({
        params: { slug: slugOf(href(l, 'service', { service: s.id })) },
        props: { eyebrow: `${s.category === 'woodworks' ? t.nav.woodworks : t.nav.signage} · ${l === 'en' ? 'Dublin' : 'Baile Átha Cliath'}`, title: s.headline[l], price: fromLabel(l, leadItem(s)), cta, url: host },
      });
    }
    const W = services.find((x) => x.id === 'fitted-wardrobes')!;
    for (const a of areas) {
      out.push({
        params: { slug: slugOf(href(l, 'area', { area: a.id })) },
        props: {
          eyebrow: `${a.postal} · ${t.common.zone} ${a.zone}`,
          title: l === 'en' ? `Carpenter & sign maker in ${a.name.en}` : `${t.area.titleA} ${a.inGa}`,
          price: `${W.name[l]} ${fromLabel(l, leadItem(W), a.zone)}`,
          cta,
          url: host,
        },
      });
    }
    for (const g of guides.filter((x) => x.data.locale === l)) {
      out.push({
        params: { slug: slugOf(href(l, 'guide', { guide: { en: g.data.slug, ga: g.data.slug } })) },
        props: { eyebrow: t.guides.title, title: g.data.title, cta, url: host },
      });
    }
  }
  return out;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await sharp(Buffer.from(ogSvg(props as OgInput))).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
