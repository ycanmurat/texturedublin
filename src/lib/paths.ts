/** Keep navigation and public assets inside the configured hosting prefix. */
export const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (basePath && (path === basePath || path.startsWith(`${basePath}/`))) return path;
  return `${basePath}${path}`;
}
export function withoutBase(path: string): string {
  return basePath && (path === basePath || path.startsWith(`${basePath}/`)) ? path.slice(basePath.length) || '/' : path;
}
export const ogPath = (path: string) => withBase(`/og${withoutBase(path).replace(/\/$/, '')}.png`);
