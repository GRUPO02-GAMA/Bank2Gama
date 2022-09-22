const User = require("../models/users.model")
const Credential = require("../models/credentials.model")
const bcrypt = require("bcrypt")

exports.user = async function user(req, res) {
  const body = req.body
  const user = await User.findOne({
    where: { email: "ojaves4@amazon.co.jp" },
  })

  res.json(user)
  //   res.status(401).json()
}
