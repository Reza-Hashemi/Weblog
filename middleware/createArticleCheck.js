const article = require('../database/model/article');

async function createArticleCheck(req, res, next) {
  const articles = await article.find({ author: req.session.user._id });
  if (!req.body.title || !req.body.context || !req.file.filename) {
    return res.render('bloggerArticlePage', {
      articles,
      msg: 'enter All inuts',
    });
  }
  next();
}

module.exports = { createArticleCheck };
