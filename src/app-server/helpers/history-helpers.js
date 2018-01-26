const History = require('../../../database/models/room-history');

const applyHistory = room => History
  .findById(room.h_id)
  .then(history => {
    return history === null
      ? createNewHistory(room)
      : { room, history };
  });

const createNewHistory = room => {
  const historyObj = {
    _id: room.h_id,
    r_id: room._id,
    h_items: []
  };
  const roomHistory = new History(historyObj);

  roomHistory
    .save()
    .then(storedHistory => Room
      .update({ _id: room._id }, { h_id: storedHistory._id }));

  return { room, historyObj };
};

exports.createHistory = createNewHistory;
exports.applyHistory = applyHistory;