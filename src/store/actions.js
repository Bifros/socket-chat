
export const updateRoomUsers = (roomUsers) => ({
  type: 'UPDATE_ROOM_USERS',
  payload: JSON.parse(roomUsers)
});

export const populateMessage = msgObj => ({
  type: 'POPULATE_ROOM_MESSAGE',
  payload: msgObj
});