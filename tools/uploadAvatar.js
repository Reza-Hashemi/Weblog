const multer = require('multer');
const path = require('path');
const avatar = {};
const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/avatar'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

avatar.upload = multer({
  storage: storageAvatar,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      return cb('invalid type', false);
    }
    cb(null, true);
  },
});

module.exports = avatar;
