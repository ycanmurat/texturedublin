# Texture Dublin

Shareable preview: **https://canmurat.com/texturedublin/**

## Current Coolify deployment

Source: https://github.com/ycanmurat/texturedublin (public).

Coolify application: https://coolify.hillbilisim.com/project/hw0g00c4k8wg8848ogg8ck8c/environment/jcc8ok008gc8w8o0wkss4o04/application/wapjweqwp4uhnb0ipk6kkx5p

For updates, push `main` and redeploy this application in Coolify. The public Git source does not need an SSH deploy key. A GitHub push webhook has not been configured.

- Node 24, `npm ci`, Astro static output, nginx on container port 80.
- Build pack: Dockerfile, branch `main`, Dockerfile `/Dockerfile`.
- Domain: `https://canmurat.com/texturedublin`.
- Advanced → Proxy → Path prefixes: **Keep paths as-is**.
- The Dockerfile builds with `SITE_URL=https://canmurat.com`, `BASE_PATH=/texturedublin`, `PUBLIC_SITE_PREVIEW=true`.
- Preview pages use `noindex, follow` while business contact details are placeholders. Analytics IDs are empty.
- All page links, assets, canonical URLs, hreflang, sitemap, JSON-LD, OG images and web manifest respect the base path.
- Unknown paths return the actual 404 page and HTTP 404; `/texturedublin` redirects to `/texturedublin/`.

Local preview:

```sh
npm ci
SITE_URL=https://canmurat.com BASE_PATH=/texturedublin PUBLIC_SITE_PREVIEW=true npm run dev
```

Build and validate all pages:

```sh
SITE_URL=https://canmurat.com BASE_PATH=/texturedublin PUBLIC_SITE_PREVIEW=true npm run build
npm run audit
```

Before moving to the final business domain, configure verified contact details in `.env`, change `SITE_URL` and `BASE_PATH=/`, set `PUBLIC_SITE_PREVIEW=false`, and adjust the nginx document-root mapping. The current container intentionally serves only `/texturedublin/`.

---

# Texture Dublin — web sitesi

**bespoke wood works and branding** · İngilizce + İrlandaca (Gaeilge) · SEO öncelikli · WhatsApp odaklı

Astro 7 ile yapılmış statik bir site: tek komutla **783 sayfa** üretilir. Bunların içinde 15 hizmet, 51 bölge ve 306 "hizmet × bölge" sayfası var; her biri iki dilde ve bölgeye özel fiyatlarla.

---

## 1. Çalıştırma

```bash
npm install
npm run dev        # http://localhost:4321  (geliştirme)
npm run build      # dist/ klasörüne üretim çıktısı
npm run preview    # üretim çıktısını yerelde dene
npm run audit      # SEO denetimi (build sonrası)
npm run brand      # logo / sosyal medya / favicon dosyalarını yeniden üret
```

Node 22.23 veya üstü gerekir (Node 24 ile test edildi).

---

## 2. Yayına almadan önce yapılacaklar (kontrol listesi)

1. **`.env` dosyasını oluşturun:** `.env.example` dosyasını `.env` adıyla kopyalayıp doldurun:
   - `SITE_URL`: gerçek alan adı (canonical, sitemap ve hreflang bundan üretilir)
   - `PUBLIC_WHATSAPP_NUMBER`: **zorunlu.** Uluslararası formatta, başında `+` olmadan, örn. `353871234567`
   - telefon, e-posta, GA4 / GTM / Google Ads / Meta Pixel kimlikleri, doğrulama kodları, sosyal medya linkleri
2. **`src/config/site.ts`:** CRO'ya kayıtlı şirket adı (`legalName`), çalışma saatleri, varsa adres (`showAddress: true`).
3. **Fiyatlar:** `src/data/services.ts` içindeki fiyatlar 2026 Dublin piyasasına göre hazırlanmış **taslak** rakamlardır. Kendi maliyetlerinize göre gözden geçirin. Tek dosyayı değiştirmek, sitedeki tüm fiyatları (783 sayfa, hesaplayıcı, rehberler, schema.org, llms.txt) günceller.
4. **Bölge farkları:** `src/data/zones.ts`. Bölge 1–4 için minimum ziyaret ücreti ve yol payı (%0 / %0 / %3 / %6).
5. **Sertifikalar:** `src/data/standards.ts`.
   - `standards`: AB ve İrlanda mevzuatı ile standartları (CE, E1/REACH formaldehit sınırı, EN 14749, Safe Electric, imar izni, GDPR, WCAG). Sizin gerçekten uyguladığınız şekilde olduklarını kontrol edin.
   - `credentials`: Safe Pass, sigorta, vergi uygunluk belgesi (tax clearance), CRO, Safe Electric, IPAF vb. Sitede **yalnızca** `status: 'verified'` yapılıp `detail` alanı doldurulanlar görünür. Geliştirme modunda eksikler "To do" rozetiyle gösterilir. Sahip olmadığınız bir belgeyi asla `verified` yapmayın.
6. **Metin iddiaları:** "Dublin atölyemiz", "ücretsiz keşif", altın varak, yosun logo gibi hizmet iddialarının sizin için doğru olduğunu kontrol edin. Doğru olmayanları `src/data/services.ts` ve `src/i18n/ui.ts` içinden düzeltin.
7. **İrlandaca metinler:** Tüm içerik İrlandacaya çevrildi. Yine de yayından önce anadili İrlandaca olan bir çevirmene okutmanızı öneririm (yer adlarının çekimli halleri `src/data/areas.ts` içinde, `inGa` alanında).
8. **Gerçek proje fotoğrafları:** `src/assets/projects/` klasörüne koyun, örn. `fitted-wardrobe-rathmines.jpg`. Dosya adı otomatik olarak başlık ve alt metin olur; görseller AVIF/WebP olarak optimize edilir.
9. **Yorumlar:** Sahte yorum eklenmedi. Google Business Profile açtıktan sonra gerçek yorumları toplayın; "yorum yaz" bağlantısını `PUBLIC_GOOGLE_REVIEW_URL` alanına koyun.

---

## 3. Google Analytics 4, Search Console, Google Ads

**GA4**
1. analytics.google.com'da bir GA4 mülkü ve web akışı oluşturun, `G-XXXXXXX` kimliğini `PUBLIC_GA4_ID` alanına yazın.
2. Admin → Events bölümünde şu olayları **key event (dönüşüm)** olarak işaretleyin:
   - `generate_lead`: tüm WhatsApp, telefon ve teklif formu tıklamaları
   - `whatsapp_click`, `phone_click`, `email_click`, `quote_whatsapp`
   - `estimate_start`, `area_search` (ilgi sinyalleri)
3. Olaylarla gelen parametreler: `placement` (hero, fab, price-row, …), `service`, `area`, `page_type`, `language`. Bunları Custom definitions bölümünden boyut olarak tanımlarsanız "hangi bölgeden, hangi hizmet için WhatsApp'a tıklandı" raporunu görürsünüz.

**Search Console**
1. Alan adını doğrulayın (DNS ile ya da `PUBLIC_GOOGLE_SITE_VERIFICATION` meta etiketiyle).
2. `https://alanadiniz/sitemap.xml` adresini gönderin. Sitemap 783 URL'nin hepsini en-IE / ga-IE / x-default hreflang bağlarıyla birlikte içerir.

**Google Ads**
1. Bir dönüşüm işlemi oluşturun: "WhatsApp click" (web sitesi, manuel kurulum). `AW-…` kimliğini `PUBLIC_GOOGLE_ADS_ID` alanına, etiketi `PUBLIC_GOOGLE_ADS_WA_LABEL` alanına yazın. WhatsApp ve telefon tıklamaları otomatik olarak dönüşüm sayılır.
2. Reklamları bölge × hizmet sayfalarına yönlendirin, örn. `/areas/rathmines/fitted-wardrobes/`. Bu sayfaların başlığı, fiyatı ve WhatsApp mesajı bölgeye özeldir; bu da Kalite Puanı'na olumlu yansır.

**İsterseniz GTM:** `PUBLIC_GTM_ID` girilirse gtag yerine Google Tag Manager yüklenir. Consent Mode v2 varsayılanları yine geçerli olur.

---

## 4. Instagram ve Facebook (Meta)

1. Meta Events Manager'da bir Pixel oluşturun ve kimliğini `PUBLIC_META_PIXEL_ID` alanına yazın. WhatsApp ve telefon tıklamaları `Contact` olayı olarak gönderilir.
2. Business Settings → Brand Safety → Domains: alan adını doğrulayın (`PUBLIC_FACEBOOK_DOMAIN_VERIFICATION`).
3. Profil görselleri `brand-kit/social/` klasöründe:
   - `profile-instagram-facebook-dark-1080.png`: profil fotoğrafı (daire kırpmaya uygun)
   - `facebook-cover-dark-1640x624.png`: Facebook kapak görseli
   - `instagram-story-dark-1080x1920.png`: hikâye ve öne çıkanlar
   - `google-business-logo-*-720.png`, `google-business-cover-*-1080x608.png`
   - `whatsapp-business-*-640.png`: WhatsApp Business profil fotoğrafı
4. Hesapları açtıktan sonra URL'leri `.env` dosyasına ekleyin. Footer'daki ikonlar ve schema.org `sameAs` alanı otomatik dolar.

**WhatsApp Business ipuçları:** karşılama mesajı, hızlı yanıtlar (örn. `/fiyat`, `/olcu`), katalog (hizmetler ve "başlangıç" fiyatları) ve çalışma saatleri tanımlayın.

---

## 5. Çerezler ve GDPR (AB uyumu)

- Çerez bandında **"Reject all", "Accept all" kadar kolaydır** (İrlanda DPC kuralı). Tercihler 6 ay saklanır; footer'daki "Cookie settings" ile her zaman değiştirilebilir.
- **Google Consent Mode v2** var: tüm izinler varsayılan olarak `denied` gelir.
- `PUBLIC_CONSENT_MODE=basic` (varsayılan): onay verilmeden hiçbir Google veya Meta etiketi yüklenmez. Hukuken en güvenli seçenek budur.
- `advanced`: Google etiketleri "denied" modunda yüklenir ve çerezsiz ping gönderir. Google'ın dönüşüm modellemesi daha iyi çalışır.
- Fontlar kendi sunucumuzda barındırılır; Google Fonts'a istek gitmez. Bu da GDPR açısından bir artıdır.
- Gizlilik politikası, çerez politikası (çerez tablosuyla), şartlar ve koşullar (Consumer Rights Act 2022) ve erişilebilirlik beyanı (WCAG 2.2 AA) iki dilde hazırdır: `src/content/legal/`.

---

## 6. SEO altyapısı (neler yapıldı)

- **Bölge bazlı fiyatlandırma:** 51 bölge × 15 hizmet. Her bölge sayfasında bölgeye göre ayarlanmış tam fiyat listesi var: yol payı, minimum ziyaret, belediye (planlama), Eircode ve posta bölgesi.
- **Hizmet × bölge açılış sayfaları** (6 ana hizmet × 51 bölge × 2 dil). İçerikleri benzersizdir: bölgenin konut dokusuna göre uzman tavsiyesi, o bölge için hesaplanmış "tipik proje" fiyatı, yakın bölgeler ve yerel SSS.
- **İki dil:** `/` İngilizce, `/ga/` İrlandaca. URL'ler de İrlandaca (`/ga/ceantair/rath-maonais/vardruis-fheistithe/`), her sayfada hreflang (en-IE, ga-IE, x-default) var.
- **Schema.org JSON-LD:** HomeAndConstructionBusiness, WebSite, WebPage, BreadcrumbList, fiyatlı Offer içeren Service, OfferCatalog, Place/areaServed, FAQPage, Article. Sahte puanlama (AggregateRating) yoktur.
- **Teknik:** canonical, robots meta, XML sitemap, robots.txt, `llms.txt` (ChatGPT, Perplexity ve Google AI için özet), her hizmet, bölge ve rehber için ayrı Open Graph görseli (1200×630), manifest ve faviconlar, HTML site haritası, 404 sayfası.
- **Performans:** statik HTML, minimum JavaScript (GSAP yok; Lenis yalnızca masaüstünde), Speculation Rules ile hover'da anında sayfa geçişi. Sayfa başına brotli ile sıkıştırılmış boyut ~17–25 KB.
- **Animasyon:** View Transitions ile sayfa geçişleri, imlecin ahşapta "budak" oluşturduğu interaktif hero, kendini çizen logo ve teknik çizimler, kaydırmaya bağlı süreç çizimi, manyetik butonlar, kayan şerit. Hepsi `prefers-reduced-motion` ayarına uyar.
- **Erişilebilirlik:** atlama bağlantısı, klavye ile gezinme, ARIA, kontrast, dil işaretleri.
- `npm run audit` her build sonrası tüm sayfalarda başlık, açıklama, canonical, hreflang, H1, JSON-LD geçerliliği ve kırık bağlantı kontrolü yapar.

---

## 7. Dosya yapısı (kısa)

```
src/config/site.ts        işletme bilgileri, WhatsApp, analitik
src/data/services.ts      15 hizmet + TÜM FİYATLAR (EN/GA)
src/data/areas.ts         51 bölge (koordinat, posta kodu, belediye, metinler)
src/data/zones.ts         fiyat bölgeleri ve belediyeler
src/data/housing.ts       konut tipine göre uzman tavsiyeleri
src/data/standards.ts     AB standartları + sertifikalar
src/i18n/ui.ts            arayüz metinleri (EN/GA)
src/content/guides/       fiyat rehberleri (MDX, canlı fiyatlı)
src/content/legal/        yasal sayfalar (MDX)
src/pages/[...slug].astro tüm sayfaları üreten tek yönlendirici
src/brand/mark.mjs        logo geometrisi (site + marka kiti ortak)
brand-kit/                logo SVG/PNG + sosyal medya görselleri
scripts/build-brand.mjs   marka kitini üretir
```

---

## 8. Yayına alma

Herhangi bir statik barındırmada çalışır:

- **Netlify:** depoyu bağlayın; `netlify.toml` hazır. Güvenlik başlıkları `public/_headers` içinde.
- **Vercel:** `vercel.json` hazır (trailing slash ve güvenlik başlıkları).
- **Cloudflare Pages:** build komutu `npm run build`, çıktı klasörü `dist`. `_headers` dosyası otomatik okunur.

Ortam değişkenlerini barındırma panelinde de tanımlamayı unutmayın (`SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`, …).
