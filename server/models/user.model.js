// models using mongoose
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    accountId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: String, required: true },
    totalDeposit: { type: String, required: true },
    totalWithdraw: { type: String, required: true },
  },
  {
    collection: "users-data",
  }
);

const User = mongoose.model("UserData", UserSchema);

module.exports = User;
