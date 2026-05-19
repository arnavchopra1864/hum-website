/**
 * Roster order: soprano → alto → tenor → baritone → bass → beatboxer, then unknown.
 * `baritone` is matched before `tenor` because "baritone" contains "tenor".
 */
const UNKNOWN_RANK = 6;

export function voicePartRank(voicePart: string): number {
	const n = voicePart.toLowerCase().trim();
	if (n.includes('baritone')) return 3;
	if (n.includes('soprano')) return 0;
	if (n.includes('alto')) return 1;
	if (n.includes('tenor')) return 2;
	if (n.includes('bass')) return 4;
	if (n.includes('beatbox') || n.includes('beat box') || n.includes('vocal percussion')) return 5;
	return UNKNOWN_RANK;
}

export function compareTeamByVoiceThenName(
	a: { data: { voicePart: string; name: string } },
	b: { data: { voicePart: string; name: string } },
): number {
	const ra = voicePartRank(a.data.voicePart);
	const rb = voicePartRank(b.data.voicePart);
	if (ra !== rb) return ra - rb;
	return a.data.name.localeCompare(b.data.name);
}
