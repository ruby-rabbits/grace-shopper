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

//get products from users cart, filter on front end allows us to use this route to show products in cart and products user has previously bought
router.get("/user/:userId", async (req, res, next) => {
  try {
    const cartIdForUser = await User.findByPk(Number(req.params.userId));
    const thisCartId = await cartIdForUser.cartId;
    // console.log("THIS IS WHAT WE LOOKING FOR: ", thisCartId);
    const cart = await Cart.findByPk(thisCartId, {
      include: {
        model: Product,
      },
    });
    res.json(cart.products);
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

//PUT change columns in cart_products: amountPaid, purchased, purchaseDate
router.put("/user/:userId/checkout", async (req, res, next) => {
  try {
    const cartIdForUser = await User.findByPk(Number(req.params.userId));
    const thisCartId = await cartIdForUser.cartId;

    const updatedCart = await Cart_Product.update(
      {
        purchased: true,
        purchaseDate: Date.now(),
      },
      {
        where: {
          cartId: Number(thisCartId),
          purchased: false,
        },
      }
    );
    res.json(updatedCart);
  } catch (err) {
    next(err);
  }
});

//PUT change quantity to specified amount
router.put("/user/:userId/quantity", async (req, res, next) => {
  try {
    const cartIdForUser = await User.findByPk(Number(req.params.userId));
    const thisCartId = await cartIdForUser.cartId;

    const productToUpdate = await Cart_Product.findOne({
      where: {
        cartId: Number(thisCartId),
        productId: Number(req.body.productId),
      },
    });
    const updatedProduct = await productToUpdate.update({
      quantity: req.body.quantity,
    });
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders/:id ==> delete order with id
router.delete("/user/:userId/:productId", async (req, res, next) => {
  try {
    const cartIdForUser = await User.findByPk(Number(req.params.userId));
    const thisCartId = await cartIdForUser.cartId;

    const productToDelete = await Cart_Product.findOne({
      where: {
        cartId: Number(thisCartId),
        productId: Number(req.params.productId),
      },
    });
    await productToDelete.destroy();
    res.json(productToDelete);
  } catch (err) {
    next(err);
  }
});
