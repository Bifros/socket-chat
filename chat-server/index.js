const app = require('http').createServer(),
      io = require('socket.io').listen(app),
      handlers = require('./handlers'),
      { sendAndStore } = require('./redis-manager');

let usersSet = new Set();

app.listen(8002);

io.sockets.on('connection', (socket) => {
  socket.on('connectNewUser', handlers.onUserConnect(socket, usersSet));

  socket.on('switchRoom', handlers.onRoomSwitch(socket));

  socket.on('disconnect', handlers.onUserDisconnect(socket));

  socket.on('fileUpload', handlers.onFileUpload(socket));

  socket.on('sendChat', (data) => {
    io.sockets
      .in(socket.room)
      .emit(
        'updateChat',
        socket.user,
        sendAndStore(socket.room, socket.user, data)
      )
  });
});
