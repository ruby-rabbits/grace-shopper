const router = require('express').Router()
const { models: { User, Order }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:userId/cart
router.get('/:userId/cart', async (req,res,next) => {
  try{
    const ordersInCart = await Order.findAll({
      where: {
        userId : Number(req.params.userId),
        inCart: true
      }
    });
    res.json(ordersInCart)
  } catch (err) {
    next(err)
  }
})
