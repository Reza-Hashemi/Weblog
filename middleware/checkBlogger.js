const article = require('../database/model/article');

async function checkblogger(req, res, next) {
  try {
    foundArticle = await article.findById(req.params.id).populate('author');

    if (req.session.user._id !== foundArticle.author._id.toString()) {
      return res.status(403).json('access denied');
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
  next();
}

module.exports = { checkblogger };
