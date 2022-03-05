const express = require('express');
const router = express.Router();
const { uploadArticle } = require('../tools/uploadArticle');
const {
  createArticle,
  getBloggerArticle,
  deleteArticle,
  updateArticle,
  readMoreBloggerArticle,
} = require('../controller/article');
const { createArticleCheck } = require('../middleware/createArticleCheck');
const { checkblogger } = require('../middleware/checkBlogger');
const { updateArticleChecker } = require('../middleware/updateArticleChecker');

router.get('/', getBloggerArticle);
router.post(
  '/',
  uploadArticle.single('picture'),
  createArticleCheck,
  createArticle
);
router.delete('/:id', deleteArticle);
router.put(
  '/:id',
  checkblogger,
  uploadArticle.single('picture'),
  updateArticleChecker,
  updateArticle
);
router.get('/:id', checkblogger, readMoreBloggerArticle);
module.exports = router;
