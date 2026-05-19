import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ALUMNI_PROFILE_PHOTO_PREFIX } from './constants/alumni';
import { TEAM_PROFILE_PHOTO_PREFIX } from './constants/team';

const alumni = defineCollection({
	loader: glob({
		pattern: ['**/*.md', '!**/template-stub.md'],
		base: './src/content/alumni',
	}),
	schema: z.object({
		name: z.string(),
		humYears: z.string(),
		city: z.string(),
		bio: z.string(),
		featured: z.boolean().optional().default(false),
		draft: z.boolean().optional().default(false),
		photo: z
			.string()
			.optional()
			.refine(
				(val) => val === undefined || val.startsWith(ALUMNI_PROFILE_PHOTO_PREFIX),
				{ message: `photo must start with ${ALUMNI_PROFILE_PHOTO_PREFIX}` },
			),
		sortOrder: z.number().optional().default(1000),
	}),
});

const team = defineCollection({
	loader: glob({
		pattern: ['**/*.md', '!**/template-stub.md'],
		base: './src/content/team',
	}),
	schema: z.object({
		name: z.string(),
		voicePart: z.string(),
		leadershipRole: z.string().optional(),
		draft: z.boolean().optional().default(false),
		photo: z
			.string()
			.optional()
			.refine(
				(val) => val === undefined || val.startsWith(TEAM_PROFILE_PHOTO_PREFIX),
				{ message: `photo must start with ${TEAM_PROFILE_PHOTO_PREFIX}` },
			),
	}),
});

const music = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/music' }),
	schema: z.object({
		title: z.string(),
		eyebrow: z.string(),
		kind: z.enum(['streaming', 'archive', 'coming_soon']),
		/** Short lead; use YAML `|` for multiple lines. */
		description: z.string(),
		/** Link out (YouTube Music, shared Drive folder, etc.). Omit until the URL is ready. */
		externalUrl: z.string().url().optional(),
		ctaLabel: z.string().optional().default('Open'),
		draft: z.boolean().optional().default(false),
		sortOrder: z.number().optional().default(1000),
	}),
});

const pages = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		whoWeAre: z.string(),
		/**
		 * Chronological list for Awards/Accomplishments/Press, rendered as a horizontal timeline on /about.
		 * Keep entries lightweight and link out for details/media when possible.
		 */
		timeline: z
			.array(
				z.object({
					dateLabel: z.string(),
					title: z.string(),
					body: z.string(),
					href: z.string().url().optional(),
					hrefLabel: z.string().optional(),
					tag: z.enum(['award', 'press', 'milestone', 'release', 'performance']).optional(),
				}),
			)
			.default([]),
		alumniImpact: z.string(),
		showRequestPerformanceCta: z.boolean().optional().default(true),
		showSupportCta: z.boolean().optional().default(true),
	}),
});

export const collections = { alumni, music, pages, team };
