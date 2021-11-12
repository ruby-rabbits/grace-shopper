const router = require("express").Router();
const {
  models: { User, Product, Cart, Cart_Product },
} = require("../db");

module.exports = router;

// this worked with orders table, Do we want to be able to click on a ticket in the cart and go back to its single product page. Need to adjust logic

// router.get("/:id", async (req, res, next) => {
//   try {
//     const singleProduct = await Product.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.json(singleProduct);
//   } catch (err) {
//     next(err);
//   }
// });

//get products from users cart
router.get("/user/:userId", async (req, res, next) => {
  try {
    const cartIdForUser = await User.findByPk(Number(req.params.userId));
    const thisCartId = await cartIdForUser.cartId;
    const ordersInCart = await Cart_Product.findAll({
      where: {
        cartId: thisCartId,
        purchased: false,
      },
    });
    res.json(ordersInCart);
  } catch (err) {
    next(err);
  }
});

// POST  == > create new cart_product entry
router.post("/user/:userId", async (req, res, next) => {
  try {
    // find or create the product
    const cartIdForUser = await User.findByPk(Number(req.params.userId));
    const thisCartId = await cartIdForUser.cartId;
    console.log("REQ BODY PRODUCTID", req.body.productId);
    const [product, created] = await Cart_Product.findOrCreate({
      where: {
        cartId: Number(thisCartId),
        productId: Number(req.body.productId),
      },
      defaults: req.body,
    });

    if (created) {
      res.json(product);
    }
    // if order already exists, update instead
    else {
      let quant = 0;
      if (req.body.quantity === undefined) {
        quant = 1;
      } else {
        quant = req.body.quantity;
      }
      const updatedProduct = await product.update({
        ...req.body,
        quantity: quant + product.quantity,
      });
      res.json(updatedProduct);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id ==> edit order with id
router.put("/:id", async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.id);
    const updatedProduct = await productToUpdate.update(req.body);
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders/:id ==> delete order with id
router.delete("/:id", async (req, res, next) => {
  try {
    const productToDelete = await Product.findByPk(req.params.id);
    await productToDelete.destroy();
    res.json(productToDelete);
  } catch (err) {
    next(err);
  }
});
