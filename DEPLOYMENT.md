# Texture Dublin preview deployment

Verified on 27 October 2026 (Europe/Dublin).

- Live preview: https://canmurat.com/texturedublin/
- Public source: https://github.com/ycanmurat/texturedublin
- Deployed application commit: `97d354d40ef720d1e136380285765fc445ebe134`.
- Coolify deployment: https://coolify.hillbilisim.com/project/hw0g00c4k8wg8848ogg8ck8c/environment/jcc8ok008gc8w8o0wkss4o04/application/wapjweqwp4uhnb0ipk6kkx5p/deployment/icanzaofoie5rjjuushxd9bx
- Dockerfile build, port 80, nginx; path prefixes set to **Keep paths as-is**.
- Application is separate from the portfolio applications; no DNS changes were required.

## Verification

- Coolify build and deployment succeeded, including the Docker healthcheck.
- Build audit: 783 HTML pages, 92,076 internal links/resource references, 782 JSON-LD blocks; no problems found. The audit also checks canonical paths, descriptions, titles, H1, hreflang, OG assets, sitemap entries, and manifest paths.
- Live home, contact, service, area, Irish homepage, sitemap, robots, icons and OG image return HTTP 200.
- `/texturedublin` redirects to `/texturedublin/`; an unknown page returns HTTP 404.
- Manifest responds as `application/manifest+json`.
- Live area search works with keyboard selection and its link stays under `/texturedublin/`.
- Mobile menu opens, Escape closes it and restores focus. Representative widths 320, 390 and 768 px show no page overflow; desktop rendering was also checked.
- Contact card icons are 28 × 28 px; inline location icon follows the text size.
- Final live contact browser check recorded no console errors or warnings.
- Canmurat and Yorusun homepage HTML hashes match their pre-deployment baselines.

## Preview limitations

The phone/WhatsApp number is still a placeholder. Preview pages deliberately use `noindex, follow`; GA/GTM/Ads/Meta IDs remain empty. Configure verified business details and the final business domain before enabling indexing. The checks above do not guarantee rankings or a universal SEO score.

The CDN was injecting an email decode script that failed on SVG map anchor objects. This application's nginx uses `Cache-Control: no-transform` to preserve the generated HTML, as documented by Cloudflare: https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/ . The existing domain-wide Cloudflare configuration was left in place.

For future releases, push `main` and redeploy the Texture Dublin application in Coolify. No GitHub webhook or SSH deploy key was added.
