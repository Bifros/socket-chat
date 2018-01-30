import {combineReducers} from 'redux';

const users = (state = [], action) => {
  return state;
};

const roomUsers = (state = [], action) => {
  if (action.type === 'UPDATE_ROOM_USERS') {
    return (typeof action.payload === 'string')
      ? JSON.parse(action.payload)
      : action.payload;
  } else {
    return state;
  }
};

export default combineReducers({
  roomUsers
});
