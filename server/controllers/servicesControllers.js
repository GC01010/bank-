const User = require("../models/user.model");
const { authenticateToken } = require("../token.js");

const balance = async (req, res) => {
  let { token } = req.body;

  try {
    myAccountId = authenticateToken(token);

    if (!myAccountId) {
      return res.status(500).json({ status: false, msg: "incorrect token" });
    }

    const user = await User.findOne({ accountId: myAccountId });

    console.log(user.balance);
    return res.status(200).json({
      status: true,
      msg: "balance fetched successfully",
      balance: user.balance,
      totalDeposit: user.totalDeposit,
      totalWithdraw: user.totalWithdraw,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

const deposit = async (req, res) => {
  console.log(req.body);
  let { token, depositAmount } = req.body;

  try {
    if (!depositAmount) {
      return res
        .status(400)
        .json({ status: false, msg: "Please enter all details!!" });
    }
    if (Number(depositAmount) <= 0) {
      return res
        .status(400)
        .json({ status: false, msg: "Amount must be greater than 0" });
    }

    myAccountId = authenticateToken(token);

    if (!myAccountId) {
      return res.status(500).json({ status: false, msg: "incorrect token" });
    }

    const user = await User.findOne({ accountId: myAccountId });
    console.log(user);

    const newBalance = Number(user.balance) + Number(depositAmount);
    const newTotalDeposit = Number(user.totalDeposit) + Number(depositAmount);

    console.log(newBalance);
    const userUpdate = await User.updateOne(
      { accountId: myAccountId },
      {
        $set: {
          balance: newBalance.toString(),
          totalDeposit: newTotalDeposit.toString(),
        },
      }
    );

    // console.log(await User.findOne({ accountId: myAccountId }));

    if (!userUpdate.acknowledged) {
      return res.status(400).json({ status: false, msg: "Deposit failed" });
    }
    return res.status(200).json({
      status: true,
      msg: "Deposit successfull",
      balance: newBalance,
      totalDeposit: newTotalDeposit,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

const withdraw = async (req, res) => {
  const { token, withdrawAmount } = req.body;
  try {
    if (!withdrawAmount) {
      return res
        .status(400)
        .json({ status: false, msg: "Please enter all details!!" });
    }
    if (Number(withdrawAmount) <= 0) {
      return res
        .status(400)
        .json({ status: false, msg: "Amount must be greater than 0" });
    }

    myAccountId = authenticateToken(token);

    if (!myAccountId) {
      return res.status(500).json({ status: false, msg: "incorrect token" });
    }

    const user = await User.findOne({ accountId: myAccountId });
    console.log(user);

    if (Number(user.balance) < Number(withdrawAmount)) {
      return res
        .status(400)
        .json({ status: false, msg: "Insufficient Balance" });
    }

    const newBalance = Number(user.balance) - Number(withdrawAmount);
    const newTotalWithdraw =
      Number(user.totalWithdraw) + Number(withdrawAmount);

    const userUpdate = await User.updateMany(
      { accountId: myAccountId },
      {
        $set: {
          balance: newBalance.toString(),
          totalWithdraw: newTotalWithdraw.toString(),
        },
      }
    );

    if (!userUpdate.acknowledged) {
      return res.status(400).json({ status: false, msg: "Withdraw failed" });
    }
    console.log(userUpdate);
    console.log("withdraw successfull");
    return res.status(200).json({
      status: true,
      msg: "Withdraw successfull",
      balance: newBalance,
      totalWithdraw: newTotalWithdraw,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.deposit = deposit;
exports.withdraw = withdraw;
exports.balance = balance;
