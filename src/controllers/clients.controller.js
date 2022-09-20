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

  try {
    const newClient = await Client.create(client)

    try {
      await createCredentials(newClient)
    } catch (err) {
      res.status(400).json({ error: err })
    }

    res.status(201).json({ msg: 'Conta criada com sucesso' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

async function createCredentials(newClient) {
  const email = newClient.email
  const salt = await bcrypt.genSalt(10)
  const password = newClient.legalId
  const hash = await bcrypt.hash(password, salt)

  try {
    await Credential.create({
      email: email,
      hash: hash
    })
  } catch (error) {
    res.status(400).json({ error: err })
  }
}
