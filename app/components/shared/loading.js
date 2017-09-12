import React from 'react';
import PropTypes from 'prop-types';

const style = {
  component: {
    width: '100%',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    height: '100px',
    lineHeight: '100px'
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    };
  }

  componentDidMount() {
    const stopper = this.state.text + '...';
    this.interval = window.setInterval(function () {
      if (this.state.text === stopper) {
        this.setState({
          text: this.props.text
        });
      } else {
        this.setState(function (prevState) {
          return {
            text: prevState.text + '.'
          };
        })
      }
    }.bind(this), this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div style={style.component}>{this.state.text}</div>
    );
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

export default Loading;
