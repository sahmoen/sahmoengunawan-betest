const { checkToken } = require("../helpers/token");
const db = require("../models");
const User = db.user;

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "INVALID TOKEN" };
    }

    const payload = checkToken(access_token);
    const { id } = payload;
    const user = await User.findByPk(id);
    if (!user) {
      throw { name: "INVALID TOKEN" };
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
