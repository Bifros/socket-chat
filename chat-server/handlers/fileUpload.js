const fs = require('fs'),
  path = require('path'),
  shell = require('shelljs'),
  { sendAndStore } = require('../redis-manager');

const uploadFile = (socket, file, callback) => {
  shell.mkdir('-p', file.dirName);
  fs.writeFile(`${file.dirName}/${file.name}`, file.buffer, (err) => {
    if (err) {
      console.log(err);
    } else {
      callback();
    }
  });
};

module.exports = socket => file => {
  file.fileType = 'file';
  file.room = socket.room;
  file.dirName = `${path.resolve(__dirname, '../../')}/uploads/${socket.room}/${socket.user}/`;

  uploadFile(socket, file, () => {
    socket
      .emit('fileShare', socket.user, file);

    socket
      .broadcast
      .to(socket.room)
      .emit(
        'fileShare',
        socket.user,
        sendAndStore(socket.room, socket.user, file)
      );
  });
};