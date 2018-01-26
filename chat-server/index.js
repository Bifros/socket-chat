const app = require('http').createServer(),
      io = require('socket.io').listen(app),
      handlers = require('./handlers'),
      { sendAndStore } = require('./history-manager');

let rooms = ['lobby', 'room2', 'room3'],
    usersSet = new Set();

app.listen(8002);

io.sockets.on('connection', (socket) => {
  socket.on('connectNewUser', handlers.userConnect(socket, usersSet));

  socket.on('sendChat', (data) => {
    io.sockets
      .in(socket.room)
      .emit('updateChat', socket.username, sendAndStore(JSON.stringify(data)));
  });

  socket.on('switchRoom', handlers.roomsSwitch(socket));

  socket.on('disconnect', function() {
    socket.broadcast.emit('updateChat', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });

});
