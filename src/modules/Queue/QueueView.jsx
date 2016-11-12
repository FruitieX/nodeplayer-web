import { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';
import { push } from 'react-router-redux'

import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import * as QueueViewState from './QueueViewState';
import * as AppViewState from '../AppViewState';

import fetchJsonp from 'fetch-jsonp';
import { getConfiguration } from '../../utils/configuration';

import {
  get,
  post
} from '../../utils/api';

const ytSearchSuggestionsPath =
  'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=';

const styles = {
  searchField: {
    width: '100%'
  }
};

class Queue extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const queue = await get('/api/v1/queue');
    this.props.dispatch(QueueViewState.replaceQueue(queue));

    const nowPlaying = queue[0];
    const apiRoot = getConfiguration('API_ROOT');
    if (nowPlaying) {
      let path = `${apiRoot}/api/v1/song`;
      path += `/${nowPlaying.backendName}/${nowPlaying.songId}.${nowPlaying.format}`;
      this.props.dispatch(AppViewState.setAudioSrc(path));
    }
  }

  render() {
    const queue = this.props.queue.map((song, index) => {
      let primaryText = song.title;

      if (song.artist) {
        primaryText = `${song.artist} - ${primaryText}`;
      }

      return <ListItem
        primaryText={ primaryText }
        secondaryText={ song.album }
        leftAvatar={ <Avatar src={song.albumArt.lq} /> }
        key={ index }
        onTouchTap={ () => {
          //this.queueSong(song);
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
        </Card>
      </div>
    );
  }
}

Queue.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Queue;
