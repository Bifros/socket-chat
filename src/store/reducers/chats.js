import { combineReducers } from 'redux';

const roomsChats = (state = {}, action) => {
  const assignedState = Object.assign({}, state);

  switch(action.type) {
    case 'GET_ROOM_MESSAGES': {
      const room = action.payload;

      if (!state[room]) {
        assignedState[room] = [];
      }

      return assignedState[room];
    }

    case 'POPULATE_ROOM_MESSAGE': {
      const room = action.payload.room;

      if (!state[room]) {
        assignedState[room] = [];
      }

      assignedState[room].push(action.payload);
      return assignedState;
    }

    default:
      return state;
  }
};

export default combineReducers({
  roomsChats
});
