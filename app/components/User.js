import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';

class User extends Component {
  constructor(props) {
    super(props);
    this.details = this.props.details;
  }

  render () {
    return (
      <div>
        <h2>{this.details.name}</h2>
        <h4>{this.details.username}</h4>
        <div>
          <h4>List of Friends</h4>
          <ShowFriends list={this.details.friends} />
        </div>
        <div>
          <h4>List of Non Friends</h4>
          <ShowNonFriends list={this.details.friends} />
        </div>
      </div>
    );
  }
}

const ShowFriends = props => {
  const friends = props.list.filter(each => {
    return each.isFriend;
  });

  return (
    <ShowList list={friends} />
  );
}

const ShowNonFriends = props => {
  const nonFriends = props.list.filter(each => {
    return !each.isFriend;
  });

  return (
    <ShowList list={nonFriends} />
  );
}

const ShowList = props => {
  return (
    <ul>
      {props.list.map(each => {
        return <li key={shortid.generate()}>{each.name}</li>
      })}
    </ul>
  );
}

User.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    friends: PropTypes.array.isRequired
  })
};

export default User;
