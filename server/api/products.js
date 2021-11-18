const router = require("express").Router();
const {
  models: { Product, Cart },
} = require("../db");
const Cart_Product = require("../db/models/Cart_Product");
const Category = require("../db/models/Category");
const { requireToken, isAdmin } = require('./gatekeepingMiddleware')
module.exports = router;



// GET /api/products  ==> all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({order: [['id', 'ASC']], include: Category});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id == > single product with id
router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(singleProduct);
  } catch (err) {
    next(err);
  }
});

// POST /api/products == > create new product row
router.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const { productName, picture, description, price, categoryId } = req.body;
    const newProduct = await Product.create({ productName: productName, picture: picture, description: description, price: price, categoryId: Number(categoryId), date: new Date() });
    res.json(newProduct);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).send("Sequelize");
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(error);
    }
  }
});

// PUT /api/products/ ==> edit product with id (id passed in through req.body)
router.put("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.body.id);
    const updatedProduct = await productToUpdate.update(req.body);
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id ==> delete product with id
router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.id);
    await productToDelete.destroy();
    res.json(productToDelete);
  } catch (err) {
    next(err);
  }
});
