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

## Uploading pictures (team & alumni)

Photos are not uploaded through Netlify or Google Forms automatically — you must manually add image files to the repo, then point each person’s Markdown file at that file. Until `photo` is set, the site shows **initials** on a colored square instead of a picture.

### Where things live

| What | Folder |
|------|--------|
| Team photos | `public/images/team/profiles/` |
| Alumni photos | `public/images/alumni/profiles/` |
| Team roster text | `src/content/team/*.md` |
| Alumni roster text | `src/content/alumni/*.md` |
| Templates | `src/content/team/template-stub.md`, `src/content/alumni/template-stub.md` |

**New profile:** duplicate `template-stub.md`, rename the file (e.g. `john-doe.md`), fill in the frontmatter, delete comments & instructions, and set `draft: false` when ready to publish.

**Frontmatter fields**

- **Alumni:** `name`, `humYears`, `city`, `bio`, optional `featured`, `draft`, `photo`, `sortOrder`
- **Team:** `name`, `voicePart`, optional `leadershipRole`, `draft`, optional `photo`

Schema rules live in `src/content.config.ts` if you need the technical detail.

### Rules (the build will fail if you break these)

- **Shape:** square **1:1** (cards crop to a square).
- **Size:** **800 × 800** px recommended (640 × 640 is OK if you need a smaller file).
- **File size:** **1 MB max** per image (`npm run build` checks this).
- **Format:** **JPG**. Avoid PNG and WebP for consistency.
- **Filename:** `firstname-lastname.jpg` (lowercase, hyphens). **Spelling and capitalization must match exactly** in the Markdown `photo` line.
- **`photo` path:** always starts with `/images/...`, e.g. `/images/team/profiles/loy-bhowmick.jpg`.

---

### The step-by-step

#### Part A — Get and resize the image

1. **Get the headshot** from your intake flow (Google Form attachment, shared Drive folder, etc.).
2. Open **[Canva Image Resizer](https://www.canva.com/features/image-resizer/)** (free account is fine).
3. Upload the photo.
4. Set dimensions to **800 × 800** (lock aspect ratio to **square** if Canva asks).
5. **Download as JPG.** If the file is still over 1 MB, export at **640 × 640** or lower JPG quality until it’s under 1 MB.
6. **Rename the file** before you save it into the repo, e.g. `arjun-singhal.jpg`. Avoid spaces and special characters.

**Note:** Even if the source already looks square and small, still run it through Canva once so every headshot is consistent.

#### Part B — Add the file to the project

7. In your code editor (or GitHub, if you must), put the JPG in the right folder:
   - **Current team member** → `public/images/team/profiles/`
   - **Alumni** → `public/images/alumni/profiles/`

IMPORTANT: Do **not** put photos under `src/`—only under `public/images/...`.

#### Part C — Link the photo in Markdown

9. Open the person’s `.md` file:
   - Team: `src/content/team/firstname-lastname.md`
   - Alumni: `src/content/alumni/firstname-lastname.md`

10. In the **frontmatter** block between the `---` lines, set `photo` to the **exact** path:

#### Part D — Check locally, then go live

13. From the project folder, run:

```bash
npm run dev
```

14. Open in your browser:
   - Team → **http://localhost:4321/meet-the-team**
   - Alumni → **http://localhost:4321/alumni**
15. Confirm the face shows, isn’t stretched, and the right person appears.
16. **Stage both the Markdown and the image** (new JPGs are easy to forget):

```bash
git add src/content/team/your-person.md public/images/team/profiles/your-person.jpg
git status
```

Under **“Changes to be committed”** you should see **both** the `.md` file and the `.jpg`. If the photo only appears under **“Untracked files”**, it will **not** go to GitHub until you `git add` it.

17. Run a full check (same as Netlify):

```bash
npm run build
```

`npm run build` runs photo validation first. If a `photo:` path points at a file on your laptop that was never `git add`ed, the build **fails** with `photo exists locally but is not in Git`.

If this fails, read the terminal message. Common fixes:

| Error | What to do |
|--------|------------|
| Photo path does not exist | Fix typo in `photo:` or rename the file to match. Case-sensitive. |
| Photo exists locally but is not in Git | `git add public/images/.../your-file.jpg`, then commit |
| File too large | Re-export smaller from Canva (under 1 MB) |
| Collection / frontmatter error | Check `---` lines exist; copy fields from template |

18. **Commit and push** to GitHub. Netlify rebuilds automatically; give it a minute, then refresh the live site.

---

### Quick reference — team vs alumni

| | Team | Alumni |
|---|------|--------|
| Image folder | `public/images/team/profiles/` | `public/images/alumni/profiles/` |
| Markdown folder | `src/content/team/` | `src/content/alumni/` |
| Live page | `/meet-the-team` | `/alumni` |
| Extra frontmatter | `voicePart`, optional `leadershipRole` | `humYears`, `city`, `bio`, optional `featured` |
| Hidden until ready | `draft: true` | `draft: true` |

### Updating someone’s photo

1. Add the new JPG (new name or replace the old file).
2. Update `photo:` if the filename changed.
3. `npm run dev` → `npm run build` → push.

Old unused JPGs in `profiles/` don’t break the site, but you can delete them in a separate cleanup commit to keep the folder tidy.

### Do not

- Commit photos over **1 MB** (build will reject).
- Use Google Drive or form URLs in `photo:`—only paths under `/images/...` in this repo.
- Mix up `.jpg` vs `.JPG` in the path vs filename.
- Delete `template-stub.md`—it stays `draft: true` and is excluded from the public site.

---

## Site updates log

_Add dated entries below whenever behavior, env vars, or maintainer workflows change. Most recent first._

| Date | Change |
|------|--------|
| 2026-05-22 | Removed alumni reunion promo code (`reunion.ts`, `ReunionSiteBand.astro`); past event noted on About timeline only. |
| 2026-05-22 | Link previews: site-wide Open Graph / Twitter image set to `hum-logo.png` in `Layout.astro`; `site` in `astro.config.mjs` (optional override `PUBLIC_SITE_URL`). |
| 2026-05-22 | `validate-profile-photos`: fail build if a referenced headshot exists on disk but was never `git add`ed; README adds explicit `git add` + `git status` step. |
| 2026-05-19 | README: expanded [Alumni profiles](#alumni-profiles-and-team-roster) with full team/alumni headshot workflow (Canva, folders, frontmatter, build validation). |
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
