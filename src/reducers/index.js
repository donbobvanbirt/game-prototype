import { combineReducers } from 'redux';

function placeHolder(state = [], action) {
  switch (action.type) {
    case 'SOME_TYPE':
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  placeHolder,
});
