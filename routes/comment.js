const express = require('express');
const router = express.Router();
const {postComment,deleteComment} = require ('../controller/comment')

router.post('/:ArticleID', postComment)
router.delete('/:id',deleteComment)

module.exports = router;