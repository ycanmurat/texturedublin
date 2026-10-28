import type { ImageMetadata } from 'astro';

/** blog cover photos, looked up by the file name used in post frontmatter */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/blog/*.{jpg,jpeg,png,webp}', { eager: true });

export function cover(name?: string): ImageMetadata | undefined {
  if (!name) return undefined;
  const hit = files[`../assets/blog/${name}`];
  if (!hit) throw new Error(`Missing blog cover src/assets/blog/${name}`);
  return hit.default;
}
