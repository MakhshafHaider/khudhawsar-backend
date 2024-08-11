const express = require('express')
const {
  get_matches,
  get_opposite_matches,
} = require('../controllers/user.matches.controller')
// const { authorize } = require("../middleware/auth");
const router = express.Router()

router.get('/', get_matches)
router.get('/opposite', get_opposite_matches)

module.exports = router
