import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Object } from 'core-js';

class RepoPie extends React.Component {
	render() {
		const data = calculateDataByType(this.props.repos, this.props.type);
		return (
			<div style={{ height: 400 }}>
				<ResponsivePie data={data} margin={{ top: 30, bottom: 30 }} innerRadius={0.75} />;
			</div>
		);
	}
}

export default RepoPie;

function calculateDataByType(repos, type) {
	console.log('type', type);
	if (type === 'repo') {
		return calculateDataByRepos(repos);
	} else if (type === 'language') {
		return calculateDataByLanguage(repos);
	} else {
		return [];
	}
}

function calculateDataByRepos(repos) {
	if (Array.isArray(repos)) {
		const reposByLanguage = repos.reduce((data, repo) => {
			if (data[repo.language]) {
				return Object.assign({}, data, {
					[repo.language]: data[repo.language] + 1
				});
			} else {
				return Object.assign({}, data, {
					[repo.language]: 1
				});
			}
		}, {});

		return Object.keys(reposByLanguage).map(lang => ({
			id: lang,
			label: lang,
			value: reposByLanguage[lang]
		}));
	} else {
		return [];
	}
}

function calculateDataByLanguage(repos) {}
