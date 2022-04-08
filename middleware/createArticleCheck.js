const article = require('../database/model/article');
async function createArticleCheck(req, res, next) {

  if (!req.body.title || !req.body.context || !req.file) {
    return res.status(400).json("enter all inputs")
  }
  next();
}

module.exports = { createArticleCheck };
