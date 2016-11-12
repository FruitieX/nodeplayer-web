import { Map, fromJS } from 'immutable';
import {
  createAction,
  createReducer
} from 'redux-act';

// Action creators
export const replaceQueue = createAction('Replace queue');

// Initial state
const initialState = Map({
  queue: []
});

// Reducer
export default createReducer({
  [replaceQueue]: (state, payload) => state.set('queue', payload)
}, initialState);
