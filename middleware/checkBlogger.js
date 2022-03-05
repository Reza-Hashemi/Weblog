const article = require('../database/model/article');

async function checkblogger(req, res, next) {
  foundArticle = await article.findById(req.params.id);
  const articleID = foundArticle.author.toString();
  if (req.session.user._id !== articleID) {
    return res.status(403).json('access denied');
  }
  next();
}
module.exports = { checkblogger };
