const express = require('express');
const router = express.Router();
const { adminPanel, deleteBlogger } = require('../controller/admin');

router.get('/', adminPanel);
router.delete('/:id', deleteBlogger);
module.exports = router;
