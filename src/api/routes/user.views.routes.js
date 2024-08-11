const express = require('express');
const { get_views, insert_view, delete_view } = require('../controllers/user.views.controller');
// const { authorize } = require("../middleware/auth");
const router = express.Router()

router.get('/', get_views)
router.post('/', insert_view)
router.delete('/', delete_view);

module.exports = router