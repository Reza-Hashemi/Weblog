const express = require('express');
const router = express.Router();
const {
  adminPanel,
  deleteBlogger,
  updateBloggerPassword,
  getArticles,
  readmore,
  deleteArticle,
  createadmin,
  createArticle
} = require('../controller/admin');
// const { postComment, deleteComment } = require('../controller/comment')
const { createAdminCheck } = require('../middleware/createAdminCheck');

router.get('/', adminPanel);
router.post('/createadmin', createAdminCheck, createadmin);
router.delete('/:id', deleteBlogger);
router.get('/updatepassword/:id', updateBloggerPassword);
router.get('/articles', getArticles);
router.get('/articles/:id', readmore);
router.delete('/articles/:id', deleteArticle);
router.post('/adminCreateArticle',createArticle);
module.exports = router;
