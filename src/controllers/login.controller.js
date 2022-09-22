const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const Credential = require('../models/credentials.model')

exports.login = async function login(req, res) {
  const client = await Credential.findOne({ where: { email: req.body.email } })

  if (client) {
    const password_valid = await bcrypt.compare(req.body.password, client.hash)
    if (password_valid) {
      const token = jwt.sign(
        { id: client.id, email: client.email },
        process.env.SECRET,
        { expiresIn: 86400 }
      )

      await Credential.update(
        {
          lastLogin: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          where: { email: client.email }
        }
      )
        .then()
        .catch(error => res.send(error))

      res.cookie('auth', token)
      res.status(200).json({ auth: true, token: token })
    } else {
      res.status(400).json({ error: 'Password Incorrect' })
    }
  } else {
    res.status(404).json({ error: 'Client does not exist' })
  }
}

exports.logout = function logout(req, res) {
  res.json({ auth: false, token: null })
}
