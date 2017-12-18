import { combineReducers } from 'redux';

function game(state = {}, action) {
  switch (action.type) {
    case 'GOT_GAME':
    case 'UPDATED_GAME':
      return action.payload;
    case 'GET_GAME_FAIL':
    case 'UPDATE_GAME_FAIL':
      return { error: action.payload };
    default:
      return state;
  }
}

export default combineReducers({
  game,
});
