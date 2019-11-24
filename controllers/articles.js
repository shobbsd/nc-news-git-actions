const {
  fetchArticleByArticleId,
  updateArticle
} = require('../models/articles');

exports.getArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  // res.send({ msg: 'got through to the controller' });
  fetchArticleByArticleId(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { inc_votes: votes } = req.body;
  const { article_id } = req.params;
  updateArticle(votes, article_id)
    .then(article => {
      res.send({ article });
    })
    .catch(next);
};
