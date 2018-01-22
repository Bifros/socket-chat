const User = require('../../database/models/user');
const generateTokens = require('../helpers/generateToken');

const messages = {
  WRONG_PASSWORD: 'Authentication failed. Wrong username or password.',
  USER_EMPTY: 'Authentication failed. User is not specified.',
};

const validate = requested => found => {
  if (!found) {
    throw new Error(messages.USER_EMPTY);
  } else if (found.password !== requested.password) {
    throw new Error(messages.WRONG_PASSWORD);
  }

  return found;
};

module.exports = (req, res) => {
  console.log(req.body);
  return User
  .findOne({
    name: req.body.name
  })
  .then(validate(req.body))
  .then(generateTokens)
  .then(tokens => res.json({
    success: true,
    ...tokens
  }))
  .catch(err => res.json({ error: err.toString() }));}