const kenx = require('../knex');

exports.fetchTopics = () => {
  return kenx('topics').select('*');
};
