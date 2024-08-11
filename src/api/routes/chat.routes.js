const express = require('express')
const {
  get_active,
  add_active,
  delete_active,
  access_chat,
  fetch_chat,
} = require('../controllers/chat.controller')
const { authorize, authenticate } = require('../middleware/auth')
const router = express.Router()

router.get('/', get_active)
router.post('/access_chat', authenticate, access_chat) // create or get the chat of a room
router.get('/fetch_chat', authenticate, fetch_chat) // fetch all the chats done by logged in user
router.post('/', add_active)
router.delete('/', delete_active)

module.exports = router
