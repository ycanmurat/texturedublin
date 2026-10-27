interface TdConsent {
  v: 1;
  a: boolean;
  m: boolean;
  t: number;
}
interface TdConfig {
  ga4: string;
  gtm: string;
  ads: string;
  adsWa: string;
  pixel: string;
  mode: 'basic' | 'advanced';
}
interface Window {
  __td: { cfg: TdConfig; consent: TdConsent | null; gLoaded?: boolean; gaConfigured?: boolean; adsConfigured?: boolean; mLoaded?: boolean };
  __tdReady?: boolean;
  __lenis?: { stop(): void; start(): void; on(e: string, cb: (...a: unknown[]) => void): void; scrollTo(t: unknown, o?: unknown): void };
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
  fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
  _fbq?: unknown;
}
interface Document {
  prerendering?: boolean;
}
