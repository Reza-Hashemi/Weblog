const express = require('express');
const router = express.Router();
const { getAllArticles } = require('../controller/article');

router.get('/', getAllArticles);

module.exports = router;
