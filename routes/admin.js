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
} = require('../controller/admin');
const {createAdminCheck} = require("../middleware/createAdminCheck")

router.get('/', adminPanel);
router.post('/createadmin', createAdminCheck,createadmin);
router.delete('/:id', deleteBlogger);
router.get('/updatepassword/:id', updateBloggerPassword);
router.get('/articles', getArticles);
router.get('/articles/:id', readmore);
router.delete('/articles/:id', deleteArticle);
module.exports = router;
