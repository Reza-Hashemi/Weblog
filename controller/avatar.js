const avatar = require('../tools/uploadAvatar');
const blogger = require('../database/model/blogger');
const fs = require('fs');
const path = require('path');

async function uploadAvatar(req, res) {
  const user = req.session.user._id;

  const upload = avatar.upload.single('avatar');
  upload(req, res, (err) => {
    if (err) {
      return res.redirect('/dashboard');
    }
    blogger.findByIdAndUpdate(
      user,
      { avatar: req.file.filename },
      function (err) {
        if (err) {
          return res.redirect('/dashboard');
        }
        try {
          if (req.session.user.avatar !== "defaultImage.png") {
            fs.unlinkSync(
              path.join(
                __dirname,
                'public/images/avatar',
                req.session.user.avatar
              )
            );
          }
          req.session.user.avatar = req.file.filename;
          return res.redirect('/dashboard');
        } catch (err) {
          return res.status(400).json({ msg: 'err' });
        }
      }
    );
  });
}

module.exports = { uploadAvatar };
