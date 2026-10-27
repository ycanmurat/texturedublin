import { abs } from '../lib/schema.ts';
import type { APIRoute } from 'astro';
import { site } from '../config/site.ts';

export const GET: APIRoute = () =>
  new Response(
    [
      '# Texture Dublin',
      'User-agent: *',
      'Allow: /',
      'Disallow: /404/',
      '',
      '# AI assistants and answer engines are welcome to read our public prices',
      'User-agent: GPTBot',
      'Allow: /',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      'User-agent: ClaudeBot',
      'Allow: /',
      'User-agent: PerplexityBot',
      'Allow: /',
      'User-agent: Google-Extended',
      'Allow: /',
      '',
      `Sitemap: ${abs('/sitemap.xml')}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
