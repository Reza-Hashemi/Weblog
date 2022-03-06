const blogger = require('../database/model/blogger');
const article = require('../database/model/article');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function adminPanel(req, res) {
  try {
    const bloggers = await blogger.find({ role: 'blogger' }, { password: 0 });
    return res.status(200).json(bloggers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deleteBlogger(req, res) {
  try {
    const userId = req.params.id;
    await blogger.findByIdAndDelete(userId);
    return res.redirect('/admin');
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function updateBloggerPassword(req, res) {
  try {
    const foundArticle = await blogger.findById(req.params.id);
    const newPassword = await bcrypt.hash(foundArticle.phone, 10);
    await blogger.findByIdAndUpdate(req.params.id, {
      password: newPassword,
    });
    return res.status(200).redirect('/admin');
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getArticles(req, res) {
  try {
    const articles = await article
      .find({})
      .populate('author')
      .sort({ createdAt: -1 });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function readmore(req, res) {
  try {
    const readmore = await article.findById(req.params.id);
    return res.status(200).json(readmore);
  } catch (error) {
    return res.status(400).json(error.message);
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
    return res.status(200).redirect('/admin/articles');
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function createadmin(req, res) {
  try {
    await blogger.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      city: req.body.city,
      phone: req.body.phone,
      gender: req.body.gender,
      role: req.body.role,
    });
    return res.status(200).json('ok');
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  adminPanel,
  deleteBlogger,
  updateBloggerPassword,
  getArticles,
  readmore,
  deleteArticle,
  createadmin
};
