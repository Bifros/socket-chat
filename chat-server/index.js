const io = require('socket.io')(),
  express = require('express'),
  http = require('http'),
  db = require('../db');

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('disconnect', () => {
    console.log('client is trying to disconnect');
    client.emit('client_disconnected');
  });
});

const port = 8002;
io.listen(port);
console.log('chat is listening on port ', port);