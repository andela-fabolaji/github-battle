import React from 'react';
import PropTypes from 'prop-types';

class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const params = [e.target.id, this.state.username];
    this.props.onSubmit(...params);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id={this.props.id}>
        <div>{this.props.label}</div>
        <input
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.username}
          onChange={this.handleChange}
          className="tbox"
        />
        <button
          type="submit"
          className="btn"
          disabled={!this.state.username.length}
        >
        Submit
        </button>
      </form>
    )
  }
}

PlayerForm.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PlayerForm;
