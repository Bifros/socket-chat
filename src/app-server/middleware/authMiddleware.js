const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const tokenAlias = 'Bearer ';

const extractToken = authString => authString.includes(tokenAlias)
  ? authString.split(tokenAlias)[1]
  : authString;

module.exports = (req, res, next) => {
  if (!req.url.includes('app/')) {
    next();
    return;
  }

  const token = req.body.access_token
    || req.query.access_token
    || req.headers['authorization'];

  if (!token) {
    return res.status(200).send({
      error: 'Unauthorized.'
    });
  }

  jwt.verify(extractToken(token), secret, (err, decoded) => {
    if (err) {
      return res.json({ error: `Failed to authenticate token. ${err}` });
    }

    req.decoded = decoded;
    next();
  });
};