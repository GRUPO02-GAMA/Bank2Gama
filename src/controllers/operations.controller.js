const { decode } = require('jsonwebtoken')
const Account = require('../models/accounts.model')
const Operation = require('../models/operations.model')
const Client = require('../models/clients.model')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

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
  const userLogado = decode(req.cookies.auth)
  const clientLogado = await Client.findOne({
    where: { email: userLogado.email }
  })

  if (req.body.type === 'credit') {
    const accountLogado = await Account.findOne({
      where: {
        clientId: clientLogado.id
      }
    })

    const operationCredito = {
      id: null,
      clientId: clientLogado.id,
      accountId: accountLogado.id,
      type: 'credit',
      value: req.body.value
    }

    try {
      const newOperationCredito = await Operation.create(operationCredito)

      const newBalanceCredito = Number(
        accountLogado.balance + newOperationCredito.value
      )

      await Account.update(
        {
          balance: newBalanceCredito
        },
        {
          where: { id: accountLogado.id }
        }
      )
        .then(() => {
          const response = {
            balance: accountIn.balance,
            newBalance: newBalance,
            value: req.body.value
          }

          res.status(201).json(response)
        })
        .catch(error => res.send(error))
    } catch (err) {
      res.status(400).json({ error: err })
    }
  } else if (req.body.type === 'debit') {
    const clientDestination = await Client.findOne({
      where: {
        [Op.or]: [{ email: req.body.dest }, { legalId: req.body.dest }]
      }
    })

    const accountDestination = await Account.findOne({
      where: {
        clientId: clientDestination.id
      }
    })

    const accountLogado = await Account.findOne({
      where: {
        clientId: clientLogado.id
      }
    })

    const operationCredito = {
      id: null,
      clientId: clientDestination.id,
      accountId: accountDestination.id,
      type: 'credit',
      value: req.body.value
    }

    const operationDebito = {
      id: null,
      clientId: clientLogado.id,
      accountId: accountLogado.id,
      type: 'debit',
      value: req.body.value
    }

    try {
      const newOperationCredito = await Operation.create(operationCredito)
      const newOperationDebito = await Operation.create(operationDebito)

      const newBalanceCredito = Number(
        accountDestination.balance + newOperationCredito.value
      )
      const newBalanceDebito = Number(
        accountLogado.balance - newOperationDebito.value
      )

      await Account.update(
        {
          balance: newBalanceCredito
        },
        {
          where: { id: accountDestination.id }
        }
      )
        .then()
        .catch(error => res.send(error))

      await Account.update(
        {
          balance: newBalanceDebito
        },
        {
          where: { id: accountLogado.id }
        }
      )
        .then()
        .catch(error => res.send(error))

      const response = {
        balance: accountLogado.balance,
        newBalance: newBalanceDebito,
        value: req.body.value
      }

      res.status(201).json(response)
    } catch (err) {
      res.status(400).json({ error: err })
    }
  }
}
