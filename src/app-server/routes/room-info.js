const { applyHistory } = require('../helpers/history-helpers');
const Room = require('../../../database/models/room');

const filterInfo = data => ({
    room: {
      id: data.room.id,
      name: data.room.name
    },
    history: {
      id: data.history._id,
      item: data.history.h_items
    }
  });

module.exports = (req, res) => {
  Room
    .findById(req.params.id)
    .then(applyHistory)
    .then(filterInfo)
    .then(room => res.json({
      success: true,
      data: room
    }));
};