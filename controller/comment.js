const article = require('../database/model/article');
const comment = require('../database/model/comment');

async function postComment(req, res) {
  try {
    await comment.create({
      detail: req.body.comment,
      articleID: req.params.ArticleID,
      username: req.session.user._id,
    });
    return res
      .status(401)
      .redirect(`/articles/readmore/${req.params.ArticleID}`);
  } catch (error) {
    return res.status(500).json('somthing went wrong');
  }
}

async function deleteComment(req, res) {
  try {
    const findComment = await comment.findById(req.params.id);
    if(req.session.user._id !== findComment.username._id.toString()){
      return res.status(403).json("access denied")
    }
    await comment.findOneAndDelete(req.params.id);
    return res.status(200).redirect(`/articles/:1`);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { postComment, deleteComment };
