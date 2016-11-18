import { fromJS } from 'immutable';
//import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutablejs';
//import { loop, combineReducers } from 'redux-loop';
//import { routerReducer } from 'react-router-redux';
import menuDrawerReducer from '../modules/MenuDrawer/MenuDrawerState';
import appViewReducer from '../modules/AppViewState';
import serverReducer from '../modules/Server/ServerState';
import { intlReducer } from 'react-intl-redux'

const reducers = {
  // Menu drawer state
  drawer: menuDrawerReducer,

  // App view state
  appView: appViewReducer,

  // Server state
  serverState: serverReducer,
  // Routing state
  //routing: routerReducer,

  // Internationalization state (TODO!)
  intl: intlReducer
}

const namespacedReducer = combineReducers(
  reducers
);

export default function rootReducer(state = fromJS({}), action) {
  const nextState = namespacedReducer(state, action);

  // enforce the state is immutable
  //return loop(fromJS(nextState), effects);
  return nextState;
}
