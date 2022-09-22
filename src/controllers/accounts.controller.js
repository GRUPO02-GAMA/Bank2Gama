const Account = require('../models/accounts.model')

exports.findAll = async function findAll(req, res) {
  Account.findAll().then(result => res.json(result)).catch(error => console.log(error))
}