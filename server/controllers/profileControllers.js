const { authenticateToken } = require("../token.js");
const User = require("../models/user.model");

const profile = async (req, res) => {
  const { token } = req.body;

  myAccountId = authenticateToken(token);

  if (!myAccountId) {
    return res.status(500).json({ status: false, msg: "token is invalid" });
  }

  const user = await User.findOne({ accountId: myAccountId });

  console.log(user);

  return res.status(200).json({
    status: true,
    name: user.name,
    email: user.email,
    contact: user.contact,
    accountId: user.accountId,
  });
};

exports.profile = profile;
