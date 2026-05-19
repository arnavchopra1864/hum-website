# Hum A Cappella — website

This repository is the **official Hum website**: home page, support/donations, alumni directory, and shared layout (navigation, footer, branding). It is built with [Astro](https://astro.build/) (static HTML/CSS/JS output) and [Tailwind CSS](https://tailwindcss.com/) for styling.

I've written this document for **non-technical members** who in the future may update links, text, alumni bios, or images—with occasional help from someone who can run commands on a computer (read: AI). Make sure to keep updating this README as you make changes.

---

## Handoff assessment (how easy is maintenance?)

| Area | Non-technical ease | Notes |
|------|-------------------|--------|
| **Donation links, forms, email, social URLs** | **Good** if your host exposes “environment variables” (like Netlify/Vercel). Same keys as in `.env.example`—paste URLs, redeploy. No code. | If the team only edits files in GitHub without a deploy dashboard, someone needs to update `.env` (or the host’s env UI) consistently. |
| **Alumni profiles** | **Good** once comfortable with **Markdown** and **copy-paste frontmatter** (the `---` block at the top of each file). Body text is normal writing. | Must follow the [Alumni](#alumni-profiles) rules (`draft`, `photo` path, image size). Wrong syntax can break the build—use the template file. |
| **Alumni & team photos** | **Moderate** | Resize with [Canva Image Resizer](https://www.canva.com/features/image-resizer/) to a **square (1:1)** export (e.g. **800×800**), save under `public/images/alumni/profiles/` or `public/images/team/profiles/`, match filename **case** in frontmatter. Max **1 MB** per file (`npm run build` validates). See [Headshot uploads](#headshot-uploads-recommended-workflow-any-platform). |
| **Home page copy (“What we do”, hero, etc.)** | **Harder** | Text lives in `.astro` files under `src/components/home/`. Editing is like editing a web template: quotes, commas, and indentation matter. Prefer a short training or a developer for tone changes. |
| **Support page marketing copy** | **Harder** | Mostly in `src/pages/support.astro` and small components—same as above. |
| **New pages or layout/navigation changes** | **Developer** | Requires Astro and routing knowledge. |
| **Instagram grid widget** | **Good** (URL swap) | Change `PUBLIC_INSTAGRAM_FEED_EMBED_URL` to the new embed URL from your provider (e.g. Fouita `https://emb.fouita.com/widget/...`). |

**Summary:** The project is **friendly for links and structured alumni content**, and **less friendly for free-form marketing copy** scattered in code files. A sustainable split is: **officers update env vars + alumni Markdown**; **web chair or dev updates `.astro` copy** when needed—or migrate more copy into content collections later to simplify.

---

## What you need on your computer

- **Node.js** version **22.12 or newer** (see `package.json` → `engines`).
- **Git** (to clone and push changes) if you work from the repo.
- A terminal (on Mac: Terminal.app; on Windows: PowerShell or Windows Terminal).

Check Node:

```bash
node -v
```

It should print `v22.12.0` or higher.

---

## First-time setup

From the project folder:

```bash
npm install
```

Start the local preview site:

```bash
npm run dev
```

Open **http://localhost:4321** in your browser. Edits to files refresh automatically once you save.

To create the real files that get uploaded to hosting:

```bash
npm run build
```

Output is in the `dist/` folder. Your host (Netlify, Vercel, GitHub Pages, etc.) usually runs `npm run build` for you on every update.

Preview the built site locally (optional):

```bash
npm run preview
```

---

## Environment variables (links without touching code)

Many URLs and IDs are **not** hardcoded; they come from **environment variables**. Names start with `PUBLIC_` so they are safe to expose in the browser.

**Reference list:** open `.env.example` in this repo. Each line is documented there.

**Local development:** copy `.env.example` to `.env` (if you do not already have one) and fill in real values. `.env` is normally **not** committed to Git—do not rely on it being on the server.

**Production:** set the same variables in your **hosting provider’s dashboard** (Environment variables / Build variables). After changing them, trigger a **new deploy**.

### Production checklist

Copy every key from `.env.example` into your host’s environment settings, then redeploy. Values in `.env` are **not** uploaded automatically.

**Set on the host (no UI without them):**

| Variable | Where it’s used |
|----------|-----------------|
| `PUBLIC_DONATE_VENMO_URL` | Support → Donate |
| `PUBLIC_DONATE_GOFUNDME_URL` | Support → Donate (use a **public** `/f/…` or `gofund.me` link, not an organizer `/manage/` URL) |
| `PUBLIC_YOUTUBE_FEATURED_IDS` | Home → Watch us (comma-separated video IDs) |
| `PUBLIC_INSTAGRAM_FEED_EMBED_URL` | Home → Latest highlights (Fouita `emb.fouita.com/...` iframe URL) |

**Recommended on the host** (code fallbacks exist in `src/constants/*.ts`, but set these so links stay correct without a code deploy):

| Variable | Fallback in code | Purpose |
|----------|------------------|---------|
| `PUBLIC_ALUMNI_FORM_URL` | `src/constants/alumni-form.ts` | `/alumni` intake CTA |
| `PUBLIC_JOIN_INTEREST_FORM_URL` | `src/constants/recruiting.ts` | Join Us CTAs |
| `PUBLIC_PERFORMANCE_REQUEST_FORM_URL` | `src/constants/performance.ts` | Book a performance |
| `PUBLIC_SUPPORT_EMAIL` | `src/constants/email.ts` (`utxhum@gmail.com`) | Footer mailto, sponsorship email |
| `PUBLIC_INSTAGRAM_URL` | `src/constants/social.ts` | Footer / alumni / join |
| `PUBLIC_YOUTUBE_CHANNEL_URL` | `src/constants/youtube.ts` (`/utxhum`) | Footer / home Watch us channel link |
| `PUBLIC_HOME_HYPE_VIDEO_YOUTUBE_ID` | `src/constants/youtube.ts` | Home hype reel |

**Optional (empty is OK):**

| Variable | Behavior when empty |
|----------|---------------------|
| `PUBLIC_DONATE_PAYPAL_URL` | Support shows “PayPal coming soon” |
| `PUBLIC_SITE_LOGO_URL` | Uses `public/images/hum-logo.png` |

**Removed / unused:** `PUBLIC_ALUMNI_GROUP_CHAT_URL` was documented but never wired in the UI; alumni WhatsApp is described in copy and handled via the same intake form. Do not set it.

**Hardcoded (not env):** reunion Eventbrite URL and copy live in `src/constants/reunion.ts`; logo file path defaults in `Layout.astro` unless `PUBLIC_SITE_LOGO_URL` is set.

---

## Alumni profiles

- **Location:** `src/content/alumni/*.md` (one file per person).
- **Template / instructions:** `src/content/alumni/template-stub.md` — duplicate and rename; set `draft: false` when ready to publish.
- **Frontmatter fields:** `name`, `humYears`, `city`, `bio`, optional `featured`, `draft`, `photo`, `sortOrder`.

### Suggested alumni intake form fields (`PUBLIC_ALUMNI_FORM_URL`)

Align questions with what appears on `/alumni` cards so reviewers can paste into Markdown without guesswork:

| Form question | Maps to | Notes |
|---------------|---------|--------|
| Full name (as it should appear) | `name` | Required |
| Hum years / seasons | `humYears` | e.g. `2018–2022` |
| Location (City, Region/State, Country) | `city` | Displayed on the card and powers the location filter |
| What you’re doing now (1–3 sentences) | `bio` | Shown on the card |
| Email | _(internal)_ | For verification only — **do not** publish in frontmatter unless you add a field later |
| Optional headshot upload | _(internal)_ | Team compresses & commits under `public/images/alumni/profiles/`, then sets `photo` on the entry |
| Consent | checkbox | “OK to publish my name, city, and bio on humsite.com” |

Skip extra fields unless you truly need them (LinkedIn URL, voice part, etc.) — each one adds maintenance. `featured` and `sortOrder` stay editor-controlled in the repo, not on the public form.

### Headshot uploads: recommended workflow (any platform)

Google Forms only supports certain upload limits (often **1MB** or **10MB**). Recommended setup:

- **Google Form upload limit**: set to **10MB** to reduce failed submissions.
- **Website/repo limit**: keep headshots at **≤ 1MB** so `/alumni` stays fast and the repo stays manageable.

**Standard operating procedure (download → resize → commit):**

1. Download the uploaded headshot from the form/Drive folder.
2. Resize in Canva using the **[Image Resizer](https://www.canva.com/features/image-resizer/)** (free account is fine). Upload your photo there, or open an existing design and choose **Resize**.
3. Export settings:
   - Set dimensions to **800 × 800** (or **640 × 640** if you need a smaller file).
   - Enforce a **square (1:1)** aspect ratio — cards on `/alumni` and `/meet-the-team` display photos as squares, so a square export fills the frame without awkward cropping.
4. **Download** as **JPG** or **PNG**. If the file is still over **1 MB**, re-export at slightly lower quality or use [`https://squoosh.app/`](https://squoosh.app/) as a backup compressor.
5. Save to `public/images/alumni/profiles/` or `public/images/team/profiles/`.
6. In the person’s Markdown file, set `photo` to the exact path, including **filename case** (e.g. `udbhav-narani.jpg` not `.JPG` if the file is lowercase — mismatches break the image on the live site).
7. Run `npm run build` to validate file size and paths.

- **Photos:** optional `photo: /images/alumni/profiles/yourfile.jpg` — file must live in `public/images/alumni/profiles/` and stay under the max size in `src/constants/profile-media.json` (currently **1 MB** per image). Team members use `public/images/team/profiles/` and `/images/team/profiles/...` in frontmatter.
- **Validation:** `npm run build` runs `npm run validate:profile-photos` first (team + alumni). If it fails, read the error: usually “file too large” or “photo path does not exist”.

Schema rules are defined in `src/content.config.ts` (for developers); non-technical editors only need the template and this section.

---

## Images and static files

Anything in **`public/`** is served as-is at the site root. Example: `public/images/hum-logo.png` → `https://yoursite.com/images/hum-logo.png`.

- **Logo:** default `public/images/hum-logo.png` (see `Layout.astro` for anniversary overrides).
- **Profile headshots:** `public/images/alumni/profiles/` and `public/images/team/profiles/` (path prefixes enforced in content schema + validation). Export **square (1:1)** at **800×800** via [Canva Image Resizer](https://www.canva.com/features/image-resizer/) — see [Headshot uploads](#headshot-uploads-recommended-workflow-any-platform).

---

## Project layout (short map)

```text
public/                 Static assets (images, favicon, etc.)
src/
  components/           Reusable UI pieces (home sections, cards, …)
  content/alumni/       Alumni Markdown files
  constants/            Shared defaults (forms, social URLs, media limits)
  layouts/Layout.astro  Site chrome: nav, footer, logo
  pages/                Routes: index.astro → /, support.astro → /support, …
  styles/global.css     Global Tailwind theme
.env.example            List of all env vars (copy to .local .env)
```

---

## Instagram “Latest highlights”

The home page can show an embedded grid from a third-party widget (e.g. **Fouita**). Set **`PUBLIC_INSTAGRAM_FEED_EMBED_URL`** to the **embed** URL (typically `https://emb.fouita.com/widget/...`), not the script snippet. The site wraps it in an iframe with lazy loading.

---

## Site updates log

_Add dated entries below whenever behavior, env vars, or maintainer workflows change. Most recent first._

| Date | Change |
|------|--------|
| 2026-05-18 | Netlify deploy: [`netlify.toml`](netlify.toml), [`public/_redirects`](public/_redirects) for `/current-season` → `/meet-the-team`. |
| 2026-05-18 | Env audit: production-ready `.env.example`, removed unused **`PUBLIC_ALUMNI_GROUP_CHAT_URL`**, YouTube defaults in `src/constants/youtube.ts`. |
| 2026-05-18 | Removed **`PUBLIC_SPONSOR_FORM_URL`**; sponsorship on `/support` is email-only via `PUBLIC_SUPPORT_EMAIL`. |
| 2026-05-18 | README headshot steps link to [Canva Image Resizer](https://www.canva.com/features/image-resizer/). |
| 2026-05-18 | Alumni frontmatter field renamed **`role` → `bio`** (schema, cards, templates, README). |
| 2026-05-18 | Profile photos: **square (1:1)** at **800×800** everywhere (Canva workflow, `profile-media.json`, card `aspect-square`); replaces **960×640 (3:2)**. |
| 2026-05-13 | Removed **`/contact`** page; team email (`utxhum@gmail.com` / `PUBLIC_SUPPORT_EMAIL`) linked from footer and alumni copy. |
| 2026-05-12 | Default **`PUBLIC_JOIN_INTEREST_FORM_URL`** / recruiting default updated to **Hum Interest Form ’26–’27** ([forms.gle/ZpwFMvWHdZktbLcw8](https://forms.gle/ZpwFMvWHdZktbLcw8)); `/join` page built with eligibility, recruiting rhythm, inclusivity, and audition outline. |
| 2026-05-07 | Alumni page decluttered (single form CTA path, `<details>` for editor-only repo notes); README adds suggested intake form field table. |
| 2026-05-07 | Home: primary CTAs moved **above** hype video; nav: **Join Us** → `/join` (placeholder page), header **Book**/**Join** buttons removed (use home CTAs); footer Join Us → `/join`. |
| 2026-05-07 | Added **Join Us** CTAs (header, home, about, footer) with `PUBLIC_JOIN_INTEREST_FORM_URL` (default Hum interest form). |
| 2026-05-07 | Updated `/alumni` with city/name filters and clarified Alumni Interaction copy. |
| 2026-05-06 | Added `/about` page powered by a Content Collection entry (edit `src/content/pages/about.md` for About copy; avoid touching `.astro` unless changing layout). |
| 2026-05-02 | Initial **non-technical README**, handoff assessment table, and **Site updates log**; env vars documented from `.env.example`. |
| _YYYY-MM-DD_ | _Example: Added PUBLIC\_… for a new integration._ |

---

## Learning more (technical)

- [Astro docs](https://docs.astro.build/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) (how alumni Markdown is loaded)

---

## Questions?

If something in this README is wrong or incomplete, update it in the same pull request as the feature—or ask the web lead to add a row to the [Site updates log](#site-updates-log).
