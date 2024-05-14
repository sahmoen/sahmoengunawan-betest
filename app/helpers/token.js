const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;
// const key = "IniKey";

function tokenUser(data) {
  return jwt.sign(data, key);
}

function checkToken(data) {
  return jwt.verify(data, key);
}

module.exports = {
  tokenUser,
  checkToken,
};
