const express = require('express');
const { get_likes, insert_like, delete_like } = require('../controllers/user.likes.controller');
// const { authorize } = require("../middleware/auth");
const router = express.Router()

router.get('/', get_likes)
router.post('/', insert_like)
router.delete('/', delete_like);

module.exports = router