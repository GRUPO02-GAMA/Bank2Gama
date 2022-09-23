const { Sequelize } = require('sequelize')
const Client = require('../models/clients.model')
const database = require('../database/db')

const Account = database.define('accounts', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  clientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'id'
    }
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
})

module.exports = Account
