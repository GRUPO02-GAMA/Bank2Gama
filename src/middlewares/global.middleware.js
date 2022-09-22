const Credential = require('../models/credentials.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const token = req.cookies.auth
  if (!token)
    return res.status(401).json({ auth: false, message: 'No token provided.' })

  jwt.verify(token, process.env.SECRET, async function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: 'Failed to authenticate token.' })

    const client = await Credential.findOne({ where: { id: decoded.id } })

    if (!client || !client.id) {
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' })
    }

    req.userId = client.id

    return next()
  })
}
