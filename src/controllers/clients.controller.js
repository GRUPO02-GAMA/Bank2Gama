const Client = require('../models/clients.model')
const Credential = require('../models/credentials.model')
const bcrypt = require('bcrypt')

exports.findAll = async function findAll(req, res) {
  Client.findAll().then(result => res.json(result))
}

exports.create = async function create(req, res) {
  const body = req.body
  const cpf = body.legalId.replace(/(\D)/g, '')
  const client = {
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    legalId: cpf,
    birth: body.birth
  }

  const salt = await bcrypt.genSalt(10)
  const password = client.legalId
  const hash = await bcrypt.hash(password, salt)

  const newClient = await Client.create(client)
    .then()
    .catch(error => res.send(error))
  
  await Credential.create({
    email: newClient.toJSON().email,
    hash: hash
  })
    .then(() => res.status(201).json({ msg: 'Conta criada com sucesso' }))
    .catch(error => res.send(error))
}
