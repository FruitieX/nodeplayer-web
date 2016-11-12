import { Component, PropTypes } from 'react';
import {
  get
} from '../../utils/api';

class LectureDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lecture: {}
    };
  }

  async componentDidMount() {
    const lecture = await get('/lectures/' + this.props.lectureId);
    this.setState({ lecture });
  }

  render() {
    return(
      <div>
        { JSON.stringify(this.state.lecture) }
      </div>
    );
  }
}

LectureDetail.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default LectureDetail;
