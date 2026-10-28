# Production launch — texturedublin.com

Launched and verified 28 October 2026 (Europe/Dublin). This document records the configuration, completed checks and remaining external processing.

## Hosting

Existing Coolify resource: **Texture Dublin Preview**, project **MuratCan**, production environment.

Application: https://coolify.hillbilisim.com/project/hw0g00c4k8wg8848ogg8ck8c/environment/jcc8ok008gc8w8o0wkss4o04/application/wapjweqwp4uhnb0ipk6kkx5p

Use the existing Git source and Dockerfile, port **3000**, healthcheck `/healthz`. Production build variables:

```dotenv
SITE_URL=https://texturedublin.com
BASE_PATH=/
PUBLIC_SITE_PREVIEW=false
PUBLIC_GA4_ID=G-NWN5EPY7RH
PUBLIC_GOOGLE_SITE_VERIFICATION=
```

`PUBLIC_` variables are compiled into public assets; changing only runtime variables does not update tracking. The Dockerfile explicitly accepts GA4 and verification build arguments. Runtime `SITE_URL` and `BASE_PATH` must match the build. `LEGACY_SITE_URL=https://canmurat.com/texturedublin` supports former preview page redirects. A matching scoped redirect is configured at the front proxy because the portfolio application otherwise takes precedence for that host.

Add HTTPS domains `texturedublin.com` and `www.texturedublin.com` in Coolify. The application redirects www to the apex domain. Keep paths as-is and ensure the target port is 3000. This server has an additional Nginx Proxy Manager in front of Coolify. A public hostname and a matching certificate must also exist there; configuring only Coolify is insufficient.

## DNS (registered at GoDaddy; now hosted on Cloudflare)

Read the **actual public IPv4 of the resource server** before editing DNS. The Coolify dashboard can itself be behind a CDN, so its DNS IPs are not reliable origin-server addresses.

- Replace the parked apex A records with the verified origin-server IP.
- Keep/create `www` CNAME to `texturedublin.com`.
- Add the exact Search Console TXT verification token at `@`.
- Preserve unrelated MX/TXT records, nameservers and email settings.
- DNS is currently proxied through Cloudflare. Keep the encrypted origin connection and configure valid TLS at the front proxy. GoDaddy URL forwarding is not hosting.

Verify public DNS, HTTPS, canonical-host redirects and deep links after deployment. The former preview must redirect each old page to the same production page, rather than redirecting everything to the homepage. Removed shop pages should return 404.

## Google Analytics 4

Create a dedicated **Texture Dublin** property within the user's intended Analytics account. Use **Ireland / Europe-Dublin** reporting time zone and **EUR**. Create a web data stream for `https://texturedublin.com`.

Recommended setup for this service website:

- Enable useful page, scroll, outbound click and download measurement. Disable automatic form-interaction collection: the quote form contains enquiry details and is already explicitly instrumented.
- Keep Google signals, user-provided data collection and advertising personalization off for this analytics-only launch.
- Set event-data retention to **14 months** to match the existing privacy policy.
- Mark `generate_lead` as a key event; count once per session for reporting contact intent. Channel events remain available for diagnosis.
- Registered event-scoped custom dimensions: `method`, `placement`, `service`, `area` and `page_type`. Use GA4's built-in language dimension.
- Define internal traffic only after the agency/customer's stable IPs are known; first use testing mode. Do not invent an IP or activate a filter that might remove real visitors.
- Link the verified Search Console property to the production web stream. Publish its report collection if available.
- Verify Realtime/DebugView after accepting analytics cookies, then verify that Reject all sends no analytics and revocation stops custom events.

## Google Search Console

Prefer the **Domain property** `texturedublin.com`, verified using a DNS TXT token so both apex and www are covered. Add the production URL-prefix property if useful for stream linking and URL inspections. Submit `https://texturedublin.com/sitemap.xml` once production is reachable. Inspect the homepage, furniture hub, signage hub and primary service pages; request indexing of the most important pages when live tests pass. Submission does not guarantee or instantly produce indexing.

## Launch evidence

Local production build: **788 public HTML pages**, **91,110 internal link/resource references**, **788 JSON-LD blocks**. Build audit and category-consent tests pass. External publication, DNS, Google IDs and browser evidence are recorded below.

## Content and navigation update — 28 October 2026

- Services mega menu rebuilt: centred under the header (the old panel was positioned with a `translate` that the CSS minifier dropped, so it ran off-screen), with a one-line descriptor per service instead of "Price on enquiry".
- Opening animation on the home page (first visit per session; skipped for reduced motion and crawlers; tap or key press skips it). Hero scroll cue removed. EN/GA switch is now a two-option toggle.
- Contact email `info@texturedublin.com` is shown site-wide and in structured data. **texturedublin.com had no MX records at the time of this update**, so mail to that address is not delivered until a mail service (for example Cloudflare Email Routing or a hosted mailbox) is configured in DNS.
- Long-form sections and additional FAQs on all 15 service pages, both hub pages and the home page; local FAQs (distance from the Dunboyne workshop, nearby areas, how to get a quote) on every area and area-service page. New area pages: Dunboyne, Clonee, Ratoath, Leixlip.
- Structured data: `HomeAndConstructionBusiness` with email, map link, counties served and `knowsAbout`; service offer catalogues; FAQPage on hub pages; `dateModified` and sitemap `lastmod` from `site.updated`.
- Local production build: **844 public HTML pages**, 104,190 internal link/resource references, 844 JSON-LD blocks, 6,474 FAQ entries. Build audit and consent tests pass.
- Footer credit "Powered by Hill Bilişim" (https://www.hillbilisim.com/) added under the legal links; the footer keeps clear space below for the fixed WhatsApp button.
- Blog: the Guides section became `/blog/` (`/ga/blag/`) with cover photos, photo-based share images and `BlogPosting` structured data; old guide URLs 308 to the same article. Seven new posts in English and Irish (TV walls, fluted media walls, utility storage, fitted vs freestanding wardrobes, kitchen door styles, illuminated signs, new-build checklist). Three cover photos were supplied by the client; four are Unsplash-licensed stock photos credited on each post. Build: 858 pages.
- Follow-up deploys: `a8d1c53` (footer credit) and `3bf6303` (process-step contrast for Lighthouse accessibility; `llms.txt` in llmstxt.org markdown). PageSpeed Insights mobile after the content update: Performance 94, Accessibility 96 (contrast issue since fixed), Best Practices 100, SEO 100; LCP 1.8 s, CLS 0.
- Deployed commit `cb99934` with Coolify deployment `aat7n3lpdjyydcbk7l6kt6m6` (manual redeploy; pushing to `main` does not deploy automatically). Live checks: home, new area and service pages return 200, unknown pages 404, `www` 308 to the apex, sitemap lists 844 URLs with `lastmod`, structured data carries the email and 16 home FAQs, the opening animation and centred menu render in the browser.

## Organic acquisition priorities

Technical setup supports discovery and measurement. The immediate content priorities are verified project photos/case studies, clear service scopes, genuine customer reviews and consistent business name/address/phone across the site and Google Business Profile. The previous email, hello@texturedublin.ie, was removed because its domain returned NXDOMAIN; info@texturedublin.com is now the default and needs working mail DNS (see above). Confirm the business hours and address with the customer. Do not publish invented projects, reviews, credentials or guaranteed delivery times.

Focus initial acquisition on fitted wardrobes, bespoke kitchens, built-in units, furniture assembly and signage pages. Use Search Console queries and actual enquiries to decide which services and areas deserve more original content; page count alone is not an organic-growth strategy. Review index coverage and conversion quality after data is available. Do not claim that the launch guarantees rankings or immediate traffic.

References: [GA4 setup](https://support.google.com/analytics/answer/9304153), [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent), [Search Console verification](https://support.google.com/webmasters/answer/9008080), [site move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [Coolify domains](https://coolify.io/docs/core/networking/domains).


## Verified external state — 28 October 2026

- Deployed commit: `13e482c355c17c097a99982f03935c71ae560cd7`.
- Successful Coolify deployment: `nqj6yhh4bfl99aczjmcjkq40`. Application is running on internal port 3000.
- Coolify has both `https://texturedublin.com` and `https://www.texturedublin.com`, as well as the former preview routes.
- GA4 account: `359357947`; property **Texture Dublin**, ID `561106754`; web stream **Texture Dublin — Production**, ID `16217148432`; measurement ID `G-NWN5EPY7RH`. The measurement ID is a Coolify build variable.
- GA4 property created with Ireland reporting time zone and EUR. Event and user data retention: 14 months; reset-on-new-activity disabled. Automatic form, site search and video measurement disabled. Google signals and user-provided data collection are off; ads personalization is explicitly disallowed in all 307 regions.
- Search Console Domain property `texturedublin.com` verified with DNS and successfully linked to the production GA4 stream. Current Cloudflare nameservers: `ivy.ns.cloudflare.com`, `james.ns.cloudflare.com`. Its verification TXT is still present after the nameserver change.
- `www` returns HTTP 308 to the equivalent apex URL, preserving paths. The former preview also redirects to the production apex.
- **Resolved 28 October at 14:12 UTC:** apex HTTPS initially returned Cloudflare 525. Before repair, direct origin TLS to `194.163.187.66` rejected SNI `texturedublin.com` with `unrecognized name`, while SNI `www.texturedublin.com` succeeded. The failure was at the public Nginx Proxy Manager layer, before the request reached Coolify. Its Proxy Host 48 and certificate 108 initially covered only `*.texturedublin.com`, which excludes the apex.
- Public Nginx Proxy Manager login: `http://194.163.187.66:8181/`. The repair was performed through the already-authorized Coolify server terminal using the installed proxy models and its validated Nginx configuration workflow; no authentication credentials were changed. Cloudflare TLS settings were preserved.

### Applied proxy repair

- Private backup of the affected database records, generated proxy config and renewal config: `/data/backups/texture-dublin-root-20261028/` inside the Nginx Proxy Manager container. This backup contains existing secret configuration; keep it private.
- Expanded the existing certificate `npm-108` using its existing Cloudflare DNS authenticator and credential file. The resulting SANs cover `*.texturedublin.com` and `texturedublin.com`; expiry is 26 January 2027. The existing renewal configuration now contains both names.
- Updated only Certificate 108 and Proxy Host 48 to cover both names. Used the installed NPM `nginx.configure` workflow, including `nginx -t` and graceful reload. Proxy host reports `nginx_online=true`. Backups and conditional rollback were prepared before the change.
- Added scoped 308 redirects for `/texturedublin` and `/texturedublin/*` to the existing portfolio Proxy Host 9, preserving path and query string. Its original record/config are backed up in the same private directory as `legacy-host-9.json` and `9.conf`. The portfolio homepage remains HTTP 200 with the same response SHA-256 before and after: `a27abaf42544fe9b2528471d2bd5a2e007eb650f36ab39da716b897c8d3bb0e9`.
- Public apex HTTPS returns **200**, with indexable content and the correct `.com` canonical and GA4 ID. Main EN/GA, contact, service and area routes return 200. Removed shop/admin routes and unknown routes return 404. The sitemap contains 788 URLs; robots points to it. No placeholder email or shop navigation remains.
- Live browser consent check: no Google script before a choice or after rejection; accepting only Analytics loads exactly one GA4 tag for `G-NWN5EPY7RH`. Mobile navigation and empty quote-form validation pass. No browser errors/warnings were recorded during those checks.
- GA4 Realtime confirmed incoming production data: one active user and three `page_view` events during the browser checks. `generate_lead` is a key event counted once per session, with no default monetary value. No artificial enquiries were sent.
- Search Console's homepage live test passed: **URL is available to Google** and **Page can be indexed**. The homepage indexing request was accepted into the crawl queue; this is not confirmation of indexing.
- Search Console accepted the sitemap submission and one resubmission after the TLS repair. The final observed table still shows **Couldn't fetch**, unknown type and zero discovered pages. Public GET/HEAD requests, including a Googlebot user agent, return HTTP 200; the XML validates and contains 788 production URLs. Google has not yet confirmed a successful sitemap read. Recheck its processing status before reporting sitemap ingestion or index coverage as complete.

### Evidence and remaining handover

Local screenshots are in `outputs/`: `live-home.png`, `live-mobile.png`, `analytics-realtime.png`, `search-console-verified.png`, `analytics-search-console-linked.png`, `search-console-sitemap-submitted.png`, `search-console-live-test.png` and `search-console-indexing-requested.png`. Keep unrelated private files in that directory private.

The site is live and measurement is receiving data. Outstanding external/content work: confirm Google successfully re-reads the sitemap, then assess coverage once processing is available; obtain the customer's working email, confirmed business details and original project photography/case studies. Google Business Profile ownership and customer review collection have not been configured in this launch. No internal-traffic IP filter was enabled without a confirmed stable IP.
