const kenx = require('../knex');

exports.fetchAllUsers = () => {
  return kenx('users').select('*');
};

exports.fetchUserByUsername = username => {
  return kenx('users')
    .first('*')
    .where({ username })
    .then(user => {
      if (!user)
        return Promise.reject({
          status: 404,
          msg: `User (${username}) does not exist`
        });
      return user;
    });
};
