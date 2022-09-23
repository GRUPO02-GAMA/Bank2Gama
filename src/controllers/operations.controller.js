const { decode } = require('jsonwebtoken')
const Account = require('../models/accounts.model')
const Operation = require('../models/operations.model')
const Client = require('../models/clients.model')

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

  let destination

  if (req.body.type === 'credit') {
    destination = await Client.findOne({
      where: {
        email: req.body.dest,
        $or: [
          {
            legalId: req.body.dest
          }
        ]
      }
    })
  }

  let account

  if (destination) {
    account = await Account.findOne({
      where: {
        clientId: destination.id
      }
    })
  } else {
    account = await Account.findOne({
      where: {
        clientId: client.id
      }
    })
  }

  const operation = {
    id: null,
    clientId: client.id,
    accountId: account.id,
    type: req.body.type,
    value: req.body.value
  }

  try {
    const newOperation = await Operation.create(operation)

    let newBalance

    if (req.body.type === 'credit') {
      newBalance = Number(account.balance + newOperation.value)
    } else if (req.body.type === 'debit') {
      newBalance = Number(account.balance - newOperation.value)

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
    }

    const response = {
      balance: account.balance,
      newBalance: newBalance,
      value: req.body.value
    }

    res.status(201).json(response)
  } catch (err) {
    res.status(400).json({ error: err })
  }
}
