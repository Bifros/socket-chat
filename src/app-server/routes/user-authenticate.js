const User = require('../../../database/models/user');
const generateTokens = require('../helpers/generateToken');

const messages = {
  WRONG_PASSWORD: 'Authentication failed. Wrong password.',
  USER_EMPTY: 'Authentication failed. User is incorrect.',
};

const validate = userFromRequest => userFound => {
  if (!userFound) {
    throw new Error(messages.USER_EMPTY);
  } else if (userFound.password !== userFromRequest.password) {
    throw new Error(messages.WRONG_PASSWORD);
  } else

  return userFound;
};

module.exports = (req, res) => User
  .findOne({
    name: req.body.name
  })
  .then(validate(req.body))
  .then(generateTokens)
  .then(tokens => res.json({
    success: true,
    name: req.body.name,
    ...tokens
  }))
  .catch(err => res.json({
    error: err.toString()
  }));