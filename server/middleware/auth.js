const jwt = require('jsonwebtoken')

const config = process.env

const verifyToken = (req, res, next) => {
  const bearerToken =
    req.body.token || req.query.token || req.headers.authorization

  if (!bearerToken) {
    return res.status(403).send('A token is required for authentication')
  }

  const token = bearerToken.split(' ')[1]

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

module.exports = verifyToken