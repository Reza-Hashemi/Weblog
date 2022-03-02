const article = require('../database/model/article');
const { uploadArticle } = require('../tools/uploadArticle');
const articles = article.find({});

async function getArticle(req, res) {
  return res.render('articlePage', { articles, msg: null });
}

async function createArticle(req, res) {
  try {
    const newArticle = new article({
      title: req.body.title,
      context: req.body.context,
      picture: req.file.filename,
      author: req.session.user._id,
    });
    newArticle.save((error) => {
      if (error) {
        return res.render('bloggerArticlePage', {
          articles,
          msg: error.message,
        });
      }
      return res.json(articles);
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports = { getArticle, createArticle };
