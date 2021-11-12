//store all our functions that will act as middleware between our request and ourresponse and we will use it as we see fit
const {
  models: { User },
} = require("../db");
const User = require("../db/models/User");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
};
