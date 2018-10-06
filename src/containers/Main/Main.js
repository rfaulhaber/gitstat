import React from 'react';
import { connect } from 'react-redux';
import { queryRepo } from '../../actions/RepoActions';
import { Search } from '../../components';
import RepoPie from '../../components/RepoPie/RepoPie';

class Main extends React.Component {
	handleSearch = query => {
		this.props.repoSearch(query);
	};

	render() {
		return (
			<div>
				<Search onSearch={this.handleSearch} />
				<RepoPie repos={this.props.repos} type="repo" />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		repos: state.repos.list
	};
};

const mapDispatchToProps = dispatch => {
	return {
		repoSearch: query => dispatch(queryRepo(query))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
