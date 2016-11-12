import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { language, messages } from './utils/intl';

import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect
} from 'react-router'

import {
  syncHistoryWithStore,
  routerReducer,
  routerActions
} from 'react-router-redux'

import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from './modules/AppViewContainer';
//import Login from '../containers/Login';
//import Register from '../containers/Register';
//import Logout from '../containers/Logout';


import Home from './modules/Home/HomeViewContainer';
import Search from './modules/Search/SearchViewContainer';
import Queue from './modules/Queue/QueueViewContainer';
import LectureDetails from './modules/LectureDetails/LectureDetailsViewContainer';

import Preferences from './modules/Preferences';

import configureStore from './redux/store';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './material_ui_raw_theme_file';
const muiTheme = getMuiTheme(theme);

import {
  setConfiguration
} from './utils/configuration';

setConfiguration('API_ROOT', 'http://localhost:10102');

//Needed for React Developer Tools
window.React = React;

const store = configureStore();

// TODO!!! because of this, browser history not synced to redux even though we use
// react-router-redux!
//
//const history = syncHistoryWithStore(browserHistory, store);
const history = browserHistory;

const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.auth.data,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'requireAuthentication'
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <IntlProvider
        locale={language}
        key={language}
        messages={messages}
      >
        <Router history={history}>
          <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Redirect from='/home' to='/' />
            <Route path='/search' component={Search}/>
            <Route path='/queue' component={Queue}/>
            <Route path='/preferences' component={Preferences}/>
          </Route>
          <Redirect from='*' to='/' />
        </Router>
      </IntlProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
