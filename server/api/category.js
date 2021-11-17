const router = require("express").Router();
const {
  models: { Category,},
} = require("../db");
module.exports = router;

// GET /api/category
router.get('/', async (req,res,next) => {
  try {
    const listOfCategories = await Category.findAll();
    res.json(listOfCategories)
  } catch (error) {
    next(error)
  }
})
