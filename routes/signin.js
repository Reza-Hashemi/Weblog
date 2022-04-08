const express = require('express');
const router = express.Router();
const { signin, signinProcess } = require('../controller/signin');
const signinCheck = require('../middleware/signinCheck');

router.get('/', signin);
router.post('/', signinCheck, signinProcess);

// router.route("/").get(signin).post(signinProcess)
module.exports = router;
