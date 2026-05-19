/**
 * Single source of truth for alumni profile media limits (square 1:1 — see profile-media.json).
 * `scripts/validate-profile-photos.mjs` reads the same JSON (no TS in Node script).
 * Bump `profilePhotoMaxBytes` in profile-media.json when you intentionally raise the cap.
 */
import media from './profile-media.json' with { type: 'json' };

/** Web path prefix for profile images committed to the repo (enforced in content schema + validation script). */
export const ALUMNI_PROFILE_PHOTO_PREFIX = '/images/alumni/profiles/' as const;

export const ALUMNI_PROFILE_PHOTO_MAX_BYTES = media.profilePhotoMaxBytes;

export const ALUMNI_PROFILE_PHOTO_RECOMMENDED_WIDTH = media.recommendedWidth;

export const ALUMNI_PROFILE_PHOTO_RECOMMENDED_HEIGHT = media.recommendedHeight;

export const ALUMNI_PROFILE_PHOTO_MAX_LABEL = formatBytes(ALUMNI_PROFILE_PHOTO_MAX_BYTES);

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	const kb = bytes / 1024;
	if (kb < 1024) return `${kb % 1 === 0 ? kb : kb.toFixed(1)} KB`;
	const mb = bytes / (1024 * 1024);
	return `${mb % 1 === 0 ? mb : mb.toFixed(1)} MB`;
}
