const article = require('../database/model/article');

async function updateArticleChecker(req, res, next) {
  try {
    const findArticle = await article.findById(req.params.id);
    if (!req.body.title) {
      req.body.title = findArticle.title;
    }
    if(!req.body.context){
        req.body.context = findArticle.context
    }
    if(!req.file){
        req.file = findArticle.picture
    }
    next()
  } catch (error) {
      return res.status(400).json(error.message)
  }
}

module.exports = { updateArticleChecker };
