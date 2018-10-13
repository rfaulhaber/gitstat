import React from 'react';
import { connect } from 'react-redux';
import { queryRepo, queryLanguagesForRepos } from '../../actions/RepoActions';
import { Search, RepoPie } from '../../components';
import { Settings } from '..';
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
            )
            .catch(err => console.log('error', err));
    };

    render() {
        return (
            <div className="Main">
                <div className="Grid">
                    <div className="GraphView">
                        <Search onSearch={this.handleSearch} />
                        <Settings />
                        <div className="Error">
                            {this.props.repoError && <p>Error from GitHub: {this.props.repoError}</p>}
                        </div>
                        <div className="Graph">
                            <RepoPie repos={this.props.repos} type="repo" />
                            {this.state.hasLanguages && <RepoPie repos={this.props.repos} type="language" />}
                        </div>
                    </div>
                    {/* <div className="ToolbarView">
                        <div>Test</div>
                    </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        repos: filterRepos(state.repos.list, state.settings),
        repoError: state.repos.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        repoSearch: query => dispatch(queryRepo(query)),
        queryLanguages: () => dispatch(queryLanguagesForRepos())
    };
};

function filterRepos(repos, settings) {
    if (Array.isArray(repos)) {
        if (settings.includeForks) {
            return repos;
        } else {
            return repos.filter(repo => !repo.fork);
        }
    } else {
        return repos;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
