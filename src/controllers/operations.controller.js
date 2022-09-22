const { decode } = require("jsonwebtoken")
const Operation = require("../models/operations.model")

exports.find = async function find(req, res) {
  const client = await decode(req.cookies.auth)

  console.log(client)
  Operation.findAll({
    where: {
      clientId: client.id,
    },
  })
    .then((result) => res.json(result))
    .catch((error) => console.log(error))
}
