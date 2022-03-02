const express = require('express');
const router = express.Router();
const {signout} = require('../controller/signout');

router.get("/", signout)


module.exports = router;