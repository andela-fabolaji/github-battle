import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tbox } from './shared/FormComponents';
import api from '../utils/api';

const PlayerForm = props => {
  return (
    <div>
      <h2>{props.label}</h2>
      <form name={props.name} onSubmit={props.onSubmit}>
        <Tbox
          name={props.name}
          placeholder="Enter your github username"
          value={props.inputValue}
          onChange={props.inputChange}
        />
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

const PlayerDetail = props => {
  return (
    <div>
      <div>
        <img
          className="avatar"
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
      </div>
      <div><a href={props.repoLink}>{props.username}</a></div>
      <a href="" name={props.player} onClick={props.reset}>Reset</a>
    </div>
  )
};

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerA: {
        username: '',
        data: null
      },
      playerB: {
        username: '',
        data: null
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPlayerData = this.getPlayerData.bind(this);
    this.resetPlayer = this.resetPlayer.bind(this);
  }

  getPlayerData(ev) {
    ev.preventDefault();
    ev.persist();

    api.getPlayerData(this.state[ev.target.name].username)
      .then((res) => {
        this.setState({
          [ev.target.name]: {
            username: res[0].login,
            data: res[0]
          }
        });
      });
  }

  resetPlayer(ev) {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: this.initialState[ev.target.name]
    });
  }

  handleSubmit(ev) {
  }

  handleChange(ev) {
    ev.preventDefault();
    this.setState({
      [ev.target.name]: {
        username: ev.target.value,
        data: null
      }
    });
  }

  componentWillMount() {
    this.initialState = this.state;
  }

  render() {
    const playerAReady = !!this.state.playerA.data;
    const playerBReady = !!this.state.playerB.data;
    const playersReady = playerAReady && playerBReady;

    return (
      <div>
        <div className="battle-container">
          <div>
            {
              playerAReady ?
              <PlayerDetail
                player="playerA"
                avatar={this.state.playerA.data.avatar_url}
                username={this.state.playerA.username}
                repoLink={this.state.playerA.data.html_url}
                reset={this.resetPlayer}
              />:
              <PlayerForm
                name="playerA"
                label="Player A"
                inputValue={this.state.playerA.username}
                onSubmit={this.getPlayerData}
                inputChange={this.handleChange}
              />
            }
          </div>
          <div>
            {
              playerBReady ?
              <PlayerDetail
                player="playerB"
                avatar={this.state.playerB.data.avatar_url}
                username={this.state.playerB.username}
                repoLink={this.state.playerB.data.html_url}
                reset={this.resetPlayer}
              />:
              <PlayerForm
                name="playerB"
                label="Player B"
                inputValue={this.state.playerB.username}
                onSubmit={this.getPlayerData}
                inputChange={this.handleChange}
              />
            }
          </div>
        </div>
        <div>
          {playersReady ? <Button name='Battle' onClick={this.handleSubmit} />: ''}
        </div>
      </div>
    );
  }
}

PlayerForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

PlayerDetail.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  repoLink: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Battle;
