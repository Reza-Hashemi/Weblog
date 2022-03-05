// const avatar = require('../tools/uploadAvatar');
const blogger = require('../database/model/blogger');
const fs = require('fs');
const path = require('path');

async function avatarController(req, res) {
  try {
    await blogger.findByIdAndUpdate(req.session.user._id, {
      avatar: req.file.filename,
    });
    if (req.session.user.avatar !== 'defaultImage.png') {
       fs.unlinkSync(
        path.join(__dirname, '../public/images/avatar', req.session.user.avatar)
      );
    }
    req.session.user.avatar = req.file.filename;
    return res.redirect('/dashboard');
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports = { avatarController };
