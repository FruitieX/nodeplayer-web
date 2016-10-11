import React from 'react';
import ReactDOM from 'react-dom';

import {
  Router,
  Route,
  browserHistory,
  Redirect,
  IndexRoute,
} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './theme';
const muiTheme = getMuiTheme(theme);

// Needed for React Developer Tools
window.React = React;

// Containers
import App from './containers/App';

// Components
import Queue from './components/Queue';

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Queue}/>
      </Route>
      <Redirect from='*' to='/' />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
