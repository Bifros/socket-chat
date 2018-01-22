const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validators = require('../validators/room-validators');

const UserSchema = new Schema({
  name: String,
  password: String,
  admin: false,
  meta: {},
  created_at: Date,
  updated_at: Date
});

UserSchema.pre('save', function(next) {
  const currentDate = new Date();

  this.created_at = currentDate;
  this.updated_at = currentDate;

  console.log(`New user "${this.name}" has been added.`);
  next();
});

module.exports = mongoose.model('User', UserSchema);