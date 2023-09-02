const User = require("../models/user.model.js");
const { authenticateToken } = require("../token.js");

const transfer = async (req, res) => {
  try {
    const { token, accountId, amount } = req.body;

    const myAccountId = authenticateToken(token);

    if (!myAccountId) {
      return res.status(400).json({ status: false, msg: "Token is not valid" });
    }

    if (!accountId || !amount) {
      return res
        .status(400)
        .json({ status: false, msg: "Please enter all details!!" });
    }

    if (Number(amount) <= 0) {
      return res
        .status(400)
        .json({ status: false, msg: "Amount must be greater than 0" });
    }

    if (accountId.toString().length !== 4) {
      return res.status(400).json({
        status: false,
        msg: "Account Id length must be 12 characters",
      });
    }

    console.log("All validations passed");

    const user = await User.findOne({ accountId });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, msg: "Reciever's account does not exist!!" });
    } else {
      const newBalance = Number(user.balance) + Number(amount);
      const newTotalDeposit = Number(user.totalDeposit) + Number(amount);

      const user_update = await User.updateOne(
        { accountId: user.accountId },
        {
          $set: {
            balance: newBalance.toString(),
            totalDeposit: newTotalDeposit.toString(),
          },
        }
      );
      // console.log(user_update)
      // console.log("Reciever's account updated successfully");
    }

    const sender = await User.findOne({ accountId: myAccountId });
    console.log(sender);
    const new_balance_sender = Number(sender.balance) - Number(amount);
    const newTotalWithdraw = Number(sender.totalWithdraw) + Number(amount);
    const sender_update = await User.updateOne(
      { accountId: myAccountId },
      {
        $set: {
          balance: new_balance_sender.toString(),
          totalWithdraw: newTotalWithdraw.toString(),
        },
      }
    );

    return res.status(200).json({
      status: true,
      msg: "Transfer successfull",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.transfer = transfer;
