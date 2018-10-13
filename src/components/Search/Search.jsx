import React from 'react';
import './Search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: ''
		};
	}

	onSearch = () => {
		const { onSearch } = this.props;
		if (onSearch && typeof onSearch === 'function') {
			onSearch(this.state.query);
		}
	};

	handleEnter = event => {
		if (event.key === 'Enter') {
			this.onSearch();
		}
	};

	changeQueryText = event => {
		this.setState({
			query: event.target.value
		});
	};

	render() {
		return (
			<div>
				<span>
					github.com/
					<input type="text" onKeyPress={this.handleEnter} onChange={this.changeQueryText} />
					<button onClick={this.onSearch}>Search</button>
				</span>
			</div>
		);
	}
}

export default Search;
