import { getCollection } from 'astro:content';
import type { L10n } from '../data/types.ts';

/** guide slugs grouped by translation key — only guides that exist in both languages are routed bilingually */
export async function guideSlugs(): Promise<L10n[]> {
  const all = await getCollection('guides');
  const keys = [...new Set(all.map((g) => g.data.key))];
  return keys
    .map((k) => {
      const en = all.find((g) => g.data.key === k && g.data.locale === 'en')?.data.slug;
      const ga = all.find((g) => g.data.key === k && g.data.locale === 'ga')?.data.slug;
      return en && ga ? { en, ga } : null;
    })
    .filter((x): x is L10n => x !== null);
}
