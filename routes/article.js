const express = require('express');
const router = express.Router();
const { uploadArticle } = require('../tools/uploadArticle');
const { getArticle, createArticle } = require('../controller/article');

router.get('/', getArticle);
router.post('/', uploadArticle.single('picture'), createArticle);
// router.get('/allarticle', AllArticle);

module.exports = router;
