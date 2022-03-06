const express = require('express');
const router = express.Router();
const { avatarController } = require('../controller/avatar');
const { uploadAvatar } = require('../tools/uploadAvatar');

router.put('/', uploadAvatar.single('avatar'), avatarController);

module.exports = router;
