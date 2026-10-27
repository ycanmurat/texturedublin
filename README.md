# Texture Dublin

Bilingual furniture/carpentry and specialist signage website, with a small made-to-order catalogue, 3D product viewing and a private product administrator.

- Preview: https://canmurat.com/texturedublin/
- Shop: https://canmurat.com/texturedublin/shop/
- Admin: https://canmurat.com/texturedublin/admin/
- Source: https://github.com/ycanmurat/texturedublin (public)

## Run locally

Node **24 or later** is required (`node:sqlite`).

```sh
npm ci
cp .env.example .env
# Set a unique ADMIN_INITIAL_PASSWORD (12+ characters) locally.
SITE_URL=https://canmurat.com BASE_PATH=/texturedublin PUBLIC_SITE_PREVIEW=true npm run dev
```

The default development port is 4321. For the production server:

```sh
SITE_URL=https://canmurat.com BASE_PATH=/texturedublin PUBLIC_SITE_PREVIEW=true npm run build
npm run audit
npm run test:admin
BASE_PATH=/texturedublin DATA_DIR=.data PORT=3000 node server.mjs
```

Runtime secrets must be exported in the shell or supplied by Coolify; `node server.mjs` does not load `.env` itself. Never prefix secrets with `PUBLIC_`.

## Product management

Sign in at `/texturedublin/admin/`. Add or edit products, descriptions in both languages, dimensions in millimetres, finishes, images and self-contained GLB models. Leave the price blank for **Price on enquiry**. Keep **example design** selected for illustrative listings. Uncheck **Published** to archive a product. Existing product URLs stay stable. The **Password & security** tab changes the password and invalidates other sessions.

The initial Oak & Ivory Wardrobe, its dimensions and its **€1,490 example price** are illustrative, not a confirmed product offer. Replace them with verified product details in the panel. Its actual 3D geometry and editable Blender source are in `public/models/` and `design/`. The viewer is loaded only when a visitor chooses 3D; a static image remains available if loading fails.

Selecting quantity, finish, location and notes prepares a WhatsApp enquiry to **Ali Onder, +353 83 017 0588**. The visitor reviews and sends it in WhatsApp. The website does not take payment, hold customer orders or promise availability, delivery or a final price.

## Persistent data and credentials

- Runtime `DATA_DIR=/app/data` contains SQLite (`texture.sqlite`, plus WAL/SHM while running) and uploaded files under `media/`.
- Mount a **persistent Docker volume at `/app/data`** before deploying. Products, uploads and password hashes must survive container replacement.
- Set `ADMIN_USERNAME=admin` and a strong, private `ADMIN_INITIAL_PASSWORD` in runtime-only environment variables. The initial password seeds the administrator once; it never overrides a password changed in the panel. Remove the bootstrap environment variable after the account has been initialized.
- Back up the database with SQLite’s online backup facility, or stop the application and copy the complete data directory including uploads. Do not copy only an active database file while ignoring its WAL.
- Image uploads are re-encoded as WebP; GLB uploads must embed their resources. Upload product materials only: linked media is public.
- Admin sessions use HttpOnly/SameSite cookies, CSRF checks, password hashing and login throttling. No default password or secret is committed.

## Content and SEO

Business contact and social links: `src/config/site.ts`. Service and local content: `src/data/`, `src/views/` and bilingual MDX guides. Only four guide starting rates remain in `src/lib/pricing.ts`; other service pricing is enquiry based. The old automatic price calculator has been removed.

Furniture and signage have separate landing pages and dedicated specialists under the same company. Guides cover wardrobes, kitchens, alcoves, signage preparation and local permission checks. Sitemap, canonical, hreflang, metadata and structured data respect the hosting prefix. Published products are added to the sitemap immediately; draft products return 404.

This remains a **shareable preview with `noindex, follow`**. Analytics IDs are empty. Before launching on the final business domain, confirm all business claims/content, update `SITE_URL` and `BASE_PATH`, set `PUBLIC_SITE_PREVIEW=false`, rebuild, and update Coolify’s routing. Indexing/rankings are not guaranteed by a technical audit.

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md). Push `main`, then redeploy the existing **Texture Dublin Preview** application in Coolify. There is no GitHub webhook or deploy key. The Dockerfile uses Astro’s Node middleware adapter on port 3000, a persistent volume and a healthcheck. `Cache-Control: no-transform` prevents CDN HTML modifications that previously broke SVG links.

## Verification

`npm run audit` checks every generated page and live catalogue route for titles, descriptions, H1, canonical/hreflang, JSON-LD, internal links, OG assets, sitemap, missing products and private admin headers. `npm run test:admin` uses a disposable local database to verify authentication, CSRF, product changes, safe rendering, file uploads, password rotation, archival, rate limiting and persistence across a restart. It never sends WhatsApp messages.
