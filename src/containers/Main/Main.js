import React from 'react';
import { connect } from 'react-redux';
import { queryRepo } from '../../actions/RepoActions';
import { Search } from '../../components';

class Main extends React.Component {
	handleSearch = query => {
		this.props.repoSearch(query);
	};

	render() {
		return (
			<div>
				<Search onSearch={this.handleSearch} />
				<p>This is the main page</p>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		repoSearch: query => dispatch(queryRepo(query))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Main);
