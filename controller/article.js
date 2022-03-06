const article = require('../database/model/article');
const fs = require('fs');
const path = require('path');
async function getAllArticles(req, res) {
  try {
    const allArticles = await article
      .find({})
      .populate('author')
      .sort({ createdAt: -1 });
    return res.status(200).json(allArticles);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getBloggerArticle(req, res) {
  try {
    const articles = await article
      .find({ author: req.session.user._id })
      .populate('author')
      .sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function readMoreBloggerArticle(req, res) {
  try {
    const readmore = await article.findById(req.params.id);
    return res.status(200).json(readmore);
  } catch (error) {
    return res.status(400).json(error.message);
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
    await newArticle.save();
    return res.redirect('/bloggerarticle');
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
async function deleteArticle(req, res) {
  try {
    const articleID = req.params.id;
    const findArticleDeleting = await article.findById(articleID);
    await article.findByIdAndDelete(articleID);
    fs.unlinkSync(
      path.join(
        __dirname,
        '../public/images/pictures',
        findArticleDeleting.picture
      )
    );

    return res.status(200).redirect('/bloggerarticle');
  } catch (error) {
    return res.status(500).json('somthing wrong');
  }
}

async function updateArticle(req, res) {
  try {
    const id = req.params.id;
    const findArticle = await article.findById(id);
    fs.unlinkSync(
      path.join(__dirname, '../public/images/pictures', findArticle.picture)
    );
    await article.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        context: req.body.context,
        picture: req.file.filename,
        author: req.session.user._id,
      },
      { new: true }
    );
    return res.status(200).redirect("/bloggerarticle")
  } catch (error) {
    return res.send(error.message);
  }
}

module.exports = {
  getAllArticles,
  createArticle,
  getBloggerArticle,
  deleteArticle,
  updateArticle,
  readMoreBloggerArticle,
};
