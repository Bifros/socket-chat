const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const alias = 'Bearer ';

const generateTokens = (user) => {
  const userPayload = {
    name: user.name,
    admin: user.admin
  };

  return {
    access_token: jwt.sign(userPayload, secret, {
      expiresIn: '12h',
      algorithm: 'HS256'
    }),
    refresh_token: jwt.sign({ spec_id: user._id }, secret, {
      expiresIn: '48h',
      algorithm: 'HS256'
    }),
  }
};

module.exports = generateTokens;