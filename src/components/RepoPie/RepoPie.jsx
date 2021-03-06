import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Object } from 'core-js';

class RepoPie extends React.Component {
	render() {
		let render;

		if (this.props.repos) {
			const data = calculateDataByType(this.props.repos, this.props.type);
			render = <div style={{ height: 600 }}>
				<h2>{this.props.type === 'repo' ? 'Languages by Repo' : 'Languages by Line'}</h2>
				<ResponsivePie 
					data={data} 
					margin={{ top: 30, bottom: 30 }} 
					innerRadius={0.75} 
					colors="pastel2" 
					slicesLabelsSkipAngle={5} 
					radialLabelsSkipAngle={5}
					/>
            </div>;
		} else {
			render = <div/>
		}

		return render;
	}
}

export default RepoPie;

function calculateDataByType(repos, type) {
	if (Array.isArray(repos)) {
		if (type === 'repo') {
			return calculateDataByRepos(repos);
		} else if (type === 'language') {
			return calculateDataByLanguage(repos);
		} else {
			return [];
		}
	} else {
		return [];
	}
}

// TODO add list of repo URLs
function calculateDataByRepos(repos) {
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
}

function calculateDataByLanguage(repos) {
	const langInfos = repos.map(repo => repo.languageInfo).reduce((data, info) => {
		const languages = Object.keys(info);

		const newData = {};

		languages.forEach(language => {
			if (data[language]) {
				newData[language] = data[language] + info[language];
			} else {
				newData[language] = info[language];
			}
		});

		return Object.assign({}, data, newData);
	}, {});

	return Object.keys(langInfos).map(lang => ({
		id: lang,
		label: lang,
		value: langInfos[lang]
	}));
}
