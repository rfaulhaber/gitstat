import { queryRepoInfo, queryLanguageForRepo } from '../modules/github';

export const QUERY_REPO_START = 'QUERY_REPO_START';
export const QUERY_REPO_SUCCESS = 'QUERY_REPO_SUCCESS';
export const QUERY_REPO_FAILURE = 'QUERY_REPO_FAILURE';

export const QUERY_LANGUAGE_START = 'QUERY_LANGUAGE_START';
export const QUERY_LANGUAGE_SUCCESS = 'QUERY_LANGUAGE_SUCCESS';
export const QUERY_LANGUAGE_FAILURE = 'QUERY_LANGUAGE_FAILURE';

export function queryRepo(username) {
	return dispatch => {
		dispatch(queryRepoStart(username));

		return queryRepoInfo(username)
			.then(queryInfo => dispatch(queryRepoSuccess(queryInfo)))
			.catch(err => dispatch(queryRepoFailure(err.response.data.message)));
	};
}

export function queryLanguagesForRepos() {
	return (dispatch, getState) => {
		dispatch(queryLanguageStart());

		const urls = getState().repos.list.map(repo => repo.languages_url);

		const reqs = urls.map(url => queryLanguageForRepo(url));

		return Promise.all(reqs)
			.then(results => dispatch(queryLanguageSuccess(results)))
			.catch(err => dispatch(queryLanguageFailure(err)));
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

function queryLanguageStart() {
	return {
		type: QUERY_LANGUAGE_START
	};
}

function queryLanguageSuccess(languages) {
	return {
		type: QUERY_LANGUAGE_SUCCESS,
		languages
	};
}

function queryLanguageFailure(error) {
	return {
		type: QUERY_LANGUAGE_FAILURE,
		error
	};
}
