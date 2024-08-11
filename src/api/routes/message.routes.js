const express = require('express')
const {
  get_msg,
  add_msg,
  send_msg,
  all_messages,
} = require('../controllers/message.controller')
const router = express.Router()

router.get('/', get_msg)
router.post('/', add_msg)
router.post('/message', send_msg)
router.get('/messages/:chat_id', all_messages)
//router.delete('/', delete_active);

module.exports = router
