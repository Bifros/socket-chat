const { sendAndStore } = require('../history-manager');

module.exports = (socket, usernames, usersSet) => username => {
  socket.username = username;
  socket.room = 'lobby';
  usersSet.add(username);

  socket
    .join('lobby')
    .emit('usersOnline', Array.from(usersSet).length)
    .emit('updateChat', 'Welcome! You have been connected to Lobby.');

  socket
    .broadcast
    .to('lobby')
    .emit('updateChat', sendAndStore(username + ' has connected to this room'));
};