const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: String,
  h_id: String // history_id
});

RoomSchema.pre('save', function(next) {
  console.log(`New  room "${this.name}" has been created.`);
  next();
});

module.exports = mongoose.model('Room', RoomSchema);