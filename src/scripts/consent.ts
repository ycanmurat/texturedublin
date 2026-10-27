/**
 * GDPR / ePrivacy cookie consent with Google Consent Mode v2.
 * Defaults (all denied) are set inline in <head>; this module shows the
 * banner, stores the choice for 6 months and loads GA4 / GTM / Google Ads /
 * Meta Pixel only as permitted.
 */
const KEY = 'td-consent';
const td = window.__td;
const cfg = td.cfg;
const hasTags = !!(cfg.ga4 || cfg.gtm || cfg.ads || cfg.pixel);

const banner = document.getElementById('consent');
const dialog = document.getElementById('consent-dialog') as HTMLDialogElement | null;

function whenActivated(fn: () => void) {
  if (document.prerendering) document.addEventListener('prerenderingchange', fn, { once: true });
  else fn();
}

function inject(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGoogle() {
  const analyticsAllowed = cfg.mode === 'advanced' || !!td.consent?.a;
  const marketingAllowed = cfg.mode === 'advanced' || !!td.consent?.m;
  if (cfg.gtm) {
    if (td.gLoaded || !(analyticsAllowed || marketingAllowed)) return;
    td.gLoaded = true;
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    inject(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(cfg.gtm)}`);
    return;
  }
  const id = (analyticsAllowed && cfg.ga4) || (marketingAllowed && cfg.ads);
  if (!id) return;
  if (!td.gLoaded) {
    td.gLoaded = true;
    inject(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
    window.gtag('js', new Date());
  }
  if (cfg.ga4 && analyticsAllowed && !td.gaConfigured) {
    td.gaConfigured = true;
    // Never include enquiry query strings or advertising features in GA4.
    window.gtag('config', cfg.ga4, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: `${location.origin}${location.pathname}`,
      page_referrer: document.referrer.split('?')[0].split('#')[0],
    });
    window.gtag('event', 'page_view', { send_to: cfg.ga4 });
  }
  if (cfg.ads && marketingAllowed && !td.adsConfigured) {
    td.adsConfigured = true;
    window.gtag('config', cfg.ads);
  }
}

function clearTrackingCookies(analytics: boolean, marketing: boolean) {
  const names = document.cookie.split(';').map(v => v.trim().split('=')[0]);
  const parts = location.hostname.split('.');
  const domains = ['', ...parts.map((_, i) => parts.slice(i).join('.'))];
  const segments = location.pathname.split('/').filter(Boolean);
  const paths = new Set(['/']);
  for (let i = 1; i <= segments.length; i++) {
    const path = '/' + segments.slice(0, i).join('/');
    paths.add(path); paths.add(path + '/');
  }
  for (const name of names) {
    if (!(analytics && /^_ga(?:_|$)|^_gid$|^_gat/.test(name)) && !(marketing && /^_gcl_|^_fb[pc]$/.test(name))) continue;
    for (const path of paths) for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=${path}${domain ? `; domain=${domain}` : ''}; SameSite=Lax`;
    }
  }
}

function loadMeta() {
  if (td.mLoaded || !cfg.pixel) return;
  td.mLoaded = true;
  const n = function (...args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    (n as any).callMethod ? (n as any).callMethod(...args) : (n as any).queue.push(args);
  } as any;
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  window.fbq = n;
  inject('https://connect.facebook.net/en_US/fbevents.js');
  n('consent', 'grant');
  n('init', cfg.pixel);
  n('track', 'PageView');
}

function apply() {
  const c = td.consent;
  if (cfg.ga4) (window as unknown as Record<string, unknown>)[`ga-disable-${cfg.ga4}`] = cfg.mode !== 'advanced' && !c?.a;
  if (cfg.mode === 'advanced' || c?.a || c?.m) loadGoogle();
  if (c?.m) loadMeta();
  else window.fbq?.('consent', 'revoke');
}

function save(a: boolean, m: boolean) {
  const c: TdConsent = { v: 1, a, m, t: Date.now() };
  td.consent = c;
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
  window.gtag('consent', 'update', {
    analytics_storage: a ? 'granted' : 'denied',
    ad_storage: m ? 'granted' : 'denied',
    ad_user_data: m ? 'granted' : 'denied',
    ad_personalization: m ? 'granted' : 'denied',
  });
  window.dataLayer.push({ event: 'consent_updated', analytics: a, marketing: m });
  clearTrackingCookies(!a, !m);
  hideBanner();
  if (dialog?.open) dialog.close();
  apply();
}

function showBanner() {
  if (!banner) return;
  banner.hidden = false;
  requestAnimationFrame(() => banner.classList.add('is-shown'));
}
function hideBanner() {
  if (!banner) return;
  banner.classList.remove('is-shown');
  setTimeout(() => (banner.hidden = true), 400);
}

function openDialog() {
  if (!dialog) return;
  const f = dialog.querySelector('form')!;
  (f.elements.namedItem('analytics') as HTMLInputElement).checked = !!td.consent?.a;
  (f.elements.namedItem('marketing') as HTMLInputElement).checked = !!td.consent?.m;
  dialog.showModal();
}

document.addEventListener('click', (e) => {
  const el = (e.target as Element | null)?.closest?.('[data-consent],[data-consent-open]') as HTMLElement | null;
  if (!el) return;
  if (el.hasAttribute('data-consent-open')) return openDialog();
  const action = el.dataset.consent;
  if (action === 'accept') save(true, true);
  else if (action === 'reject') save(false, false);
  else if (action === 'save' && dialog) {
    const f = dialog.querySelector('form')!;
    save((f.elements.namedItem('analytics') as HTMLInputElement).checked, (f.elements.namedItem('marketing') as HTMLInputElement).checked);
  }
});

whenActivated(() => {
  if (!td.consent && (hasTags || import.meta.env.DEV)) setTimeout(showBanner, 900);
  apply();
});
