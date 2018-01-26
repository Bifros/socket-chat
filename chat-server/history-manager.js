const redis = require('redis');

credentials = {
  "host": "127.0.0.1",
  "port": 6379
};

redisClient = redis.createClient(credentials.port, credentials.host);

sendAndStore = (room, msg) => {
  redisClient.lpush(`${room}/messages`, msg);
  redisClient.ltrim(`${room}/messages`, 0, 99);

  return msg;
};

getRoomMessages = (room) => redisClient
  .lrange('messages', 0, 99, (err, reply) => {
    console.log(reply);
  });

module.exports = { sendAndStore, getRoomMessages };
