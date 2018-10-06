import axios from 'axios';

export function queryRepoInfo(user) {
	return axios.get(repoURL(user)).then(response => response.data);
}

export function queryLanguageForRepo(repo) {}

function repoURL(username) {
	return `https://api.github.com/users/${username}/repos?per_page=1000`;
}

function languageURL(username, repo) {
	return `https://api.github.com/users/${username}/${repo}/languages`;
}
