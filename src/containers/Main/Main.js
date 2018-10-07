import React from 'react';
import { connect } from 'react-redux';
import { queryRepo, queryLanguagesForRepos } from '../../actions/RepoActions';
import { Search } from '../../components';
import RepoPie from '../../components/RepoPie/RepoPie';
import './Main.css';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hasLanguages: false
		};
	}

	handleSearch = query => {
		this.props
			.repoSearch(query)
			.then(this.props.queryLanguages)
			.then(() =>
				this.setState({
					hasLanguages: true
				})
			);
	};

	render() {
		return (
			<div className="Main">
				<Search onSearch={this.handleSearch} />
				<div className="Error">{this.props.repoError && <p>Error from GitHub: {this.props.repoError}</p>}</div>
				<div className="Graph">
					<RepoPie repos={this.props.repos} type="repo" />
					{this.state.hasLanguages && <RepoPie repos={this.props.repos} type="language" />}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		repos: state.repos.list,
		repoError: state.repos.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		repoSearch: query => dispatch(queryRepo(query)),
		queryLanguages: () => dispatch(queryLanguagesForRepos())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
