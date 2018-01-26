const { sendAndStore } = require('../history-manager');

module.exports = socket => newRoom => {
  socket
    .leave(socket.room)
    .broadcast
    .to(socket.room)
    .emit('updateChat', sendAndStore(`${socket.username} has left this room`));

  socket
    .join(newRoom)
    .emit('updateChat', `You have connected to  ${newRoom}`);

  socket.room = newRoom;

  socket
    .broadcast
    .to(newRoom)
    .emit('updateChat', sendAndStore(`${socket.username} has joined this room`))
    //.emit('updateRooms', rooms, newRoom);
};