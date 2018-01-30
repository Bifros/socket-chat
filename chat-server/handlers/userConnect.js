const { sendAndStore } = require('../redis-manager');
const storage = require('../redis-manager');

const connectUserToRoom = (socket, updatedUsers) => preloadedMessages => {
  socket
    .join(socket.room)
    .emit('updateRoomUsers', updatedUsers)
    .emit('usersOnline', socket.usersList.length);

  socket
    .emit(
      'updateChat',
      'SYSTEM',
      preloadedMessages.reverse()
    );
  socket
    .emit(
      'updateChat',
      'SYSTEM',
      `You have joined to ${socket.room} ${socket.user}!`
    );

  return updatedUsers;
};


const updateUserRoom = (socket) => updatedUsers => {
  socket
    .broadcast
    .to(socket.room)
    .emit('updateRoomUsers', updatedUsers);
  socket
    .broadcast
    .to(socket.room)
    .emit('usersOnline', socket.usersList.length);
  socket
    .broadcast
    .to(socket.room)
    .emit(
      'updateChat',
      'SYSTEM',
      `${socket.user} has connected to this room`
    );
};


module.exports = (socket, usersSet) => (user, roomName) => {
  socket.user = user;
  socket.room = roomName;
  usersSet.add(user);
  socket.usersList = Array.from(usersSet);

  storage
    .saveUserToRoom(socket.user, socket.room)
    .then(updatedUsers => storage
      .getRoomMessagesAsync(socket.room)
      .then(connectUserToRoom(socket, updatedUsers))
      .then(updateUserRoom(socket)));
};