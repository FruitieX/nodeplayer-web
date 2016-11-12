import { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: this.context.muiTheme.spacing.desktopGutter / 2
      }}>
      <Card style={{
        margin: this.context.muiTheme.spacing.desktopGutter / 2,
        flex: 1,
        flexBasis: '450px'
      }}>
        <CardText>
          Hello world!
        </CardText>
      </Card>
      </div>
    );
  }
}

Home.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Home;
