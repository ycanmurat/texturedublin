/**
 * ============================================================
 *  TEXTURE DUBLIN — BUSINESS SETTINGS
 *  Edit this file (and .env) before going live. Every page,
 *  structured-data block, WhatsApp link and footer reads from here.
 * ============================================================
 */

const env = import.meta.env;

export const site = {
  name: 'Texture Dublin',
  preview: env.PUBLIC_SITE_PREVIEW === 'true',
  /** Registered business name as it appears with the CRO */
  legalName: 'Texture Dublin',
  url: (env.SITE || 'https://www.texturedublin.ie').replace(/\/$/, ''),

  /** TODO: your WhatsApp Business number — international format, digits only (353 + number without the leading 0) */
  whatsapp: env.PUBLIC_WHATSAPP_NUMBER || '353870000000',
  phone: {
    display: env.PUBLIC_PHONE_DISPLAY || '087 000 0000',
    e164: env.PUBLIC_PHONE_E164 || '+353870000000',
  },
  email: env.PUBLIC_EMAIL || 'hello@texturedublin.ie',

  /**
   * Texture Dublin is set up as a service-area business: we travel to the
   * customer. If you have a public workshop or showroom, fill this in and set
   * showAddress to true — it will appear on the contact page and in schema.org.
   */
  showAddress: false,
  address: {
    street: '',
    locality: 'Dublin',
    region: 'County Dublin',
    postalCode: '',
    country: 'IE',
  },
  geo: { lat: 53.3498, lng: -6.2603 },

  /** opening hours (schema.org format days: Mo Tu We Th Fr Sa Su) */
  hours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '08:00', closes: '18:00' },
    { days: ['Sa'], opens: '09:00', closes: '14:00' },
  ],

  /** add the full profile URLs once the accounts exist — they feed schema.org sameAs and the footer */
  socials: {
    instagram: env.PUBLIC_INSTAGRAM_URL || '',
    facebook: env.PUBLIC_FACEBOOK_URL || '',
    tiktok: env.PUBLIC_TIKTOK_URL || '',
    linkedin: env.PUBLIC_LINKEDIN_URL || '',
    pinterest: env.PUBLIC_PINTEREST_URL || '',
    googleBusiness: env.PUBLIC_GOOGLE_BUSINESS_URL || '',
  },
  /** "Write a review" link from your Google Business Profile */
  googleReviewUrl: env.PUBLIC_GOOGLE_REVIEW_URL || '',

  /** company details shown in the footer / legal pages when filled in */
  vatNumber: env.PUBLIC_VAT_NUMBER || '',
  croNumber: env.PUBLIC_CRO_NUMBER || '',

  priceRange: '€€',
  /** date the price list was last reviewed (shown on pricing tables + guides) */
  pricesReviewed: '2026-10-01',

  analytics: {
    /** Google Analytics 4 measurement ID, e.g. G-XXXXXXXXXX */
    ga4: env.PUBLIC_GA4_ID || '',
    /** optional Google Tag Manager container, e.g. GTM-XXXXXXX (if set, GTM is loaded instead of gtag.js) */
    gtm: env.PUBLIC_GTM_ID || '',
    /** Google Ads tag, e.g. AW-123456789 (conversion tracking for WhatsApp clicks) */
    googleAds: env.PUBLIC_GOOGLE_ADS_ID || '',
    /** Google Ads conversion label for the WhatsApp-click conversion, e.g. AbCdEfGhIjK */
    googleAdsWhatsappLabel: env.PUBLIC_GOOGLE_ADS_WA_LABEL || '',
    /** Meta (Facebook / Instagram) Pixel ID */
    metaPixel: env.PUBLIC_META_PIXEL_ID || '',
    /**
     * 'basic'    — no Google/Meta tags load until the visitor consents (most privacy-protective; default)
     * 'advanced' — Google tags load with consent denied and send cookieless pings (better modelling)
     */
    consentMode: (env.PUBLIC_CONSENT_MODE as 'basic' | 'advanced') || 'basic',
  },

  verification: {
    google: env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    bing: env.PUBLIC_BING_SITE_VERIFICATION || '',
    facebook: env.PUBLIC_FACEBOOK_DOMAIN_VERIFICATION || '',
  },
} as const;

export const isPlaceholderContact = site.whatsapp === '353870000000';
