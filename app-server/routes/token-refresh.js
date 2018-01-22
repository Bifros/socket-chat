const jwt = require('jsonwebtoken');
const User = require('../../database/models/user');
const secret = require('../config').secret;
const generateTokens = require('../helpers/generateToken');

module.exports = (req, res) => {
  const access_token = req.body.access_token
    || req.query.access_token
    || req.headers['access_token'];
  const refresh_token = req.body.refresh_token
    || req.query.refresh_token
    || req.headers['refresh_token'];

  if (!refresh_token) {
    return res.json({ error: 'No refresh token specified.' });
  }

  jwt.verify(refresh_token, secret, (err, decoded) => {
    if (err) {
      return res.json({ error: 'Can\'t verify refresh_token.' });
    }

    User
      .findById(decoded.spec_id)
      .then(found => {
        if (!found) {
          return res.send({ error: 'User was not found' });
        }

        res.json({
          success: true,
          message: 'Tokens successfully updated',
          ...generateTokens(found)
        });
      })
  });
}