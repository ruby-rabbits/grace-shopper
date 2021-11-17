const router = require('express').Router();
const {
  models: { User, Product, Cart, Cart_Product },
} = require('../db');

module.exports = router;

//get products from users cart, filter on front end allows us to use this route to show products in cart and products user has previously bought
router.get('/user/:userId', async (req, res, next) => {
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
//Things to pass in: productId and userId
router.post('/', async (req, res, next) => {
  try {
    // what to pass in: cartId, productId to add
    console.log(req.body);
    let [cartProduct, created] = await Cart_Product.findOrCreate({
      where: {
        cartId: req.body.cartId,
        productId: req.body.productId,
        purchased: false,
      },
      defaults: {
        quantity: req.body.quantity,
      },
    });
    if (!created) {
      let newQuantity = cartProduct.quantity + req.body.quantity;
      cartProduct = await cartProduct.update({
        quantity: newQuantity,
      });
    }
    res.json(cartProduct);
  } catch (e) {
    next(e);
  }
});

router.post('/user/:userId', async (req, res, next) => {
  try {
    // find or create the product
    const userWithCart = await User.findByPk(Number(req.params.userId));
    const thisCartId = await userWithCart.cartId;
    const [cartProduct, created] = await Cart_Product.findOrCreate({
      where: {
        cartId: Number(thisCartId),
        productId: Number(req.body.productId),
        purchased: false,
      },
      defaults: req.body,
    });
    const productToAdd = await Product.findByPk(cartProduct.productId, {
      include: {
        model: Cart_Product,
        as: 'cart_product',
        where: {
          cartId: Number(thisCartId),
        },
      },
    });
    console.log(productToAdd.cart_product);
    if (created) {
      res.json(productToAdd);
    }
    // if order already exists, update instead
    else {
      let quant = 0;
      if (req.body.quantity === undefined) {
        quant = 1;
      } else {
        quant = req.body.quantity;
      }
      const updatedProduct = await cartProduct.update({
        ...req.body,
        quantity: quant + cartProduct.quantity,
      });
      const finalProduct = await Product.findByPk(updatedProduct.productId, {
        include: {
          model: Cart_Product,
          as: 'cart_product',
          where: {
            cartId: Number(thisCartId),
          },
        },
      });
      res.json(finalProduct);
    }
  } catch (err) {
    next(err);
  }
});

//PUT change columns in cart_products: amountPaid, purchased, purchaseDate
router.put('/user/:userId/checkout', async (req, res, next) => {
  try {
    const userWithCart = await User.findByPk(Number(req.params.userId));
    const thisCartId = await userWithCart.cartId;

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

//PUT change quantity to specified amount
router.put('/user/:userId/quantity', async (req, res, next) => {
  try {
    const userWithCart = await User.findByPk(Number(req.params.userId));
    const thisCartId = await userWithCart.cartId;

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
router.delete('/user/:userId/:productId', async (req, res, next) => {
  try {
    const userWithCart = await User.findByPk(Number(req.params.userId));
    const thisCartId = await userWithCart.cartId;

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
