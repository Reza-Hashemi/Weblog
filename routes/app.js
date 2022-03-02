const express = require('express');
const router = express.Router();

const home = require('./home');
const aboute = require('./aboute');
const contact = require('./contact');
const admin = require('./admin');
const dashboard = require('./dashboard');
const article = require('./article');
const signup = require('./signup');
const signin = require('./signin');
const avatar = require('./avatar');
const signout = require('./signout');
const sessionDashboard = require('../middleware/sessionDashboard');
const sessionSignin = require('../middleware/sessionSignin');

router.use('/', home);
router.use('/aboute', aboute);
router.use('/contact', contact);
router.use('/admin', admin);
router.use('/article', article);
router.use('/signup', sessionDashboard, signup);
router.use('/signin', sessionDashboard, signin);
router.use('/dashboard', sessionSignin, dashboard);
router.use('/avatar', avatar);
router.use('/signout', signout);

module.exports = router;
