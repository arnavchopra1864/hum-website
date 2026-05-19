/**
 * Alumni reunion announcement — marquee band on the homepage (`src/pages/index.astro`) and a dedicated section on `/alumni`.
 * Set REUNION_SITE_BAND_ENABLED to false after the event to hide the band.
 */
export const REUNION_SITE_BAND_ENABLED = true;

/** Single sentence for the thin homepage marquee band. */
export const REUNION_SITE_BAND_MESSAGE =
	"Celebrate 25 years with us in Austin! Join us on May 23rd!";

export const REUNION_SITE_BAND_CTA_LABEL = 'Reunion details';

/** Hash target for the band CTA; must match the section `id` on /alumni. */
export const REUNION_ANCHOR_ID = 'alumni-reunion' as const;

/** Dedicated block on the alumni page (below the hub hero). */
export const REUNION_SECTION_EYEBROW = "You're invited";
export const REUNION_SECTION_HEADING = 'Celebrate 25 years with us in Austin!';

/** Stacked paragraphs on `/alumni#alumni-reunion` above the ticket button (edit freely). */
export const REUNION_SECTION_PARAGRAPHS = [
	`It's Hum's 25th anniversary, and that calls for celebration! Join the entire extended Humily for a full day of reunion in Austin on May 23rd.`,
	`Here's the playbook: invite friends & family Saturday morning to Zilker Park for breezy field day activities in the morning, then meet us back on North Lamar for the alum-only banquet honoring the milestone.`,
	`Get your tickets on Eventbrite before it's too late!`,
] as const satisfies readonly string[];


/** 25th anniversary — public ticket & RSVPs on Eventbrite. */
export const REUNION_EVENTBRITE_TICKETS_URL =
	'https://www.eventbrite.com/e/hum-25th-year-anniversary-tickets-1978786807609' as const;

export const REUNION_TICKET_CTA_LABEL = 'Get tickets now';
