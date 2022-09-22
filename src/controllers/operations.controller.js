const Account = require("../models/accounts.model")
const Operation = require("../models/operations.model")

exports.findAll = async function findAll(req, res) {
  Operation.findAll()
    .then((result) => res.json(result))
    .catch((error) => console.log(error))
}
