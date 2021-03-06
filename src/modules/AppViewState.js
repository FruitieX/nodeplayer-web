import { Map } from 'immutable';
import {
  createAction,
  createReducer
} from 'redux-act';

// Action creators
export const closeSnackbar = createAction('Close snackbar');
export const openSnackbar = createAction('Open snackbar');

// Initial state
const initialState = Map({
  snackbarOpen: false,
  snackbarMessage: ''
});

// Reducer
export default createReducer({
  [closeSnackbar]: (state) => state.set('snackbarOpen', false),
  [openSnackbar]: (state, payload) => {
    return state
      .set('snackbarMessage', payload)
      .set('snackbarOpen', true);
  }
}, initialState);
