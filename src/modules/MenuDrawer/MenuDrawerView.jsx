import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppBar, Divider, Drawer, MenuItem } from 'material-ui';
import { push } from 'react-router-redux'
import { MenuRoutes } from '../../utils/routes';

import * as MenuDrawerState from './MenuDrawerState';

// icons
import Home from 'material-ui/svg-icons/action/home';
import Feedback from 'material-ui/svg-icons/action/assessment';
import Search from 'material-ui/svg-icons/action/search';
import Queue from 'material-ui/svg-icons/av/queue';
import Preferences from 'material-ui/svg-icons/action/settings';
import Logout from 'material-ui/svg-icons/action/exit-to-app';

let icons = {
  '/': Home,
  '/search': Search,
  '/queue': Queue,
  '/preferences': Preferences,
  '/logout': Logout
}

class MenuDrawer extends Component {
  changeView(view) {
    //this.props.actions.changeView(view)
    this.props.dispatch(MenuDrawerState.closeDrawer());
    this.props.dispatch(push(view.toLowerCase()));
  }

  onChange(open) {
    this.props.dispatch(MenuDrawerState.toggleDrawer());
  }

  render() {
    return (
      <Drawer
        open={this.props.drawerOpened}
        docked={false}
        onRequestChange={() => this.onChange()} >

        <AppBar title={<FormattedMessage id='navigation' />}
                onLeftIconButtonTouchTap={() => this.props.dispatch(MenuDrawerState.closeDrawer())} />

        {Object.keys(MenuRoutes).map((path, i) => {
            return(
              <MenuItem
                leftIcon={React.createElement(icons[path])}
                key={`MenuItem${i}`}
                style={{color: this.props.pathname === path ? this.context.muiTheme.palette.primary1Color : null}}
                onTouchTap={() => {this.changeView(path)}}>

                <FormattedMessage id={MenuRoutes[path]} />
              </MenuItem>
            );
          })
        }

        <Divider />

        <MenuItem
          leftIcon={<Preferences/>}
          onTouchTap={() => {this.changeView('/preferences')}}
          style={{color: this.props.pathname === '/preferences' ? this.context.muiTheme.palette.primary1Color : null}} >

          <FormattedMessage id='routePreferences' />
        </MenuItem>

        <MenuItem
          leftIcon={<Logout/>}
          onTouchTap={() => { this.changeView('/logout'); }} >
          <FormattedMessage id='routeLogout' />
        </MenuItem>
      </Drawer>
    );
  }
}

MenuDrawer.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

function select(state, ownProps) {
  return {
    view: state.ui.get('view'),
    drawerOpened: state.ui.get('drawerOpened')
  };
}

export default MenuDrawer;
