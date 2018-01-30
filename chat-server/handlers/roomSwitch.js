const storage = require('../redis-manager');
const { sendAndStore } = require('../redis-manager');
const _ = require('lodash');

const leaveAndUpdateRoom = socket => updatedUsers => {
  socket
    .leave(socket.room)
    .emit('updateRoomUsers', updatedUsers)
    .broadcast
    .to(socket.room)
    .emit('updateRoomUsers', updatedUsers);

  socket
    .broadcast
    .to(socket.room)
    .emit(
      'updateChat',
      'SYSTEM',
      sendAndStore(socket.room, 'SYSTEM', `${socket.user} has left this room`)
    )
};

const joinAndUpdateNewRoom = (socket, newRoom) => storage
  .saveUserToRoom(socket.user, newRoom)
  .then(storedUsers => socket
      .join(newRoom)
      .emit('updateRoomUsers', storedUsers)
  )
  .then(() => storage
    .getRoomUsersAsync(newRoom)
    .then(updatedUsers => {
      socket.room = newRoom;
      socket
        .broadcast
        .to(newRoom)
        .emit('updateRoomUsers', updatedUsers);
      socket
        .broadcast
        .to(newRoom)
        .emit(
          'updateChat',
          'SYSTEM',
          sendAndStore(newRoom, 'SYSTEM', `${socket.user} has joined this room`)
        );
    })
  );

module.exports = (socket) => newRoom => storage
  .removeSavedUserFromRoom(socket.user, socket.room)
    .then(leaveAndUpdateRoom(socket))
    .then(joinAndUpdateNewRoom(socket, newRoom));
