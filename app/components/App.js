import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import Popular from './Popular';
import Battle from './Battle';

class App extends Component {
  render () {
    return(
      <Router>
        <div className="main">
          <Navigation />
          <PrimaryRoutes />
        </div>
      </Router>
    )
  }
}

const PrimaryRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/battle" component={Battle}/>
      <Route path="/popular" component={Popular}/>
      <Route render={() => <p>Page Not found</p>}/>
    </Switch>
  )
}

export default App;
