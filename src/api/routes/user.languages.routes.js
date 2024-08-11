const express = require('express');
const { get_languages, update_languages, insert_languages, delete_languages } = require('../controllers/user.languages.controller');
// const { authorize } = require("../middleware/auth");
const router = express.Router()

router.get('/', get_languages)
router.post('/', insert_languages)
router.put('/', update_languages)
router.delete('/', delete_languages);

module.exports = router