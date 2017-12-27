import axios from 'axios';

const io = require('socket.io-client');

function gotGame(data) {
  return {
    type: 'GOT_GAME',
    payload: data,
  };
}

function updatedGame(data) {
  return {
    type: 'UPDATED_GAME',
    payload: data,
  };
}

function getGameFail(error) {
  return {
    type: 'GET_GAME_FAIL',
    payload: error,
  };
}

function updateGameFail(error) {
  return {
    type: 'UPDATE_GAME_FAIL',
    payload: error,
  };
}

export function getGame(id) {
  const socket = io();
  socket.on('resources', (data) => {
    console.log('SOCKET IO RESOURCES:', data);
  });

  return dispatch => (
    axios.get(`/api/game/${id}`)
      .then(res => dispatch(gotGame(res.data)))
      .catch((error) => {
        console.error('error fetching game', error);
        return dispatch(getGameFail(error));
      })
  );
}

export function updateGame(id, newGameObj) {
  return dispatch => (
    axios.put(`/api/game/${id}`, newGameObj)
      .then(res => dispatch(updatedGame(res.data)))
      .catch((error) => {
        console.error('error fetching game', error);
        return dispatch(updateGameFail(error));
      })
  );
}
