const article = require('../database/model/article');

async function getAllArticles(req, res) {
  const allArticles = await article.find({}).populate('author');
  return res.json(allArticles)
}

async function getBloggerArticle(req, res) {
  try {
    const articles = await article
      .find({ author: req.session.user._id })
      .populate('author');

    res.json(articles);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function createArticle(req, res) {
  try {
    const articles = await article
      .find({ author: req.session.user._id })
      .populate('author');

    const newArticle = await new article({
      title: req.body.title,
      context: req.body.context,
      picture: req.file.filename,
      author: req.session.user._id,
    });
    console.log(newArticle);
    await newArticle.save((error) => {
      if (error) {
        return res.render('bloggerArticlePage', {
          articles,
          msg: error.message,
        });
      }

      return res.json(newArticle);
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
async function deleteArticle(req, res) {
  const articleID = req.params.id;
  await article.findByIdAndDelete(articleID);
  const articles = await article
    .find({ author: req.session.user._id })
    .populate('author');
  return res.render('bloggerArticlePage', {
    articles,
    msg: 'article is delete',
  });
}

async function updateArticle(req, res) {
  try {
    const id = req.params.id;
    const updateArticle = await article.findByIdAndUpdate(id, {
      title: req.body.title,
      context: req.body.context,
      picture: req.file.filename,
      author: req.session.user._id,
    }, {new: true});
    return res.json(updateArticle)
  } catch (error) {
    return res.send(error.message)
  }
}

module.exports = {
  getAllArticles,
  createArticle,
  getBloggerArticle,
  deleteArticle,
  updateArticle,
};
