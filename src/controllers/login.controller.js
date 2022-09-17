const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require("moment")
require('dotenv').config()
const Credential = require('../models/credentials.model')

exports.login = async function login(req, res) {
  const client = await Credential.findOne({ where: { email: req.body.email } })

  if (client) {
    const password_valid = await bcrypt.compare(req.body.password, client.hash)
    if (password_valid) {
      token = jwt.sign(
        { id: client.id, email: client.email },
        process.env.SECRET
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

      res.status(200).json({ token: token })
    } else {
      res.status(400).json({ error: 'Password Incorrect' })
    }
  } else {
    res.status(404).json({ error: 'Client does not exist' })
  }
}
