import { combineReducers } from 'redux';

function game(state = {}, action) {
  switch (action.type) {
    case 'GOT_GAME':
    case 'UPDATED_GAME':
      return action.payload;
    case 'GET_GAME_FAIL':
      return {
        error: {
          data: action.payload,
          message: 'game not found',
        },
      };
    case 'UPDATE_GAME_FAIL':
      return {
        error: {
          data: action.payload,
          message: 'error updating game',
        },
      };
    default:
      return state;
  }
}

export default combineReducers({
  game,
});
