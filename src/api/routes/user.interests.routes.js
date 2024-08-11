const express = require('express');
const { get_interests, update_interests, insert_interests, delete_interests } = require('../controllers/user.interests.controller');
// const { authorize } = require("../middleware/auth");
const router = express.Router()

router.get('/', get_interests)
router.post('/', insert_interests)
router.put('/', update_interests)
router.delete('/', delete_interests);

module.exports = router