import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loading from './shared/loading';
import api from '../utils/api';

const SelectLanguage = props => {
  const languages = ['all', 'javascript', 'python', 'ruby', 'php'];

  return (
    <div>
      <div className="popular">
        <ul className="languages">
          {languages.map(lang => {
            return (
              <li
                style={props.selectedLanguage.toLowerCase() === lang ? { color: '#008FFD' }: null }
                onClick={props.onUpdate.bind(null, lang)}
                key={shortid.generate()}>
              {lang}
              </li>
            )
          }, this)}
        </ul>
      </div>
    </div>
  );
}

const RepoListGrid = props => {
  return (
    <div className="popular-list-grid">
      <RepoList repos={props.repos} />
    </div>
  )
};

const RepoList = props => {
  return (
    <ul>
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className="repo-list-item">
            <div>#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
};

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang
    });

    api.fetchPopularRepos(lang, this)
      .then((repos) => {
        this.setState({ repos });
      });
  }

  render () {
    const languages = ['all', 'javascript', 'python', 'ruby', 'php'];
    const repos = this.state.repos;

    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onUpdate={this.updateLanguage}
        />
        {!this.state.repos? <Loading/>: <RepoListGrid repos={this.state.repos} />}
      </div>
    );
  }
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
};

RepoListGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

RepoList.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Popular;
