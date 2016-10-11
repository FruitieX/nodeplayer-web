import React from 'react';

import Drawer from '../components/Drawer';
import TopBar from '../components/TopBar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Drawer />
        <div style={{ paddingLeft: this.context.muiTheme.drawer.width }} >
          <TopBar />
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

App.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
