const usersRouter = require('express').Router();
const { getAllUser, getUserByUsername } = require('../controllers/users');

usersRouter.route('/').get(getAllUser);

usersRouter.route('/:username').get(getUserByUsername);

module.exports = usersRouter;
