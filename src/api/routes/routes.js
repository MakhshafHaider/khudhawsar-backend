const express = require('express')
const {authenticate} = require("../middleware/auth");
const { login, signup } = require('../controllers/auth.controller')
const userRoutes = require("../routes/user.routes")
const dropdownRoutes = require("../routes/dropdown.routes")
const chatRoutes = require('../routes/chat.routes');
const msgRoutes = require("../routes/message.routes");

const router = express.Router()


router.get('/', (req, res) => res.send("API Running"))
router.post('/login', login)
router.post('/register', signup)
router.use('/user',authenticate, userRoutes)
router.use('/dropdown',authenticate, dropdownRoutes )
router.use('/chats', authenticate, chatRoutes)
router.use('/msg', authenticate, msgRoutes)

module.exports = router