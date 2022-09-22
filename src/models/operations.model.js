const { Sequelize } = require("sequelize")
const database = require("../database/db")

const Operation = database.define("operations", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "clients",
      key: "id",
    },
  },
  accountId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "accounts",
      key: "id",
    },
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
})

module.exports = Operation
