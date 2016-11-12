import {connect} from 'react-redux';
import QueueView from './QueueView';

export default connect(
  state => ({
    queue: state.getIn(['queueView', 'queue'])
  })
)(QueueView);
