const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../token.js");

//verify email format
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const signup = async (req, res) => {
  try {
    const { name, email, contact, accountId, password } = req.body;
    console.log(req.body);
    console.log(password.length);

    if (!name || !email || !password || !contact || !accountId) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof contact !== "string" ||
      typeof accountId !== "string"
    ) {
      return res.status(400).json({ msg: "Please enter appropiate data type" });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ msg: "Password length must be atleast 4 characters" });
    }

    if (contact.length !== 10) {
      return res
        .status(400)
        .json({ msg: "Contact length must be 10 characters" });
    }

    if (accountId.length !== 4) {
      return res
        .status(400)
        .json({ msg: "Account Id length must be 4 characters" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const user = await User.findOne({ accountId });
    if (user) {
      return res
        .status(400)
        .json({ msg: "This account is already registered" });
    }

    console.log("All validations passed");
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      contact,
      accountId,
      password: hashedPassword,
      balance: "0",
      totalDeposit: "0",
      totalWithdraw: "0",
    })
      .then(() => {
        return res
          .status(200)
          .json({
            status: true,
            msg: "Congratulations!! Account has been created for you..",
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { accountId, password } = req.body;
    console.log(accountId, password);
    if (!accountId || !password) {
      return res
        .status(400)
        .json({ status: false, msg: "Please enter all details!!" });
    }

    const user = await User.findOne({ accountId });
    if (!user)
      return res
        .status(400)
        .json({ status: false, msg: "This account does not exist!!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, msg: "Password incorrect!!" });

    console.log("Login successfull");

    const accessToken = generateAccessToken(accountId);
    return res
      .status(200)
      .json({
        accessToken: accessToken,
        status: true,
        msg: "Login successfull!!",
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.login = login;
exports.signup = signup;
