const { fetchAllUsers, fetchUserByUsername } = require('../models/users');

exports.getAllUser = (req, res, next) => {
  fetchAllUsers().then(users => {
    res.send({ users });
  });
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      res.send({ user });
    })
    .catch(next);
};
