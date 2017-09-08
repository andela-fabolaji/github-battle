import React from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {
  return (
    <button
      type="submit"
      className="btn"
      onClick={props.onClick}
    >
    {props.name}
    </button>
  )
};

export const Tbox = (props) => {
  return (
    <div>
      <input
        type="text"
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="tbox"
      />
    </div>
  );
};

Button.defaultProps = {
  name: 'Submit'
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

Tbox.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
