/**
 * Conversion tracking: WhatsApp, phone and email clicks are sent to GA4 as
 * `whatsapp_click` / `phone_click` / `email_click` + the recommended
 * `generate_lead` event (mark it as a key event in GA4), to Google Ads as a
 * conversion (if a label is configured) and to Meta as `Contact`.
 * Nothing is sent before the visitor consents (basic consent mode).
 */

const allowed = () => {
  const td = window.__td;
  if (!td) return false;
  return td.cfg.mode === 'advanced' || !!(td.consent && (td.consent.a || td.consent.m));
};

export function track(name: string, params: Record<string, unknown> = {}) {
  if (!allowed() || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

function lead(method: 'whatsapp' | 'phone' | 'email' | 'quote_form', el: HTMLElement | null, extra: Record<string, unknown> = {}) {
  const params = {
    method,
    placement: el?.dataset.placement ?? 'link',
    service: el?.dataset.service ?? document.body.dataset.service ?? '',
    area: el?.dataset.area ?? document.body.dataset.area ?? '',
    page_type: document.body.dataset.page ?? '',
    language: document.documentElement.lang,
    ...extra,
  };
  track(method === 'quote_form' ? 'quote_whatsapp' : `${method}_click`, params);
  track('generate_lead', params);
  const td = window.__td;
  if (td?.consent?.m) {
    if (method !== 'email' && td.cfg.ads && td.cfg.adsWa) window.gtag('event', 'conversion', { send_to: `${td.cfg.ads}/${td.cfg.adsWa}` });
    window.fbq?.('track', 'Contact', { content_name: params.service || method, content_category: params.placement });
  }
}

export { lead };

export function initTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a') as HTMLAnchorElement | null;
      if (!a) return;
      const h = a.getAttribute('href') ?? '';
      if (a.dataset.track === 'whatsapp' || h.includes('wa.me/')) lead('whatsapp', a);
      else if (h.startsWith('tel:')) lead('phone', a);
      else if (h.startsWith('mailto:')) lead('email', a);
    },
    { capture: true },
  );
}
