const article = require('../database/model/article');
const fs = require('fs');
const path = require('path');
const comment = require("../database/model/comment")
const uploadArticle = require('../tools/uploadArticle');


async function getAllArticles(req, res) {
  try {
    const allArticles = await article
      .find({}, { __v: 0 })
      .populate('author', 'username avatar ')
      .sort({ createdAt: -1 })
      .skip((req.params.id - 1) * 8)
      .limit(8);
    return res.status(200).json(allArticles)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function readmore(req, res) {
  try {
    const findArticle = await article
      .findById(req.params.id, { __v: 0 })
      .populate('author', 'username avatar ');
    if (req.session.user && req.session.user._id !== findArticle.author._id) {
      await article.findByIdAndUpdate(req.params.id, {
        visited: findArticle.visited + 1,
      });
    }
    const comments = await comment.find({articleID: req.params.id},{detail:1,createdAt:1}).populate("username",'username')
    return res.status(200).json({findArticle,comments});
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function getBloggerArticle(req, res) {
  try {
    const articles = await article
      .find({ author: req.session.user._id }, { __v: 0 })
      .populate('author', 'username avatar ')
      .sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function readMoreBloggerArticle(req, res) {
  try {
    const readmore = await article.findById(req.params.id,{__v:0});
    await article.findByIdAndUpdate(req.params.id, {
      visited: readmore.visited + 1,
    });
    const comments = await comment.find({articleID: req.params.id},{detail:1,createdAt:1}).populate("username",'username')
    return res.status(200).json({data:readmore,comments});
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function createArticle(req, res) {
  if(!req.file){
    return res.json("please select image")
  }
  if(!req.body.title){
    return res.json("please input title")
  }

  try {
    await article.create({
      title: req.body.title,
      context: req.body.context,
      picture: req.file.filename,
      author: req.session.user._id,
    });
    return res.redirect('/bloggerarticle');
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
async function deleteArticle(req, res) {
  try {
    
    const findArticleDeleting = await article.findById(req.params.id);
    if(req.session.user._id !== findArticleDeleting.author._id.toString()){
      return res.status(401).json("Access Denied")
    }
    await article.findByIdAndDelete(req.params.id);
    await comment.deleteMany({articleID: findArticleDeleting._id})
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
    const findArticle = await article.findById(id,{__v :0});
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
    return res.status(200).redirect('/bloggerarticle');
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
  readmore,
};
