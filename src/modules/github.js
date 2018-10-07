import axios from 'axios';

const getData = response => response.data;

export function queryRepoInfo(user) {
	return axios.get(repoURL(user)).then(getData);
}

export function queryLanguageForRepo(langURL) {
	return axios.get(langURL).then(getData);
}

function repoURL(username) {
	return `https://api.github.com/users/${username}/repos?per_page=1000`;
}

function languageURL(username, repo) {
	return `https://api.github.com/users/${username}/${repo}/languages`;
}
