import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';
import Loading from './shared/Loading';
import PlayerPreview from './shared/PlayerPreview';
import api from '../utils/api';

const Profile = props => {
  const info = props.info;

  return (
    <PlayerPreview
      avatar={info.avatar_url}
      username={info.login}
    >
      <ul>
        <li>{info.name}</li>
        <li>{info.followers}</li>
        <li>{info.following}</li>
        <li>{info.public_repos}</li>
      </ul>
    </PlayerPreview>
  );
};

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      loading: true,
      error: null
    };
  }

  componentWillMount() {
    const { playerOneUsername, playerTwoUsername } = QueryString.parse(this.props.location.search);

    api.battle([playerOneUsername, playerTwoUsername])
      .then((res) => {
        if (res === null) {
          this.setState({
            loading: false,
            error: 'Something happened. Check that users exist on github'
          });
        }

        this.setState({
          winner: res[0],
          loser: res[1],
          loading: false,
          error: null
        });
      })
  }

  render() {
    const winner = this.state.winner;
    const loser = this.state.loser;
    const error = this.state.error;
    const loading = this.state.loading;

    if (loading === true) {
      return (
        <p>Loading</p>
      );
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div>
        <div className="battle-container">
          <div style={{ textAlign: 'center' }}>
            <h1>Winner</h1>
            <h4>{winner.score}</h4>
            {winner.profile.avatar_url !== null &&
              <Profile info={winner.profile}/>
            }
          </div>
          <div>
            <h1>Loser</h1>
            <h4>{loser.score}</h4>
            {loser.profile.avatar_url !== null &&
              <Profile info={loser.profile}/>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
