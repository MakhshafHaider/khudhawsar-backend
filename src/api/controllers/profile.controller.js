const {
  getProfile,
  editProfile,
  searchProfile,
} = require('../services/profile.service')
const {
  updateUserMatch,
  batchUpdateUserMatches,
} = require('../services/user.matches.service')

const get_profile = (req, res) => {
  getProfile(req.params.id)
    .then((user) => {
      return res.json(user)
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}
const edit_profile = (req, res) => {
  editProfile(req.params.id, req.body)
    .then((result) => {
      return res.send(result)
    })
    .then(() => {
      batchUpdateUserMatches(req.params.id)
      return
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}

const search_profile = (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).send('No parameter detected')
  searchProfile(req.user.user_id, req.body)
    .then((result) => {
      return res.send(result)
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}

module.exports = {
  edit_profile,
  get_profile,
  search_profile,
}
