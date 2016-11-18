import {connect} from 'react-redux';
import AppView from './AppView';

export default connect(
  state => ({
    isReady: state.getIn(['session', 'isReady']),
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
    nowPlaying: state.getIn(['serverState', 'nowPlaying']),
    playbackPosDate: state.getIn(['serverState', 'playbackPosDate']),
    snackbarOpen: state.getIn(['appView', 'snackbarOpen']),
    snackbarMessage: state.getIn(['appView', 'snackbarMessage'])
  })
)(AppView);
