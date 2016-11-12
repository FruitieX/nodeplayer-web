import React from 'react';
import { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//import rest from '../reducers/api';

import RaisedButton from 'material-ui/RaisedButton';
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
  }

  componentDidMount() {
    /*
    this.jwtTimer = setInterval(_ => {
      console.log('renewing auth token');
      this.props.dispatch(rest.actions.renewAuth());
    }, jwtRefreshInterval);

    console.log('renewing auth token');
    this.props.dispatch(rest.actions.renewAuth());
    */
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
        <audio src={this.props.audioSrc} autoPlay='true' style={styles.audioTag} />
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
