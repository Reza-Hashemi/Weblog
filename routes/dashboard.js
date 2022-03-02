const express = require('express');
const router = express.Router();
const updateDashboard = require('../middleware/updateDashboard');
const blogger = require('../database/model/blogger');
const {
  dashboardRender,
  dashboardUpdate,
  dashboardRemove,
} = require('../controller/dashboard');

router.get('/', dashboardRender);
router.put('/', updateDashboard,dashboardUpdate);
router.delete('/:id', dashboardRemove);

module.exports = router;
