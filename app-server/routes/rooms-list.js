const Room = require('../../database/models/room');

const filterInfo = rooms => rooms.map(room => ({
    id: room._id,
    name: room.name
  }));

module.exports = (req, res) => {
  Room
    .find({})
    .then(filterInfo)
    .then(rooms => res.json({
      success: true,
      rooms
    }));
};