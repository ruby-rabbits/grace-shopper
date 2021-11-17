const router = require('express').Router();
const {
  models: { User, Product, Cart, Cart_Product },
} = require('../db');

const { requireToken } = require('./gatekeepingMiddleware')

module.exports = router;

//get products from users cart, filter on front end allows us to use this route to show products in cart and products user has previously bought
router.get('/', requireToken, async (req, res, next) => {
  try {
    // console.log("THIS IS WHAT WE LOOKING FOR: ", thisCartId);
    // const cartId = Number(req.params.cartId); <-- for when cart was being pushed through URL
    const cartId = req.user.cartId
    // ^^ cart provided through token authentication middleware
    const cart = await Cart.findByPk(cartId, {
      include: {
        model: Product,
      },
    });
    const currentCart = cart.products.filter(item => !item.cart_product.purchased)
    console.log(currentCart)
    res.json(currentCart);
  } catch (err) {
    next(err);
  }
});

// POST  == > create new cart_product entry - /api/cart/
// what to pass in req.body: productId, quantity

router.post('/', requireToken, async (req, res, next) => {
  try {
    const {productId, quantity} = req.body
    const cartId = req.user.cartId
    let [cartProduct, created] = await Cart_Product.findOrCreate({
      where: {
        cartId,
        productId
      },
      defaults: {
        quantity
      },
    });
    if (!created) {
      let updatedQuantity = cartProduct.quantity + req.body.quantity;
      cartProduct = await cartProduct.update({
        quantity: (cartProduct.purchased ? quantity : updatedQuantity),
        purchased: false,
        purchaseDate: null
      });
    }
    const finalProduct = await Product.findByPk(cartProduct.productId, {
      include: {
        model: Cart_Product,
        as: 'cart_product',
        where: {
          cartId
        },
      },
    });
    res.json(finalProduct);
  } catch (e) {
    next(e);
  }
});
// router.post('/user/:userId', async (req, res, next) => {
//   try {
//     // find or create the product
//     const userWithCart = await User.findByPk(Number(req.params.userId));
//     const thisCartId = await userWithCart.cartId;
//     const [cartProduct, created] = await Cart_Product.findOrCreate({
//       where: {
//         cartId: Number(thisCartId),
//         productId: Number(req.body.productId),
//         purchased: false,
//       },
//       defaults: req.body,
//     });
//     const productToAdd = await Product.findByPk(cartProduct.productId, {
//       include: {
//         model: Cart_Product,
//         as: 'cart_product',
//         where: {
//           cartId: Number(thisCartId),
//         },
//       },
//     });
//     console.log(productToAdd.cart_product);
//     if (created) {
//       res.json(productToAdd);
//     }
//     // if order already exists, update instead
//     else {
//       let quant = 0;
//       if (req.body.quantity === undefined) {
//         quant = 1;
//       } else {
//         quant = req.body.quantity;
//       }
//       const updatedProduct = await cartProduct.update({
//         ...req.body,
//         quantity: quant + cartProduct.quantity,
//       });
//       const finalProduct = await Product.findByPk(updatedProduct.productId, {
//         include: {
//           model: Cart_Product,
//           as: 'cart_product',
//           where: {
//             cartId: Number(thisCartId),
//           },
//         },
//       });
//       res.json(finalProduct);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

//PUT change columns in cart_products: amountPaid, purchased, purchaseDate
router.put('/checkout', requireToken, async (req, res, next) => {
  try {
    const thisCartId = req.user.cartId

    await Cart_Product.update(
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
    const { products: updatedCart } = await Cart.findByPk(thisCartId, {
      include: {
        model: Product,
      },
    });
    res.json(updatedCart);
  } catch (err) {
    next(err);
  }
});

//PUT change quantity to specified amount - /api/cart/quantity
router.put('/quantity', requireToken, async (req, res, next) => {
  try {
    const thisCartId = req.user.cartId

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

// DELETE /api/cart/ ==> delete order with id
router.delete('/', requireToken, async (req, res, next) => {
  try {
    const thisCartId = req.user.cartId
    const productToDelete = await Cart_Product.findOne({
      where: {
        cartId: Number(thisCartId),
        productId: Number(req.body.productId),
      },
    });
    await productToDelete.destroy();
    res.json(productToDelete);
  } catch (err) {
    next(err);
  }
});
