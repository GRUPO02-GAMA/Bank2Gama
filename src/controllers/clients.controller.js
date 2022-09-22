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

exports.update = async function update(req, res) {
  const body = req.body

  const client = await Client.findOne({ where: { id: req.params.id } })

  if (client) {
    try {
      const updateClient = await Client.update(
        {
          name: body.name ? body.name : client.name,
          lastname: body.lastname ? body.lastname : client.lastname
        },
        {
          where: { email: client.email }
        }
      )

      if (body.password) {
        try {
          await updateCredentials(updateClient, body.password)
        } catch (err) {
          res.status(400).json({ error: err })
        }
      }

      res.status(201).json({ msg: 'Perfil atualizado com sucesso' })
    } catch (err) {
      res.status(400).json({ error: err })
    }
  }
}

async function updateCredentials(client, password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  try {
    await Credential.update(
      {
        hash: hash
      },
      {
        where: { email: client.email }
      }
    )
  } catch (error) {
    res.status(400).json({ error: err })
  }
}
