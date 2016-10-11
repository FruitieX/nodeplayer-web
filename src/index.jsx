import React from 'react';
import ReactDOM from 'react-dom';

import {
  Router,
  Route,
  browserHistory,
  Redirect,
} from 'react-router';

import App from './containers/App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './theme';
const muiTheme = getMuiTheme(theme);

// Needed for React Developer Tools
window.React = React;

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Redirect from='*' to='/' />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
