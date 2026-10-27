/** appends the brand when the title stays under ~65 characters */
export const withBrand = (s: string) => (s.length <= 48 ? `${s} | Texture Dublin` : s);

/** first candidate that fits 65 chars (with brand) or 68 (without) */
export function fitTitle(...candidates: string[]) {
  for (const c of candidates) if (c.length + 17 <= 65) return `${c} | Texture Dublin`;
  for (const c of candidates) if (c.length <= 62) return c;
  for (const c of candidates) if (c.length <= 68) return c;
  return candidates[candidates.length - 1].slice(0, 68);
}

/** trims a meta description to ~158 characters on a word boundary */
export function metaDesc(s: string, max = 158) {
  const clean = s.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(' ', max - 1)).replace(/[,;:—–-]\s*$/, '') + '…';
}
