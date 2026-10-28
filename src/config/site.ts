/**
 * ============================================================
 *  TEXTURE DUBLIN — BUSINESS SETTINGS
 *  Edit this file (and .env) before going live. Every page,
 *  structured-data block, WhatsApp link and footer reads from here.
 * ============================================================
 */

const env = import.meta.env;
const ga4 = (env.PUBLIC_GA4_ID || '').trim();
if (ga4 && !/^G-[A-Z0-9]+$/.test(ga4)) throw new Error('PUBLIC_GA4_ID must be a GA4 measurement ID (G-…).');

export const site = {
  name: 'Texture Dublin',
  preview: env.PUBLIC_SITE_PREVIEW === 'true',
  /** Registered business name as it appears with the CRO */
  legalName: 'Texture Dublin',
  url: (env.SITE || 'https://texturedublin.com').replace(/\/$/, ''),

  contactName: 'Ali Onder',
  whatsapp: env.PUBLIC_WHATSAPP_NUMBER || '353830170588',
  phone: {
    display: env.PUBLIC_PHONE_DISPLAY || '+353 83 017 0588',
    e164: env.PUBLIC_PHONE_E164 || '+353830170588',
  },
  email: env.PUBLIC_EMAIL || 'info@texturedublin.com',

  /**
   * Texture Dublin is set up as a service-area business: we travel to the
   * customer. If you have a public workshop or showroom, fill this in and set
   * showAddress to true — it will appear on the contact page and in schema.org.
   */
  showAddress: true,
  address: {
    street: 'Barstown Commercial Park, Barstown',
    locality: 'Dunboyne',
    region: 'Co. Meath',
    postalCode: '',
    country: 'IE',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Barstown+Commercial+Park+Barstown+Dunboyne+Co+Meath',

  /** opening hours (schema.org format days: Mo Tu We Th Fr Sa Su) */
  hours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '08:00', closes: '18:00' },
    { days: ['Sa'], opens: '09:00', closes: '14:00' },
  ],

  /** add the full profile URLs once the accounts exist — they feed schema.org sameAs and the footer */
  socials: {
    instagram: env.PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/texturedublinco/',
    facebook: env.PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/texturedublinco/',
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

  priceRange: 'By quotation',
  /** date the public content was last reviewed (sitemap lastmod, WebPage dateModified) — update when pages change */
  updated: '2026-10-28',
  /** date the price list was last reviewed (shown on pricing tables + guides) */
  pricesReviewed: '2026-10-01',

  analytics: {
    /** Google Analytics 4 measurement ID, e.g. G-XXXXXXXXXX */
    ga4,
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

export const isPlaceholderContact = !site.whatsapp;
