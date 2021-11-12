const router = require("express").Router();
const {
  models: { User, Product, Cart, Cart_Product },
} = require("../db");

module.exports = router;

// // GET /api/orders  ==> all orders
// router.get("/", async (req, res, next) => {
//   try {
//     const cart = await Product.findAll();
//     res.json(cart);
//   } catch (err) {
//     next(err);
//   }
// });

// // GET /api/products/:id == > single order with id
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

// GET /api/cart/:userId
//get products from users cart
// router.get("/:userId", async (req, res, next) => {
//   try {
//     const cartIdForUser = await User.findByPk(Number(req.params.userId));
//     const thisCartId = await cartIdForUser.cartId;
//     // console.log("THIS IS WHAT WE LOOKING FOR: ", thisCartId);
//     const ordersInCart = await Cart_Product.findAll({
//       where: {
//         cartId: thisCartId,
//         purchased: false,
//       },
//       include: {
//         model: Product
//       }
//     });
//     res.json(ordersInCart);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/user/:userId", async (req, res, next) => {
  try {
    const cartIdForUser = await User.findByPk(Number(req.params.userId));
    const thisCartId = await cartIdForUser.cartId;
    // console.log("THIS IS WHAT WE LOOKING FOR: ", thisCartId);
    const cart= await Cart.findByPk(thisCartId, {
      include: {
        model: Product,
      },
    })
    res.json(cart.products);
  } catch (err) {
    next(err);
  }
});

// // POST /api/orders == > create new order entry
// router.post("/", async (req, res, next) => {
//   try {
//     // find or create the order
//     const [product, created] = await Product.findOrCreate({
//       where: {
//         userId: req.body.userId,
//         productId: req.body.productId,
//       },
//       defaults: req.body,
//     });

//     if (created) {
//       res.json(product);
//     }
//     // if order already exists, update instead
//     else {
//       const updatedProduct = await product.update({
//         ...req.body,
//         quantity: req.body.quantity + product.quantity, //
//       });
//       res.json(updatedProduct);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// // PUT /api/orders/:id ==> edit order with id
// router.put("/:id", async (req, res, next) => {
//   try {
//     const productToUpdate = await Product.findByPk(req.params.id);
//     const updatedProduct = await productToUpdate.update(req.body);
//     res.json(updatedProduct);
//   } catch (err) {
//     next(err);
//   }
// });

// // DELETE /api/orders/:id ==> delete order with id
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const productToDelete = await Product.findByPk(req.params.id);
//     await productToDelete.destroy();
//     res.json(productToDelete);
//   } catch (err) {
//     next(err);
//   }
// });
