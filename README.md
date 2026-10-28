# Texture Dublin

English/Irish service website for bespoke furniture, carpentry and signage. The shop, 3D viewer, catalogue database and product administrator have been removed.

- Production domain: https://texturedublin.com/
- Source: https://github.com/ycanmurat/texturedublin
- Former preview: https://canmurat.com/texturedublin/ (redirect after production routing is configured)

## Development and validation

Requires Node 24+. Run `npm ci`, copy `.env.example` to `.env`, then `npm run dev`.

```sh
SITE_URL=https://texturedublin.com BASE_PATH=/ PUBLIC_SITE_PREVIEW=false npm run build
npm run audit
npm run test:tracking
SITE_URL=https://texturedublin.com BASE_PATH=/ PORT=3000 node server.mjs
```

The Dockerfile builds and validates the website, then runs the static file server on port 3000. No administrator credentials or product database are required. Existing persistent volumes can be retained as backups; the application no longer accesses them.

## Content and SEO

Business contact details live in `src/config/site.ts` (public email defaults to info@texturedublin.com; override with `PUBLIC_EMAIL`). Services, local content and bilingual guides live in `src/data/`, `src/views/` and `src/content/`. Long-form service sections, menu descriptors, meta descriptions and service FAQs are in `src/data/content/`; bump `site.updated` when page content changes, because it feeds sitemap `lastmod` and `dateModified`. Canonical, hreflang, Open Graph, JSON-LD, sitemap and robots URLs follow `SITE_URL` and `BASE_PATH`. Keep `PUBLIC_SITE_PREVIEW=true` on any separate preview deployment; production uses `false`.

The audit checks every public page for unique titles/descriptions, H1, canonical, language alternates, structured data, assets, internal links and sitemap coverage. It also tests removed shop/admin/media endpoints, custom 404 behavior and trailing-slash redirects. Only service content remains; references to shop signage and commercial fit-outs describe offered services.

## Measurement

Set `PUBLIC_GA4_ID` as a **build variable** and rebuild. Google tags stay unloaded until the relevant cookie category is accepted in basic consent mode. GA4 events include `whatsapp_click`, `phone_click`, `email_click`, `quote_whatsapp` and `generate_lead`. These measure contact intent; opening WhatsApp does not prove that a message was sent or an order was placed. Analytics receives no quote-form fields; GA4 page URLs exclude query strings and fragments. The direct tag disables Google signals and advertising personalization.

Consent tests run without any requests to Google. They cover rejection, separate category permissions, returning consent, revocation, cookie cleanup and duplicate page views. Settings inside GA4 and Search Console must be configured and verified in the actual Google account; see [DEPLOYMENT.md](DEPLOYMENT.md).

Runtime environment variables must be supplied by the host or exported in the shell; `node server.mjs` does not load `.env` automatically. `SITE_URL` enables canonical-host redirects, and `LEGACY_SITE_URL` optionally redirects the former preview while removing its hosting prefix.
