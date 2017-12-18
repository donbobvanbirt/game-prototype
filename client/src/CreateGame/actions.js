import axios from 'axios';

function gotGame(data) {
  return {
    type: 'GOT_GAME',
    payload: data,
  };
}

function getGameFail(data) {
  return {
    type: 'GET_GAME_FAIL',
    payload: data,
  };
}

export function requestNewGame() {
  return dispatch => (
    axios.post('/api/game/')
      .then(res => dispatch(gotGame(res.data)))
      .catch((error) => {
        console.error('error fetching game', error);
        return dispatch(getGameFail(error));
      })
  );
}
