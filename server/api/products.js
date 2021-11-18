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
    console.log(req.body.start)
    const products = await Product.findAll({order: [['id', 'ASC']], include: Category});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// router.put("/", async (req,res,next) => {
//   try {
//     const productToAdd = await Product.findByPk(req.body.productId)
//     const cart = await Cart.findByPk(req.body.cartId)
//     const addProduct = await cart.addProduct(productToAdd)
//     console.log(addProduct)
//     res.json(addProduct)
//   }
//   catch(error){
//     console.log(error)
//     next(error)
//   }
// })
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
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(401).send("Something is wrong with this form");
    } else {
      next(err);
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
