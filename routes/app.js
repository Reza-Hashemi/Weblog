const express = require('express');
const router = express.Router();

const home = require('./home');
const aboute = require('./aboute');
const contact = require('./contact');
const admin = require('./admin');
const dashboard = require('./dashboard');
const bloggerArticle = require('./bloggerArticle');
const signup = require('./signup');
const signin = require('./signin');
const avatar = require('./avatar');
const signout = require('./signout');
const articles = require('./articles');
const comment = require('./comment')
const { sessionDashboard } = require('../middleware/sessionDashboard');
const {sessionSignin, bloggerAccess} = require('../middleware/sessionSignin');
const { adminAccess } = require('../middleware/adminAccess');

router.use('/', home);
router.use('/aboute', aboute);
router.use('/contact', contact);
router.use('/admin', sessionSignin,adminAccess, admin);
router.use('/articles', articles);
router.use('/comment', sessionSignin,comment)
router.use('/bloggerarticle', sessionSignin, bloggerArticle);
router.use('/signup', sessionDashboard, signup);
router.use('/signin', sessionDashboard, signin);
router.use('/dashboard', sessionSignin, bloggerAccess, dashboard);
router.use('/avatar', sessionSignin, avatar);
router.use('/signout', signout);

module.exports = router;
