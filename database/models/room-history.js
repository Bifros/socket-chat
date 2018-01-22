const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  h_items: Array, // history_items
  r_id: String // room_id
});

HistorySchema.pre('save', function(next) {


  console.log(`History added to room "${this.r_id}"`);
  next();
});

module.exports = mongoose.model('History', HistorySchema);