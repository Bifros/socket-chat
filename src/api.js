import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8002');

export const connectToLobby = (username, callback) => {
  socket.emit('connectNewUser', username);
  socket.on('usersOnline', callback);
};

export const getMessage = (callback) => {
  socket.on('updateChat', callback);
};

export const switchRoom = (roomName) => {
  socket.emit('switchRoom', roomName)
};