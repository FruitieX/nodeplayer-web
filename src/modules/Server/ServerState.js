import { Map, fromJS } from 'immutable';
import {
  createAction,
  createReducer
} from 'redux-act';

// Action creators
export const replaceQueue = createAction('Replace queue');
export const play = createAction('Play');
export const stop = createAction('Stop');
export const pause = createAction('Pause');

// Initial state
const initialState = Map({
  queue: [],
  nowPlaying: null,
  playbackPos: 0,
  playbackPosDate: new Date().getTime(),
  play: false,
  pause: false
});

// Reducer
export default createReducer({
  [replaceQueue]: (state, payload) => state.set('queue', payload),
  [play]: (state, payload) => {
    const date = new Date().getTime();
    return state
      .set('nowPlaying', payload)
      .set('playbackPosDate', date);
  },
  [stop]: (state, payload) => {
    return state
      .set('nowPlaying', null)
      .set('pause', false);
  },
  [pause]: (state, payload) => {
    const date = new Date().getTime();
    const oldDate = state.get('playbackPosDate');
    const oldPos = state.get('playbackPos');
    return state
      .set('pause', true)
      .set('play', false)
      .set('playbackPos', oldPos + (date - oldDate))
      .set('playbackPosDate', date);
  }
}, initialState);
