import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render () {
    return (
      <div className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/battle">Battle</Link></li>
          <li><Link to="/popular">Popular</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
