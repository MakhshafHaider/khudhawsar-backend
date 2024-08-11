const express = require('express')
const {
  get_profile,
  edit_profile,
  search_profile,
} = require('../controllers/profile.controller')
const { authorize } = require('../middleware/auth')
const user_interests_routes = require('./user.interests.routes')
const user_languages_routes = require('./user.languages.routes')
const user_views_routes = require('./user.views.routes')
const user_likes_routes = require('./user.likes.routes')
const user_matches_routes = require('./user.matches.routes')
const user_images_routes = require('./user.images.routes')
const user_notification_routes = require('./user.notifications.routes')
const router = express.Router()

router.get('/search', search_profile)
router.get('/:id', get_profile)
router.put('/:id', authorize, edit_profile)
router.put('/interest', authorize, edit_profile)
router.delete('/:id', authorize, (req, res) => res.send(req.user))
router.use('/:id/interests', authorize, user_interests_routes)
router.use('/:id/languages', authorize, user_languages_routes)
router.use('/:id/views', authorize, user_views_routes)
router.use('/:id/likes', authorize, user_likes_routes)
router.use('/:id/notifications', authorize, user_notification_routes)
router.use('/:id/matches', authorize, user_matches_routes)
router.use('/:id/images', authorize, user_images_routes)

module.exports = router
