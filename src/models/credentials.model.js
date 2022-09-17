const { Sequelize } = require('sequelize')
const database = require('../database/db')

const Credential = database.define('credentials', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    references: {
      model: 'clients',
      key: 'email'
    }
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  recovery: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastLogin: {
    type: Sequelize.DATE,
    allowNull: true,
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
  }
})

module.exports = Credential