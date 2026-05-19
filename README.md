# Hum A Cappella

Welcome to Hum's official website. It's built with [Astro](https://astro.build/) (static HTML/CSS/JS output) and [Tailwind CSS](https://tailwindcss.com/) for styling.

This doc is for whoever inherits the maintenance of this site (updating links, content, images). I've kept **non-technical members** in mind - the softwares I chose and the ways I built certain systems are meant to make your life as easy as possible. Please feel free to use AI in development where you deem necessary, as long as you supervise its output.

Make sure to keep updating this README as you make changes.

---

## What you need on your computer

- **Node.js** version **22.12 or newer** (see `package.json` → `engines`).
- **Git** (to clone and push changes) if you work from the repo.
- A terminal (on Mac: Terminal.app; on Windows: PowerShell or Windows Terminal).

You should have Git and a terminal on any modern-day laptop. Installing Node is very easy - follow online tutorials.

Check Node version (-v flag tells you version):

```bash
node -v
```

It should print `v22.12.0` or higher.

---

## First-time setup
Clone the git project into your local code editor (follow a tutorial).
Alternatively, markdown files can be edited directly in GitHub (but this is clunky, try to avoid it).

From the project folder:

```bash
npm install
```

Start the local preview:

```bash
npm run dev
```

Open **http://localhost:4321** in your browser. Edits to files refresh automatically once you save. Note these changes are NOT live, so you can revert mistakes.

To create the real files that get uploaded to hosting:

```bash
npm run build
```

Output is in the `dist/` folder. Netlify runs `npm run build` for you automatically after every push.

Preview the built site locally (optional):

```bash
npm run preview
```

---

## Project Legend (where files generally are)

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

## Handoff assessment (how hard is changing certain things?)

| Area | Non-technical ease | Notes |
|------|-------------------|--------|
| **Donation links, forms, email, social URLs** | **Good**. | Netlify uses “environment variables” which allow you to change links from the dashboard. Paste URLs and redeploy. No code.
| **Alumni & team profiles** | **Good**. Requires familiarity with **Markdown** and **copy-paste frontmatter** | Make sure the `---` block at the top and bottom of each file is present. Other than that, normal writing.  Must follow the [alumni profile](#alumni-profiles) rules. A template file is provided. |
| **Alumni & team photos** | **Moderate** | Whenever someone uploads an image to Google Drive: Resize with [Canva Image Resizer](https://www.canva.com/features/image-resizer/) to **800×800** px (or any square dimension). Save under `public/images/alumni/profiles/` or `public/images/team/profiles/`. Make sure the filename **case** matches in the markdown file. Max **1 MB** per file (There's a script to check: `npm run build`). See [Headshot uploads](#headshot-uploads-recommended-workflow-any-platform). |
| **Home page copy (“What we do”, hero, etc.)** | **Moderate** | Text lives directly in `.astro` files under `src/components/home/`. Editing is fine, but you'll have to dive directly into the codebase. Quotes, commas, and indentation matter. |
| **Adding new pages or layout/navigation changes** | **Developer** | Requires Astro and routing knowledge. Rely on AI here if no coding knowledge. |
| **Instagram grid widget** | **Good** (URL swap) | Change `PUBLIC_INSTAGRAM_FEED_EMBED_URL` to the new embed URL from your provider (e.g. Fouita `https://emb.fouita.com/widget/...`). This is one example of environment variables coming in handy. |

---

## Environment variables (edit links without touching code)

Many URLs and IDs are **not** hardcoded; they come from **environment variables**. Names start with `PUBLIC_` so they are safe to expose in the browser. (you may have heard of env vars being used to hide secrets such as API keys. You don't need to worry about secrecy here.)

**Reference list:** `.env.example` documents each env variable and its intended purpose.

**Local development:** copy `.env.example` to `.env` and fill in what you want things to point to. `.env` is normally **not** committed to Git (due to secrecy practices - it's just a good habit). Do not rely on it being available to you.

**Production:** set the same variables in Netlify. When you inevitably need to change them, trigger a **new deploy**.

### Production checklist

Copy every key from `.env.example` into your host’s environment settings, then redeploy. Values in `.env` are **not** uploaded automatically.

**Required:**

| Variable | Where it’s used |
|----------|-----------------|
| `PUBLIC_DONATE_VENMO_URL` | Support → Donate |
| `PUBLIC_DONATE_GOFUNDME_URL` | Support → Donate (use a **public** `/f/…` or `gofund.me` link, not an organizer `/manage/` URL) |
| `PUBLIC_YOUTUBE_FEATURED_IDS` | Home → Watch us (comma-separated video IDs) |
| `PUBLIC_INSTAGRAM_FEED_EMBED_URL` | Home → Latest highlights (Fouita `emb.fouita.com/...` iframe URL) |

**Recommended** (fallbacks exist in `src/constants/*.ts`, but set these so links stay correct without a code deploy):

| Variable | Fallback in code | Purpose |
|----------|------------------|---------|
| `PUBLIC_ALUMNI_FORM_URL` | `src/constants/alumni-form.ts` | `/alumni` intake CTA |
| `PUBLIC_JOIN_INTEREST_FORM_URL` | `src/constants/recruiting.ts` | Join Us CTAs |
| `PUBLIC_PERFORMANCE_REQUEST_FORM_URL` | `src/constants/performance.ts` | Book a performance |
| `PUBLIC_SUPPORT_EMAIL` | `src/constants/email.ts` (`utxhum@gmail.com`) | Footer mailto, sponsorship email |
| `PUBLIC_INSTAGRAM_URL` | `src/constants/social.ts` | Footer / alumni / join |
| `PUBLIC_YOUTUBE_CHANNEL_URL` | `src/constants/youtube.ts` (`/utxhum`) | Footer / home Watch us channel link |
| `PUBLIC_HOME_HYPE_VIDEO_YOUTUBE_ID` | `src/constants/youtube.ts` | Home hype reel |

**Optional:**

| Variable | Behavior when empty |
|----------|---------------------|
| `PUBLIC_DONATE_PAYPAL_URL` | Support shows “PayPal coming soon” |
| `PUBLIC_SITE_LOGO_URL` | Uses `public/images/hum-logo.png` |

---

## Alumni profiles

- **Location:** `src/content/alumni/*.md` (one file per person).
- **Template / instructions:** `src/content/alumni/template-stub.md` — duplicate and rename; set `draft: false` when ready to publish.
- **Frontmatter fields:** `name`, `humYears`, `city`, `bio`, optional `featured`, `draft`, `photo`, `sortOrder`.

**Adding pics to the site (download → resize → commit):**

1. Download the uploaded headshot from the form/Drive folder.
2. Resize in Canva using the **[Image Resizer](https://www.canva.com/features/image-resizer/)** (free account is fine).
3. Set dimensions to **800 × 800** (or **640 × 640** if you need a smaller file). The cards for Alumni and Team members expect squares.
4. **Download** as **JPG**. Make sure files are under **1 MB**.
5. Save to `public/images/alumni/profiles/` or `public/images/team/profiles/`.
6. In the person’s Markdown file, set `photo` to the exact path, including **filename case** (e.g. `udbhav-narani.jpg` not `.JPG` if the file is lowercase).
7. Run `npm run dev` to check locally before you push.

- **Validation:** `npm run build` runs `npm run validate:profile-photos` first (team + alumni). If it fails, read the error: usually “file too large” or “photo path does not exist”.

For the curious: Schema rules are defined in `src/content.config.ts`.

---

## Instagram Embed

The home page shows an embedded grid from third-party **Fouita**. Set **`PUBLIC_INSTAGRAM_FEED_EMBED_URL`** to the **embed** URL (typically `https://emb.fouita.com/widget/...`), not the script snippet. 

---

## Site updates log

_Add dated entries below whenever behavior, env vars, or maintainer workflows change. Most recent first._

| Date | Change |
|------|--------|
| 2026-05-19 | Favicon: `Layout.astro` uses `/favicon.ico` only (removed missing `favicon.svg` link). `_redirects`: `/current-season/` → `/meet-the-team` (301) so trailing-slash URLs redirect cleanly on Netlify. |
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
