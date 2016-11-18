import {connect} from 'react-redux';
import QueueView from './QueueView';

export default connect(
  state => ({
    queue: state.getIn(['serverState', 'queue']),
    nowPlaying: state.getIn(['serverState', 'nowPlaying']),
    playbackPosDate: state.getIn(['serverState', 'playbackPosDate'])
  })
)(QueueView);
