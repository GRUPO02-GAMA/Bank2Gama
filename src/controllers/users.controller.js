const { decode } = require('jsonwebtoken')
const Client = require('../models/clients.model')

exports.user = async function user(req, res) {
  const user = decode(req.cookies.auth)

  const client = await Client.findAll({ where: { email: user.email } })

  res.json(client)
}
