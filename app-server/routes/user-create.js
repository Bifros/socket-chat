const mongoose = require('mongoose');
const User = require('../../database/models/user');

const messages = {
  USER_EXISTS: 'User already exists.'
};

const createUser = (user, res) => {
  const newUser = new User({
    name: user.name,
    password: user.password,
    admin: false
  });

  newUser.save((err) => {
    if (err) res.json({ error: err });

    res.json({ success: true });
  });
};

module.exports = (req, res) => User
  .findOne({
    name: req.body.name
  })
  .then((found) => {
    if (found) {
      res.send({ error: messages.USER_EXISTS });
    } else {
      createUser(req.body, res);
    }
  });
