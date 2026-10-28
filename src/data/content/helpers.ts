import type { ContentSection, FAQ, L10n } from '../types.ts';

/** Long-form service content kept apart from the core service records in services.ts. */
export interface ServiceContent {
  /** one-line descriptor for menus and lists */
  menu: L10n;
  /** meta description for the service page */
  description: L10n;
  /** answers that replace the old price answers, keyed by the English question */
  answers: Record<string, L10n>;
  sections: ContentSection[];
  faqs: FAQ[];
}

export const t = (en: string, ga: string): L10n => ({ en, ga });
export const faq = (qEn: string, qGa: string, aEn: string, aGa: string): FAQ => ({ q: { en: qEn, ga: qGa }, a: { en: aEn, ga: aGa } });
export const sec = (titleEn: string, titleGa: string, en: string[], ga: string[], points?: [string[], string[]]): ContentSection => ({
  title: { en: titleEn, ga: titleGa },
  body: { en, ga },
  ...(points ? { points: { en: points[0], ga: points[1] } } : {}),
});
