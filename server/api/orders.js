const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

// GET /  ==> all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /:id == > single order with id
router.get("/:id", async (req, res, next) => {
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

// POST / == > create new order entry
router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
});

// PUT /:id ==> edit order with id
router.put("/:id", async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findByPk(req.params.id);
    const updatedOrder = await orderToUpdate.update(req.body);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
});

// DELETE /:id ==> delete order with id
router.delete("/:id", async (req, res, next) => {
  try {
    const orderToDelete = await Order.findByPk(req.params.id);
    await orderToDelete.destroy();
    res.json(orderToDelete);
  } catch (err) {
    next(err);
  }
});
