export const INCLUDE_FORKS = 'INCLUDE_FORKS';
export const EXCLUDE_FORKS = 'EXCLUDE_FORKS';

export function includeForks() {
	return {
		type: INCLUDE_FORKS
	};
}

export function excludeForks() {
	return {
		type: EXCLUDE_FORKS
	};
}
