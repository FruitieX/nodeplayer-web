import { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';
import { push } from 'react-router-redux'

import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import * as AppViewState from '../AppViewState';

import fetchJsonp from 'fetch-jsonp';

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

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: '',
      suggestions: [],
      results: []
    };
  }

  async editSearchField(searchField, doSearch) {
    this.setState({ searchField }, () => {
      if (doSearch) {
        this.doSearch();
      }
    });

    if (!searchField) {
      this.setState({ suggestions: [] });
      return;
    }

    // TODO: debounce
    const [searched, suggestions] = await fetchJsonp(`${ytSearchSuggestionsPath}${searchField}`)
      .then(response => response.json());
    this.setState({ suggestions });
  }

  async doSearch() {
    const allResults = await post('/api/v1/search', {
      any: this.state.searchField
    });

    if (!allResults.youtube) {
      return;
    }

    const results = allResults.youtube.songs;
    console.log(results);
    this.setState({ results });
  }

  async queueSong(song) {
    const result = await post('/api/v1/queue/song', song);
    console.log('success?', result);

    let primaryText = song.title;

    if (song.artist) {
      primaryText = `${song.artist} - ${primaryText}`;
    }

    this.props.dispatch(AppViewState.openSnackbar(`Added "${primaryText}" to queue.`));
  }

  render() {
    let suggestions = [];

    if (this.state.searchField) {
      suggestions = this.state.suggestions.map((suggestion, index) => (
        <ListItem
          primaryText={ suggestion }
          key={ index }
          onTouchTap={ () => {
            this.editSearchField(suggestion, true);
          }}
        />
      ));
    }

    let results = [];

    results = this.state.results.map((song, index) => {
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
          this.queueSong(song);
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
            title='Search'
            />
          <CardText>
            <TextField
              hintText='Enter search terms'
              value={this.state.searchField}
              style={styles.searchField}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  this.doSearch();
                }
              }}
              onChange={(event) => {
                this.editSearchField(event.target.value);
              }}
            />
          </CardText>
          <List>
            { suggestions }
          </List>
        </Card>
        <Card style={{
          margin: this.context.muiTheme.spacing.desktopGutter / 2,
          flex: 3
        }}>
          <CardHeader
            title='Search Results'
            />
          <List>
            { results }
          </List>
        </Card>
      </div>
    );
  }
}

Search.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Search;
