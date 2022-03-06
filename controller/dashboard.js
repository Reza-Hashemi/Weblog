const blogger = require('../database/model/blogger');
const article = require('../database/model/article');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
async function dashboardRender(req, res) {
  const user = req.session.user;
  res.status(200).json(user);
}

async function dashboardUpdate(req, res) {
  try {
    const updated = await blogger.findByIdAndUpdate(
      req.session.user._id,
      req.body,
      {
        new: true,
      }
    );
    req.session.user = updated;
    const user = req.session.user;
    return res.status(200).redirect('/dashboard');
  } catch (error) {
    res.status(400).send('somthing Wrong');
  }
}

async function dashboardRemove(req, res) {
  try {
    let articleArray = [];
    await blogger.findByIdAndDelete(req.params.id);
    articleArray = await article.find({ author: req.session.user._id });
    if (req.session.user.avatar !== 'defaultImage.png') {
      fs.unlinkSync(
        path.join(__dirname, '../public/images/avatar', req.session.user.avatar)
      );
    }

    articleArray.forEach((i) => {
      fs.unlinkSync(
        path.join(__dirname, '../public/images/pictures', i.picture)
      );
    });

    await article.deleteMany({ author: req.session.user._id });
    return res.redirect('/signout');
  } catch (error) {
    return res.status(500).json('somthing wrong');
  }
}

async function resetPassword(req, res) {
  return res.status(200).json('ok');
}
async function resetPasswordProcess(req, res) {
  try {
    const hash = await bcrypt.hash(req.body.newpassword, 10);
    await blogger.findByIdAndUpdate(req.session.user._id, {
      password: hash,
    });
    return res.status(200).redirect('/dashboard');
  } catch (error) {
    return res.status(500).json('somthing worng');
  }
}

module.exports = {
  dashboardRender,
  dashboardUpdate,
  dashboardRemove,
  resetPassword,
  resetPasswordProcess,
};
