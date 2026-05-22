/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** External URL for the Hum Alumni Spotlight & Network form (Google Form, Tally, etc.) */
  readonly PUBLIC_ALUMNI_FORM_URL?: string;
  /** Google Form (or other URL) for performance requests — linked as "Book a performance” in the nav */
  readonly PUBLIC_PERFORMANCE_REQUEST_FORM_URL?: string;
  /** Interest / recruiting form for prospective members — linked as "Join Us" in the nav and CTAs */
  readonly PUBLIC_JOIN_INTEREST_FORM_URL?: string;
  /** Canonical site origin for Open Graph URLs (e.g. https://humacappella.netlify.app) */
  readonly PUBLIC_SITE_URL?: string;
  /** Optional absolute path/URL for the header logo (overrides `public/images/hum-logo-25.png`) */
  readonly PUBLIC_SITE_LOGO_URL?: string;
  /** YouTube video ID for the full-width featured performance video on the home page */
  readonly PUBLIC_HOME_HYPE_VIDEO_YOUTUBE_ID?: string;
  /** Comma-separated YouTube video IDs for the “Watch us” section (up to three used) */
  readonly PUBLIC_YOUTUBE_FEATURED_IDS?: string;
  /** Full URL to the team YouTube channel */
  readonly PUBLIC_YOUTUBE_CHANNEL_URL?: string;
  /** Full URL to the team Instagram profile (links + nav) */
  readonly PUBLIC_INSTAGRAM_URL?: string;
  /** HTTPS embed URL from an Instagram feed widget (Curator, Juicer, etc.) for auto-updating highlights */
  readonly PUBLIC_INSTAGRAM_FEED_EMBED_URL?: string;
  /** Venmo donation URL for /support (e.g. https://venmo.com/u/your-handle) */
  readonly PUBLIC_DONATE_VENMO_URL?: string;
  /** GoFundMe campaign URL for /support */
  readonly PUBLIC_DONATE_GOFUNDME_URL?: string;
  /** PayPal donation URL for /support (leave empty to show "PayPal coming soon") */
  readonly PUBLIC_DONATE_PAYPAL_URL?: string;
  /** Public support email — footer mailto and /support#sponsor (sponsorship inquiries) */
  readonly PUBLIC_SUPPORT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
