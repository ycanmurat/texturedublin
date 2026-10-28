import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locale = z.enum(['en', 'ga']);

/** blog posts and guides (MDX); covers live in src/assets/blog/ */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    key: z.string(),
    locale,
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    service: z.string().optional(),
    readingMinutes: z.number(),
    category: z.enum(['guide', 'ideas']).default('guide'),
    /** file name in src/assets/blog/ */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** photographer credit for stock photos, e.g. "Luis Redondo / Unsplash" */
    coverCredit: z.string().optional(),
    coverCreditUrl: z.string().url().optional(),
  }),
});

/** privacy, cookies, terms, accessibility */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/legal' }),
  schema: z.object({
    key: z.enum(['privacy', 'cookies', 'terms', 'accessibility']),
    locale,
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { guides, legal };
