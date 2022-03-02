const express = require('express');
const router = express.Router();
const { signup, signupProcess } = require('../controller/signup');
const signupCheck = require('../middleware/signupCheck');

router.get('/', signup);
router.post('/', signupCheck, signupProcess);

module.exports = router;
