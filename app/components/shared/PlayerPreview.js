import React from 'react';
import PropTypes from 'prop-types';

const PlayerPreview = props => {
  return (
    <div>
      <div>
        <img
          className="avatar"
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
      </div>
      <div><a href={'https://github.com/'+props.username}>@{props.username}</a></div>
      {props.children}
    </div>
  )
};

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PlayerPreview
