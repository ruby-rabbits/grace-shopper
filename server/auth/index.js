const router = require("express").Router();
const {
  models: { User, Cart },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.send({ token: await User.authenticate({ username, password }) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //upon signup create/associate cart to user
    const user = await User.create({ username, password, email });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
