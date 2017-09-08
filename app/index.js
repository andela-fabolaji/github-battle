import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
require('./app.css');

render(<App />, document.querySelector('#app'));
