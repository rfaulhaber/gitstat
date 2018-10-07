import { INCLUDE_FORKS, EXCLUDE_FORKS } from '../actions/SettingsActions';

const initialState = {
	includeForks: false
};

export default function settings(state = initialState, action) {
	switch (action.type) {
		case INCLUDE_FORKS:
			return Object.assign({}, state, {
				includeForks: true
			});
		case EXCLUDE_FORKS:
			return Object.assign({}, state, {
				includeForks: false
			});
		default:
			return state;
	}
}
