const knex = require('../knex');

exports.fetchArticleByArticleId = article_id => {
  return knex('articles')
    .first('articles.*')
    .where({ 'articles.article_id': article_id })
    .leftJoin('comments', 'articles.article_id', 'comments.comment_id')
    .groupBy('articles.article_id', 'comments.comment_id')
    .count({ comment_count: 'comments.comment_id' })
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `article with article_id (${article_id}) does not exist`
        });
      }
      article.comment_count = +article.comment_count;
      return article;
    });
};

exports.updateArticle = (votes = 0, article_id) => {
  return knex('articles')
    .where({ article_id })
    .increment({ votes })
    .returning('*')
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `article with article_id (${article_id}) does not exist`
        });
      }
      return article;
    });
};
