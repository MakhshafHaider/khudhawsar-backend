const jwt = require('jsonwebtoken')
require('dotenv').config()

//const config = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.log(err, 'err')
      } else {
        req.user = decoded
      }
      console.log(req.user, 'req.user')
    })
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

const authorizeToken = (req, res, next) => {
  console.log(req.user.user_id, 'user_id')

  if (req.user.user_id == req.params.id) return next()
  else return res.status(401).send('Invalid Token')
}

module.exports = {
  authenticate: authenticateToken,
  authorize: authorizeToken,
}
