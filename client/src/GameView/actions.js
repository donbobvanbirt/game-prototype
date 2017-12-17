import axios from 'axios';

function gotGame(data) {
  return {
    type: 'GOT_GAME',
    payload: data,
  };
}

function getGameFail(error) {
  return {
    type: 'GET_GAME_FAIL',
    payload: error,
  };
}

export function getGame(id) {
  return dispatch => (
    axios.get(`/api/game/${id}`)
      .then(res => dispatch(gotGame(res.data)))
      .catch((error) => {
        console.error('error fetching game', error);
        return dispatch(getGameFail(error));
      })
  );
}
