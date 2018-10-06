import axios from 'axios';

export function queryRepoInfo(user) {
	return axios.get(repoURL(user)).then(response => response.data);
}

function repoURL(username) {
	return `https://api.github.com/users/${username}/repos?per_page=1000`;
}
