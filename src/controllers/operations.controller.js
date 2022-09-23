const { decode } = require('jsonwebtoken')
const Account = require('../models/accounts.model')
const Operation = require('../models/operations.model')

exports.find = async function find(req, res) {
  const client = decode(req.cookies.auth)

  Operation.findAll({
    where: {
      clientId: client.id
    }
  })
    .then(result => res.json(result))
    .catch(error => console.log(error))
}

exports.create = async function create(req, res) {
  const client = decode(req.cookies.auth)
  const account = await Account.findOne({
    where: {
      clientId: client.id
    }
  })

  const operation = {
    id: null,
    clientId: client.id,
    accountId: account.id,
    type: req.body.type,
    value: req.body.value
  }

  try {
    const newOperation = await Operation.create(operation)

    const newBalance = Number(account.balance - newOperation.value)

    await Account.update(
      {
        balance: newBalance
      },
      {
        where: { id: account.id }
      }
    )
      .then()
      .catch(error => res.send(error))
    res.status(201).json({ msg: 'Operação criada com sucesso' })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}
