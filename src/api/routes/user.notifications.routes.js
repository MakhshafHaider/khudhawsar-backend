const express = require('express');
const { get_notifications, insert_notifications } = require('../controllers/user.notifications.controller');
// const { authorize } = require("../middleware/auth");
const router = express.Router()

router.get('/', get_notifications)
router.post('/', insert_notifications)

module.exports = router