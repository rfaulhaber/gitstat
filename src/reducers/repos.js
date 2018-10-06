import { QUERY_REPO_START, QUERY_REPO_SUCCESS, QUERY_REPO_FAILURE } from '../actions/RepoActions';

export default function repos(state = {}, action) {
	switch (action.type) {
		case QUERY_REPO_START:
			return Object.assign({}, state, {
				loading: true,
				username: action.username
			});
		case QUERY_REPO_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				list: action.queryResult
			});
		case QUERY_REPO_FAILURE:
			return Object.assign({}, state, {
				loading: false,
				error: action.error
			});
		default:
			return state;
	}
}
