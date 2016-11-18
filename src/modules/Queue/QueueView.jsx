import { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';
import { push } from 'react-router-redux'

import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Slider from 'material-ui/Slider';

import RaisedButton from 'material-ui/RaisedButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Next from 'material-ui/svg-icons/av/skip-next';
import Prev from 'material-ui/svg-icons/av/skip-previous';

import fetchJsonp from 'fetch-jsonp';
import { getConfiguration } from '../../utils/configuration';

import _ from 'lodash';

import {
  get,
  post
} from '../../utils/api';

const ytSearchSuggestionsPath =
  'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=';

const styles = {
  searchField: {
    width: '100%'
  },
  nowPlayingStyle: {
  }
};

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }

  play() {
    post('/api/v1/play');
  }

  pause() {
    post('/api/v1/pause');
  }

  next() {
    post('/api/v1/skip');
  }

  prev() {
    post('/api/v1/skip', { cnt: -1 });
  }

  seek = _.throttle((event, position) => {
    position *= this.props.nowPlaying.duration;
    post('/api/v1/seek', { position });
  }, 500)

  changeSong = (song) => {
    post('/api/v1/changeSong', { uuid: song.uuid });
  }

  componentDidMount() {
    this.progressInterval = setInterval(() => {
      if (!this.props.nowPlaying) {
        return;
      }
      this.setState({
        progress: Math.min(1, Math.max(0,
          (new Date().getTime() - this.props.playbackPosDate + this.props.nowPlaying.playback.curPos) / this.props.nowPlaying.duration))
      });
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.progressInterval);
  }

  render() {
    const queue = this.props.queue.map((song, index) => {
      let primaryText = song.title;

      if (song.artist) {
        primaryText = `${song.artist} - ${primaryText}`;
      }

      const avatar = (this.props.nowPlaying && this.props.nowPlaying.uuid === song.uuid) ?
        <Avatar icon={<Play/>} />
        :
        <Avatar src={song.albumArt.lq} />

      return <ListItem
        primaryText={ primaryText }
        secondaryText={ song.album }
        leftAvatar={ avatar }
        key={ index }
        onTouchTap={ () => {
          this.changeSong(song);
        }}
      />
    });

    return(
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: this.context.muiTheme.spacing.desktopGutter / 2
      }}>
        <Card style={{
          margin: this.context.muiTheme.spacing.desktopGutter / 2,
          flex: 2
        }}>
          <CardHeader
            title='Queue'
            />
          <List>
            { queue }
          </List>
          <CardText>
            <RaisedButton
              onTouchTap={() => this.prev()}
              icon={<Prev />} />
            <RaisedButton
              onTouchTap={() => this.play()}
              icon={<Play />} />
            <RaisedButton
              onTouchTap={() => this.pause()}
              icon={<Pause />} />
            <RaisedButton
              onTouchTap={() => this.next()}
              icon={<Next />} />
          </CardText>
          <CardText>
            <Slider
              min={0}
              max={1}
              step={0.00001}
              value={this.state.progress}
              onChange={this.seek}
            />
          </CardText>
        </Card>
      </div>
    );
  }
}

Queue.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Queue;
