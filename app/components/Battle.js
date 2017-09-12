import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerForm from './shared/PlayerForm';
import { Button } from './shared/FormComponents';
import PlayerPreview from './shared/PlayerPreview';
import api from '../utils/api';

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneUsername: '',
      playerOneImage: null,
      playerTwoUsername: '',
      playerTwoImage: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.battle = this.battle.bind(this);
  }

  battle() {
    console.log('battle');
  }

  handleReset(id) {
    this.setState({
      [id + 'Username']: '',
      [id + 'Image']: null,
    });
  }

  handleSubmit(id, username) {
    this.setState({
      [id + 'Username']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`
    });
  }

  componentWillMount() {
    this.initialState = this.state;
  }

  render() {
    const playerOneUsername = this.state.playerOneUsername;
    const playerTwoUsername = this.state.playerTwoUsername;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className="battle-container">
          <div>
          {!playerOneUsername.length &&
            <PlayerForm
              name="playerOne"
              id="playerOne"
              placeholder="Enter github username"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          }

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={this.state.playerOneImage}
              username={playerOneUsername}
            >
              <a onClick={this.handleReset.bind(null, 'playerOne')}>Reset</a>
            </PlayerPreview>
          }
          </div>
          <div>
          {!playerTwoUsername.length &&
            <PlayerForm
              name="playerTwo"
              id="playerTwo"
              placeholder="Enter github username"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          }

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={this.state.playerTwoImage}
              username={playerTwoUsername}
            >
              <a onClick={this.handleReset.bind(null, 'playerTwo')}>Reset</a>
            </PlayerPreview>
          }
          </div>
        </div>
        {playerOneImage && playerTwoImage &&
          <Link to={{
            pathname: this.props.match.url + '/results',
            search: `?playerOneUsername=${playerOneUsername}&playerTwoUsername=${playerTwoUsername}`
          }}>Battle
          </Link>
        }
      </div>
    );
  }
}

export default Battle;
