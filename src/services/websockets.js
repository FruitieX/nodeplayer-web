import SockJS from 'sockjs-client';
import { getConfiguration } from '../utils/configuration';
import * as ServerState from '../modules/Server/ServerState';

const reconnectTimeout = 1000;

export function init(dispatch) {
  const apiRoot = getConfiguration('API_ROOT');
  const sockjs = new SockJS(`${apiRoot}/ws`);

  console.log('initialized sockjs');
  sockjs.onmessage = (e) => {
    console.log('message', e.data);
    if (!e.data) {
      return;
    }

    const data = JSON.parse(e.data);

    if (data.method === 'sync') {
      dispatch(ServerState.replaceQueue(data.params.queue));
      dispatch(ServerState.play(data.params.nowPlaying));
    } else if (data.method === 'queue') {
      dispatch(ServerState.replaceQueue(data.params));
    } else if (data.method === 'play') {
      dispatch(ServerState.play(data.params));
    } else if (data.method === 'stop') {
      dispatch(ServerState.stop(data.params));
    }
  };

  sockjs.onclose = (e) => {
    setTimeout(() => {
      init(dispatch);
    }, reconnectTimeout);
  };
}
