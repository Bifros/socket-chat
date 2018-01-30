const redis = require('redis');
const bluebird = require('bluebird');
const _ = require('lodash');

credentials = {
  "host": "127.0.0.1",
  "port": 6379
};

redisClient = redis.createClient(credentials.port, credentials.host);
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const normalizeList = list => _.uniq(_.pullAll(list, [undefined, null]));

const sendAndStore = (room, from, msg = '') => {
  const payload = {
    timestamp: new Date(),
    room,
    from,
    msg: typeof msg === 'object' && msg.fileType
      ? _.omit(msg, 'buffer') // write without buffer
      : msg
  };

  redisClient.lpush(`${room}/messages`, JSON.stringify(payload));
  redisClient.ltrim(`${room}/messages`, 0, 99);

  payload.msg = msg;
  return payload;
};


const getRoomMessagesAsync = (room) => redisClient
  .lrangeAsync(`${room}/messages`, 0, 99);


const saveUserToRoom = (userName, roomName) => redisClient
  .getAsync(`${roomName}/users`)
  .then(reply => {
    const users = JSON.parse(reply) || [];

    users.push(userName);

    const updatedUsers = JSON.stringify(normalizeList(users));

    redisClient.set(`${roomName}/users`, updatedUsers);
    return updatedUsers;
  });


const removeSavedUserFromRoom = (userName, roomName) => redisClient
  .getAsync(`${roomName}/users`)
  .then(reply => {
    const users = JSON.parse(reply) || [];
    const updatedUsers = JSON.stringify(normalizeList(_.pull(users, userName)));

    redisClient.set(`${roomName}/users`, updatedUsers);
    return updatedUsers;
  });


const getRoomUsersAsync = roomName => redisClient
  .getAsync(`${roomName}/users`)
  .then(users => JSON.stringify(users));

module.exports = {
  sendAndStore,
  getRoomMessagesAsync,
  saveUserToRoom,
  removeSavedUserFromRoom,
  getRoomUsersAsync
};
