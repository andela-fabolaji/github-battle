import React from 'react';
import PropTypes from 'prop-types';

const Loading = props => <div>{props.text}</div>;

Loading.defaultProps = {
  text: '...Loading'
};

export default Loading;
