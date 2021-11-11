const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define('cart', {
  totalPrice: {
    type: Sequelize.DECIMAL(12,2),
    defaultValue: 0,
    allowNull :false,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = Cart;
