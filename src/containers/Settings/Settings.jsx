import React from 'react';
import { connect } from 'react-redux';
import { includeForks, excludeForks } from '../../actions/SettingsActions';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			includeForks: props.forks
		};
	}

	handleChange = event => {
		const { checked } = event.target;

		if (checked) {
			this.props.includeForks();
		} else {
			this.props.excludeForks();
		}

		this.setState({
			includeForks: checked
		});
	};

	render() {
		return (
			<div>
				<input type="checkbox" id="checkbox" onChange={this.handleChange} checked={this.state.includeForks} />
				<label htmlFor="checkbox">Include forks</label>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		forks: state.settings.includeForks
	};
};

const mapDispatchToProps = dispatch => {
	return {
		includeForks: () => dispatch(includeForks()),
		excludeForks: () => dispatch(excludeForks())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
