import openSocket from 'socket.io-client';
import {updateRoomUsers} from './store/actions';
import storage from './utils/storage';

let socket = openSocket('http://localhost:8002');

export const reconnect = () => socket = openSocket('http://localhost:8002');

export const connectToRoom = (username, room, callback) => {
  socket.emit('connectNewUser', username, room);
  socket.on('usersOnline', callback);
};

export const subscribeToMessagesStream = (callback) => {
  socket.on('updateChat', callback);
};

export const sendChatMessage = (message) => {
  socket.emit('sendChat', message);
};

export const switchRoom = (roomName) => {
  socket.emit('switchRoom', roomName);
};

export const connectUserToRoom = (user, roomName) => {
  socket.emit('connectUserToRoom', user, roomName)
};

export const subscribeToRoomUsersUpdates = (roomName, action) => {
  socket.on('updateRoomUsers', action);
};

export const subscribeToAutoReconnect = (callback) => {
  socket.on('connectionLost', callback());
};

export const shareFile = (files) => {
  socket.emit('fileUpload', files);
};

export const subscribeToFileSharing = (callback) => {
  socket.on('fileShare', callback);
};