# Production launch — texturedublin.com

Prepared 27 October 2026 (Europe/Dublin). This document distinguishes launch configuration from verified external state. Update the verification record after deployment.

## Hosting

Existing Coolify resource: **Texture Dublin Preview**, project **MuratCan**, production environment.

Application: https://coolify.hillbilisim.com/project/hw0g00c4k8wg8848ogg8ck8c/environment/jcc8ok008gc8w8o0wkss4o04/application/wapjweqwp4uhnb0ipk6kkx5p

Use the existing Git source and Dockerfile, port **3000**, healthcheck `/healthz`. Production build variables:

```dotenv
SITE_URL=https://texturedublin.com
BASE_PATH=/
PUBLIC_SITE_PREVIEW=false
PUBLIC_GA4_ID=
PUBLIC_GOOGLE_SITE_VERIFICATION=
```

Supply the actual GA4 measurement ID before the final rebuild. `PUBLIC_` variables are compiled into public assets; changing only runtime variables does not update tracking. The Dockerfile explicitly accepts GA4 and verification build arguments. Runtime `SITE_URL` and `BASE_PATH` must match the build. `LEGACY_SITE_URL=https://canmurat.com/texturedublin` preserves former preview page redirects if that domain/path remains routed to this app.

Add HTTPS domains `texturedublin.com` and `www.texturedublin.com` in Coolify. The application redirects www to the apex domain. Keep paths as-is and ensure the target port is 3000. Coolify manages TLS; do not buy a separate certificate.

## GoDaddy DNS

Read the **actual public IPv4 of the resource server** before editing DNS. The Coolify dashboard can itself be behind a CDN, so its DNS IPs are not reliable origin-server addresses.

- Replace the parked apex A records with the verified origin-server IP.
- Keep/create `www` CNAME to `texturedublin.com`.
- Add the exact Search Console TXT verification token at `@`.
- Preserve unrelated MX/TXT records, nameservers and email settings.
- Use a direct DNS connection to Coolify; GoDaddy URL forwarding is not hosting.

Verify public DNS, HTTPS, canonical-host redirects and deep links after deployment. The former preview must redirect each old page to the same production page, rather than redirecting everything to the homepage. Removed shop pages should return 404.

## Google Analytics 4

Create a dedicated **Texture Dublin** property within the user's intended Analytics account. Use **Ireland / Europe-Dublin** reporting time zone and **EUR**. Create a web data stream for `https://texturedublin.com`.

Recommended setup for this service website:

- Enable useful page, scroll, outbound click and download measurement. Disable automatic form-interaction collection: the quote form contains enquiry details and is already explicitly instrumented.
- Keep Google signals, user-provided data collection and advertising personalization off for this analytics-only launch.
- Set event-data retention to **14 months** to match the existing privacy policy.
- Mark `generate_lead` as a key event; count once per session for reporting contact intent. Channel events remain available for diagnosis.
- Register event-scoped custom dimensions for `method`, `placement`, `service`, `area`, `page_type` and `language` if needed in reports.
- Define internal traffic only after the agency/customer's stable IPs are known; first use testing mode. Do not invent an IP or activate a filter that might remove real visitors.
- Link the verified Search Console property to the production web stream. Publish its report collection if available.
- Verify Realtime/DebugView after accepting analytics cookies, then verify that Reject all sends no analytics and revocation stops custom events.

## Google Search Console

Prefer the **Domain property** `texturedublin.com`, verified using a DNS TXT token so both apex and www are covered. Add the production URL-prefix property if useful for stream linking and URL inspections. Submit `https://texturedublin.com/sitemap.xml` once production is reachable. Inspect the homepage, furniture hub, signage hub and primary service pages; request indexing of the most important pages when live tests pass. Submission does not guarantee or instantly produce indexing.

## Launch evidence

Local production build: **788 public HTML pages**, **91,110 internal link/resource references**, **788 JSON-LD blocks**. Build audit and category-consent tests pass. External publication, DNS, Google IDs and browser/network evidence are recorded below once verified.

## Organic acquisition priorities

Technical setup supports discovery and measurement. The immediate content priorities are verified project photos/case studies, clear service scopes, genuine customer reviews and consistent business name/address/phone across the site and Google Business Profile. Confirm the existing email address and opening hours before launch. Do not publish invented projects, reviews, credentials or guaranteed delivery times.

Focus initial acquisition on fitted wardrobes, bespoke kitchens, built-in units, furniture assembly and signage pages. Use Search Console queries and actual enquiries to decide which services and areas deserve more original content; page count alone is not an organic-growth strategy. Review index coverage and conversion quality after data is available. Do not claim that the launch guarantees rankings or immediate traffic.

References: [GA4 setup](https://support.google.com/analytics/answer/9304153), [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent), [Search Console verification](https://support.google.com/webmasters/answer/9008080), [site move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [Coolify domains](https://coolify.io/docs/core/networking/domains).
