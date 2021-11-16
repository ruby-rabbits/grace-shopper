const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// GET /api/products  ==> all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
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
router.post("/", async (req, res, next) => {
  try {
    const { productName, picture, description, price, categoryId } = req.body;
    const newProduct = await Product.create({ productName: productName, picture: picture, description: description, price: price, categoryId: Number(categoryId), date: new Date() });
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id ==> edit product with id
router.put("/:id", async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.id);
    const updatedProduct = await productToUpdate.update(req.body);
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id ==> delete product with id
router.delete("/:id", async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.id);
    await productToDelete.destroy();
    res.json(productToDelete);
  } catch (err) {
    next(err);
  }
});
