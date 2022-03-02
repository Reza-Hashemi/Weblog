const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/pictures"));
  },
  filename: (req, file, cb) => {
    body = req.body;

    cb(null, Date.now() + '_' + file.originalname);
  },
});
const filefilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
    return cb('invalid type!', false);
  }
  cb(null, true);
};
const uploadArticle = multer({ storage: storage, fileFilter: filefilter });
module.exports = {uploadArticle};

