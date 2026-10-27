import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locale = z.enum(['en', 'ga']);

/** long-form price guides (MDX so live prices can be embedded with <Price />) */
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
