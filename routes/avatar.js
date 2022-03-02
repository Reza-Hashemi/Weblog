const express = require('express');
const router = express.Router();
const {uploadAvatar} = require("../controller/avatar")



router.put("/", uploadAvatar )

module.exports = router