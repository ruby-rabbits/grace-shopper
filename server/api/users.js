
const router = require("express").Router();
const {
  models: { User, Cart_Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "isAdmin", "picture"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id ==> update user info
router.put("/:id", async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.body.id);
    const updated = await userToUpdate.update(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});
