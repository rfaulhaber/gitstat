import { queryRepoInfo } from '../modules/github';
export const QUERY_REPO_START = 'QUERY_REPO_START';
export const QUERY_REPO_SUCCESS = 'QUERY_REPO_SUCCESS';
export const QUERY_REPO_FAILURE = 'QUERY_REPO_FAILURE';

export function queryRepo(username) {
	return dispatch => {
		dispatch(queryRepoStart(username));

		return queryRepoInfo(username)
			.then(queryInfo => dispatch(queryRepoSuccess(queryInfo)))
			.catch(err => dispatch(queryRepoFailure(err.response.data.message)));
	};
}

function queryRepoStart(username) {
	return {
		type: QUERY_REPO_START,
		username
	};
}

function queryRepoSuccess(queryResult) {
	return {
		type: QUERY_REPO_SUCCESS,
		queryResult
	};
}

function queryRepoFailure(error) {
	return {
		type: QUERY_REPO_FAILURE,
		error
	};
}
