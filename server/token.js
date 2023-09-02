//importing jwt for authorization
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

function authenticateToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  authenticateToken,
};
