import React from 'react';
import { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getConfiguration } from '../utils/configuration';
import * as ws from '../services/websockets';
//import rest from '../reducers/api';

import MenuDrawer from './MenuDrawer/MenuDrawerViewContainer';
import Header from './Header/HeaderViewContainer';
import Snackbar from 'material-ui/Snackbar';

import * as AppViewState from './AppViewState';

// 1 hour
const jwtRefreshInterval = 1000 * 60 * 60;

const styles = {
  audioTag: {
    display: 'none'
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.jwtTimer = null;
    this.lastPos = -1;
    this.lastSrc = null;
    this.lastPosDate = -1;
  }

  componentDidMount() {
    ws.init(this.props.dispatch);
    /*
    this.jwtTimer = setInterval(_ => {
      console.log('renewing auth token');
      this.props.dispatch(rest.actions.renewAuth());
    }, jwtRefreshInterval);

    console.log('renewing auth token');
    this.props.dispatch(rest.actions.renewAuth());
    */
  }

  componentDidUpdate() {
    const audio = this.refs.audioTag;
    const np = this.props.nowPlaying;

    let audioSrc = null;
    let curPos = -1;

    const apiRoot = getConfiguration('API_ROOT');
    if (np) {
      const npPath = `${np.backendName}/${np.songId}.${np.format}`;
      audioSrc = `${apiRoot}/api/v1/song/${npPath}`;

      curPos = np.playback.curPos / 1000;

      if (this.lastPosDate === this.props.playbackPosDate) {
        return;
      }

      this.lastPos = curPos;
      this.lastSrc = audioSrc;
      this.lastPosDate = this.props.playbackPosDate;
    } else {
      audioSrc = null;

      this.lastPos = curPos;
      this.lastSrc = audioSrc;
      this.lastPosDate = this.props.playbackPosDate;
    }

    audio.src = audioSrc;
    audio.currentTime = curPos;
    audio.autoplay = true;
  }

  componentWillUnmount() {
    if (this.jwtTimer) {
      clearInterval(this.jwtTimer);
    }

    this.jwtTimer = null;
  }

  closeSnackbar() {
    this.props.dispatch(AppViewState.closeSnackbar());
  }

  render() {
    return(
      <div>
        <audio ref='audioTag' />
        <MenuDrawer pathname={this.props.location.pathname} />
        <Header pathname={this.props.location.pathname} params={this.props.params} />
        {React.cloneElement(this.props.children, this.props)}
        <Snackbar
          open={this.props.snackbarOpen}
          message={this.props.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={() => this.closeSnackbar()} />
      </div>
    );
  }
}

function select(state, ownProps) {
  return {
    location: ownProps.location,
    params: ownProps.params
  };
}

export default connect(select)(App);
