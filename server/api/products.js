const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// GET /  ==> all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /:id == > single product with id
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

// POST / == > create new product row
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /:id ==> edit product with id
router.put("/:id", async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.id);
    const updatedProduct = await productToUpdate.update(req.body);
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /:id ==> delete product with id
router.delete("/:id", async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.id);
    await productToDelete.destroy();
    res.json(productToDelete);
  } catch (err) {
    next(err);
  }
});
