const router = require('express').Router();
const {
  models: { Order },
} = require('../db');
module.exports = router;

// GET /api/orders  ==> all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id == > single order with id
router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(singleOrder);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders == > create new order entry
router.post('/', async (req, res, next) => {
  try {
    // find or create the order
    const [order, created] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        productId: req.body.productId,
      },
      defaults: req.body,
    });

    if (created) {
      res.json(order);
    }
    // if order already exists, update instead
    else {
      const updatedOrder = await order.update({
        ...req.body,
        quantity: req.body.quantity + order.quantity, //
      });
      res.json(updatedOrder);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id ==> edit order with id
router.put('/:id', async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findByPk(req.params.id);
    const updatedOrder = await orderToUpdate.update(req.body);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/orders/:id ==> delete order with id
router.delete('/:id', async (req, res, next) => {
  try {
    const orderToDelete = await Order.findByPk(req.params.id);
    await orderToDelete.destroy();
    res.json(orderToDelete);
  } catch (err) {
    next(err);
  }
});
