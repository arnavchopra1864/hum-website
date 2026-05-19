/**
 * Build-time guardrails for team + alumni profile images.
 * - Every file under public/images/{team,alumni}/profiles/ must be <= profilePhotoMaxBytes.
 * - Every markdown frontmatter `photo` path must exist on disk.
 *
 * Resize manually to square 1:1 (see recommended size in src/constants/profile-media.json).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const mediaPath = join(root, 'src/constants/profile-media.json');
const { profilePhotoMaxBytes, recommendedWidth, recommendedHeight, recommendedAspectRatio } =
	JSON.parse(readFileSync(mediaPath, 'utf8'));

const PROFILE_DIRS = [
	{
		label: 'alumni',
		publicDir: join(root, 'public/images/alumni/profiles'),
		contentDir: join(root, 'src/content/alumni'),
		pathPrefix: '/images/alumni/profiles/',
	},
	{
		label: 'team',
		publicDir: join(root, 'public/images/team/profiles'),
		contentDir: join(root, 'src/content/team'),
		pathPrefix: '/images/team/profiles/',
	},
];

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

function formatBytes(n) {
	if (n < 1024) return `${n} B`;
	const kb = n / 1024;
	if (kb < 1024) return `${kb < 10 && kb % 1 !== 0 ? kb.toFixed(1) : Math.round(kb)} KB`;
	const mb = n / (1024 * 1024);
	return `${mb < 10 && mb % 1 !== 0 ? mb.toFixed(1) : Math.round(mb)} MB`;
}

function walkFiles(dir, acc = []) {
	if (!existsSync(dir)) return acc;
	for (const name of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, name.name);
		if (name.isDirectory()) walkFiles(p, acc);
		else acc.push(p);
	}
	return acc;
}

function extractPhotoFromMarkdown(content) {
	const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!m) return null;
	for (const line of m[1].split(/\r?\n/)) {
		const trimmed = line.trimStart();
		if (!trimmed.startsWith('photo:')) continue;
		let val = trimmed.slice('photo:'.length).trim();
		if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
			val = val.slice(1, -1);
		}
		if (!val || val === 'null' || val === '~') return null;
		return val;
	}
	return null;
}

const errors = [];

for (const { label, publicDir, contentDir, pathPrefix } of PROFILE_DIRS) {
	if (existsSync(publicDir)) {
		for (const abs of walkFiles(publicDir)) {
			const rel = relative(root, abs);
			const base = abs.split(/[/\\]/).pop() ?? '';
			if (base.startsWith('.') && base !== '.gitkeep') continue;
			if (base === '.gitkeep') continue;
			if (!IMAGE_EXT.test(base)) continue;
			const st = statSync(abs);
			if (st.size > profilePhotoMaxBytes) {
				errors.push(
					`[${label}] ${rel} is ${formatBytes(st.size)} (max ${formatBytes(profilePhotoMaxBytes)}).`,
				);
			}
		}
	}

	if (existsSync(contentDir)) {
		for (const name of readdirSync(contentDir)) {
			if (!name.endsWith('.md') || name === 'template-stub.md') continue;
			const mdPath = join(contentDir, name);
			const content = readFileSync(mdPath, 'utf8');
			const photo = extractPhotoFromMarkdown(content);
			if (!photo || photo.includes('[') || photo.includes(']')) continue;
			if (!photo.startsWith(pathPrefix)) {
				errors.push(`[${label}] ${name}: photo must use path prefix ${pathPrefix}`);
				continue;
			}
			const relPublic = photo.replace(/^\//, '');
			const abs = join(root, 'public', relPublic);
			if (!existsSync(abs)) {
				errors.push(`[${label}] ${name}: photo file missing on disk: public/${relPublic}`);
				continue;
			}
			const st = statSync(abs);
			if (st.size > profilePhotoMaxBytes) {
				errors.push(
					`[${label}] ${name}: ${photo} is ${formatBytes(st.size)} (max ${formatBytes(profilePhotoMaxBytes)}).`,
				);
			}
		}
	}
}

if (errors.length) {
	console.error('[validate-profile-photos] Failed:\n\n' + errors.map((e) => '  - ' + e).join('\n'));
	process.exit(1);
}

console.log(
	`[validate-profile-photos] OK (≤ ${formatBytes(profilePhotoMaxBytes)}; recommended ${recommendedWidth}×${recommendedHeight} ${recommendedAspectRatio})`,
);
