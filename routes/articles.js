const express = require('express');
const router = express.Router();
const { getAllArticles, readmore } = require('../controller/article');

router.get('/:id', getAllArticles);
router.get("/readmore/:id", readmore)
module.exports = router;
