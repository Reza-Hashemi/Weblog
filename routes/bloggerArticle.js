const express = require('express');
const router = express.Router();
const { uploadArticle } = require('../tools/uploadArticle');
const {
  createArticle,
  getBloggerArticle,
  deleteArticle,
  updateArticle
} = require('../controller/article');
const { createArticleCheck } = require('../middleware/createArticleCheck');

router.get('/', getBloggerArticle);
router.post('/',uploadArticle.single('picture'),createArticleCheck,createArticle);
router.delete('/:id', deleteArticle);
router.put('/:id',uploadArticle.single('picture'),updateArticle )

module.exports = router;
