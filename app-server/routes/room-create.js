const mongoose = require('mongoose');
const Room = require('../../database/models/room');

const messages = {
  ROOM_EXISTS: 'Room with this name already exists.'
};

const createRoom = (room, res) => {
  const newRoom = new Room({
    h_id: new mongoose.Types.ObjectId(),
    name: room.name,
  });

  newRoom.save(err => {
    if (err) res.json({ error: err });

    res.json({ success: true });
  });
};

module.exports = (req, res) => Room
  .findOne({
    name: req.body.name
  })
  .then((found) => {
    if (found) {
      res.send({ error: messages.ROOM_EXISTS });
    } else {
      createRoom(req.body, res);
    }
  });
