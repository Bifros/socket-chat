const mongoose = require( 'mongoose' );
const config = require('../src/app-server/config');

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection opened to ' + config.database);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose connection closed by app termination');
    process.exit(0);
  });
});

module.exports = mongoose;