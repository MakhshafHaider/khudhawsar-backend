const express = require('express');
const { get_images, insert_images, delete_images, update_images } = require('../controllers/user.images.controller');
// const { authorize } = require("../middleware/auth");
const router = express.Router()

router.get('/', get_images)
router.post('/', insert_images)
router.delete('/', delete_images);
router.put('/', update_images);
module.exports = router