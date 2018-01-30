const storage = require('../redis-manager');

module.exports = socket => () => storage
  .removeSavedUserFromRoom(socket.user, socket.room)
  .then(updatedUsers => {
    socket
      .leave(socket.room)
      .emit('connectionLost');

    socket
      .broadcast
      .emit('updateRoomUsers', updatedUsers)
      .emit(
        'updateChat',
        'SYSTEM',
        `${socket.user} went offline`
      );
    }
  );